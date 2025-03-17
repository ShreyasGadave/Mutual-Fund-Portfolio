import React from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Service from "../Components/Service";
import Testimonials from "../Components/Testimonials";
import Contact from "../Components/Contact";
import About from "../Components/About";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <About />
      <Banner />
      <Service />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
