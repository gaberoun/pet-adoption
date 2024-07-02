import { useContext, useState } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLogin = () => {
  const { setIsLoggedIn, setUser, BASE_URL } = useContext(Context);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e, userCredentials) => {
    try {
      e.preventDefault();

      const {
        data: { data },
      } = await axios.post(`${BASE_URL}/users/login`, {
        email: userCredentials.email,
        password: userCredentials.password,
      });

      localStorage.setItem("user", JSON.stringify(data));
      setIsLoggedIn(true);
      setUser(data);
      navigate("/");
      
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return [error, handleLogin];
};

export default useLogin;
