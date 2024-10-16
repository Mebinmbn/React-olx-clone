// import React from "react";
import "./Banner.css";
import PropTypes from "prop-types";

function Banner({ setSelectedCategory }) {
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu ">
            <span>ALL CATEGORIES</span>
          </div>
          <div className="otherQuickOptions" style={{ cursor: "pointer" }}>
            <span
              onClick={() => {
                setSelectedCategory("Automobile");
              }}
            >
              Automobile
            </span>
            <span
              onClick={() => {
                setSelectedCategory("Electronic");
              }}
            >
              Electronic
            </span>
            <span
              onClick={() => {
                setSelectedCategory("Real Estate");
              }}
            >
              Real Estate
            </span>
            <span
              onClick={() => {
                setSelectedCategory("Agriculture");
              }}
            >
              Agriculture
            </span>
            <span>Scoot...</span>
            <span>Commercial & Other Ve...</span>
            <span>For Rent: House & Apart...</span>
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/banner copy.png" alt="Banner" />
        </div>
      </div>
    </div>
  );
}
Banner.propTypes = {
  setSelectedCategory: PropTypes.func.isRequired,
};

export default Banner;
