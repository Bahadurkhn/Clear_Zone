import React from "react";
import "./Home.css";
import UserDashboard from "../Dashboard/UserDashboard";
import NGOProfile from "../Profile/NGOProfile";
import Report_Management from "../Report_Management/Report_Management";

const Home = () => {
  return (
    <section>
      <div>
        <h1 className="home-container">

          <b>HOME PAGE</b>
        </h1>
        
      </div>
      <NGOProfile />
      <UserDashboard />
      <Report_Management />
    </section>
  );
};

export default Home;
