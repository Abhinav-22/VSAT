import React, { useState } from "react";
import logo from "./img/transparent.svg";
import { Link, useNavigate } from "react-router-dom";
import supabase from "./config/supabaseClient";

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
          <div className="mx-auto mt-32 w-auto max-w-xl p-4 rounded-lg shadow-md sm:p-6 md:p-8 bg-secondbg  border-gray-700 drop-shadow-xl ">
            <form className="space-y-6">
             
              <div class="align-middle items-center flex flex-col justify-center">
              <svg xmlns="http://www.w3.org/2000/svg"  width="60" height="60" fill="currentColor" class="flex flex-colbi bi-envelope-check items-center align-middle justify-center text-blue-500 shadow-xl drop-shadow-xl" viewBox="0 0 16 16">
  
             
  <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"/>
  <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
</svg>
              </div>
              <h5 className="text-xl flex flex-col justify-center font-light text-white items-center align-middle">
                Welcome to VSAT. You are almost there 
              </h5>
              <p className="  text-gray-400 text-md text-center flex flex-col justify-center items-center align-middle">
              Thank you for signing up! We need to verify your email address to activate your account and start using our services.

            </p>
            <hr class="h-px my-8  border-0 bg-gray-700">
</hr>
<p className="  text-gray-500 text-sm text-center flex flex-col justify-center items-center align-middle">
Please check your email inbox for a confirmation message from us. If you don't see it in your inbox, please check your spam folder as well. 


            </p>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotem;
