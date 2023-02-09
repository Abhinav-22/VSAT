import React from "react";
//import Individual from "./Individual";
import Mainpage from "./Mainpage.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Individual from "./Individual.js";
import Web from "./Web.js";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Mainpage />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="individual" element={<Individual />}></Route>
        <Route path="web" element={<Web />}></Route>
      </Routes>{" "}
    </>
  );
}

export default App;
