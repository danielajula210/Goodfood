import React, { useEffect, useState } from 'react';
import './Reservations.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets, url } from '../../assets/assets';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${url}/api/reserve/list`);
      if (response.data.success) {
        setReservations(response.data.data);
      } else {
        toast.error("Error fetching reservations");
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
      toast.error("Error fetching reservations");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  }
  return (
    <div className='reservations-container'>
      <h2>Reservations</h2>
      <div className="reservation-list">
        {reservations.map((reservation, index) => (
          <div key={index} className='reservation-item'>
            <img src={assets.table_icon} alt="Table Icon" />
            <div className='reservation-details'>
              <p><strong>Email:</strong> {reservation.email}</p>
              <p><strong>Data:</strong> {formatDate(reservation.date)}</p>
              <p><strong>Ora:</strong> {reservation.hour}:00</p>
              <p><strong>Capacitate Masa:</strong> {reservation.capacity} persoane</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
