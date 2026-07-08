import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../components/common/Loader";
import { getLead,updateLead } from "../services/leadService";
import LeadInfo from "../components/leads/LeadInfo";

import NotesList from "../components/notes/NotesList";
import NoteForm from "../components/notes/NoteForm";
const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLead();
  }, []);

  const loadLead = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getLead(id);
      setLead(response.data);
    } catch (err) {
      setError("Unable to load lead details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!lead) {
    return <h2>Lead Not Found</h2>;
    }
    
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
<NotesList notes={lead.notes || []} />

    </div>
  );
};

export default LeadDetails;