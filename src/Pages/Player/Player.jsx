import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(true);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZmU0MTdjZTI3ZTA4NDZkOTNlOTMzM2IwNzFmODg5MCIsIm5iZiI6MTc0MzI3NTI0OS4xNjQsInN1YiI6IjY3ZTg0NGYxYjU2NTVhYWM0MjYzOTlhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aaNiqE3aaATiC_KQn_6kqh5LWuPSTShsouwJupY5dyg'
    }
  };

  useEffect(() => {
    console.log("Fetching trailer for movie ID:", id);

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then(res => setApiData(res.results[0]))
      .catch((err) => {
        console.error("Error fetching trailer:", err);
        // setError(true);
      })
      // .finally(() => setLoading(false));
  }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error || !apiData) return <p>No trailer available</p>;

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => navigate(-2)} />
      <iframe
        src={`https://www.youtube.com/embed/${apiData.key}`}
        frameBorder="0"
        width="90%"
        height="90%"
        title="Trailer"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
