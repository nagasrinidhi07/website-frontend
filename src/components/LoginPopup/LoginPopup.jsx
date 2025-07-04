import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    const endpoint = currState === "Login" ? "/user/login" : "/user/register";

    try {
      const response = await axios.post(`${backendURL}/api${endpoint}`, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Login/Register failed");
      console.error(error);
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
        </div>
        <div className="login-popup-inputs">
          {currState !== "Login" && (
            <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='name' required />
          )}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='password' required />
        </div>
        <button type='submit'>{currState === "Sign up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the Terms of Use and Privacy Policy</p>
        </div>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>}
      </form>
    </div>
  );
};

export default LoginPopup;
