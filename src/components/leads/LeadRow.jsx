import React from "react";
import { Link } from "react-router-dom";

const LeadRow = ({ lead }) => {
  return (
    <tr>
      <td>{lead.name}</td>
      <td>{lead.mobile}</td>
      <td>{lead.email}</td>
      <td>{lead.status}</td>
      <td>{lead.assignedEmployee}</td>
      <td>{lead.createdDate}</td>

      <td>
  <Link to={`/leads/${lead.id}`}>
    <button>View</button>
  </Link>

  <Link to={`/leads/${lead.id}/edit`}>
    <button>Edit</button>
  </Link>
</td>
    </tr>
  );
};

export default LeadRow;