import React, { useEffect, useState } from "react";
import "./App.css";
import Uploader from "./Uploader";
import { loadContract } from "../store/slices/contractSlice";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Mounted");
    try {
      console.log("init contract");
      dispatch(loadContract());
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
      </Routes>
    </Router>
  );
};

export default App;
