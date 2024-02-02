import React from "react";
import "./ThirdSection.css";

import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { GiFirstAidKit } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
const ThirdSection = () => {
  return(
  <div className="third-session">

      <div className="content">
         <span className="title">What we Offer</span>
      </div>
     <div className="features">
         <div className="rows">
                  <div className="box">
                  <MdAirlineSeatReclineExtra />
                  <div>Comfort Seats</div>
             </div>
             <div className="box">
                  <FaWifi />
                  <div>Wifi</div>
             </div>
         </div>
          <div className="rows">
             <div className="box">
                  <GiFirstAidKit />
                  <div>First Aid & Safety</div>
             </div>
             < div className="box">
                  <FaUserTie/>
                  <div>Friendly Drivers</div>
             </div>
         </div>
     </div>
    
  </div>
   
  );
}

export default ThirdSection;
