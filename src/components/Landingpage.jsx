import React from "react";
import Navbar from "./landingpage/Navbar";
import Landing from "./landingpage/Landing";
import Features from "./landingpage/Features";
import Grids from "./landingpage/Grids";
import Footer from "./landingpage/Footer";

// Main landing page for the app. Renders all top-level sections.
const LandingPage = () => {
  return (
    <div>
      {/* Main navigation bar */}
      <Navbar/>
      {/* Hero/landing section */}
      <div id="Landing">
        <Landing />
      </div>
      {/* Features section */}
      <div id="Features">
        <Features />
      </div>
      {/* About/Grids section */}
      <div id="Grids">
        <Grids />
      </div>
      {/* Footer section */}
      <div id="Footer">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
