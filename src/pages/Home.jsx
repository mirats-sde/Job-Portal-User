import React from "react";
import Imageicon from "../components/avatarImage/Imageicon";
import Card from "../components/Card/Card";
import Grow from "../components/grow/Grow";
import Homesaction from "../components/homesaction/Homesaction";
import Parallax from "../components/parallax/Parallax";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer/Footer";
const Home = () => {
  return (
    <>
      <Navbar />
      <Homesaction />
      <Imageicon />
      <Card />
      <Grow />
      <Parallax />
      <Footer />
    </>
  );
};

export default Home;
