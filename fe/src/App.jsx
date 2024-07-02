import { Routes, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import About from "./components/About/About";
import NotFound from "./components/NotFound";
import Pets from "./components/Adopt/Pets";
import PetDetails from "./components/Adopt/PetDetails";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import UserDetails from "./components/Adopt/UserDetails";
import ForgotPassword from "./screens/ForgotPassword";

export default function App() {

  return (
    <>
      <Routes>
        <Route element={<HomeScreen />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/adopt" element={<Pets />} />
          <Route path="/adopt/:petId" element={<PetDetails />} />
          <Route path="/users/:userId" element={<UserDetails />} />
          <Route path="/post" element={<CreatePost />} />
          <Route path="*" element={<NotFound />} />
        </Route>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  )
}
