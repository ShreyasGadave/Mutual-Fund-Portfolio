import React from "react";
import AdminNavbar from "../Components/Common/AdminNavbar";
import FormService from "../Components/Admin/ServiceForm";
import DataService from "../Components/Data/ServiceData";

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