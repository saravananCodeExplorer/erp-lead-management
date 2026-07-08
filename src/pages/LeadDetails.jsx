import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../components/common/Loader";
import LeadInfo from "../components/leads/LeadInfo";
import NoteForm from "../components/notes/NoteForm";
import NotesList from "../components/notes/NotesList";

import { getLead, updateLead } from "../services/leadService";

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load Lead
  useEffect(() => {
    loadLead();
  }, []);

  const loadLead = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getLead(id);
      setLead(response.data);
    } catch (error) {
      setError("Unable to load lead details.");
    } finally {
      setLoading(false);
    }
  };

  // Add Note
  const handleAddNote = async (noteText) => {
    const newNote = {
      id: Date.now(),
      note: noteText,
      createdBy: "Admin",
      createdDate: new Date().toISOString().split("T")[0],
    };

    const updatedLead = {
      ...lead,
      notes: [...(lead.notes || []), newNote],
    };

    try {
      await updateLead(id, updatedLead);
      setLead(updatedLead);
    } catch (error) {
      console.error(error);
      alert("Failed to add note.");
    }
  };

  // Edit Note
  const handleEditNote = async (note) => {
    const updatedText = prompt("Edit Note", note.note);

    if (!updatedText) return;

    const updatedLead = {
      ...lead,
      notes: lead.notes.map((item) =>
        item.id === note.id
          ? { ...item, note: updatedText }
          : item
      ),
    };

    try {
      await updateLead(id, updatedLead);
      setLead(updatedLead);
    } catch (error) {
      console.error(error);
      alert("Failed to update note.");
    }
  };

  // Delete Note
  const handleDeleteNote = async (noteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    const updatedLead = {
      ...lead,
      notes: lead.notes.filter(
        (note) => note.id !== noteId
      ),
    };

    try {
      await updateLead(id, updatedLead);
      setLead(updatedLead);
    } catch (error) {
      console.error(error);
      alert("Failed to delete note.");
    }
  };

  // Loading & Error States
  if (loading) return <Loader />;

  if (error) return <h2>{error}</h2>;

  if (!lead) return <h2>Lead Not Found</h2>;

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <button className="btn-secondary btn-sm" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <button className="btn-primary" onClick={() => navigate(`/leads/${lead.id}/edit`)}>
          Edit Details
        </button>
      </div>

      <div className="lead-detail-layout">
        <div>
          <h2>Lead Profile</h2>
          <LeadInfo lead={lead} />
        </div>

        <div className="notes-section">
          <h2>Interaction History</h2>
          <NoteForm onAddNote={handleAddNote} />
          <hr style={{ border: 0, borderTop: "1px solid var(--border-color)", margin: "20px 0" }} />
          <NotesList
            notes={lead.notes || []}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;