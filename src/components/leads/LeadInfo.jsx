import DetailRow from "./DetailRow";

const LeadInfo = ({ lead }) => {
  return (
    <table className="info-table">
      <tbody>

        <DetailRow
          label="Name"
          value={lead.name}
        />

        <DetailRow
          label="Mobile"
          value={lead.mobile}
        />

        <DetailRow
          label="Email"
          value={lead.email}
        />

        <DetailRow
          label="Address"
          value={lead.address}
        />

        <DetailRow
          label="Course Interested"
          value={lead.courseInterested}
        />

        <DetailRow
          label="Lead Source"
          value={lead.leadSource}
        />

        <DetailRow
          label="Assigned Employee"
          value={lead.assignedEmployee}
        />

        <DetailRow
          label="Created Date"
          value={lead.createdDate}
        />

        <DetailRow
          label="Current Status"
          value={lead.status}
        />

      </tbody>
    </table>
  );
};

export default LeadInfo;