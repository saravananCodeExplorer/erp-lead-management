import LeadRow from "./LeadRow";

const LeadTable = ({ leads }) => {
  return (
    <table border="1" width="100%" cellPadding="10">
      <thead>
        <tr>
          <th>Name</th>
          <th>Mobile</th>
          <th>Email</th>
          <th>Status</th>
          <th>Employee</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {leads.map((lead) => (
          <LeadRow key={lead.id} lead={lead} />
        ))}
      </tbody>
    </table>
  );
};

export default LeadTable;