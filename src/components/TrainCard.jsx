import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import styles from "./TrainCard.module.css";

export default function TrainCard({ train }) {
  const navigate = useNavigate();
  const { setSelectedTrain, resetBooking } = useBooking();

  const dep = new Date(train.departure);
  const arr = new Date(train.arrival);

  const fmt = (d) =>
    d.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
  const fmtDate = (d) =>
    d.toLocaleDateString("uk-UA", { day: "numeric", month: "short" });

  const minPrice = Math.min(...train.wagons.map((w) => w.price));

  const handleSelect = () => {
    setSelectedTrain(train);
    resetBooking();
    navigate(`/booking/${train.id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.trainNum}>№ {train.number}</span>
        <span className={styles.date}>{fmtDate(dep)}</span>
      </div>

      <div className={styles.route}>
        <div className={styles.city}>
          <span className={styles.time}>{fmt(dep)}</span>
          <span className={styles.cityName}>{train.from}</span>
        </div>

        <div className={styles.line}>
          <span className={styles.duration}>{train.duration}</span>
          <div className={styles.lineTrack}>
            <span className={styles.dot} />
            <span className={styles.dash} />
            <span className={styles.arrow}>🚂</span>
          </div>
        </div>

        <div className={styles.city}>
          <span className={styles.time}>{fmt(arr)}</span>
          <span className={styles.cityName}>{train.to}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.wagons}>
          {train.wagons.map((w) => (
            <span key={w.id} className={styles.wagonBadge}>
              {w.type}
            </span>
          ))}
        </div>
        <div className={styles.priceBlock}>
          <span className={styles.from}>від</span>
          <span className={styles.price}>{minPrice} ₴</span>
        </div>
        <button className={styles.btn} onClick={handleSelect}>
          Обрати місця
        </button>
      </div>
    </div>
  );
}
