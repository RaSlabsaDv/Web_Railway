export const BookingService = {
  saveBooking(booking) {
    const existing = this.getAll();
    existing.push({ ...booking, id: Date.now(), date: new Date().toISOString() });
    localStorage.setItem("bookings", JSON.stringify(existing));

    // Mark seats as booked
    const key = `booked_${booking.trainId}_${booking.wagonId}`;
    const stored = localStorage.getItem(key);
    const bookedSeats = stored ? JSON.parse(stored) : [];
    const updated = [...new Set([...bookedSeats, ...booking.seats])];
    localStorage.setItem(key, JSON.stringify(updated));

    return booking;
  },

  getAll() {
    const stored = localStorage.getItem("bookings");
    return stored ? JSON.parse(stored) : [];
  },

  clearAll() {
    localStorage.removeItem("bookings");
  },
};
