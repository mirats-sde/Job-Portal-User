import { Link } from "react-router-dom";
import React, { useContext } from "react";
import "./TeamCard.css";
import { Job_context } from "../../pages/job/JobContext";

const TeamCard = () => {
  let { setAllFilters, allFilters } = useContext(Job_context);
  const firstCard = [
    {
      title: "Software and Engineering Team",
      disc: "Develop the products for the world and help them to bring change in their life",
      department: "software developer",
    },
    {
      title: "Design Team",
      disc: "Create beautiful experiences for everyone.",
      department: "designer",
    },
    {
      title: "Business Strategy Team",
      disc: "Get insights to innovate, grow and expand.",
      department: "business stratergy",
    },
  ];
  const secondCard = [
    {
      title: "Sales, Service and Support Team",
      disc: "Help our clients and customers with their tasks. Support the core business.",
      department: "sales",
    },
    {
      title: "Business Operations Team  ",
      disc: "Run the operations of Mirats Insights and become the part of business.",
      department: "business operation",
    },
    {
      title: "Marketing & Communication Team",
      disc: "Connect with customers and show them our magic.",
      department: "marketing and communication",
    },
    {
      title: "Finance Operations Team",
      disc: "Design solutions to support our accounts.",
      department: "finance operation",
    },
    {
      title: "Legal Team",
      disc: "Help us stay compliant with the laws and regulations.",
      department: "legal",
    },
    {
      title: "People Operations Team",
      disc: "Find, grow, and support the people works at Mirats Insights.",
      department: "people operation",
    },
  ];
  return (
    <>
      <div className="heroContainer">
        <div className="mainContainer">
          <h1 className="card_label">
            #Discover<span>Teams.🧑🏻‍💻</span>
          </h1>

          <h2 className="cardTitle">Problem Solving Teams.</h2>

          <div className="cardContainer">
            {firstCard.map((val, i) => {
              return (
                <Link
                  to="/jobs"
                  style={{ textDecoration: "none" }}
                  onClick={(e) => {
                    setAllFilters({
                      ...allFilters,
                      department: [val?.department],
                    });
                  }}
                >
                  <div className="card" key={i}>
                    <h1 className="cardName">{val.title}</h1>
                    <h2 className="cardDisc">{val.disc}</h2>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="heroContainer">
        <div className="mainContainer">
          <h2 className="cardTitle">Functional Teams.</h2>

          <div className="cardContainer">
            {secondCard.map((val, i) => {
              return (
                <Link
                  to="/jobs"
                  style={{ textDecoration: "none" }}
                  onClick={(e) => {
                    setAllFilters({
                      ...allFilters,
                      department: [val?.department],
                    });
                  }}
                >
                  <div className="card" key={i}>
                    <h1 className="cardName">{val.title}</h1>
                    <h2 className="cardDisc">{val.disc}</h2>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamCard;
