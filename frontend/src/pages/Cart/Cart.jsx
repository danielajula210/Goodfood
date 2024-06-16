import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItems, food_list, removeFromCart,getTotalCartAmount,url} = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Produse</p> <p>Titlu</p> <p>Preț</p> <p>Cantitate</p> <p>Total</p> <p>Șterge</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id]>0) {
            return (<div key={index}>
              <div className="cart-items-title cart-items-item">
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.price} RON</p>
                <div>{cartItems[item._id]}</div>
                <p>{item.price*cartItems[item._id]} RON</p>
                <p className='cart-items-remove-icon' onClick={()=>removeFromCart(item._id)}>x</p>
              </div>
              <hr />
            </div>)
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Coș de cumpărături</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>{getTotalCartAmount()} RON</p></div>
            <hr />
            <div className="cart-total-details"><p>Taxa de livrare</p><p>{getTotalCartAmount()===0?0:5} RON</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>{getTotalCartAmount()===0?0:getTotalCartAmount()+5} RON</b></div>
          </div>
          <button onClick={()=>navigate('/order')}>Finalizați cumpărăturile</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
