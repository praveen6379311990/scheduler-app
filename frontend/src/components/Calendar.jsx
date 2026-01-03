export default function Calendar({ setDate }) {
  return (
    <input
      type="date"
      onChange={e => setDate(e.target.value)}
    />
  );
}
