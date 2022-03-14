import React from "react";
import { growdata } from "./growdata";
import './grow.css'
const Grow = () => {
  return (
    <>
      <div className="growParentContainer">
        <div className="growMainContainer">
          <h2 className="mainContainerTitle">#growwithmirats</h2>
          <h1 className="mainContainerDisc">
            Find the team you <span> love. ❤️</span>
          </h1>
          <div className="growCardContainer">
            {growdata.map((val, i) => {
              return (
                <a href={val.link} className="grwoCard" key={i}>
                  <h1 className="growCardTitle1">
                    {val.title1}
                  </h1>
                  <h2 className="growCardTitle2">
                    {val.title2}
                  </h2>
                  <h3 className="growCardTitle3">
                    {val.title3}
                  </h3>
                  <h2 className="growCardDisc">
                    {val.disc} 
                    <span className="e_disc">{val.e_disc}</span>
                    <span className="f_disc">{val.f_disc}</span>
                  </h2>
                  <h3 className="growCardLink">
                    {val.apply}
                  </h3>
                  
                </a>
              );
            })}
          </div>
          <button className="viewsButton">VIEW ALL ITEMS !</button>

        </div>
      </div>
    </>
  );
};

export default Grow;
