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
      <button onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>Lead Details</h2>

      <LeadInfo lead={lead} />

      <hr />

      <h2>Lead Notes</h2>

      <NoteForm onAddNote={handleAddNote} />

      <NotesList
        notes={lead.notes || []}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
      />
    </div>
  );
};

export default LeadDetails;