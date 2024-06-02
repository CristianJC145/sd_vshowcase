import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VshowcaseLayout from "../../shared/layout/VshowcaseLayout";
import AppEmptyLayout from "../../shared/layout/AppEmptyLayout";
import RegisterLanding from "./pages/RegisterPage";
import RegisterUser from "../auth/Register";
import Login from "../auth/Login";

const VshowcaseRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <VshowcaseLayout>
            <Routes>
              <Route index element={<HomePage />} />
            </Routes>
          </VshowcaseLayout>
        }
      />
      <Route
        path="/auth/*"
        element={
          <AppEmptyLayout>
            <Routes>
              <Route path="login" element={ <Login /> } />
            </Routes>
          </AppEmptyLayout>
        }
      />
      <Route
        path="/register/*"
        element={
          <AppEmptyLayout>
            <Routes>
              <Route path="landing/" element={<RegisterLanding />} />
              <Route path="count/personal" element={<RegisterUser />} />
              <Route path="count/business" element={<RegisterUser />} />
            </Routes>
          </AppEmptyLayout>
        }
      />
    </Routes>
  );
};

export default VshowcaseRoutes;
