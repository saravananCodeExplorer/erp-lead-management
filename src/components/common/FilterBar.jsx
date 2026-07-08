const FilterBar = ({
  status,
  setStatus,
  employee,
  setEmployee,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  resetFilters,
}) => {
  return (
    <div className="filter-bar">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Follow Up">Follow Up</option>
        <option value="Won">Won</option>
        <option value="Lost">Lost</option>
      </select>

      <select
        value={employee}
        onChange={(e) => setEmployee(e.target.value)}
      >
        <option value="">All Employees</option>
        <option value="John">John</option>
        <option value="David">David</option>
        <option value="Alex">Alex</option>
      </select>

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBar;