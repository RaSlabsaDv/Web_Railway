const BASE = "http://localhost:3001";

// ─── Trains ───────────────────────────────────────────────────────────────────

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
 * Повертає всі заброньовані місця для вагону.
 * json-server v1 фільтрує по точному збігу рядка,
 * тому додатково фільтруємо на клієнті щоб не залежати від версії.
 */
export async function fetchBookedSeats(trainId, wagonId) {
  // Отримуємо ВСІ бронювання і фільтруємо на клієнті —
  // це гарантує коректну роботу незалежно від версії json-server
  const res = await fetch(`${BASE}/bookings`);
  if (!res.ok) throw new Error("Не вдалося отримати заброньовані місця");

  const bookings = await res.json();

  const relevant = bookings.filter(
    (b) =>
      String(b.trainId) === String(trainId) &&
      String(b.wagonId) === String(wagonId)
  );

  const allSeats = relevant.flatMap((b) => b.seats);
  return [...new Set(allSeats)];
}

/**
 * Зберігає бронювання на json-server через POST /bookings.
 * id НЕ передаємо — json-server генерує його сам.
 */
export async function saveBooking(booking) {
  const payload = {
    ...booking,
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
