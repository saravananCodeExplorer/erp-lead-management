const NoteCard = ({
  note,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="note-card">
      <div className="note-header">
        <span>By: <strong>{note.createdBy}</strong></span>
        <span>{note.createdDate}</span>
      </div>

      <div className="note-text">{note.note}</div>

      <div className="note-actions">
        <button
          className="btn-secondary btn-sm"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>

        <button
          className="btn-danger btn-sm"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;