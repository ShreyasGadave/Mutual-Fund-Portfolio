import React from "react";
import AdminNavbar from "../Components/AdminNavbar";
import FormService from "../Components/Admin/FormService";
import DataService from "../Components/Data/DataService";

const AdminServices = () => {
  return (
    <div>
      <AdminNavbar />
      <FormService />
      <DataService title="Admin Services" isAdmin={true} />
    </div>
  );
};

export default AdminServices;