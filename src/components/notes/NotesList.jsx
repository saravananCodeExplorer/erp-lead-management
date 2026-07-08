import NoteCard from "./NoteCard";

const NotesList = ({ notes }) => {
  return (
    <div>
      <h3>Notes</h3>

      {notes.length === 0 ? (
        <p>No Notes Available</p>
      ) : (
        notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
          />
        ))
      )}
    </div>
  );
};

export default NotesList;