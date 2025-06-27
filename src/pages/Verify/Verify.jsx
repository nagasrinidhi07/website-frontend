// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (success && orderId) {
          const res = await axios.post(`${url}/api/order/verify`, {
            success,
            orderId
          });

          if (res.data.success) {
            navigate("/myorders");
          } else {
            navigate("/");
          }
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Verification failed:", err.message);
        navigate("/");
      }
    };

    verifyPayment();
  }, [success, orderId, url, navigate]);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;

