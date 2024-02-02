import React from 'react';
import './OurServices.css'; // You should import your CSS file here

function OurServices() {
  return (
    <div className="background">
      <div className="title">
        <h1>Our Services</h1>
       <div className="content">
         <h2>Services that we offer</h2>
        <div className="services-container">
          <ServiceBox title="Single-Rides" />
          <ServiceBox title="Rideshare" />
          <ServiceBox title="Parcel Service" />
          <ServiceBox title="Support" />
        </div>
      </div>
      </div>
    </div>
  );
}

function ServiceBox({ title }) {
  return (
    <div className="service-box">
      {title}
    </div>
  );
}

export default OurServices;

