// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id]
        });
      }
    });

    const totalAmount = getTotalCartAmount();
    const deliveryFee = totalAmount === 0 ? 0 : 110;

    const orderData = {
      address: data,
      items: orderItems,
      amount: totalAmount + deliveryFee,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Try again later.");
    }
  }

    const navigate = useNavigate();

    useEffect(() => {
      if (!token) {
        navigate("/cart")
      }
      else if (getTotalCartAmount() === 0) 
        {
        navigate("/cart")  
      }
    }, [token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>User data</p>
        <div className="multi-fields">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' type="email" />
        <input name="street" onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' />
        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input name='pincode' onChange={onChangeHandler} value={data.pincode} type="text" placeholder='Pin code' />
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone number' />
      </div>

      <div className="place-order-right">
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
              <p>₹{getTotalCartAmount() === 0 ? 0 : 110}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>TO PAY</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 110}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
