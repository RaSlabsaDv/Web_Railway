import TrainList from "../components/TrainList";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.heading}>
          <span className={styles.uk}>🇺🇦</span> Укрзалізниця
        </h1>
        <p className={styles.sub}>
          Пошук та бронювання залізничних квитків по Україні
        </p>
      </div>
      <TrainList />
    </div>
  );
}
