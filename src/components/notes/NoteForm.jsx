import { useState } from "react";

const NoteForm = ({ onAddNote }) => {
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!note.trim()) return;

    onAddNote(note);

    setNote("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows="4"
        placeholder="Enter note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <br />

      <button type="submit">
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;