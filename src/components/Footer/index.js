import React from "react";
import { SlSocialFacebook, SlSocialInstagram } from "react-icons/sl";
import { IoCallOutline } from "react-icons/io5";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/"> Home</a> | <a href="/about"> About</a> |{" "}
        <a href="/services"> Our Services</a> | <a href="/contact"> Contact</a>
      </div>
      <div className="social-icons">
        <a
          target="_blank"
          href="https://www.facebook.com/profile.php?id=61551082410214&mibextid=9R9pXO"
        >
          <SlSocialFacebook size={15} />
        </a>
        <a target="_blank" href="https://www.instagram.com/heyrides">
          <SlSocialInstagram size={15} />
        </a>
        <a href="tel:+12263487380">
          <IoCallOutline />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
