import { useState } from "react";
import { api } from "../api";

export default function BookingForm({ slot, onBooked }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    // ✅ Frontend validation
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    // simple email format check
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await api.post("/book-slot.php", {
        slot_id: slot.id,
        name,
        email
      });

      if (res.data.success) {
        onBooked();
        setName("");
        setEmail("");
      } else {
        setError("Slot already booked");
      }
    } catch {
      setError("Slot already booked");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Confirm Booking</h3>

      <input
        value={name}
        placeholder="Name"
        onChange={e => setName(e.target.value)}
      />

      <input
        value={email}
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <button className="primary" onClick={submit} disabled={loading}>
        {loading ? "Booking..." : "Confirm"}
      </button>
    </div>
  );
}
