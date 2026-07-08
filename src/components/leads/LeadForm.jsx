import { useNavigate } from "react-router-dom";

const LeadForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleCancel,
}) => {

    const navigate = useNavigate()
  return (
      <form onSubmit={handleSubmit}>
        <button onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div>
        <label>Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Mobile</label>

        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Email</label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Status</label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="New">New</option>
          <option value="Qualified">
            Qualified
          </option>
          <option value="Follow Up">
            Follow Up
          </option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      <div>
        <label>Assigned Employee</label>

        <select
          name="assignedEmployee"
          value={formData.assignedEmployee}
          onChange={handleChange}
        >
          <option value="John">John</option>
          <option value="David">David</option>
          <option value="Alex">Alex</option>
        </select>
      </div>

      <br />

      <button type="submit">
        Save
      </button>

      <button
        type="button"
        onClick={handleCancel}
      >
        Cancel
      </button>

    </form>
  );
};

export default LeadForm;