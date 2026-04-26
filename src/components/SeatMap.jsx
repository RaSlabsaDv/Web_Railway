import { useBooking } from "../context/BookingContext";
import styles from "./SeatMap.module.css";

export default function SeatMap() {
  const { selectedWagon, seats, seatsLoading, seatsError, selectedSeats, toggleSeat } = useBooking();

  if (!selectedWagon) return null;
  if (seatsLoading)   return <div className={styles.status}>⏳ Завантаження місць...</div>;
  if (seatsError)     return <div className={styles.statusError}>⚠️ {seatsError}</div>;

  const getSeatStatus = (seat) => {
    if (seat.status === "booked") return "booked";
    if (selectedSeats.includes(seat.number)) return "selected";
    return "free";
  };

  const cols = selectedWagon.type === "СВ" ? 2 : 4;
  const rows = [];
  for (let i = 0; i < seats.length; i += cols) rows.push(seats.slice(i, i + cols));

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        Схема місць — Вагон {selectedWagon.number} ({selectedWagon.type})
      </h3>

      <div className={styles.legend}>
        <span className={styles.legendItem}><span className={`${styles.dot} ${styles.free}`} /> Вільне</span>
        <span className={styles.legendItem}><span className={`${styles.dot} ${styles.selected}`} /> Обране</span>
        <span className={styles.legendItem}><span className={`${styles.dot} ${styles.booked}`} /> Заброньоване</span>
      </div>

      <div className={styles.car}>
        <div className={styles.carFront}>🚃</div>
        <div className={styles.seatsGrid}>
          {rows.map((row, ri) => (
            <div key={ri} className={styles.row}>
              {row.map((seat) => {
                const status = getSeatStatus(seat);
                return (
                  <button
                    key={seat.number}
                    disabled={status === "booked"}
                    className={`${styles.seat} ${styles[status]}`}
                    onClick={() => status !== "booked" && toggleSeat(seat.number)}
                    title={`Місце ${seat.number}`}
                  >
                    {seat.number}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className={styles.summary}>
          Обрані місця: <strong>{[...selectedSeats].sort((a, b) => a - b).join(", ")}</strong> —{" "}
          <strong>{selectedSeats.length * selectedWagon.price} ₴</strong>
        </div>
      )}
    </div>
  );
}
