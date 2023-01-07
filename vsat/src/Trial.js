import React from "react";
function Mainpage() {
  return (
    <>
      <nav className="relative w-full flex flex-wrap items-center justify-between ">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between">
          <div className="container-fluid">
            <img
              src="/img/transparent.svg"
              style={{ height: "90px", alt: "abc", loading: "lazy" }}
              alt="logo"
            />
          </div>
        </div>
      </nav>
      <div className="container my-24 px-6 mx-auto">
        <div className="flex justify-between lg:grid-cols-2 gap-8 xl:gap-16 items-center">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight">
              Vulnerability <br />
              Scanning and <br />
              Assessment Tool
              <br />
            </h2>
            <p className="m-0 py-2 text-blue-600 font-semibold mb-4">
              Securing you in the digital space against threats
            </p>
            <p className="text-gray-500 text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
              Minima officia consequatur adipisci tenetur repudiandae rerum
              quos.
            </p>

            <br />
            <div
              id="main"
              className="grid grid-cols-2 gap-1 justify-between w-80"
            >
              <button className="bg-blue-500 hover:bg-blue-700 text-white text-left font-semibold py-1 px-2 rounded">
                <img className="h-10 w-10" src="/img/User.svg" alt="user">
                  Individuals
                </img>
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-left py-1 px-2 rounded">
                <img
                  className="h-10 w-10"
                  src="/img/Organization.svg"
                  alt="organization"
                >
                  Enterprises
                </img>
              </button>
            </div>
          </div>
          <div className="mb-6 lg:mb-0 animate-bounce animation: bounce 0.5s infinite">
            <img
              className="h-auto w-96"
              src="/src/img/security.svg"
              alt="security"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}
export default Mainpage;
