import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../components/common/Loader";
import { getLead } from "../services/leadService";

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

      <table border="1" cellPadding="10">
        <tbody>

          <tr>
            <th>Name</th>
            <td>{lead.name}</td>
          </tr>

          <tr>
            <th>Mobile</th>
            <td>{lead.mobile}</td>
          </tr>

          <tr>
            <th>Email</th>
            <td>{lead.email}</td>
          </tr>

          <tr>
            <th>Address</th>
            <td>{lead.address}</td>
          </tr>

          <tr>
            <th>Course Interested</th>
            <td>{lead.courseInterested}</td>
          </tr>

          <tr>
            <th>Lead Source</th>
            <td>{lead.leadSource}</td>
          </tr>

          <tr>
            <th>Assigned Employee</th>
            <td>{lead.assignedEmployee}</td>
          </tr>

          <tr>
            <th>Created Date</th>
            <td>{lead.createdDate}</td>
          </tr>

          <tr>
            <th>Current Status</th>
            <td>{lead.status}</td>
          </tr>

        </tbody>
      </table>

    </div>
  );
};

export default LeadDetails;