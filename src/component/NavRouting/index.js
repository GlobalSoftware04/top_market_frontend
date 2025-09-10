import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "../../pages/Login";
export default function NavRouting() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes >

  );
}
