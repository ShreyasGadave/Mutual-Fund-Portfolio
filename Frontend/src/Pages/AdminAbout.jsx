import React from "react";
import AdminNavbar from "../Components/AdminNavbar";
import FormAbout from "../Components/Admin/FormAbout";
import DataAbout from "../Components/Data/DataAbout";

const AdminAbout = () => {
  return (
    <div>
      <AdminNavbar />
      <FormAbout />
      <DataAbout title="About Me" isAdmin={true} /> 
    </div>
  );
};

export default AdminAbout;
