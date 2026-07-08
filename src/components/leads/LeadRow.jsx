import React from "react";
import { Link } from "react-router-dom";

const getBadgeClass = (status) => {
  const norm = status?.toLowerCase().replace(/\s+/g, "") || "";
  if (norm === "new") return "badge badge-new";
  if (norm === "contacted") return "badge badge-contacted";
  if (norm === "qualified") return "badge badge-qualified";
  if (norm === "followup") return "badge badge-followup";
  if (norm === "won") return "badge badge-won";
  if (norm === "lost") return "badge badge-lost";
  return "badge";
};

const LeadRow = ({ lead }) => {
  return (
    <tr>
      <td><strong>{lead.name}</strong></td>
      <td>{lead.mobile || "-"}</td>
      <td>{lead.email || "-"}</td>
      <td>
        <span className={getBadgeClass(lead.status)}>
          {lead.status}
        </span>
      </td>
      <td>{lead.assignedEmployee || "-"}</td>
      <td>{lead.createdDate || "-"}</td>

      <td>
        <div className="actions-cell">
          <Link to={`/leads/${lead.id}`}>
            <button className="btn-secondary btn-sm">View</button>
          </Link>

          <Link to={`/leads/${lead.id}/edit`}>
            <button className="btn-primary btn-sm">Edit</button>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default LeadRow;