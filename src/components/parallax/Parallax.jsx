import React from "react";
import "./Parallax.css";
import { BsBoxArrowUpRight } from "react-icons/bs";
const Parallax = () => {
  return (
    <>
      <div className="parallax_container">
        <div className="parallax_main_div">
          <div className="parallax_info">
            <h2>Learn. Live. Code.</h2>
            <h1>
              Working at <span> Mirats Insights.</span> 🧑🏻‍💻
            </h1>
          </div>

          <div className="parallax_card_container">
            <a href="#" className="parallax_card1 parallax_card">
              <h1>Learn about our commitments to hiring peoples</h1>
              <a href="#">
                LEARN MORE <BsBoxArrowUpRight className="box_icons" />{" "}
              </a>
            </a>
            <a className="parallax_card2 parallax_card">
              <h1>Explore Opportunties for Students.</h1>
              <a href="#">
                LEARN MORE <BsBoxArrowUpRight className="box_icons" />{" "}
              </a>
            </a>
            <a className="parallax_card3 parallax_card">
              <h1>
                Learn how we recruit and building diverse and inclusive Mirats.
              </h1>
              <a href="#" className="p3-a">
                LEARN MORE <BsBoxArrowUpRight className="box_icons" />{" "}
              </a>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Parallax;
