const BASE = "http://localhost:3001";

// ─── Trains ──────────────────────────────────────────────────────────────────

export async function fetchTrains() {
  const res = await fetch(`${BASE}/trains`);
  if (!res.ok) throw new Error("Не вдалося отримати список рейсів");
  return res.json();
}

export async function fetchTrain(id) {
  const res = await fetch(`${BASE}/trains/${id}`);
  if (!res.ok) throw new Error("Рейс не знайдено");
  return res.json();
}

// ─── Bookings ─────────────────────────────────────────────────────────────────

/**
 * Повертає всі заброньовані номери місць для конкретного вагону.
 * Single source of truth: дані приходять ТІЛЬКИ з json-server.
 */
export async function fetchBookedSeats(trainId, wagonId) {
  const res = await fetch(
    `${BASE}/bookings?trainId=${trainId}&wagonId=${wagonId}`
  );
  if (!res.ok) throw new Error("Не вдалося отримати заброньовані місця");
  const bookings = await res.json();
  // Зводимо всі масиви seats в один плаский масив унікальних номерів
  const allSeats = bookings.flatMap((b) => b.seats);
  return [...new Set(allSeats)];
}

/**
 * Зберігає бронювання на mock-backend (json-server).
 * localStorage НЕ використовується для постійного збереження —
 * лише json-server є джерелом правди.
 */
export async function saveBooking(booking) {
  const payload = {
    ...booking,
    id: `booking-${Date.now()}`,
    date: new Date().toISOString(),
  };

  const res = await fetch(`${BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Не вдалося зберегти бронювання");
  return res.json();
}

export async function fetchAllBookings() {
  const res = await fetch(`${BASE}/bookings`);
  if (!res.ok) throw new Error("Не вдалося отримати бронювання");
  return res.json();
}
