import React from "react";
import AdminNavbar from "../Components/AdminNavbar";
import FormTestimonials from "../Components/Admin/FormTestimonials";
import DataTestimonials from "../Components/Data/DataTestimonials";

const AdminTestimonials = () => {
  return (
    <div>
      <AdminNavbar />
      <FormTestimonials />
      <DataTestimonials  title="Services Database" isAdmin={true} />
    </div>
  );
};

export default AdminTestimonials;
