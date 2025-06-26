import React from "react";
import Navbar from "./landingpage/Navbar";
import Landing from "./landingpage/Landing";
import Features from "./landingpage/Features";
import Grids from "./landingpage/Grids";
import Footer from "./landingpage/Footer";


const LandingPage = () => {
  return (
    <div>
      <Navbar/>
      <div id="Landing">
        <Landing />
      </div>
      <div id="Features">
        <Features />
      </div>
      <div id="Grids">
        <Grids />
      </div>
      <div id="Footer">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
