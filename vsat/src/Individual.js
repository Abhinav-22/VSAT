import React from "react";
import logo from "./img/transparent.svg";
import { Link } from "react-router-dom";

function Induvidual() {
  return (
    <>
      <div className="body bg-gray-900 min-h-screen">
        <nav className="relative w-full flex flex-wrap items-center justify-between m-0">
          <div className="container-fluid w-full flex flex-wrap items-center justify-between">
            <div className="container-fluid">
              <Link to="/">
                {" "}
                <img src={logo} className="h-14 mr-3 sm:h-14" alt="VSAT Logo" />
              </Link>
            </div>
          </div>
        </nav>
        <div className="container mx-auto">
          <div className="textbar">
            <h3 className="mx-auto my-auto mb-3 pt-4 ml-7 mt-3 text-4xl md:text-4xl xl:text-4xl font-semibold tracking-tight text-white flex flex-col items-center justify-center">
              Individual's Security Platform
            </h3>
          </div>
          <div className="flex search-bar w-full align-middle items-center justify-center">
            <div className="w-4/6 ">
              <form>
                <label
                  for="default-search"
                  className="mb-2 text-sm font-medium sr-only text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 pl-10 text-sm  border  rounded-lg   bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the URL to be scanned..."
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="border-2 border-slate-700 rounded-lg">
            <div className="grid grid-cols-2 gap-5">
              <div className="  rounded-lg reportinfo bg-gray-800 h-auto ">
                <p className="ml-3  py-2 text-3xl text-white font-medium mb-4">
                  Security status
                  <br />
                </p>
                <span className="ml-3 user font-normal text-sm text-gray-400">
                  Determine the websites's level of security by analyzing VSAT
                  security score
                </span>
                <hr className=" h-px my-1 w-full  border-0 bg-gray-700" />

                <h3 className="desctext text-lg font-medium text-white ml-3 mt-3">
                  Domain status:
                </h3>
                <hr className="w-4/6 h-1 mx-auto   border-0 rounded md:my-10 bg-gray-700" />

                <h3 className="desctext text-lg font-medium text-white ml-3">
                  SSL status:
                </h3>
                <hr className="w-4/6 h-1 mx-auto   border-0 rounded md:my-10 bg-gray-700" />

                <h3 className="desctext text-lg font-medium text-white ml-3">
                  Phishtank status:
                </h3>
                <hr className="w-4/6 h-1 mx-auto   border-0 rounded md:my-10 bg-gray-700" />

                <h3 className="desctext text-lg font-medium text-white ml-3">
                  Norton Safeweb status:
                </h3>

                <hr className="w-4/6 h-1 mx-auto   border-0 rounded md:my-10 bg-gray-700" />

                <h3 className="desctext text-lg font-medium text-white ml-3">
                  HSTS Header status:
                </h3>
                <hr className="w-4/6 h-1 mx-auto   border-0 rounded md:my-10 bg-gray-700" />
              </div>
              <div className=" rounded-lg scoreinfo  bg-gray-800 h-auto  ">
                <p className="ml-3  py-2 text-3xl text-white font-medium mb-4">
                  VSAT security score
                  <br />
                </p>
                <span className="ml-3 user font-normal text-sm text-gray-400">
                  Displays the security score of the website you have requested.
                </span>
                <hr className=" h-px my-1 w-full  border-0 bg-gray-700" />
                <br />
                <div className="score bg-blue-800 h-40 w-40 rounded-full mx-auto my-auto flex flex-col items-center justify-center drop-shadow-2xl shadow-lg">
                  <p className="ml-3  py-2 text-4xl font-black text-white  mb-4 flex flex-col items-center justify-center ">
                    3/10
                  </p>
                </div>
                <br />
                <p className="ml-3  py-2 text-2xl text-white font-light mb-4 flex flex-col items-center justify-center">
                  Security Index
                  <br />
                </p>
                <div className="indexcards w-96 h-auto border border-slate-600 rounded-xl mx-auto my-auto py-3 flex flex-col items-start  justify-center drop-shadow-2xl ">
                  <span className=" text-md font-medium  rounded w-2/6 h-10 bg-red-900 text-red-300  flex flex-col items-center justify-center ml-3">
                    &nbsp;RISK&nbsp;
                  </span>
                  <br />
                  <span className=" text-md font-medium w-2/6 h-10   rounded bg-yellow-300 text-yellow-900  flex flex-col items-center justify-center ml-3">
                    &nbsp;MODERATE&nbsp;
                  </span>
                  <br />
                  <span className="text-md font-medium w-2/6   h-10 rounded bg-green-900 text-green-300  flex flex-col items-center justify-center ml-3">
                    &nbsp;SAFE&nbsp;
                  </span>
                </div>{" "}
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Induvidual;
