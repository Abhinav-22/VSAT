import React from "react";
//import Individual from "./Individual";
import Mainpage from "./Mainpage.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Individual from "./Individual.js";
import Network from "./Network.js";
import Web from "./Web.js";
import Data from "./Data.js";
import Dashboard from "./Dashboard.js";
import Domain from "./Domain.js";
import Api from "./Api.js";

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
        <Route path="network" element={<Network />}></Route>
        <Route path="data" element={<Data />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="domain" element={<Domain />}></Route>
        <Route path="api" element={<Api />}></Route>
      </Routes>{" "}
    </>
  );
}

export default App;
