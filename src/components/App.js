import React, { useEffect } from "react";
import { loadContract } from "../store/slices/contractSlice";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import DashBoard from "./DashBoard";
import "../styles/App.css";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(loadContract());
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
};

export default App;
