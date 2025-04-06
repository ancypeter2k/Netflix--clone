import React, { useState, useEffect } from 'react';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer YOUR_ACCESS_TOKEN`,
          },
        });
        const data = await response.json();
        setMovie(data.results[Math.floor(Math.random() * data.results.length)]);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovie();
  }, []);

  const truncate = (str, n) => (str?.length > n ? `${str.substr(0, n - 1)}...` : str);

  return (
    <header className="banner" style={{
      backgroundSize: "cover",
      backgroundImage: movie ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` : "none",
      backgroundPosition: "center center"
    }}>
      <div className="banner_contents">
        <h1 className="banner_title">{movie?.title || movie?.original_name}</h1>
        <p className="banner_description">{truncate(movie?.overview, 150)}</p>
        <div className="banner_buttons">
          <button className="btn" aria-label="Play">
            <img src={play_icon} alt="Play" /> Play
          </button>
          <button className="btn dark-btn" aria-label="More Info">
            <img src={info_icon} alt="Info" /> More Info
          </button>
        </div>
      </div>
      <div className="banner_fadeBottom"></div>
    </header>
  );
};

export default Banner;