import { useState, useMemo, useEffect } from "react";
import TrainCard from "./TrainCard";
import { useBooking } from "../context/BookingContext";
import styles from "./TrainList.module.css";

export default function TrainList() {
  const { trains, trainsLoading, trainsError, loadTrains } = useBooking();
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadTrains();
  }, [loadTrains]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return trains;
    return trains.filter(
      (t) =>
        t.number.includes(q) ||
        t.from.toLowerCase().includes(q) ||
        t.to.toLowerCase().includes(q)
    );
  }, [trains, query]);

  if (trainsLoading) return <div className={styles.status}>⏳ Завантаження рейсів...</div>;
  if (trainsError)   return <div className={styles.statusError}>⚠️ {trainsError}</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.input}
          type="text"
          placeholder="Пошук за маршрутом або номером потяга..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className={styles.clear} onClick={() => setQuery("")}>✕</button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}><span>🚫</span><p>Рейсів не знайдено</p></div>
      ) : (
        <>
          <p className={styles.count}>Знайдено рейсів: <strong>{filtered.length}</strong></p>
          <div className={styles.grid}>
            {filtered.map((train) => <TrainCard key={train.id} train={train} />)}
          </div>
        </>
      )}
    </div>
  );
}
