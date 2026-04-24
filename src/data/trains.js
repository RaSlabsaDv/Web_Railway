export const trains = [
  {
    id: "1",
    number: "747",
    from: "Київ",
    to: "Львів",
    departure: "2025-06-10T07:30:00",
    arrival: "2025-06-10T13:50:00",
    duration: "6г 20хв",
    wagons: [
      { id: "w1", number: 1, type: "Купе", seats: 36, price: 580 },
      { id: "w2", number: 2, type: "Плацкарт", seats: 54, price: 320 },
      { id: "w3", number: 3, type: "СВ", seats: 18, price: 1100 },
    ],
  },
  {
    id: "2",
    number: "145",
    from: "Харків",
    to: "Одеса",
    departure: "2025-06-10T09:00:00",
    arrival: "2025-06-10T19:30:00",
    duration: "10г 30хв",
    wagons: [
      { id: "w4", number: 1, type: "Купе", seats: 36, price: 620 },
      { id: "w5", number: 2, type: "Плацкарт", seats: 54, price: 350 },
    ],
  },
  {
    id: "3",
    number: "89",
    from: "Львів",
    to: "Дніпро",
    departure: "2025-06-10T14:15:00",
    arrival: "2025-06-11T06:45:00",
    duration: "16г 30хв",
    wagons: [
      { id: "w6", number: 1, type: "СВ", seats: 18, price: 1450 },
      { id: "w7", number: 2, type: "Купе", seats: 36, price: 700 },
      { id: "w8", number: 3, type: "Плацкарт", seats: 54, price: 400 },
    ],
  },
  {
    id: "4",
    number: "236",
    from: "Київ",
    to: "Запоріжжя",
    departure: "2025-06-11T22:00:00",
    arrival: "2025-06-12T07:10:00",
    duration: "9г 10хв",
    wagons: [
      { id: "w9", number: 1, type: "Плацкарт", seats: 54, price: 280 },
      { id: "w10", number: 2, type: "Купе", seats: 36, price: 530 },
    ],
  },
  {
    id: "5",
    number: "53",
    from: "Одеса",
    to: "Київ",
    departure: "2025-06-12T20:30:00",
    arrival: "2025-06-13T06:00:00",
    duration: "9г 30хв",
    wagons: [
      { id: "w11", number: 1, type: "СВ", seats: 18, price: 1250 },
      { id: "w12", number: 2, type: "Купе", seats: 36, price: 610 },
      { id: "w13", number: 3, type: "Плацкарт", seats: 54, price: 360 },
    ],
  },
  {
    id: "6",
    number: "312",
    from: "Дніпро",
    to: "Харків",
    departure: "2025-06-13T11:40:00",
    arrival: "2025-06-13T16:00:00",
    duration: "4г 20хв",
    wagons: [
      { id: "w14", number: 1, type: "Купе", seats: 36, price: 490 },
      { id: "w15", number: 2, type: "Плацкарт", seats: 54, price: 290 },
    ],
  },
];

export const generateSeats = (wagon, trainId) => {
  const key = `booked_${trainId}_${wagon.id}`;
  const stored = localStorage.getItem(key);
  const bookedSeats = stored ? JSON.parse(stored) : [];

  // Pre-generate some booked seats
  const preBooked =
    stored === null
      ? Array.from(
          { length: Math.floor(wagon.seats * 0.3) },
          () => Math.floor(Math.random() * wagon.seats) + 1
        ).filter((v, i, a) => a.indexOf(v) === i)
      : bookedSeats;

  if (stored === null) {
    localStorage.setItem(key, JSON.stringify(preBooked));
  }

  return Array.from({ length: wagon.seats }, (_, i) => ({
    number: i + 1,
    status: preBooked.includes(i + 1) ? "booked" : "free",
  }));
};
