import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../components/common/Loader";
import { getLead } from "../services/leadService";
import LeadInfo from "../components/leads/LeadInfo";

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

  return (
    <div className="container">

      <button onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>Lead Details</h2>

       <LeadInfo lead={lead} />

    </div>
  );
};

export default LeadDetails;