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
    <form onSubmit={handleSubmit} className="note-form">
      <textarea
        rows="3"
        placeholder="Type a new tracking note here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        required
      />

      <button type="submit" className="btn-primary">
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;