import React from "react";
import AdminNavbar from "../Components/Common/AdminNavbar";
import FormTestimonials from "../Components/Admin/TestimonialsForm";
import DataTestimonials from "../Components/Data/TestimonialsData";

const AdminTestimonials = () => {
  return (
    <div>
      <AdminNavbar />
      <FormTestimonials />
      <DataTestimonials  title="Testimonials Database" isAdmin={true}  />
    </div>
  );
};

export default AdminTestimonials;
