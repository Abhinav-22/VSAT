import React, { useState } from "react";
import logo from "./img/transparent.svg";
import { Link, useNavigate } from "react-router-dom";
import supabase from "./config/supabaseClient";

const Forgotem =  () => {
  const [email, setEmail] = useState("");

  const getpw = async () => {
    const { data, error } = await supabase.auth
      .resetPasswordForEmail(email)
    
    console.log("entered get pw",email)
  };
 
 

  return (
    <div>
      <div className="grid  h-screen">
        <div className="form-pane bg-gray-900">
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
          <div className="mx-auto mt-32 w-full max-w-md p-4 rounded-lg shadow-md sm:p-6 md:p-8 bg-gray-800 border-gray-700 ">
            <form className="space-y-6" action="#">
              <h5 className="text-xl font-medium text-white">
                Recover your VSAT account
              </h5>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Enter your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                onClick={getpw}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Recover account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotem;
