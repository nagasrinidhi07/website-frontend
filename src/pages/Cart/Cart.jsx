/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate} from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url} = useContext(StoreContext);

  const navigate = useNavigate();

  // Ensure cartItems and food_list are defined
  if (!cartItems || !food_list) return null

  // Function to format price as currency
  const formatCurrency = (amount) => {
    return `₹${amount.toFixed(2)}`;
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-header">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,) => {
          if (cartItems[item._id] > 0) {
            const { _id, image, name, price } = item;
            const quantity = cartItems[_id];
            const total = price * quantity;

            return (
              <div key={_id}>
                <div className='cart-items-header cart-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{formatCurrency(price)}</p>
                  <p>{quantity}</p>
                  <p>{formatCurrency(total)}</p>
                  <p onClick={() => removeFromCart(_id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Bill Details</h2>
          <div>
            <div className="cart-total-details">
              <p>Item Total</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()===0?0:110}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>TO PAY</b>
              <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+110}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;