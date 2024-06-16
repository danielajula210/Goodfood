import React, { useContext, useState } from 'react';
import './ReserveTable.css';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext';

const BASE_URL = 'http://localhost:4000';

const ReserveTable = () => {
    const { token,user } = useContext(StoreContext);
    const [showForm, setShowForm] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [reservationData, setReservationData] = useState({
        email: '',
        capacity: 0, // Default capacity is set to 0
        date: '',
        hour: ''
    });

    const handleImageClick = (capacity) => {
        if (!token) {
            toast.error("Pentru a face o rezervare este necesară autentificarea");
            // Redirect the user to the login page if not authenticated
            // Example: navigate('/login');
            return;
        }
        if (selectedTable !== capacity) {
            setSelectedTable(capacity);
            console.log(user.email);
        setReservationData(prevState => ({
            ...prevState,
            email: user.email,
            capacity: capacity // Set the capacity based on the clicked table
        }));
        setShowForm(true);

        }
        else {
            setShowForm(!showForm);
        }
        
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservationData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Reservation data:', reservationData);
        if(reservationData.hour < 10 || reservationData.hour > 23){
            toast.error("Ora introdusa nu este valida, te rugam introdu o ora din intervalul 10-23")
            return;
        }
        if(new Date(reservationData.date) < new Date()){
            toast.error("Data introdusa nu este valida");
            return;
        }
        
        try {
            const response = await fetch(`${BASE_URL}/api/reserve/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservationData)
            });
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                console.log(data); // Log the response from the server
                toast.success("Rezervare plasată cu succes");
            } else {
                throw new Error('Failed to add reservation');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("A apărut o eroare. Rezervarea nu a putut fi plasată.");
        }
        
        setShowForm(false);
        setSelectedTable(null);
        setReservationData({
            email: user.email,
            capacity: 0,
            date: '',
            hour: ''
        });
    };
    
    return (
        <div className='reserve-table' id='reserve-table'>
            <p> Rezervare mese</p>
            <div className="tables">
                <div className={`table ${selectedTable === 1 ? 'selected' : ''}`} onClick={() => handleImageClick(1)}>
                    <img src={assets.table} alt="" />
                    <p>O persoană</p>
                </div>
                
                <div className={`table ${selectedTable === 2 ? 'selected' : ''}`} onClick={() => handleImageClick(2)}>
                    <img src={assets.table} alt="" />
                    <p>Două persoane</p>
                </div>
                <div className={`table ${selectedTable === 4 ? 'selected' : ''}`} onClick={() => handleImageClick(4)}>
                    <img src={assets.table} alt="" />
                    <p>Patru Persoane</p>
                </div>
                
                <div className={`table ${selectedTable === 8 ? 'selected' : ''}`} onClick={() => handleImageClick(8)}>
                    <img src={assets.table} alt="" />
                    <p>Opt Persoane</p>
                </div>
            </div>
            {showForm && (
                <form className="reservation-form" onSubmit={handleSubmit}>
                    <input
                        type="date"
                        name="date"
                        placeholder="Date"
                        value={reservationData.date}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="hour"
                        placeholder="Ora"
                        value={reservationData.hour}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            )}      
        </div>
    );
};

export default ReserveTable;