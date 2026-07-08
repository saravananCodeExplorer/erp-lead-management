const NoteCard = ({ note }) => {
  return (
    <div className="note-card">
      <p>
        <strong>Note:</strong> {note.note}
      </p>

      <p>
        <strong>Created By:</strong> {note.createdBy}
      </p>

      <p>
        <strong>Date:</strong> {note.createdDate}
      </p>

      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default NoteCard;