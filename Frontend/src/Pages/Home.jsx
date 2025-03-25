import React from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import DataTestimonials  from "../Components/Data/DataTestimonials";
import Contact from "../Components/Contact";
import About from "../Components/About";
import Footer from "../Components/Footer";
import DataService from "../Components/Data/DataService";
import StorageStats from "../Components/DBStorage";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Banner />
      <DataService title="Our Services" isAdmin={false} />
      <DataTestimonials title="Testimonials" isAdmin={false}  />
      <About />
      <Contact />
      <Footer />
     </div>
  );
};

export default Home;
