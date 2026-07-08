import { useEffect, useState } from "react";
import { getLeads } from "../services/leadService";
import LeadTable from "../components/leads/LeadTable";
const LeadList = () => {

    const [leads, setleads] = useState([]);

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
      <LeadTable leads={leads} />
    </div>
   
  );
};

export default LeadList;