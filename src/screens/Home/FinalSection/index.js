import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default class Testimonials extends Component {
  render() {
    return (
      <Carousel className="a"
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={6100}
      >
        <div>
          <img src="../../../assets/a.jpg" />
          <div className="myCarousel">
            <h3>Helen</h3>
            <h4>Traveler</h4>
            <p>
              It was great travelling with Heyrides. The best ride service I ever had
            </p>
          </div>
        </div>

        <div>
          <img src="../../../assets/b.jpg" />
          <div className="myCarousel">
            <h3>Varghese</h3>
            <h4>Traveler</h4>
            <p>
              Best drivers and on time services. I highly
              recommend Heyrides to my peers.
            </p>
          </div>
        </div>

        <div>
          <img src="../../../assets/c.jpg" />
          <div className="myCarousel">
            <h3>Alia</h3>
            <h4>Traveler</h4>
            <p>
              Looking forward to travel more with hey rides
            </p>
          </div>
        </div>
      </Carousel>
    );
  }
}
