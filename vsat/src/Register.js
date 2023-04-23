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
  const [domain, setDomain] = useState([]);
  const [flag, setFlag] = useState(0);
  const [validflag, setValidFlag] = useState(0);
  const [host, setHost] = useState("");

  const validateHost = async () => {
    let regex = /www\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+/;
    let result = website.match(regex)[0];
    console.log(result);
    setHost(result);
  };

  const addTable = async (e) => {
    var currentTime = new Date().toLocaleString();
    const { data, error } = await supabase.from("users").insert([
      {
        email,
        firstName,
        lastName,
        company,
        phone,
        website: host,
        password,
        currentTime,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    } else {
      alert("inserted successfully");
    }
    //console.log(data);
  };

  const fetchh = async (e) => {
    domain.map((user) => {
      if (user.website == website || user.email == email) {
        setFlag(1); // alert("website already exist");
        console.log(flag);
      }
    });
    console.log(flag);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFlag(0);
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
        setDomain("hi");
        console.log(error);
      }
      if (data) {
        console.log(data);
        setDomain(data);
      }
      validateHost();
      console.log(host);
      fetchh();
      console.log(flag);
      if (flag == 0) {
        addTable();
      } else if (flag == 1) {
        alert("already exist");
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-0 h-auto w-auto min-h-screen">
        <div className="form-pane bg-gray-900 ">
          <nav className="relative w-full flex flex-wrap items-center justify-between m-0">
            <div className="container-fluid w-full flex flex-wrap items-center justify-between">
              <div className="container-fluid">
                <Link to="/">
                  {" "}
                  <img
                    src={logo}
                    alt="logo"
                    style={{ height: "60px", alt: "abc", loading: "lazy" }}
                  />
                </Link>
              </div>
            </div>
          </nav>
          <div className="flex justify-center mx-auto  w-full max-w-max p-4  border  rounded-lg shadow-md sm:p-6 md:p-8 bg-gray-800 border-gray-700 ">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <h5 className="text-xl font-medium text-white">
                  Register to our platform
                </h5>
                <br />

                <div>
                  <label
                    for="first_name"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className=" border  text-sm rounded-lg f  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    for="last_name"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    for="company"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className=" border  text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Google"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    for="phone"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className=" border  text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123-45-678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    for="website"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Website URL
                  </label>
                  <input
                    pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
                    id="website"
                    className="border  text-sm rounded-lg f block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="google.com"
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
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className=" border  text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john.doe@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="•••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="confirm_password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  className=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
                  className="ml-2 text-sm font-medium text-gray-300"
                >
                  {" "}
                  Already have an account?
                  <Link to="/login" className=" hover:underline text-blue-500">
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
                Register
              </button>
            </form>
          </div>
        </div>
        <div className="img-pane bg-gray-800 w-full h-full shadow shadow-slate-500 ">
          <img
            className="w-7/12 h-7/12 mx-auto my-auto drop-shadow-md flex flex-col items-center justify-center bg-opacity-25"
            src={register}
            alt="security"
          />
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
            <figure className="max-w-screen-md mx-auto">
              <svg
                className="h-12 mx-auto mb-3 text-gray-600"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote>
                <p className="text-xl font-light text-white">
                  "Phishing is a major problem because there really is no patch
                  for human stupidity."
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <div className="flex items-center divide-x-2 divide-gray-700">
                  <div className="pr-3 font-medium text-white">
                    Mike Danseglio
                  </div>
                  <div className="pl-3 text-sm font-light text-gray-400">
                    Director of Security and Systems Interface Technical
                    Training
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
