/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
   const [cartItems, setCartItems] = useState({});
   const [token, setToken] = useState("");
   const [food_list, setFoodList] = useState([]);
   const apiUrl = "http://localhost:4000";

   const addToCart = async (itemId) => {
      setCartItems((prev) => ({
         ...prev,
         [itemId]: (prev[itemId] || 0) + 1,
      }));
      if (token) {
         await axios.post(apiUrl + "/api/cart/add", { itemId }, { headers: { token } });
      }
   };

   const removeFromCart = async (itemId) => {
      setCartItems((prev) => {
         if (prev[itemId] <= 1) {
            const updatedCart = { ...prev };
            delete updatedCart[itemId];
            return updatedCart;
         }
         return { ...prev, [itemId]: prev[itemId] - 1 };
      });
      if (token) {
         await axios.post(apiUrl + "/api/cart/remove", { itemId }, { headers: { token } });
      }
   };

   const clearCart = () => {
      setCartItems({});
   };

   const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const item in cartItems) {
         if (cartItems[item] > 0) {
            const itemInfo = food_list.find((product) => product._id === item);
            if (itemInfo) {
               totalAmount += itemInfo.price * cartItems[item];
            }
         }
      }
      return totalAmount;
   };

   const fetchFoodList = async () => {
      const response = await axios.get(apiUrl + "/api/food/list");
      setFoodList(response.data.data);
   };

   const loadCartData = async (token) => {
      const response = await axios.post(apiUrl + "/api/cart/get", {}, { headers: { token } });
      setCartItems(response.data.cartData);
   };

   useEffect(() => {
      async function loadData() {
         await fetchFoodList();
         if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
         }
      }
      loadData();
   }, []);

   const contextValue = {
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getTotalCartAmount,
      apiUrl, // pass apiUrl if needed
      token,
      setToken,
   };

   return (
      <StoreContext.Provider value={contextValue}>
         {props.children}
      </StoreContext.Provider>
   );
};

export default StoreContextProvider;
