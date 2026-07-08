import { useNavigate } from "react-router-dom";

const LeadForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleCancel,
}) => {
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <button 
        type="button" 
        className="btn-secondary btn-sm" 
        onClick={() => navigate(-1)}
        style={{ marginBottom: '20px' }}
      >
        ← Back
      </button>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={formData.status || "New"}
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div className="form-group">
          <label>Assigned Employee</label>
          <select
            name="assignedEmployee"
            value={formData.assignedEmployee || "John"}
            onChange={handleChange}
          >
            <option value="John">John</option>
            <option value="David">David</option>
            <option value="Alex">Alex</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Save
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;