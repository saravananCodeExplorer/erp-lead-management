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
      setLeads(response.data);
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
      lead.name.toLowerCase().includes(keyword) ||
      lead.mobile.includes(keyword) ||
      lead.email.toLowerCase().includes(keyword);

    const matchesStatus = !status || lead.status === status;

    const matchesEmployee =
      !employee || lead.assignedEmployee === employee;

    const matchesDate =
      (!startDate || lead.createdDate >= startDate) &&
      (!endDate || lead.createdDate <= endDate);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesEmployee &&
      matchesDate
    );
  });

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
    return <h2>{error}</h2>;
  }

  // Empty State
  if (!loading && filteredLeads.length === 0) {
    return <h2>No Leads Found</h2>;
  }

  return (
    <div className="container">
      <h2>Lead Management</h2>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

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
    </div>
  );
};

export default LeadList;