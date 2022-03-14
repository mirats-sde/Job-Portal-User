import React from "react";
import "./footer.css";
import {AiFillYoutube} from "react-icons/ai";
import {BsTwitter} from "react-icons/bs"
import {FaInstagram} from "react-icons/fa"
import {AiFillFacebook} from "react-icons/ai"
import {AiFillLinkedin} from "react-icons/ai"
const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer_parent">
          <div className="footerinfo">
            <a href="#" className="future">
              Build your future with
            </a>
            <a href="#" className="image_logo">
              <img
                src="https://miratsinsights.com/logo/transparent/black_rect.png"
                alt="logo_company"
              />
            </a>
          </div>
          <div className="footer_link_parent">
            <div className="footer_link1 footer_link">
              <a href="#">Jobs</a>
              <a href="#">Internships</a>
              <a href="#">Explore Teams</a>
            </div>
            <div className="footer_link2 footer_link">
              <a href="">Programs</a>
              <a href="">Resources</a>
              <a href="">How To apply</a>
            </div>
            <div className="footer_link3 footer_link">
              <a href="">Mirat's Values</a>
              <a href="">Our Vision</a>
              <a href="">Student Careers site</a>
            </div>
          </div>
        </div>

        <hr />
        <div className="socialmedia_container">
          <div className="social_icon">
            <a href="#"><AiFillYoutube/></a>
            <a href="#"><BsTwitter/></a>
            <a href="#"><FaInstagram/></a>
            <a href="#"><AiFillFacebook/></a>
            <a href="#"><AiFillLinkedin/></a>
          </div>
          <div className="copyright">
              <a href="#">Mirats.</a>
              <a href="#">Privacy</a>
              <a href="#">terms</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
