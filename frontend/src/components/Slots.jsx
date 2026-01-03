import { useEffect, useState } from "react";
import { api } from "../api";

export default function Slots({ date, setSlot }) {
  const [slots, setSlots] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    api.get(`/get-slots.php?date=${date}`)
      .then(res => setSlots(res.data));
  }, [date]);
  if (!slots.length) {
    return <p className="empty">No available slots</p>;
  }
  return (
    <div>
      <h3>Available Slots</h3>
      {slots.map(s => (
        <button
          key={s.id}
          className={`slot ${selectedId === s.id ? "selected" : ""}`}
          onClick={() => {
            setSelectedId(s.id);
            setSlot(s);
          }}
        >
          {s.start_time} - {s.end_time}
        </button>
      ))}
    </div>
  );
}
