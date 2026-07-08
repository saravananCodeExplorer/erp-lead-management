import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../components/common/Loader";
import LeadForm from "../components/leads/LeadForm";

import { getLead,updateLead } from "../services/leadService";

const EditLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fullLead, setFullLead] = useState({});

  const [formData, setFormData] =
    useState({
      name: "",
      mobile: "",
      email: "",
      status: "",
      assignedEmployee: "",
    });

  useEffect(() => {
    loadLead();
  }, []);

  const loadLead = async () => {
    try {
      setLoading(true);

      const response =
        await getLead(id);

      setFullLead(response.data || {});
      setFormData({
        name: response.data.name || "",
        mobile: response.data.mobile || "",
        email: response.data.email || "",
        status: response.data.status || "New",
        assignedEmployee:
          response.data.assignedEmployee || "John",
      });

    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const mergedPayload = {
      ...fullLead,
      ...formData,
    };

    await updateLead(id, mergedPayload);

    alert("Lead updated successfully.");

    navigate("/");
  } catch (error) {
    console.error(error);
    alert("Failed to update lead.");
  } finally {
    setLoading(false);
  }
};

  const handleCancel = () => {
    navigate("/");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">

      <h2>Edit Lead</h2>

      <LeadForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />

    </div>
  );
};

export default EditLead;