const NoteCard = ({
  note,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="note-card">

      <p>
        <strong>Note:</strong>
        {note.note}
      </p>

      <p>
        <strong>Created By:</strong>
        {note.createdBy}
      </p>

      <p>
        <strong>Date:</strong>
        {note.createdDate}
      </p>

      <button
        onClick={() => onEdit(note)}
      >
        Edit
      </button>

      <button
        onClick={() => onDelete(note.id)}
      >
        Delete
      </button>

    </div>
  );
};

export default NoteCard;