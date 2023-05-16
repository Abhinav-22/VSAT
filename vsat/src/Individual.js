import React, { useState } from "react";
import logo from "./img/transparent.svg";
import { Link } from "react-router-dom";
import ReactStoreIndicator from 'react-score-indicator'

function Induvidual() {
  const [urlVal, setUrlVal] = useState("");
  const [validSSL, setValidSSL] = useState("Loading...");
  const scorevalue = 5;
  const sendURL = async (e) => {
    e.preventDefault();
    console.log(urlVal);
    const response = await fetch("/api/endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ string: urlVal }),
    });

    const result = await response.json();
    console.log(result);
    scanURL();
  };

  const scanURL = async () => {
    fetch("/sslexpiry")
      .then((res) => res.json())
      .then((data) => {
        setValidSSL(data.SSLExpiry);
        console.log(data);
        console.log(data.SSLExpiry);
      });
  };
  return (
    <>
      <div className="body bg-mainbg min-h-screen">
        <nav className="relative w-full flex flex-wrap items-center justify-between m-0">
          <div className="container-fluid w-full flex flex-wrap items-center justify-between">
            <div className="container-fluid">
              <Link to="/">
                {" "}
                <img
                  src={logo}
                  className="h-14 mr-3 sm:h-14 "
                  alt="VSAT Logo"
                />
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
                    onChange={(e) => setUrlVal(e.target.value)}
                    className="block w-full p-4 pl-10 text-sm    rounded-lg   bg-fieldbg  placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the URL to be scanned..."
                    required
                  />
                  <button
                    onClick={sendURL}
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          <br />
          <p className=" ml-9 mt-5  text-lg text-white font-medium ">
            Security information of the domain
            </p>
          
          <div className="scan grid grid-cols-3 gap-0 ">
          <div className="ml-9 col-span-2 w-5/6 statuscard overflow-x-auto mt-3  rounded-xl flex flex-col items-center justify-center">
    <table className="w-full text-sm text-left rounded-lg text-gray-500 dark:text-gray-400">
        <thead className=" text-xs text-gray-700 uppercase bg-fieldbg dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    Scan
                </th>
                <th scope="col" className="px-6 py-3">
                    Time
                </th>
                <th scope="col" className="px-6 py-3">
                    Result
                </th>
                <th scope="col" className="px-6 py-3">
                    VSAT Score
                </th>
               
            </tr>
        </thead>
        <tbody>
            <tr className=" border-b bg-secondbg border-txtcol ">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                       
                    </div>
                </td>
                <th scope="row" className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
                Domain status
                </th>
                <td className="px-6 py-4">
                    
                </td>
                <td className="px-6 py-4">
                <span className="bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">Domain security</span>

                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
            
            </tr>
            <tr className=" border-b bg-secondbg border-txtcol ">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                       
                    </div>
                </td>
                <th scope="row" className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
                SSL scan status
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                <span className="bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">Domain security</span>
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
              
            </tr>
            <tr className=" border-b bg-secondbg border-txtcol ">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                       
                    </div>
                </td>
                <th scope="row" className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
                Phishtank status
                </th>
                <td className="px-6 py-4">
                    Black
                </td>
                <td className="px-6 py-4">
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">Web security</span>
                </td>
                <td className="px-6 py-4">
                    $99
                </td>
                
            </tr>
            <tr className=" border-b bg-secondbg border-txtcol ">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                       
                    </div>
                </td>
                <th scope="row" className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className=""
                    width="20"
                    height="20"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill="#E0B02F"
                        d="M21.9101215,0.816194332 L22.7068826,0.816194332 L22.7068826,1.61295547 L21.9101215,1.61295547 L21.9101215,0.816194332 Z M21.9101215,1.61295547 L20.4331984,1.61295547 L20.4331984,2.4097166 L21.9101215,2.4097166 L21.9101215,1.61295547 Z M20.4331984,2.4097166 L20.4331984,3.96437247 L19.6947368,3.96437247 L19.6947368,2.4097166 L20.4331984,2.4097166 Z M20.4331984,3.96437247 L21.1910931,3.96437247 L21.1910931,4.72226721 L20.4331984,4.72226721 L20.4331984,3.96437247 Z M21.1910931,3.96437247 L21.1910931,3.21619433 L22.0267206,3.21619433 L22.0267206,3.96437247 L21.1910931,3.96437247 Z M20.4331984,4.72226721 L20.4331984,6.33522267 L19.7821862,6.33522267 L19.7821862,6.96680162 L19.0923077,6.96680162 L19.0923077,7.88987854 L18.4995951,7.88987854 L18.4995951,8.67692308 L17.7417004,8.67692308 L17.7417004,7.89959514 L16.9838057,7.89959514 L16.9740891,8.67692308 L17.7417004,8.67692308 L17.7417004,9.50283401 L16.9838057,9.50283401 L16.9935223,10.4064777 L16.3425101,10.4064777 L16.3522267,11.1643725 L15.7497976,11.1643725 L15.740081,12.0194332 C14.6042656,13.6541793 13.8165786,15.3703291 13.1068826,17.0817814 C13.0166656,17.2993424 12.9843157,17.4767392 12.8736842,17.6064777 C12.6350495,17.886327 12.2792569,17.974147 11.9894737,17.9659919 C11.4470717,17.9507255 10.9697158,17.6983044 10.7165992,17.1109312 C9.86728944,15.1400551 9.44710048,13.7603465 7.11174089,11.1740891 C6.73552723,10.7574572 6.82323501,10.2253563 7.12145749,10.0566802 C7.40843204,9.89436507 7.80877956,10.0107768 8.2582996,10.2607287 C9.51609859,10.9601153 10.2158747,11.6755026 11.7076923,13.6615385 C12.2511882,12.3496564 13.19015,10.5765708 14.3603239,8.65748988 L14.9044534,8.65748988 L14.9044534,7.89959514 L15.4194332,7.89959514 L15.4194332,7.151417 L16.1773279,7.151417 L16.1773279,5.9562753 L16.9935223,5.9562753 L16.9838057,6.71417004 L17.7417004,6.71417004 L17.7417004,5.9562753 L16.9935223,5.9562753 L16.9935223,5.27611336 L17.6736842,5.27611336 L17.6736842,4.72226721 L18.9271255,4.72226721 L18.9271255,5.49959514 L19.6947368,5.49959514 L19.6947368,4.72226721 L20.4331984,4.72226721 Z M18.9271255,4.72226721 L18.9271255,3.96437247 L19.6947368,3.96437247 L19.6947368,4.72226721 L18.9271255,4.72226721 Z M18.9271255,3.96437247 L18.1595142,3.96437247 L18.1595142,3.23562753 L18.9271255,3.23562753 L18.9271255,3.96437247 Z M20.4331999,2.41353172 L21.1897089,2.41353172 L21.1897089,3.21168583 L20.4331999,3.21168583 L20.4331999,2.41353172 Z M22.7027248,1.61537762 L23.5216979,1.61537762 L23.5216979,2.41353172 L22.7027248,2.41353172 L22.7027248,1.61537762 Z M16.5465587,4.54360314 L16.5465587,5.28582996 L15.6137652,5.28582996 L15.6137652,6.52955466 L14.6809717,6.52955466 L14.6809717,7.26441847 C13.6908876,6.74537522 12.5637461,6.45182186 11.3676113,6.45182186 C7.42126355,6.45182186 4.21619433,9.64716515 4.21619433,13.5935223 C4.21619433,17.5398576 7.42126355,20.7352227 11.3676113,20.7352227 C15.3139591,20.7352227 18.5093117,17.5398576 18.5093117,13.5935223 C18.5093117,12.3895534 18.2119011,11.2554858 17.6864896,10.2607287 L18.4121457,10.2607287 L18.4121457,9.32793522 L19.0340081,9.32793522 L19.0340081,8.3951417 L19.6558704,8.3951417 L19.6558704,7.61781377 L19.9265337,7.61781377 C21.1151026,9.30906076 21.8129555,11.3700091 21.8129555,13.5935223 C21.8129555,19.3395646 17.1525368,24 11.4064777,24 C5.66041864,24 1,19.3395646 1,13.5935223 C1,7.84746131 5.66041864,3.18704453 11.4064777,3.18704453 C13.2757551,3.18704453 15.0301395,3.68025475 16.5465587,4.54360314 L16.5465587,4.54360314 Z M22.7027248,0 L23.5216979,0 L23.5216979,0.817223514 L22.7027248,0.817223514 L22.7027248,0 Z"
                      ></path>{" "}
                    </g>
                  </svg>
                  Norton Safeweb&#8482; status
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">Web security</span>

                </td>
                <td className="px-6 py-4">
                    $179
                </td>
                
            </tr>
            <tr className=" border-b bg-secondbg border-txtcol ">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        
                    </div>
                </td>
                <th scope="row" className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
                HSTS Header status
                </th>
                <td className="px-6 py-4">
                    Gold
                </td>
                <td className="px-6 py-4">
                <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">Data security</span>

                </td>
                <td className="px-6 py-4">
                    $699
                </td>
               
            </tr>
            <tr className="bg-secondbg ">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                 
                    </div>
                </td>
                <th scope="row" className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
                    Privacy policy status
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Network security</span>
                </td>
                <td className="px-6 py-4">
                    $3999
                </td>
                
            </tr>
        </tbody>
    </table>
</div>

<div className=" col-span-1    h-94 rounded-xl bg-secondbg mr-5 ">
<p className="ml-3 mt-3  text-lg text-white  font-normal ">
            VSAT Score
            </p>
            <div className="flex flex-col align-middle justify-center items-center mx-auto my-auto">
            <ReactStoreIndicator
        value={4}
        maxValue={10}
      />
            </div>
            <p className="  text-lg text-white text-center  font-normal ">
            Safety score index
            </p>
            <div className=" mb-2 h-auto mt-3 w-80 mx-auto my-auto flex flex-col justify-center border-2 border-txtcol rounded-xl " >
            <span className="ml-3 mx-auto my-auto text-center bg-red-600 w-47 h-11 text-white text-sm font-semibold mr-2 px-2.5 py-0.5 rounded mt-2 ">Phishing website: <span className="mx-auto my-auto ml-5 border-l border-2 border-white font-bold text-gray-200">Score : 0</span> </span>
            <span className="ml-3 mx-auto my-auto text-center bg-yellow-600 w-47 h-11 text-white text-sm font-semibold mr-2 px-5 py-0.5 rounded mt-2  ">Less secure: <span className="mx-auto my-auto ml-5 border-l border-2 border-white font-bold text-gray-200 ">Score : 1-3</span></span><br></br>
            <span className="ml-3 mx-auto my-auto text-center align-middle justify-center bg-green-600 w-47 h-11 text-white text-sm font-semibold mr-2 px-2.5 py-0.5  rounded mt-2 mb-2 ">Secure:<span className="mx-auto my-auto ml-5 border-l border-2 border-gray-200 font-bold text-white ">Score : 4-10</span></span>
            </div>
  </div>
  </div>
  </div>
  </div>

    </>
  );
}

export default Induvidual;
