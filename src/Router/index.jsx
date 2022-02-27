import { Routes, Route } from "react-router-dom";
import { Home, Register, Login } from "../components";
export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  );
};
