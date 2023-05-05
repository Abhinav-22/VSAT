import React, { useEffect } from "react";
import { useState } from "react";
import logo from "./img/transparent.svg";
import supabase from "./config/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

const Forgotpw = () => {
  const [useremail, setUseremail] = useState(null);
  const [pw, setPw] = useState("");
  const [conpw, setConfPw] = useState("");

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        console.log("kerii", pw);
        const newPassword = prompt(
          "What would you like your new password to be?"
        );
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (data) alert("Password updated successfully!");
        if (error) alert("There was an error updating your password.");
      }
    });
  }, []);

  return (
    <div>
      <section className="bg-mainbg">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="/">
                  {" "}
                  <img
                    src={logo}
                    style={{ height: "60px", alt: "abc" }}
                    alt=""
                    loading="lazy"
                  />
                </Link>
          <div className="w-full p-6  rounded-lg shadow  md:mt-0 sm:max-w-md bg-secondbg  sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Change Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-fieldbg placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                  value={useremail}
                  onChange={(e) => setUseremail(e.target.value)}
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  className=" sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-fieldbg  placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  for="confirm-password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  onChange={(e) => setConfPw(e.target.value)}
                  value={conpw}
                  className=" sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-fieldbg  text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                // onClick={resetpw}
                className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 hover:bg-blue-700 focus:ring-blue-800"
              >
                Reset password
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forgotpw;
