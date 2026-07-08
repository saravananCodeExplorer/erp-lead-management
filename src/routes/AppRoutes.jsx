import { BrowserRouter, Routes, Route } from "react-router-dom";

import LeadList from "../pages/LeadList";
import LeadDetails from "../pages/LeadDetails";
import EditLead from "../pages/EditLead";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LeadList />} />

          <Route
            path="/leads/:id"
            element={<LeadDetails />}
          />

          <Route
            path="/leads/:id/edit"
            element={<EditLead />}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;