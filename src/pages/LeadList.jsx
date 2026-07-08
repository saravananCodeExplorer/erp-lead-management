import { useEffect, useState } from "react";
import { getLeads } from "../services/leadService";
import LeadTable from "../components/leads/LeadTable";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";

const LeadList = () => {

    const [leads, setleads] = useState([]);

    //  search filter
    const [search, setSearch] = useState("");

const [status, setStatus] = useState("");
const [employee, setEmployee] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

const resetFilters = () => {
  setSearch("");
  setStatus("");
  setEmployee("");
  setStartDate("");
  setEndDate("");
};

    

const filteredLeads = leads.filter((lead) => {
  const keyword = search.toLowerCase();

  const matchesSearch =
    lead.name.toLowerCase().includes(keyword) ||
    lead.mobile.includes(keyword) ||
    lead.email.toLowerCase().includes(keyword);

  const matchesStatus =
    !status || lead.status === status;

  const matchesEmployee =
    !employee ||
    lead.assignedEmployee === employee;

  const matchesDate =
    (!startDate ||
      lead.createdDate >= startDate) &&
    (!endDate ||
      lead.createdDate <= endDate);

  return (
    matchesSearch &&
    matchesStatus &&
    matchesEmployee &&
    matchesDate
  );
});

    ///////////////////////////////


  
    
    useEffect(() => {
        loadLeads()
    }, [])
    
    const loadLeads = async() =>  {
        const response = await getLeads();
        setleads(response.data)
    }
    // console.log("data",leads)
  return(
      <div>
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
     <LeadTable leads={filteredLeads} />
    </div>
   
  );
};

export default LeadList;