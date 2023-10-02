import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import Register from "./Pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLayoutEffect } from "react";
import axios from "axios";

const App = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    axios
      .get("/api/user/authenticate")
      .then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch({
          type: "LOGIN",
          payload: res.data.user,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            Object.keys(user).length !== 0 ? (
              <Main />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            Object.keys(user).length === 0 ? <Login /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/signup"
          element={
            Object.keys(user).length === 0 ? (
              <Register />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
