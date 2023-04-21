import React from "react";
import logo from "./img/transparent.svg";
import ind from "./img/User.svg";
import org from "./img/Organization.svg";
import security from "./img/security.svg";
import { Link } from "react-router-dom";

function Mainpage() {
  return (
    <>
      <div className=" bg-gray-900 w-full h-screen min-h-screen">
        <nav className="relative w-full flex flex-wrap items-center justify-between ">
          <div className="container-fluid w-full flex flex-wrap items-center justify-between">
            <div className="container-fluid">
              <img
                src={logo}
                style={{ height: "60px", alt: "abc", loading: "lazy" }}
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
                Ensuring security for everyone by securing their digital assets
                <br /> and thus making everyone safe in the digital world
              </p>
              <br />
              <div
                id="main"
                className="ml-7 grid grid-cols-2 gap-1 justify-between w-80"
              >
                <Link to="/individual">
                  <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold text-left py-1 px-2 rounded h-10 mr-14">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-person my-auto"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                    </svg>
                    <span className="my-auto ttspan ml-3 flex justify-center">
                      Individuals
                    </span>
                  </button>
                </Link>
                <Link to="/login">
                  <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold text-left py-1 px-2 rounded h-10 mr-14">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-building my-auto"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" />
                      <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z" />
                    </svg>
                    <span className="my-auto ttspan ml-3 flex justify-center">
                      Enterprises
                    </span>
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
