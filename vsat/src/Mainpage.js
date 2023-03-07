import React from "react";
import logo from "./img/transparent.svg";
import ind from "./img/User.svg";
import org from "./img/Organization.svg";
import security from "./img/security.svg";
import { Link } from "react-router-dom";


function Mainpage() {
  return (
    <>
      <div className=" bg-gray-900 w-full h-screen">
        <nav className="relative w-full flex flex-wrap items-center justify-between ">
          <div className="container-fluid w-full flex flex-wrap items-center justify-between">
            <div className="container-fluid">
              <img
                src={logo}
                style={{ height: "90px", alt: "abc", loading: "lazy" }}
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </nav>
        <div className="container my-24 px-6 mx-auto">
          <div className="flex justify-between lg:grid-cols-2 gap-8 xl:gap-16 items-center">
            <div className="mb-6 lg:mb-0">
              <h2 className="ml-7 text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white">
                Vulnerability <br />
                Scanning and <br />
                Assessment Tool
                <br />
              </h2>
              <p className="ml-7  py-2 text-blue-600 font-semibold mb-4">
                Securing you in the digital space against threats
              </p>
              <p className="ml-7  text-gray-500 text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                Minima officia consequatur adipisci tenetur repudiandae rerum
                quos.
              </p>
              <br />
              <div
                id="main"
                className="grid grid-cols-2 gap-1 justify-between w-80"
              >
                <Link to="/individual">
                  <button className="ml-7 bg-blue-500 hover:bg-blue-700 text-white text-left font-semibold py-1 px-2 rounded">
                    <img className="h-10 w-10" src={ind} alt="hi" />
                    <span>Individuals</span>
                  </button>
                </Link>
                <Link to="/login">
                  <button className="ml-7 bg-blue-500 hover:bg-blue-700 text-white font-semibold text-left py-1 px-2 rounded">
                    <img className="h-10 w-10" src={org} alt="hi" />{" "}
                    <span>Enterprises</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="mb-6 lg:mb-0 ">
              <img
                className="mx-0 flex justify-center w-auto max-h-96 "
                src={security}
                alt="security"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Mainpage;
