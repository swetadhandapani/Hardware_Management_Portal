import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./components/Registration";
import HardwareRequest from "./components/HardwareRequest";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList";
import EditEmployee from "./components/EditEmployee";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import ParentComponent from "./components/ParentComponent";
import Dashboard from "./components/Dashboard";
import { UserContext } from "./context/UserContext";
import HistoryOfRequests from "./components/HistoryOfRequests";
import UserDashboard from "./components/UserDashboard";
import AssignRequest from "./components/AssignRequest";
import FeedbackForm from "./components/FeedbackForm";
import HardwareRequestItem from "./components/HardwareRequestItem";
import AssignedRequests from "./components/AssignedRequests";
import Feedbacks from "./components/Feedbacks";
import ReceivedFeedbacks from "./components/ReceivedFeedbacks";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Role-based routing */}
      <Route
        path="/admin"
        element={
          user && user.role === "admin" ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/assign" element={<AssignRequest />} />
      <Route path="/employees/create" element={<CreateEmployee />} />
      <Route path="/employees" element={<EmployeeList />} />
      <Route path="/employees/edit/:id" element={<EditEmployee />} />

      <Route
        path="/user"
        element={
          user && user.role === "user" ? (
            <UserDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/request" element={<HardwareRequest />} />
      <Route path="/history" element={<HistoryOfRequests />} />
      <Route path="/feedback" element={<ParentComponent />} />
      <Route path="/feedback" element={<FeedbackForm />} />
      <Route path="/request" element={<HardwareRequestItem />} />

      <Route
        path="/employee"
        element={
          user && user.role === "employee" ? (
            <EmployeeDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/employee/assigned-requests"
        element={<AssignedRequests />}
      />

      <Route
        path="/employee/received-feedbacks"
        element={
          user && user.role === "employee" ? (
            <ReceivedFeedbacks />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/feedbacks"
        element={
          user && user.role === "admin" ? (
            <Feedbacks />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default App;
