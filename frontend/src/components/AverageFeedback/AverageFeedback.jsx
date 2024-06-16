import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
import './AverageFeedback.css'; // Import CSS file for styling

const BASE_URL = 'http://localhost:4000';

const AverageFeedback = () => {
  const [averageFeedback, setAverageFeedback] = useState(null);

  useEffect(() => {
    const fetchAverageFeedback = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/feedback/average`);
        setAverageFeedback(response.data.averageFeedback);
      } catch (error) {
        console.error("Error fetching average Feedback:", error);
      }
    };

    fetchAverageFeedback();
  }, []);

  return (
    <div className="average-feedback-container">
      <h3>Feedback  </h3>
      <div className="average-rating">
        {averageFeedback !== null && averageFeedback !== undefined ? (
          <div className="rating-container">
            <p>{averageFeedback.toFixed(2)}</p>
            <img src={assets.star_icon} alt="Star" className="star-icon" />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AverageFeedback;
