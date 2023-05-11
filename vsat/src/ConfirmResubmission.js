import React from "react";
import logo from "./img/transparent.svg";
import notfound from "./img/404.svg";
import { Link } from "react-router-dom";

const ConfirmResubmission = () => {
  return (
    <>
      <div className="grid  h-screen">
        <div className="form-pane bg-secondbg">
          <nav className="relative w-full flex flex-wrap items-center justify-between m-0">
            <div className="container-fluid w-full flex flex-wrap items-center justify-between">
              <div className="container-fluid">
                <Link to="/" className="flex items-center pl-2.5 mb-5">
                  <img
                    src={logo}
                    style={{ height: "60px", alt: "abc", loading: "lazy" }}
                    alt="VSAT Logo"
                  />
                </Link>
              </div>
            </div>
          </nav>
          <section className="bg-secondbg">
            <div className=" mx-auto max-w-screen-xl  ">
              <div className="mx-auto max-w-screen-sm text-center">
              <img
            className="w-full h-full   mx-auto  my-auto  flex flex-col items-center justify-center drop-shadow-xl opacity-80"
            src={notfound}
            alt="page not found"
          />
            <p className="mb-4 text-3xl tracking-tight font-bold  md:text-4xl text-white">Something's missing.</p>
                      <p className="mb-4 text-lg font-light text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
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
