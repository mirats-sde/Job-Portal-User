import React from "react";
import bgvideo from "../../assets/videos/homevideo.mp4";
import Footer from "../Footer/Footer";
// /Users/lokesh/PROJECTS/REACT_PROJECTS/job_portal_collab/src/assets/videos/mirats-career-3.mov
import "./homesaction.css";
const Homesaction = () => {
  return (
    <>
      <div className="parent_home">
        <div className="video">
          <video autoPlay muted loop>
            <source className="video_source" src={bgvideo} type="video/mp4" />
          </video>
          <div className="shadow"></div>
        </div>

        <div className="home_section">
          <div className="home_section_info">
            <h2>
              Join our team 👨🏻‍💻 and bring <br />
              your thoughts into action. <br />
              <span className="span1">#JoinMirats</span>
              <span className="span2"> #BeYou</span>
            </h2>
            <button className="btn">GROW WITH US!</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homesaction;
