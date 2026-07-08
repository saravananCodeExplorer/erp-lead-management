import NoteCard from "./NoteCard";

const NotesList = ({
  notes,
  onEdit,
  onDelete,
}) => {
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
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}

    </div>
  );
};

export default NotesList;