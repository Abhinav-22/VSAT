import React from "react";
import logo from "./img/transparent.svg";
import security from "./img/security.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "./config/supabaseClient";

function Mainpage() {
  useEffect(() => {
    const logout = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
      }
    };

    logout();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-0 h-screen w-full min-h-screen ">
        <div className="form-pane bg-secondbg">
          <nav className="relative w-full flex flex-wrap items-center justify-between m-0">
            <div className="container-fluid w-full flex flex-wrap items-center justify-between">
              <Link to="/">
                <div className="container-fluid">
                  <img src={logo} style={{ height: "60px", alt: "abc" }} />
                </div>
              </Link>
            </div>
          </nav>
          <div className="flex flex-col justify-center ml-10 mt-32   mx-auto my-24">
            <h2 className="ml-7 text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white mx-auto my-auto ">
              Vulnerability <br />
              Scanning and <br />
              Assessment Tool
              <br />
            </h2>
            <p className="ml-7 mt-2  py-2 text-blue-600 font-semibold mb-4">
              Securing you in the digital space against threats
            </p>
            <p className="ml-7  text-gray-500 text-lg">
              Ensuring security for everyone by securing their digital assets
              <br /> and thus making everyone safe in the digital world
            </p>
            <br />
            <div
              id="main"
              className="ml-7 mt-5 grid grid-cols-2 gap-1 justify-between w-80"
            >
              <Link to="/individual">
                <button className="flex bg-blue-500 justify-center items-center hover:bg-blue-700 text-white font-bold text-left py-1 px-2 rounded h-12 w-40 mr-14">
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
                <button className="flex ml-5 justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold text-left py-1 px-2 rounded h-12 w-40 mr-14">
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
            <Link to="https://vsatsec.gitbook.io/" target="_blank">
                <button className="flex ml-5 mt-3 justify-center items-center rounded-lg bg-fieldbg  hover:bg-hoverbl  text-gray-300 font-medium text-left py-1 px-2  h-12  w-3/6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-journal-code my-auto"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"
                    />
                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                  </svg>
                  <span className="my-auto ttspan ml-3 flex justify-center">
                    VSAT Documentation
                  </span>
                </button>
              </Link>
          </div>
        </div>
        <div className="img-pane bg-secondbg w-full h-full  ">
          <img
            className="w-full h-full mx-auto  my-auto  flex flex-col items-center justify-center drop-shadow-xl opacity-80"
            src={security}
            alt="security"
          />
        </div>
      </div>
    </>
  );
}
export default Mainpage;
