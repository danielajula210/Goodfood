import React, { useContext, useState } from 'react';
import './Feedback.css';
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext';
import AverageFeedback from '../AverageFeedback/AverageFeedback';

const BASE_URL = 'http://localhost:4000';


const Feedback = () => {
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const { token, user } = useContext(StoreContext);

    const handleRatingClick = (star) => {
        setRating(star);
        console.log(user, star);
    };

    const handleSubmit = async () => {
       
        try {
            if (!token) {
                toast.error("Pentru a lăsa o recenzie este necesară autentificarea");
                return;
            }
            
            const feedbackResponse = await fetch(`${BASE_URL}/api/feedback/${user.email}`);
            const feedbackData = await feedbackResponse.json();
    
            if (feedbackData.length > 0) {
                toast.warn("Ai trimis deja un feedback.");
                return;
            }
            
            const response = await fetch(`${BASE_URL}/api/feedback/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email,
                    feedback: rating
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.success) {
                setSubmitted(true);
                toast.success('Feedback-ul tău a fost trimis cu succes. Mulțumim!');
            } else {
                throw new Error(data.message || 'Unknown error');
            }
        } catch (error) {
            console.error('There was an error!', error);
            toast.error('Feedback-ul nu a putut fi trimis. Te rugăm să încerci din nou mai târziu.');
        }
    };

    return (
        <div className='feedback-container'>
            <div className='feedback' id='feedback'>
                <p>Feedback</p>
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map(star => (
                        <span
                            key={star}
                            className={star <= rating ? 'star filled' : 'star'}
                            onClick={() => handleRatingClick(star)}
                        >
                            &#9733;
                        </span>
                    ))}
                </div>
                <button  onClick={handleSubmit}>Submit</button>
            </div>
            <AverageFeedback/>
        </div>
    );
};

export default Feedback;
