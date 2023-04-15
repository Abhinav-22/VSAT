import React from "react";
import logo from "./img/transparent.svg";
import { Link } from "react-router-dom";

const ConfirmResubmission = () => {
  return (
    <>
      <div className="grid  h-screen">
        <div className="form-pane bg-gray-900">
          <nav className="relative w-full flex flex-wrap items-center justify-between m-0">
            <div className="container-fluid w-full flex flex-wrap items-center justify-between">
              <div className="container-fluid">
                <Link to="/" className="flex items-center pl-2.5 mb-5">
                  <img
                    src={logo}
                    style={{ height: "90px", alt: "abc", loading: "lazy" }}
                    alt="VSAT Logo"
                  />
                </Link>
              </div>
            </div>
          </nav>
          <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <p className="mb-4 text-3xl tracking-tight font-light text-gray-900 md:text-4xl dark:text-white">
                  That's a
                </p>
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold  lg:text-9xl text-primary-600 dark:text-primary-500 text-blue-800 ">
                  404
                </h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                  Something's missing😔
                </p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                  Sorry, we can't find that page. You'll find lots to explore on
                  the home page.{" "}
                </p>
                <Link
                  to="/"
                  className="inline-flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
                >
                  Back to Homepage
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ConfirmResubmission;
