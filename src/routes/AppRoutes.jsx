import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeadList from "../pages/LeadList";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LeadList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;