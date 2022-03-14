import React from "react";
import "./TeamHome.css";
const Teamhome = () => {
  return (
    <>
      <div className="teamMainHome">
        <div className="teamHomeContainer">
          <div className="teamHomeLeft">
            <h1>
              Want to be Insighter? Find your <span> role.</span> ❤️
            </h1>
            <h2>
              Make a difference. Join our community and help us define it.
            </h2>
            <p>
              Explore our teams and inspire the work by pursuing careers in
              technology you love the most.
            </p>
          </div>
          <div className="teamHomeRight">
            <img
              src="https://buildyourfuture.miratsinsights.com/images/team-head.jpg"
              alt="teamImage"
            />
          </div>
            <svg
              className="teamSVG"
              width="598px"
              height="597px"
              viewBox="0 0 638 637"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g
                  transform="translate(-105.000000, -119.000000)"
                  fill="rgb(255, 100, 100"
                >
                  <rect
                    className="rect"
                    transform="translate(424.000000, 437.198052) rotate(45.000000) translate(-424.000000, -437.198052) "
                    rx="50"
                    ry="50"
                    x="199"
                    y="212.198052"
                    width="450"
                    height="450"
                  ></rect>
                </g>
              </g>
            </svg>
        </div>
      </div>
    </>
  );
};

export default Teamhome;
