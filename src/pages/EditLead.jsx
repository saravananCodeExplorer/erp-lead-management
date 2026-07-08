import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../components/common/Loader";
import LeadForm from "../components/leads/LeadForm";

import { getLead } from "../services/leadService";

const EditLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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

      setFormData({
        name: response.data.name,
        mobile: response.data.mobile,
        email: response.data.email,
        status: response.data.status,
        assignedEmployee:
          response.data.assignedEmployee,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Step 22
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