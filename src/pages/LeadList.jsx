import { useEffect, useState } from "react";
import { getLeads } from "../services/leadService";
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
           <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Status</th>
            <th>Employee</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.mobile}</td>
              <td>{lead.email}</td>
              <td>{lead.status}</td>
              <td>{lead.assignedEmployee}</td>
              <td>{lead.createdDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   
  );
};

export default LeadList;