import { useEffect, useState } from "react";
import { getLeads } from "../services/leadService";
import LeadTable from "../components/leads/LeadTable";
import SearchBar from "../components/common/SearchBar";

const LeadList = () => {

    const [leads, setleads] = useState([]);

    const [search, setSearch] = useState("");

  const filteredLeads = leads.filter((lead) => {
  const keyword = search.toLowerCase();
  return (
    lead.name.toLowerCase().includes(keyword) ||
    lead.mobile.includes(keyword) ||
    lead.email.toLowerCase().includes(keyword)
  );
});

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
     <LeadTable leads={filteredLeads} />
    </div>
   
  );
};

export default LeadList;