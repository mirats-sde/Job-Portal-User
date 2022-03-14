import React from "react";
import { cardinfo } from "./cardinfo";
import "./cardinfo.css";
const Card = () => {
  return (
    <>
      <div className="title">
        <span className="span1">#SpotLightJobs</span>
        <span className="span2">@ Mirats Insights</span>
      </div>

      <div className="card_container">
        {cardinfo.map((item, id) => {
          return (
            
              <a href="www.google.com" className="card_info" key={id}>
                <img src={item.img1} className="card_img" alt="" />
                <h2 className="card_title">{item.title}</h2>
                {/* <h3 className='desc'>{item.description2}</h3> */}
                <p className="card_desc">{item.description}</p>
                <p className="quote1">{item.quotes1}</p>
                <p className="quote2">{item.quotes2}</p>
                <p className="quote3">{item.quotes3}</p>
              </a>
            
          );
        })}
      </div>

      <a href="www.facebook.com" className="second_card_container">
        <div className="second_card_info">
          <div className="second_card_desc">
            <h2 className="second_card_title">Cross-functional Roles</h2>
            <p className="second_card_paragrph">
              Manage the teams and make the work done. Roles like Product
              Manager, Project Coordinator, People Operations Manager, FinOps
              Manager and many more are waiting for you so that you can give
              your experience and perspectives to Mirats.
              <span className="second_card_span">#BeTheLeader</span>
            </p>
          </div>
          <div className="second_card_img">
            <img
              src="https://buildyourfuture.miratsinsights.com/images/crossf.jpg"
              alt=""
            />
          </div>
        </div>
      </a>
    </>
  );
};

export default Card;
