import { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./BookingForm.module.css";

export default function BookingForm() {
  const { selectedWagon, selectedSeats, book, resetBooking } = useBooking();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Введіть ім'я (мінімум 2 символи)";
    if (!/^\+?[\d\s\-()]{9,15}$/.test(form.phone))
      e.phone = "Введіть коректний номер телефону";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Введіть коректний email";
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async () => {
    if (!selectedWagon || selectedSeats.length === 0) {
      toast.warning("Оберіть вагон та місця перед бронюванням!");
      return;
    }
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    try {
      await book(form); // POST → json-server
      toast.success(
        `✅ Бронювання успішне! Місця ${[...selectedSeats].sort((a,b)=>a-b).join(", ")} у вагоні ${selectedWagon.number} заброньовано.`,
        { autoClose: 5000 }
      );
      setForm({ name: "", phone: "", email: "" });
      resetBooking();
      navigate("/");
    } catch (err) {
      toast.error(`❌ Помилка: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedWagon) return null;

  const total = selectedSeats.length * selectedWagon.price;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Дані пасажира</h3>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.label}>Ім'я та прізвище</label>
          <input className={`${styles.input} ${errors.name ? styles.error : ""}`}
            placeholder="Іваненко Іван" value={form.name} onChange={handleChange("name")} />
          {errors.name && <span className={styles.err}>{errors.name}</span>}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Телефон</label>
          <input className={`${styles.input} ${errors.phone ? styles.error : ""}`}
            placeholder="+380 XX XXX XXXX" value={form.phone} onChange={handleChange("phone")} />
          {errors.phone && <span className={styles.err}>{errors.phone}</span>}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input className={`${styles.input} ${errors.email ? styles.error : ""}`}
            placeholder="example@email.com" value={form.email} onChange={handleChange("email")} type="email" />
          {errors.email && <span className={styles.err}>{errors.email}</span>}
        </div>
      </div>

      <div className={styles.totalRow}>
        <span>{selectedSeats.length} місць × {selectedWagon.price} ₴</span>
        <strong className={styles.total}>{total} ₴</strong>
      </div>

      <button className={styles.btn} onClick={handleSubmit}
        disabled={loading || selectedSeats.length === 0}>
        {loading ? "Зберігаємо..." : "Забронювати квиток"}
      </button>
    </div>
  );
}
