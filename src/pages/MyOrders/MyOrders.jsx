import React, { useState, useEffect, useContext } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setData([]); // fallback to empty array
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((order, index) => (
            <div className="my-orders-order" key={index}>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p>
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} x {item.quantity}
                    {i !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p>₹ {order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span style={{ color: order.status === "Delivered" ? "green" : "orange" }}>
                  ●
                </span>{" "}
                <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        ) : (
          <p style={{ marginTop: "20px", color: "gray" }}>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
