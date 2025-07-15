import React from "react";
import Header from "../Components/Common/Header";
import Navbar from "../Components/Common/Navbar";
import DataTestimonials  from "../Components/Data/TestimonialsData";
import Contact from "../Components/Common/Contact";
import Footer from "../Components/Common/Footer";
import DataService from "../Components/Data/ServiceData";
import DataAbout from "../Components/Data/AboutData";
import MovingBar from "../Components/Common/MovingBar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <DataAbout title="About Me" limit={1} isAdmin={false} />
      <MovingBar/>
      <DataService title="Our Services" isAdmin={false} />
      <DataTestimonials title="Testimonials" isAdmin={false}  > </DataTestimonials>
      <Contact />
      <Footer />
     </div>
  );
};

export default Home;
