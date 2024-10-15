// import React from "react";
import "./Banner.css";

function Banner() {
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu ">
            <span>ALL CATEGORIES</span>
          </div>
          <div className="otherQuickOptions" style={{ cursor: "pointer" }}>
            <span>Cars</span>
            <span>Motorcy...</span>
            <span>Mobile Ph...</span>
            <span>For Sale:Houses & Apart...</span>
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

export default Banner;
