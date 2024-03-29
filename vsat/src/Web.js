import React, { useState, useEffect } from "react";
import logo from "./img/transparent.svg";
import { Link, useNavigate } from "react-router-dom";
import supabase from "./config/supabaseClient";
import UrlRedirection from "./UrlRedirection";
import useGlanceStore from "./stores/glanceStore";
import useDomainStore from "./stores/storeDomain";
import Webserver from "./Webserver";
import Webtech from "./Webtech";
import Cverecord from "./Cverecord";
import { Tooltip, Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const Web = () => {
  const navigate = useNavigate();

  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authCompany, setAuthCompany] = useState("");
  const [load, setLoad] = useState([{}]);
  const [httpSec, setHttpSec] = useState("");
  const [url, setUrl] = useState([]);
  const [phish, setPhish] = useState("Loading...");
  const [xssflag, setXssflag] = useState("nil");
  const [xxeflag, setXxeflag] = useState("nil");
  const [sqliinfo, setSqliinfo] = useState("nil");
  const domainStoredval = useDomainStore((state) => state.domainval);

  const setHSTSstatus = useGlanceStore((state) => state.updateHSTSstatus);
  const setPhishstatus = useGlanceStore((state) => state.updatePhishstatus);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    // console.log("workingggg");

    const fetchDetails = async () => {
      // await delay(1000);

      const { data, error } = await supabase.from("users").select();
      if (error) {
        // setDomain(null);
        console.log(error);
      }
      if (data) {
        try {
          // setDomain(data);
          // console.log(domain);
          const {
            data: { user },
          } = await supabase.auth.getUser();
          console.log(user.aud);

          if (user.aud != "authenticated") {
            navigate("/confirmresubmission");
          } else {
            data.map((us) => {
              // console.log(us.firstName);
              if (us.email === user.email) {
                setAuthName(us.firstName);
                setAuthCompany(us.company);
                setAuthEmail(us.email);
                // console.log(us.firstName);
              }
            });
          }
        } catch (e) {
          if (e.name == "TypeError") navigate("/confirmresubmission");
        }
      }
    };
    fetchDetails();
  }, []);

  const scanphish = async () => {
    return new Promise((resolve, reject) => {
      fetch("/phishtank")
        .then((res) => res.json())
        .then((data) => {
          if (data.Sitedetails === "Is a phish") {
            console.log("keriii");
            setPhishstatus("        NOT SECURE !!!");
            resolve("Not Secure");
          } else {
            setPhishstatus("         SECURE!!");
            resolve("Secure");
          }
          setPhish(data.Sitedetails);
          console.log(data);
        })
        .catch((error) => reject(error));
    });
  };

  const supaphish = async (phii) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(phii);
    const { data, error } = await supabase
      .from("glance")
      .upsert({
        id: user.id,
        phishtime: new Date().toLocaleString(),
        phishres: phii,
      })
      .select();
    if (error) {
      console.log(error);
    }
  };

  const scanhttp = async () => {
    try {
      const response = await fetch("/httpsecheader");
      const data = await response.json();
      setHttpSec(data);
      console.log(data);
      console.log(data.xssProtect);
      console.log(data.xcontentoptions);
      console.log(data.frameOptions);
      console.log(data.strictTransportSecurity);
      console.log(data.ContentSecurityPolicy);
      console.log(data.SecureCookie);
      console.log(data.HttpOnlyCookie);
      if (
        data.https === "Not Present" ||
        data.xssProtect === "Not Present" ||
        data.xcontentoptions === "Not Present" ||
        data.frameOptions === "Not Present" ||
        data.strictTransportSecurity === "Not Present" ||
        data.ContentSecurityPolicy === "Not Present" ||
        data.SecureCookie === "Not Present" ||
        data.HttpOnlyCookie === "Not Present"
      ) {
        setHSTSstatus("          NOT SECURE!!");
        // setHttpSec("NOT SECURE!");
        return "Not Secure";
      } else {
        setHSTSstatus("          SECURE");
        // setHttpSec("SECURE");
        return "Secure";
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const supahttp = async (httpstat) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(httpstat);
      const { data, error } = await supabase
        .from("glance")
        .upsert({
          id: user.id,
          httptime: new Date().toLocaleString(),
          httpres: httpstat,
        })
        .select();
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const webScan = async () => {
    setIsButtonClicked(true);

    try {
      const phii = await scanphish();
      await supaphish(phii);
    } catch (error) {
      console.error(error);
    }

    try {
      const httpstat = await scanhttp();
      await supahttp(httpstat);
    } catch (error) {
      console.error(error);
    }
    fetch("/webpagespeed")
      .then((res) => res.json())
      .then((data) => {
        setLoad(data);
      });
    fetch("/urlredirection")
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.LinkCount);
        console.log(data);
      });

    const xss = async () => {
      fetch("/xssbasic")
        .then((res) => res.json())
        .then((data) => {
          if (data.flag == 0) {
            setXssflag("XSS Not Detected");
            console.log(xssflag);
          } else if (data.flag == 1) {
            setXssflag("XSS Detected");
            console.log(data.flag);
          }
        });
    };
    xss();

    const sqlinjection = async () => {
      fetch("/sqlinjection")
        .then((res) => res.json())
        .then((data) => {
          setSqliinfo(data.SQLIStatus);
          // console.log(data);
        });
    };
    sqlinjection();

    const xxe = async () => {
      fetch("/xxelookup")
        .then((res) => res.json())
        .then((data) => {
          setXxeflag(data.XXEStatus);
          // console.log(data);
        });
    };
    xxe();
  };
  const logout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("logout failed");
    } else {
      console.log("logged out successfully");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="grid grid-cols-6 gap-0 h-full">
        <div className="sidebar">
          <aside className="h-screen sticky top-0" aria-label="Sidebar">
            <div className="sticky h-full px-3 py-4 overflow-y-auto bg-secondbg  ">
              <Link to="/" className="flex items-center pl-2.5 mb-5">
                <img src={logo} className="h-14 mr-3 sm:h-14" alt="VSAT Logo" />
              </Link>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white bi bi-pie-chart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.5 1.018a7 7 0 0 0-4.79 11.566L7.5 7.793V1.018zm1 0V7.5h6.482A7.001 7.001 0 0 0 8.5 1.018zM14.982 8.5H8.207l-4.79 4.79A7 7 0 0 0 14.982 8.5zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                    </svg>
                    <span className="ml-3">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/web"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white bi bi-globe2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Web security
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/network"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white bi bi-hdd-network"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zM3 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8.5v3a1.5 1.5 0 0 1 1.5 1.5h5.5a.5.5 0 0 1 0 1H10A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5H.5a.5.5 0 0 1 0-1H6A1.5 1.5 0 0 1 7.5 10V7H2a2 2 0 0 1-2-2V4zm1 0v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1zm6 7.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5z" />
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Network security
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/data"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white bi bi-database"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313ZM13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 5.698ZM14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13V4Zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 8.698Zm0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525Z" />
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Data security
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/domain"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white bi bi-link"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                      <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Domain checkup
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/api"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white bi bi-diagram-3"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
                      />
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">APIs</span>
                  </Link>
                </li>
              </ul>
              <div
                id="dropdown-cta"
                className="p-4 mt-6 rounded-lg bg-fieldbg "
                role="alert drop-shadow-lg	"
              >
                <div className="flex justify-center mb-3 drop-shadow-lg	">
                  <div className="flex justify-center logo rounded-full bg-gray-800 drop-shadow-lg	 ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-buildings-fill logo text-white w-auto h-auto" viewBox="0 0 16 16">
  <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V.5ZM2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-1 2v1H2v-1h1Zm1 0h1v1H4v-1Zm9-10v1h-1V3h1ZM8 5h1v1H8V5Zm1 2v1H8V7h1ZM8 9h1v1H8V9Zm2 0h1v1h-1V9Zm-1 2v1H8v-1h1Zm1 0h1v1h-1v-1Zm3-2v1h-1V9h1Zm-1 2h1v1h-1v-1Zm-2-4h1v1h-1V7Zm3 0v1h-1V7h1Zm-2-2v1h-1V5h1Zm1 0h1v1h-1V5Z"/>
</svg>
                  </div>
                  <span className=" ml-3 mt-3 flex justify-center font-bold text-white">
                    {authCompany}
                  </span>
                </div>
                <p className="flex justify-center mb-3 text-sm font-light text-white">
                  {domainStoredval}
                </p>
                <div className="btn drop-shadow-lg	 ">
                  <button
                    className="flex items-center justify-center mt-7 mx-auto bg-red-400 hover:bg-red-700 text-white font-light text-left py-1 px-2 rounded h-10"
                    onClick={logout}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-box-arrow-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                      />
                    </svg>
                    &nbsp;Log out
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="pane bg-mainbg col-span-5">
          <h2 className="mt-7 ml-7 text-4xl md:text-4xl xl:text-4xl font-semibold tracking-tight text-white">
            Web security
          </h2>
          <p className="mt-3 ml-7  py-2 text-xl text-white font-light mb-4"></p>
          <div className="grid ml-7 grid-cols-4 justify-center">
            <div className="web h-20 w-64 drop-shadow-lg bg-gradient-to-r from-gradbl1 to-gradbl2 shadow shadow-slate-700 rounded-xl hover:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="clock float-right mt-5 mr-2  bi bi-clock text-white"
                viewBox="0 0 16 16"
              >
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
              </svg>

              <span className="user font-semibold text-lg ml-2 text-white">
                Website loading time
              </span>
              <br />
              <span className="user font-regular text-md ml-2 text-white">
                <div>
                  {typeof load.ltime === "undefined" ? (
                    <p className="user font-medium text-xl ml-2  text-white ">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </p>
                  ) : (
                    <p className="user font-semibold  text-md ml-2  text-white">
                      {load.ltime.toFixed(7) * 1000}ms
                    </p>
                  )}
                </div>
              </span>
            </div>
            <button onClick={webScan}>
              <div className="web h-20 w-24  bg-gradbl2 border-2 border-gradbl1 drop-shadow-xl rounded-xl hover:bg-gray-900 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class=" mx-auto my-auto bi bi-activity text-white mt-3"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"
                  />
                </svg>
                <p className="user font-semibold text-md ml-2 text-center mr-2 text-white">
                  Scan now
                </p>
                <br></br>
              </div>
            </button>
          </div>
          <p className=" ml-7 mt-5  text-lg text-white font-medium ">
            HSTS Status
            <Tooltip
              content={
                <div className="w-80">
                  <Typography color="white" className="font-medium">
                    HSTS Status
                  </Typography>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal opacity-80"
                  >
                    View the status of HTTP Security Header of your website
                  </Typography>
                </div>
              }
            >
              <InformationCircleIcon
                strokeWidth={2}
                className="text-blue-gray-500 w-5 h-5 cursor-pointer float-right items-center justify-center mr-11"
              />
            </Tooltip>
          </p>
          <div className="scan grid  gap-2">
            <div className="col-span-2 statuscard overflow-x-auto mt-3 ml-7 w-3/4 rounded-xl ">
              <table className="w-full text-sm text-left rounded-lg text-gray-500 dark:text-gray-400">
                <thead className=" text-xs text-gray-700 uppercase bg-fieldbg dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      HSTS Header
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=" border-b bg-secondbg border-txtcol ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      XSS-Protection
                    </th>
                    <td className="px-6 py-4"> {httpSec.xssProtect}</td>
                  </tr>
                  <tr className=" border-b bg-secondbg border-txtcol ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      X-Content-Type-Options
                    </th>
                    <td className="px-6 py-4"> {httpSec.xcontentoptions}</td>
                  </tr>
                  <tr className=" border-b bg-secondbg border-txtcol ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      X-Frame-Options
                    </th>
                    <td className="px-6 py-4"> {httpSec.frameOptions}</td>
                  </tr>

                  <tr className=" border-b bg-secondbg border-txtcol ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Content-Security-Policy
                    </th>
                    <td className="px-6 py-4">
                      {" "}
                      {httpSec.ContentSecurityPolicy}
                    </td>
                  </tr>
                  <tr className=" border-b bg-secondbg border-txtcol ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Strict-Transport-Security
                    </th>
                    <td className="px-6 py-4">
                      {" "}
                      {httpSec.strictTransportSecurity}
                    </td>
                  </tr>
                  <tr className=" border-b bg-secondbg border-txtcol ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Secure Cookie
                    </th>
                    <td className="px-6 py-4"> {httpSec.SecureCookie}</td>
                  </tr>
                  <tr className="bg-secondbg ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      HTTP Only Cookie
                    </th>
                    <td className="px-6 py-4"> {httpSec.HttpOnlyCookie}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className=" ml-7 mt-5  text-lg text-white font-medium ">
              Phishing Status
              <Tooltip
                content={
                  <div className="w-80">
                    <Typography color="white" className="font-medium">
                      Phishing Status
                    </Typography>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal opacity-80"
                    >
                      Check whether your website has been flagged as phishing
                      website
                    </Typography>
                  </div>
                }
              >
                <InformationCircleIcon
                  strokeWidth={2}
                  className="text-blue-gray-500 w-5 h-5 cursor-pointer float-right absolute right-0 mr-11 mt-6"
                />
              </Tooltip>
            </p>
            <div className="col-span-2 statuscard overflow-x-auto mt-3 ml-7 w-3/4 rounded-xl ">
              <table className="w-full text-sm text-left rounded-lg text-gray-500 dark:text-gray-400">
                <thead className=" text-xs text-gray-700 uppercase bg-fieldbg dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Domain status for Phishing
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="  bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Phishing status
                    </th>
                    <td className="px-6 py-4">{phish}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className=" ml-7 mt-5  text-lg text-white font-medium ">
              URL redirections
              <Tooltip
                content={
                  <div className="w-80">
                    <Typography color="white" className="font-medium">
                      URL redirections
                    </Typography>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal opacity-80"
                    >
                      Know how many externl and internal links are being redirected to and from your website
                    </Typography>
                  </div>
                }
              >
                <InformationCircleIcon
                  strokeWidth={2}
                  className="text-blue-gray-500 w-5 h-5 cursor-pointer float-right absolute right-0 mr-11 mt-6"
                />
              </Tooltip>
            </p>
            <div className="col-span-2 statuscard overflow-x-auto mt-3 ml-7 w-3/4 rounded-xl   max-h-screen overflow-y-auto  ">
              <table className="w-full text-sm text-left rounded-lg text-gray-500 dark:text-gray-400 ">
                <thead className=" text-xs text-gray-700 uppercase bg-fieldbg dark:text-gray-400 overflow-y-auto">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      URLs found
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="  bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>

                    <td className="px-6 py-4">
                      {url === 0 ? (
                        <p className=" px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white ">
                          No URLs found
                        </p>
                      ) : (
                        <UrlRedirection
                          isButtonClicked={isButtonClicked}
                          setIsButtonClicked={setIsButtonClicked}
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className=" ml-7 mt-5  text-lg text-white font-medium ">
              Web technology scan
              <Tooltip
                content={
                  <div className="w-80">
                    <Typography color="white" className="font-medium">
                    Web technology scan
                    </Typography>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal opacity-80"
                    >
                     Identify the technologies on which the website is built on
                    </Typography>
                  </div>
                }
              >
                <InformationCircleIcon
                  strokeWidth={2}
                  className="text-blue-gray-500 w-5 h-5 cursor-pointer float-right absolute right-0 mr-11 mt-6"
                />
              </Tooltip>
            </p>
            <div className="col-span-2 statuscard overflow-x-auto mt-3 ml-7 w-3/4 rounded-xl   max-h-screen overflow-y-auto  ">
              <table className="w-full text-sm text-left rounded-lg text-gray-500 dark:text-gray-400 ">
                <thead className=" text-xs text-gray-700 uppercase bg-fieldbg dark:text-gray-400 overflow-y-auto">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Technologies detected
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-txtcol bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Web Technologies
                    </th>
                    <td className="px-6 py-4">
                      <Webtech
                        isButtonClicked={isButtonClicked}
                        setIsButtonClicked={setIsButtonClicked}
                      />
                    </td>
                  </tr>

                  <tr className="  bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Web Servers
                    </th>
                    <td className="px-6 py-4">
                      <Webserver
                        isButtonClicked={isButtonClicked}
                        setIsButtonClicked={setIsButtonClicked}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className=" ml-7 mt-5  text-lg text-white font-medium ">
              CVE lookup of technologies
              <Tooltip
                content={
                  <div className="w-80">
                    <Typography color="white" className="font-medium">
                    CVE lookup of technologies
                    </Typography>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal opacity-80"
                    >
                      Know Common Vulnerability and Exposures(CVE) associated with web technologies
                    </Typography>
                  </div>
                }
              >
                <InformationCircleIcon
                  strokeWidth={2}
                  className="text-blue-gray-500 w-5 h-5 cursor-pointer float-right absolute right-0 mr-11 mt-6"
                />
              </Tooltip>
            </p>
            <div className="col-span-2 statuscard overflow-x-auto mt-3 ml-7 w-3/4 rounded-xl   max-h-screen overflow-y-auto  ">
              <table className="w-full text-sm text-left rounded-lg text-gray-500 dark:text-gray-400 ">
                <thead className=" text-xs text-gray-700 uppercase bg-fieldbg dark:text-gray-400 overflow-y-auto">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      CVE's detected
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="  bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>

                    <td className="px-6 py-4">
                      <Cverecord
                        isButtonClicked={isButtonClicked}
                        setIsButtonClicked={setIsButtonClicked}
                      />{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className=" ml-7 mt-5  text-lg text-white font-medium ">
              SQLI Status
              <Tooltip
                content={
                  <div className="w-80">
                    <Typography color="white" className="font-medium">
                      SQLI status
                    </Typography>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal opacity-80"
                    >
                      Check whether your website is vulnerable to SQLI attack
                    </Typography>
                  </div>
                }
              >
                <InformationCircleIcon
                  strokeWidth={2}
                  className="text-blue-gray-500 w-5 h-5 cursor-pointer float-right absolute right-0 mr-11 mt-6"
                />
              </Tooltip>
            </p>
            <div className="col-span-2 statuscard overflow-x-auto mt-3 ml-7 w-3/4 rounded-xl ">
              <table className="w-full text-sm text-left rounded-lg text-gray-500 dark:text-gray-400">
                <thead className=" text-xs text-gray-700 uppercase bg-fieldbg dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      SQLI vulnerability info
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="  bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      SQLI status
                    </th>
                    <td className="px-6 py-4">{sqliinfo} </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className=" ml-7 mt-5  text-lg text-white font-medium ">
              XXE Status
              <Tooltip
                content={
                  <div className="w-80">
                    <Typography color="white" className="font-medium">
                     XXE status
                    </Typography>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal opacity-80"
                    >
                      Check whether your website is vulnerable to XXE attack
                    </Typography>
                  </div>
                }
              >
                <InformationCircleIcon
                  strokeWidth={2}
                  className="text-blue-gray-500 w-5 h-5 cursor-pointer float-right absolute right-0 mr-11 mt-6"
                />
              </Tooltip>
            </p>
            <div className="col-span-2 statuscard overflow-x-auto mt-3 ml-7 w-3/4 rounded-xl ">
              <table className="w-full text-sm text-left rounded-lg text-gray-500 dark:text-gray-400">
                <thead className=" text-xs text-gray-700 uppercase bg-fieldbg dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      XXE vulnerability info
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="  bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      XXE status
                    </th>
                    <td className="px-6 py-4"> {xxeflag}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className=" ml-7 mt-5  text-lg text-white font-medium ">
              XSS Status
              <Tooltip
                content={
                  <div className="w-80">
                    <Typography color="white" className="font-medium">
                    XSS Status
                    </Typography>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal opacity-80"
                    >
                      Check whether your website is vulnerable to XSS attack
                    </Typography>
                  </div>
                }
              >
                <InformationCircleIcon
                  strokeWidth={2}
                  className="text-blue-gray-500 w-5 h-5 cursor-pointer float-right absolute right-0 mr-11 mt-6"
                />
              </Tooltip>
            </p>
            <div className="col-span-2 statuscard overflow-x-auto mt-3 ml-7 w-3/4 rounded-xl mb-3 ">
              <table className="w-full text-sm text-left rounded-lg text-gray-500 dark:text-gray-400">
                <thead className=" text-xs text-gray-700 uppercase bg-fieldbg dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      XSS vulnerability info
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="  bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"> </div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      XSS status
                    </th>
                    <td className="px-6 py-4"> {xssflag} </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Web;
