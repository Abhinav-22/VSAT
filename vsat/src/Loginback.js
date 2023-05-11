import React, { useState } from "react";
import logo from "./img/transparent.svg";
import { Link, useNavigate } from "react-router-dom";
import supabase from "./config/supabaseClient";
import Lottie from 'react-lottie';
import  animationData from './popper.json'
const Forgotem = () => {
  const [email, setEmail] = useState("");

  const getpw = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }

    console.log("entered get pw", email);
   
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div>
      <div className="grid  h-screen">
        <div className="form-pane bg-mainbg">
          <nav className="relative w-full flex flex-wrap items-center justify-between m-0">
            <div className="container-fluid w-full flex flex-wrap items-center justify-between">
              <div className="container-fluid">
                <Link to="/">
                  {" "}
                  <img
                    src={logo}
                    className="h-14 mr-3 sm:h-14"
                    alt="VSAT Logo"
                  />
                </Link>
              </div>
            </div>
          </nav>
          <div className="mx-auto mt-32 w-full max-w-xl p-4 rounded-lg shadow-md sm:p-6 md:p-8 bg-secondbg  border-gray-700 ">
            <form className="space-y-6">
            <Lottie 
	    options={defaultOptions}
        height={150}
        width={150}
      />
              <p className="text-xl font-semibold flex flex-col justify-center align-middle items-center text-white">
                Welcome to VSAT!
              </p>
              <div>
              <p className="  text-gray-400 text-md text-center flex flex-col justify-center items-center align-middle">
              Congratulations! You have successfully completed our onboarding process and are now ready to access the dashboard and explore all the features our application has to offer. Welcome aboard!
            </p>
              </div>
              <Link to="/login">
              <button
                type="submit"
                className="mt-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Continue to VSAT
              </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotem;
