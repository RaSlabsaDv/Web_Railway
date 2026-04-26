import { createContext, useContext, useState, useCallback } from "react";
import { fetchTrains, fetchTrain, fetchBookedSeats, saveBooking } from "../services/api";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [trains, setTrains] = useState([]);
  const [trainsLoading, setTrainsLoading] = useState(false);
  const [trainsError, setTrainsError] = useState(null);

  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [seats, setSeats] = useState([]);
  const [seatsLoading, setSeatsLoading] = useState(false);
  const [seatsError, setSeatsError] = useState(null);

  const loadTrains = useCallback(async () => {
    setTrainsLoading(true);
    setTrainsError(null);
    try {
      const data = await fetchTrains();
      setTrains(data);
    } catch (err) {
      setTrainsError(err.message);
    } finally {
      setTrainsLoading(false);
    }
  }, []);

  const loadTrain = useCallback(async (id) => {
    try {
      const data = await fetchTrain(id);
      setSelectedTrain(data);
      return data;
    } catch {
      return null;
    }
  }, []);

  const selectWagon = useCallback(
    async (wagon) => {
      setSelectedWagon(wagon);
      setSelectedSeats([]);
      setSeats([]);
      if (!selectedTrain) return;
      setSeatsLoading(true);
      setSeatsError(null);
      try {
        const bookedNumbers = await fetchBookedSeats(selectedTrain.id, wagon.id);
        const seatList = Array.from({ length: wagon.seats }, (_, i) => ({
          number: i + 1,
          status: bookedNumbers.includes(i + 1) ? "booked" : "free",
        }));
        setSeats(seatList);
      } catch (err) {
        setSeatsError(err.message);
      } finally {
        setSeatsLoading(false);
      }
    },
    [selectedTrain]
  );

  const toggleSeat = useCallback((number) => {
    setSelectedSeats((prev) =>
      prev.includes(number) ? prev.filter((n) => n !== number) : [...prev, number]
    );
  }, []);

  const book = useCallback(
    async (passengerData) => {
      if (!selectedTrain || !selectedWagon || selectedSeats.length === 0) {
        throw new Error("Оберіть вагон і місця");
      }
      const booking = {
        trainId: selectedTrain.id,
        wagonId: selectedWagon.id,
        wagonNumber: selectedWagon.number,
        seats: selectedSeats,
        price: selectedSeats.length * selectedWagon.price,
        ...passengerData,
      };
      const saved = await saveBooking(booking);
      setSeats((prev) =>
        prev.map((s) =>
          selectedSeats.includes(s.number) ? { ...s, status: "booked" } : s
        )
      );
      setSelectedSeats([]);
      return saved;
    },
    [selectedTrain, selectedWagon, selectedSeats]
  );

  const resetBooking = useCallback(() => {
    setSelectedWagon(null);
    setSelectedSeats([]);
    setSeats([]);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        trains, trainsLoading, trainsError, loadTrains,
        selectedTrain, setSelectedTrain, loadTrain,
        selectedWagon, selectWagon,
        selectedSeats, toggleSeat,
        seats, seatsLoading, seatsError,
        book, resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
