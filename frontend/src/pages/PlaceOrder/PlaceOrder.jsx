import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } = useContext(StoreContext);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault()
        let orderItems = [];
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        }))
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 5,
        }
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        }
        else {
            toast.success("Comanda plasată cu succes");
            setCartItems({});
            navigate('/');
        }
    }
    

    useEffect(() => {
        if (!token) {
            toast.error("pentru a comanda este necesară autentificarea")
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Detaliile comenzii</p>
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='Nume' required />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Prenume' required />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email' required />
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Stradă' required />
                <div className="multi-field">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='Oraș' required />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='Județ' required />
                </div>
                <div className="multi-field">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Cod poștal' required />
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Țară' required />
                </div>
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Număr de telefon' required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Detalii plată</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>{getTotalCartAmount()} RON </p></div>
                        <hr />
                        <div className="cart-total-details"><p>Taxa de livrare</p><p>{getTotalCartAmount() === 0 ? 0 : 5} RON </p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5} RON </b></div>
                    </div>
                </div>
                <button className='place-order-submit' type='submit'>Plasați comanda</button>
            </div>
        </form>
    )
}

export default PlaceOrder