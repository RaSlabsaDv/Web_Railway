import TrainList from "../components/TrainList";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.badge}>🚂 Квитки онлайн</div>
        <h1 className={styles.heading}>
          Залізниця<span className={styles.accent}> Коливана</span>
        </h1>
        <p className={styles.sub}>
          Пошук та бронювання залізничних квитків по всій країні
        </p>
      </div>
      <TrainList />
    </div>
  );
}
