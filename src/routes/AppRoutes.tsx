import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register";
import HomePage from "../pages/HomePage/HomePage"
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
