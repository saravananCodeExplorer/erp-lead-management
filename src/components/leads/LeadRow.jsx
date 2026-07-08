import React from "react";

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
        <button>View</button>
        <button>Edit</button>
      </td>
    </tr>
  );
};

export default LeadRow;