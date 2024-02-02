import React from "react";
import "./About.css";
import CarImage from "../../assets/taxi.png";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-content">
        <h2>Welcome to HeyRides!</h2>
        <p className="about-description">
          We believe that transportation should be more than just getting from
          point A to point B. It should be an experience that leaves you with a
          smile on your face and a story to share. We've designed our
          ride-sharing platform with you in mind, putting user experience and
          convenience at the forefront. With user-friendly interfaces and
          intuitive features, booking a ride with us is as easy as a few taps on
          your phone. Our advanced technology will help you with the live
          tracking of the vehicles, notifications on estimated arrival time at
          each destinations and thereby providing maximum efficiency. Safety is
          our number one priority. We have implemented rigorous safety measures,
          including driver background checks, vehicle inspections . Rest
          assured, you're in good hands when you choose HEY RIDES. Our team of
          dedicated drivers is at the heart of what we do. They are the true
          heroes who ensure that every ride is safe, comfortable, and enjoyable.
          We carefully select and train our drivers, ensuring that they not only
          possess exceptional driving skills, but also share our commitment to
          exceptional customer service. Join us on this exciting ride, where
          we're more than just a ride-sharing company. We're your reliable
          companions, your trusted partners, and your ticket to unforgettable
          journeys. Together, let's redefine the way we move. So, whether you're
          commuting to work, meeting friends, or exploring new horizons, choose
          HEY RIDES for a ride that goes beyond expectations. If you have any
          questions or need assistance, feel free to ask. We're here to make
          your ride with us an exceptional one!
        </p>
      </div>
      <div className="about-image">
        <img src={CarImage} alt="Car" />
      </div>
    </div>
  );
};

export default AboutPage;
