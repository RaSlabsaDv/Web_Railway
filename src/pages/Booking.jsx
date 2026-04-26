import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useBooking } from "../context/BookingContext";
import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import BookingForm from "../components/BookingForm";
import styles from "./Booking.module.css";

export default function Booking() {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const { loadTrain, selectedTrain, resetBooking } = useBooking();

  useEffect(() => {
    // Завантажуємо потяг з json-server (GET /trains/:id)
    loadTrain(trainId).then((train) => {
      if (!train) navigate("/");
    });
    return () => resetBooking();
  }, [trainId]);

  if (!selectedTrain) return <div style={{ padding: 40, color: "var(--muted)" }}>⏳ Завантаження...</div>;

  const dep = new Date(selectedTrain.departure);
  const fmt = (d) => d.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
  const fmtDate = (d) => d.toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate("/")}>← Назад до списку</button>

      <div className={styles.trainInfo}>
        <div className={styles.trainHeader}>
          <span className={styles.num}>Потяг № {selectedTrain.number}</span>
          <span className={styles.dateInfo}>{fmtDate(dep)}</span>
        </div>
        <div className={styles.route}>
          <span className={styles.city}>{selectedTrain.from}</span>
          <span className={styles.arrow}>→</span>
          <span className={styles.city}>{selectedTrain.to}</span>
          <span className={styles.time}>{fmt(dep)}</span>
          <span className={styles.dur}>({selectedTrain.duration})</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.left}>
          <WagonSelector wagons={selectedTrain.wagons} />
          <SeatMap />
        </div>
        <div className={styles.right}>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
