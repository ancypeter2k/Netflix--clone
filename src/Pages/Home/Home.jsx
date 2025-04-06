import React from 'react';
import './Home.css';
import Navbar from '../../Components/Navbar/Navbar.jsx';
import TitleCards from '../../Components/TitleCards/TitleCards.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import Banner from "../../Components/Banner/Banner.jsx";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <Banner />
        <div className="more-cards">
          <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
          <TitleCards title={"Only on Netflix"} category={"popular"} />
          <TitleCards title={"Upcoming"} category={"upcoming"} />
          <TitleCards title={"Top Pics for You"} category={"now_playing"} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
