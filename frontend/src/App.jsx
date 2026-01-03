import { useEffect, useState } from 'react'
import Calendar from "./components/Calendar";
import Slots from "./components/Slots";
import BookingForm from "./components/BookingForm";
import './App.css'

function App() {
  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setMessage("");
    setSelectedSlot(null);
  }, [date]);
  return (
    <>
      <div className="container">
        <h2>Book a Meeting</h2>

        <div className="layout">
          {/* LEFT SIDE */}
          <div className="left">
            <Calendar setDate={setDate} />

            {date && (
              <Slots
                key={date + refresh}
                date={date}
                // setSlot={setSelectedSlot}
                setSlot={(slot) => {
                  setMessage("");          // 👈 clear old success message
                  setSelectedSlot(slot);
                }}
              />
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="right">
            {message && <p className="success">{message}</p>}

            {selectedSlot ? (
              <BookingForm
                slot={selectedSlot}
                onBooked={() => {
                  setMessage("✅ Booking confirmed!");
                  setSelectedSlot(null);
                  setRefresh(!refresh);
                }}
              />
            ) : (
              <p className="empty">Select a slot to book</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
