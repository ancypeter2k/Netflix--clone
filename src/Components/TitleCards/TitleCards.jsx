import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZmU0MTdjZTI3ZTA4NDZkOTNlOTMzM2IwNzFmODg5MCIsIm5iZiI6MTc0MzI3NTI0OS4xNjQsInN1YiI6IjY3ZTg0NGYxYjU2NTVhYWM0MjYzOTlhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aaNiqE3aaATiC_KQn_6kqh5LWuPSTShsouwJupY5dyg",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    const cardList = cardsRef.current;
    if (cardList) {
      cardList.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (cardList) {
        cardList.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  );
};

export default TitleCards;
