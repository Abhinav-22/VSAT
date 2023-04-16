import React, { useState, useEffect, createElement } from "react";
import { useNavigate } from "react-router-dom";

import logo from "./img/transparent.svg";
import register from "./img/register.svg";
import { Link } from "react-router-dom";
import supabase from "./config/supabaseClient";

const Register = () => {
  console.log(supabase);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // for validation
  const [domain, setDomain] = useState(null);

  var flag = 0;
  // const fetchDomain = async () => {
  //   const { data, error } = await supabase.from("users").select();
  //   console.log("use effect working");
  //   if (error) {
  //     setDomain(null);
  //     console.log(error);
  //   }
  //   if (data) {
  //     setDomain(data);
  //     console.log(data);
  //   }
  // };

  const addTable = async (e) => {
    var currentTime = new Date().toLocaleString();
    const { data, error } = await supabase.from("users").insert([
      {
        email,
        firstName,
        lastName,
        company,
        phone,
        website,
        password,
        currentTime,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    } else {
      alert("inserted successfully");
      console.log(data);
    }
    //console.log(data);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    flag = 0;
    

    if (
      !firstName ||
      !lastName ||
      !company ||
      !phone ||
      !website ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("enter all fields");
      return;
    }

    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
      return;
    } else {
      alert("Check mail");
      const { data, error } = await supabase.from("users").select();
      if (error) {
        setDomain(null);
        console.log(error);
      }
      if (data) {
        setDomain(data);
        console.log(data);
      }
      domain.map((user) => {
        if (user.website === website || user.email === email) {
          flag = 1;
          // alert("website already exist");
          // console.log(flag);
        }
      });
      if (flag === 0) {
        addTable();
      } else if (flag === 1) {
        alert("already exist");
      }
    }

  };

  return (
    <>
      <div className="grid grid-cols-2 gap-0 h-full">
        <div className="form-pane bg-gray-900 ">
          <nav className="relative w-full flex flex-wrap items-center justify-between m-0">
            <div className="container-fluid w-full flex flex-wrap items-center justify-between">
              <div className="container-fluid">
                <Link to="/">
                  {" "}
                  <img
                    src={logo}
                    alt="logo"
                    style={{ height: "90px", alt: "abc", loading: "lazy" }}
                  />
                </Link>
              </div>
            </div>
          </nav>
          <div className="flex justify-center mx-auto mt-10 w-full max-w-max p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 ">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  Register to our platform
                </h5>
                <br />

                <div>
                  <label
                    for="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    for="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    for="company"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Flowbite"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    for="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="123-45-678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    for="website"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Website URL
                  </label>
                  <input
                    pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
                    id="website"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="flowbite.com"
                    value={website}
                    oninvalid="setCustomValidity('Please Enter URL.')"
                    onChange={(e) => setWebsite(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.doe@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="•••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="confirm_password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="•••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5"></div>
                <label
                  for="remember"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {" "}
                  Already have an account?
                  <Link
                    to="/login"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    {"    "}Sign in
                  </Link>
                  .
                </label>
              </div>
              <button
                type="submit"
                // onChange={handleSubmit}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="img-pane bg-gray-700 w-full h-full ">
          <img
            className="w-10/12 h-10/12 mx-10 mt-10 mb-10 bg-opacity-25"
            src={register}
            alt="security"
          />
          <p className="mb-3 text-lg font-medium text-gray-900 md:text-xl dark:text-white text-center ">
            {" "}
            "If it's smart, it's vulnerable"
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
