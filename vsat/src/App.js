import React from "react";
//import Individual from "./Individual";
import Mainpage from "./Mainpage.js";
import Login from "./Login.js";
import Lottie from 'react-lottie';
import  animationData from './popper.json'
import Register from "./Register.js";
import Individual from "./Individual.js";
import Network from "./Network.js";
import Web from "./Web.js";
import Data from "./Data.js";
import Dashboard from "./Dashboard.js";
import Domain from "./Domain.js";
import Api from "./Api.js";
import Forgotpw from "./Forgotpw.js";
import { Route, Routes } from "react-router-dom";
import ConfirmResubmission from "./ConfirmResubmission.js";
import TxtVerify from "./TxtVerify.js";
import Forgotem from "./Forgotem.js";
import Pdfgen from "./Pdfgen.js";
import Email from "./Email.js";
import Loginback from "./Loginback.js";
import SurveyComponent from "./SurveyComponent.jsx";

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
        <Route path="txt" element={<TxtVerify />}></Route>
        <Route path="resetpw" element={<Forgotpw />}></Route>
        <Route path="resetem" element={<Forgotem />}></Route>
        <Route path="pdfgen" element={<Pdfgen />}></Route>
        <Route path="email" element={<Email />}></Route>
        <Route path="survey" element={<SurveyComponent />}></Route>
        <Route path="loginback" element={<Loginback />}></Route>

        <Route
          path="confirmresubmission"
          element={<ConfirmResubmission />}
        ></Route>
      </Routes>{" "}
    </>
  );
}

export default App;
