import React from "react";
import "./Home.css";
import MainSection from "./MainSection";
import SearchSection from "./SearchSection";
import ThirdSection from "./ThirdSection";
import Footer from "../..//components/Footer/index";
import FinalSection from "./FinalSection/index";

export default function Home() {
  return (
    <div className="home-page">
      <SearchSection />
      <MainSection />
      <ThirdSection />
      {/* <FinalSection/> */}
      <Footer />
    </div>
  );
}
