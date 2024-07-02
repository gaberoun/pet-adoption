import { useState } from "react";
import Context from "./Context";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );

  const state = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    BASE_URL
  };

  return (
    <Context.Provider value={state}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
