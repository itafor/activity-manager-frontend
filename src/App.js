import "antd/dist/antd.variable.min.css";
import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Spin } from "antd";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import AuthRoutes from "./routes/AuthRoutes";

import NotFoundPage from "./pages/ErrorPages/NotFoundPage";
import Theme from "./theme";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Patients, { PatientInfo } from "./pages/Patients";
import Physicians, { PhysicianInfo } from "./pages/Physicians";
import Subscriptions from "./pages/Subscriptions";
// import Chats from "./pages/Chats";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";

const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));

const Loading = () => {
  return (
    <div className="spin">
      <Spin />
    </div>
  );
};

Theme();

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path="/" element={<AuthRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<Signup />} />
            <Route path="/reset-password" element={<ForgotPassword />} />
            <Route path="/reset-confirmation" element={<ResetPassword />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Route>

          {/* Private routes  */}
          <Route path="/" element={<ProtectedRoutes />}>
            {/* Other protected pages */}
            <Route
              //
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
              //
              path="/bookings"
              element={<Bookings />}
            />
            <Route
              //
              path="/patients"
              element={<Patients />}
            />
            <Route
              //
              path="/patients/:id"
              element={<PatientInfo />}
            />
            <Route
              //
              path="/physicians"
              element={<Physicians />}
            />
            <Route
              //
              path="/physicians/:id"
              element={<PhysicianInfo />}
            />
            <Route
              //
              path="/subscriptions"
              element={<Subscriptions />}
            />
            {/* <Route
              //
              path="/chats"
              element={<Chats />}
            /> */}
            <Route
              //
              path="/payments/appointment"
              element={<Payments />}
            />
            <Route
              //
              path="/payments/subscription"
              element={<Payments />}
            />
            <Route
              //
              path="/settings"
              element={<Settings />}
            />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Route>

          {/* Catch all routes -> push to not found page */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
