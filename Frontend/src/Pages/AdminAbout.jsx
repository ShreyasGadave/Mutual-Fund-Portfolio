import React from "react";
import AdminNavbar from "../Components/Common/AdminNavbar";
import FormAbout from "../Components/Admin/AboutForm";
import DataAbout from "../Components/Data/AboutData";

const AdminAbout = () => {
  return (
    <div>
      <AdminNavbar />
      <FormAbout />
      <DataAbout title="About Me" isAdmin={true} limit={999}/> 
    </div>
  );
};

export default AdminAbout;
