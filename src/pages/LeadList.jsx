import { useEffect, useState } from "react";
import { getLeads } from "../services/leadService";

import LeadTable from "../components/leads/LeadTable";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import Pagination from "../components/common/Pagination";
import Loader from "../components/common/Loader";

const LeadList = () => {
  // Lead Data
  const [leads, setLeads] = useState([]);

  // Loading & Error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Search
  const [search, setSearch] = useState("");

  // Filters
  const [status, setStatus] = useState("");
  const [employee, setEmployee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Load Leads
  const loadLeads = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getLeads();
      setLeads(response.data || []);
    } catch (err) {
      setError("Unable to load leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  // Reset Filters
  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setEmployee("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  // Search + Filters
  const filteredLeads = leads.filter((lead) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      (lead.name || "").toLowerCase().includes(keyword) ||
      (lead.mobile || "").includes(keyword) ||
      (lead.email || "").toLowerCase().includes(keyword);

    const matchesStatus = !status || lead.status === status;

    const matchesEmployee =
      !employee || lead.assignedEmployee === employee;

    const matchesDate =
      (!startDate || (lead.createdDate && lead.createdDate >= startDate)) &&
      (!endDate || (lead.createdDate && lead.createdDate <= endDate));

    return (
      matchesSearch &&
      matchesStatus &&
      matchesEmployee &&
      matchesDate
    );
  });

  // Stats Computations
  const totalLeadsCount = leads.length;
  const qualifiedCount = leads.filter(l => l.status === "Qualified").length;
  const wonCount = leads.filter(l => l.status === "Won").length;
  const inProgressCount = leads.filter(l => ["New", "Contacted", "Follow Up"].includes(l.status)).length;

  // Pagination
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;

  const currentLeads = filteredLeads.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(
    filteredLeads.length / rowsPerPage
  );

  // Loading
  if (loading) {
    return <Loader />;
  }

  // Error
  if (error) {
    return (
      <div className="container">
        <div className="empty-state" style={{ borderColor: 'var(--danger-color)' }}>
          <h2 style={{ background: 'none', webkitTextFillColor: 'var(--danger-color)', margin: 0 }}>Error</h2>
          <p>{error}</p>
          <br />
          <button className="btn-primary" onClick={loadLeads}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Leads Dashboard</h2>

      {/* Stats Widgets Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Total Leads</div>
          <div className="stat-value">{totalLeadsCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">In Progress</div>
          <div className="stat-value" style={{ color: "var(--primary-accent)" }}>{inProgressCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Qualified</div>
          <div className="stat-value" style={{ color: "var(--warning-color)" }}>{qualifiedCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Won</div>
          <div className="stat-value" style={{ color: "var(--success-color)" }}>{wonCount}</div>
        </div>
      </div>

      <div className="controls-row">
        <div className="search-input-wrapper">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        <FilterBar
          status={status}
          setStatus={setStatus}
          employee={employee}
          setEmployee={setEmployee}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          resetFilters={resetFilters}
        />
      </div>

      {filteredLeads.length === 0 ? (
        <div className="empty-state">
          <h3>No Leads Found</h3>
          <p>We couldn't find any leads matching your active filters. Try searching for a different keyword or resetting parameters.</p>
          <br />
          <button className="btn-secondary" onClick={resetFilters}>Reset All Filters</button>
        </div>
      ) : (
        <>
          <LeadTable leads={currentLeads} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={(value) => {
              setRowsPerPage(value);
              setCurrentPage(1);
            }}
          />
        </>
      )}
    </div>
  );
};

export default LeadList;