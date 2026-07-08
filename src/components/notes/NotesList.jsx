import NoteCard from "./NoteCard";

const NotesList = ({
  notes,
  onEdit,
  onDelete,
}) => {
  return (
    <div>

      <h3>Notes ({notes.length})</h3>

      {notes.length === 0 ? (
        <p className="empty-state">No notes available for this lead yet.</p>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default NotesList;