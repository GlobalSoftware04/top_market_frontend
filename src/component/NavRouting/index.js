import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "../../pages/Login";
import Header from "../Header";
import Dashboard from "../../pages/Dashboard";
export default function NavRouting() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      <Route element={<Header/>}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      </Routes >
    </>
  );
}
