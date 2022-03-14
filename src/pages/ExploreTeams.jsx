import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar2 from "../components/navbar2/Navbar2";
import TeamCard from "../components/TeamCard/TeamCard";
import Teamhome from "../components/TeamHome/Teamhome";
const ExploreTeams = () => {
  return (
    <div>
      <Navbar2 />
      <Teamhome />
      <TeamCard />
      <Footer />
    </div>
  );
};

export default ExploreTeams;
