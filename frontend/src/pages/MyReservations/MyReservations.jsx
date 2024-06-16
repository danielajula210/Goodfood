    import React, { useContext, useEffect, useState } from 'react';
    import './MyReservations.css';
    import axios from 'axios';
    import { StoreContext } from '../../Context/StoreContext';
    import { assets } from '../../assets/assets';

    const MyReservations = () => {
    const [reservations, setReservations] = useState([]);
    const { url, token, user } = useContext(StoreContext);

    const fetchReservations = async () => {
        try {
            console.log(user.email);
        const response = await axios.post(
            url + "/api/reserve/myreservations",
            { email: user.email },
            { headers: { token } }
        );
        console.log(response.data); // Log the response data
        setReservations(response.data.data);
        } catch (error) {
        console.error("Error fetching reservations:", error);
        }
    }
    
    

    useEffect(() => {
        if (token) {
        fetchReservations();
        }
    }, [token])


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
      }

    return (
        <div className='my-reservations'>
        <h2>Rezervările mele</h2>
        <div className="container">
            {reservations.map((reservation, index) => {
            return (
                <div key={index} className='my-reservations-reservation'>
                <img src={assets.table_icon} alt="" />
                <p>Date: {formatDate(reservation.date)}</p>
                <p>Ora: {reservation.hour}:00</p>
                <p>Capacitate masă: {reservation.capacity} persoane</p>
                </div>
            )
            })}
        </div>
        </div>
    )
    }

    export default MyReservations;
