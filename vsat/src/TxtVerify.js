import React, { useEffect } from "react";
import logo from "./img/transparent.svg";
import { Link, useNavigate } from "react-router-dom";
import useTxtStore from "./stores/txtStore";
import supabase from "./config/supabaseClient";

const TxtVerify = () => {
  const txtStoreval = useTxtStore((state) => state.txtVal);
  const settxtStore = useTxtStore((state) => state.updateTxt);

  console.log(txtStoreval);

  const storeTxt = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("txt").select();
    console.log(data, "txtval");
    data.map((us) => {
      if (user.email === us.email) {
        console.log(us.txtval);
        settxtStore(us.txtval);
      }
    });
  };

  useEffect(() => {
    storeTxt();
  });

  return (
    <>
      <div className="grid  h-screen">
        <div className="form-pane bg-gray-900">
          <nav className="relative w-full flex flex-wrap items-center justify-between m-0">
            <div className="container-fluid w-full flex flex-wrap items-center justify-between">
              <div className="container-fluid">
                <Link to="/">
                  {" "}
                  <img
                    src={logo}
                    style={{ height: "90px", alt: "abc", loading: "lazy" }}
                    alt=""
                    loading="lazy"
                  />
                </Link>
              </div>
            </div>
          </nav>
          <div className="mx-auto mt-10 w-full max-w-xl p-4   rounded-lg shadow-md sm:p-6 md:p-8 bg-gray-800 :border-gray-700 ">
            <div className="items flex flex-col items-center justify-center mx-auto">
              <ol className="flex items-center justify-center mx-auto w-full mb-4 sm:mb-5 ">
                <li className="flex w-full items-center text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block after:border-blue-800">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 bg-blue-800 shrink-0">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5  lg:w-6 lg:h-6 text-blue-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </li>
                <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block after:border-gray-700">
                  <div className="flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12 bg-gray-700 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-file-earmark-text-fill w-5 h-5  lg:w-6 lg:h-6 text-blue-300"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" />
                    </svg>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12 bg-gray-700 shrink-0">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5  lg:w-6 lg:h-6 text-gray-100"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </li>
              </ol>
            </div>
            <form action="#">
              <h3 className="mb-4 text-lg font-bold leading-none text-white text-center">
                TXT record verification
              </h3>
              <br />
              <div className="grid ">
                <div>
                  <h2 className="mb-2 text-lg font-light text-center text-white">
                    Add TXT record
                  </h2>
                  <ol className="max-w-md space-y-1  list-decimal list-inside text-gray-400">
                    <li>
                      <span className="font-normaltext-white">
                        Log in to your DNS manager settings and go to DNS
                        records.
                      </span>
                    </li>
                    <li>
                      <span className="font-normal ttext-white">
                        Create a new TXT record. Leave txt name as <i>"@"</i> or
                        blank.
                      </span>
                    </li>
                    <li>
                      <span className="font-normal text-white">
                        Copy the following txt value to the txt value section.
                      </span>
                    </li>
                    <br />
                  </ol>
                  <p
                    id="default-search"
                    className="block text-center w-full p-4 pl-10 text-sm  border rounded-lg  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {txtStoreval}
                  </p>{" "}
                </div>

                <div>
                  <br />

                  <span className="font-normal  text-center flex items-center justify-center text-white">
                    Click <i>" Next Step: Verify "</i> to verify the addition
                  </span>
                </div>
                <div></div>
                <div></div>
              </div>
              <br />
              <div className="btn flex flex-col items-center justify-center">
                <button
                  type="submit"
                  className="text-white mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Next Step: Verify
                </button>
              </div>
              <br />
              <br />
              <span className=" mx-auto flex  items-center justify-center  w-max text-xs font-medium  px-2.5 py-0.5 rounded bg-gray-700 text-red-400 border border-red-400">
                <b>
                  <i>Note: </i>
                </b>{" "}
                &nbsp; You may have to wait for a while for this change to
                propagate.
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TxtVerify;
