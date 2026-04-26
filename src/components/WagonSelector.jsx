import { useBooking } from "../context/BookingContext";
import styles from "./WagonSelector.module.css";

const typeEmoji = { "Купе": "🛏️", "Плацкарт": "🪑", "СВ": "✨" };

export default function WagonSelector({ wagons }) {
  const { selectedWagon, selectWagon } = useBooking();

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Оберіть вагон</h3>
      <div className={styles.list}>
        {wagons.map((w) => (
          <button
            key={w.id}
            className={`${styles.wagon} ${selectedWagon?.id === w.id ? styles.active : ""}`}
            onClick={() => selectWagon(w)}
          >
            <span className={styles.emoji}>{typeEmoji[w.type] || "🚃"}</span>
            <span className={styles.num}>Вагон {w.number}</span>
            <span className={styles.type}>{w.type}</span>
            <span className={styles.price}>{w.price} ₴</span>
            <span className={styles.seats}>{w.seats} місць</span>
          </button>
        ))}
      </div>
    </div>
  );
}
