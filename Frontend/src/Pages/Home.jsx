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
import DataAbout from "../Components/Data/DataAbout";
import MovingBar from "../Components/MovingBar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <DataAbout title="About Me" limit={1} isAdmin={false} />
      <MovingBar/>
      <DataService title="Our Services" isAdmin={false} />
      <DataTestimonials title="Testimonials" isAdmin={false}  > rffwefefsjs</DataTestimonials>
      <Contact />
      <Footer />
     </div>
  );
};

export default Home;
