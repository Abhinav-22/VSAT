import React, { useEffect, useState } from "react";
import logo from "./img/transparent.svg";
import { Link, useNavigate } from "react-router-dom";
import supabase from "./config/supabaseClient";
import useGlanceStore from "./stores/glanceStore";
import Nameserver from "./Nameserver.js";
import Txtrec from "./Txtrec";


const Domain = () => {
  const navigate = useNavigate();

  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authCompany, setAuthCompany] = useState("");
  const [validSSL, setValidSSL] = useState("Loading...");
  const [whoisstastus, setWhoisstatus] = useState("");
  const [dnsecc, setDnssecc] = useState("");
  const [expdate, setExpdate] = useState("");
  const [ssldate, setSsldate] = useState("");
  const [sslpublisher, setSslpublisher] = useState("");
  const [arec, setArec] = useState("nil");
  const [aaaarec, setAaaarec] = useState("nil");
  const [soarec, setSoarec] = useState("nil");
  const [mxrec, setMxrec] = useState("nil");
  const [cnamerec, setCnamerec] = useState("nil");
  const [caarec, setCaarec] = useState("nil");
  const [ptrrec, setPtrrec] = useState("nil");
  const [srvrec, setSrvrec] = useState("nil");
  const [txtflag, setTxtflag] = useState(0);
  const [textr, setTextr]=useState("nil");
  const setSSLstatus = useGlanceStore((state) => state.updateSSLstatus);

  useEffect(() => {
    console.log("workingggg");
    const updateSSL = async () => {
      fetch("/sslexpiry")
        .then((res) => res.json())
        .then((data) => {
          setValidSSL(data.SSLExpiry);
          console.log(data);
          console.log(data.SSLExpiry);
          if (data.SSLExpiry == "No SSL Certificate") {
            setSSLstatus("             NOT FOUND !!!");
          } else {
            setSSLstatus("        SECURE!!!");
          }
        });
    };

    updateSSL();

    const updateSSLinfo = async () => {
      fetch("/sslinfo")
        .then((res) => res.json())
        .then((data) => {
          if (validSSL != "No SSL Certificate") {
            setSsldate(data.notAfter);
            console.log(data);
            console.log(data.notAfter);
            const len = data.issuer.length;
            console.log(len);
         data.issuer[1].map((us) => {
           setSslpublisher(data.issuer[len-2]);
           console.log(us);
         });
          //setSslpublisher(data.issuer[1]);

          }
        });
    };

    updateSSLinfo();

    const dnsrecords = async () => {
      fetch("/dnsinfo")
        .then((res) => res.json())
        .then((data) => {
       
            setArec(data.A);
          console.log(data);
          setAaaarec(data.AAAA);
          console.log(data.notAfter);
          setSoarec(data.SOA);
          setMxrec(data.MX);
          setCnamerec(data.CNAME);
          setCaarec(data.CAA);
          setPtrrec(data.PTR);
          setSrvrec(data.SRV);
          if (data.TXT == 'nil') {
            setTxtflag(1);
            setTextr(data.TXT)
          }
          else
            setTxtflag(0);
        //  data.issuer[1].map((us) => {
          //  setSslpublisher(data.issuer[1]);
          //  console.log(us);
        // });
         

          
        });
    };

    dnsrecords();
    const updatewhois = async () => {
      fetch("/whoislookup")
        .then((res) => res.json())
        .then((data) => {
          setWhoisstatus(data.WhoisFlag);
          console.log(data);
          // console.log(data.Whoisinfo);
          if (data.WhoisFlag == true) {
            const expdtype = typeof data.Whoisinfo.expiration_date;
            //  console.log(expdtype)
            if (expdtype == "object") {
              data.Whoisinfo.expiration_date.map((us) => {
                setExpdate(data.Whoisinfo.expiration_date);

                console.log(us);
              });
            } else {
              setExpdate(data.Whoisinfo.expiration_date);
              console.log(data.Whoisinfo.expiration_date);
            }
            data.Whoisinfo.name_servers.map((us) => {
              console.log(us);
            });

            setDnssecc(data.Whoisinfo.dnssec);
            console.log(data.Whoisinfo.dnssec);
            //             data.Whoisinfo.dnssec.map((us) => {
            // console.log(us)
            //             });
          }
        });
    };
    updatewhois();

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
                        fill-rule="evenodd"
                        d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
                      />
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">APIs</span>
                  </Link>
                </li>
              </ul>
              <div
                id="dropdown-cta"
                className="p-4 mt-6 rounded-lg bg-fieldbg"
                role="alert drop-shadow-lg	"
              >
                <div className="flex justify-center mb-3 drop-shadow-lg	">
                  <div className="flex justify-center logo rounded-full bg-gray-800 drop-shadow-lg	 ">
                    <svg
                      className="logo text-white w-auto h-auto "
                      width="50"
                      height="50"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.3294 19L0.731323 17.9641L5.06145 15.4641L7.1029 19H1.3294Z"
                        fill="currentColor"
                      />
                      <path
                        d="M15.1858 19H9.4123L5.7935 12.7321L10.1236 10.2321L15.1858 19Z"
                        fill="currentColor"
                      />
                      <path
                        d="M23.2687 19H17.4952L10.8557 7.5L15.1858 5L23.2687 19Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span className=" ml-3 mt-3 flex justify-center font-bold text-white">
                    {authCompany}
                  </span>
                </div>
                <p className="flex justify-center mb-3 text-sm font-light text-white">
                  {authEmail}
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
                        fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                      />
                      <path
                        fill-rule="evenodd"
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
            Domain checkup
          </h2>
          <p className="mt-3 ml-7  py-2 text-xl text-white font-light mb-4"></p>
          <div className="grid ml-7 grid-cols-4 justify-center">
            <div className="web h-20 w-64 drop-shadow-lg bg-gradient-to-r from-gradbl1 to-gradbl2 shadow shadow-slate-700 rounded-xl hover:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="ssl float-right mt-5 mr-2 text-white bi bi-patch-check"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                />
                <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
              </svg>
              <span className="user font-semibold text-lg ml-2 text-white">
                SSL expires on
              </span>
              <br />
              <span className="user font-regular text-md ml-2 text-white">
                {validSSL}
              </span>
              
            </div>
            
          <button>
            <div className="web h-20 w-24  bg-fieldbg border-2 border-gradbl1 drop-shadow-xl rounded-xl hover:bg-gray-900 cursor-pointer">
           
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class=" mx-auto my-auto bi bi-activity text-white mt-3" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/>
</svg>
              <p className="user font-regular text-md ml-2 text-center mr-2 text-white">
                Scan now
              </p><br></br>
             
              
                      </div>
                      </button>
          </div>
          <p className=" ml-7 mt-5  text-lg text-white font-medium ">
            SSL certificate information
          </p>
          <div className="scan grid grid-cols-3 gap-2">
            <div className="col-span-2 statuscard overflow-x-auto mt-3 ml-7 w-3/4 rounded-xl   max-h-screen overflow-y-auto  ">
              <table className="w-full text-sm text-left rounded-lg text-gray-500 dark:text-gray-400 ">
                <thead className=" text-xs text-gray-700 uppercase bg-fieldbg dark:text-gray-400 overflow-y-auto">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      SSL certificate issuer information
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="  bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"> </div>
                    </td>

                    <td className="px-6 py-4"> {sslpublisher}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br></br>
            <p className=" ml-7 mt-5  text-lg text-white font-medium ">
              DNS record information
            </p>
            <br></br>
            <div className="col-span-2 statuscard overflow-x-auto mt-3 ml-7 w-full  rounded-xl ">
              <table className="w-full text-sm text-left rounded-lg text-gray-500 dark:text-gray-400">
                <thead className=" text-xs text-gray-700 uppercase bg-fieldbg dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Parameters
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="  border-b border-txtcol bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      A
                    </th>
                    <td className="px-6 py-4">{ arec}</td>
                  </tr>
                  <tr className="border-b border-txtcol  bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"> </div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      AAAA
                    </th>
                    <td className="px-6 py-4">{ aaaarec}</td>
                  </tr>

                  <tr className="  border-b border-txtcol bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      SOA
                    </th>
                    <td className="px-6 py-4">{soarec} </td>
                  </tr>
                  <tr className="border-b border-txtcol  bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      MX
                    </th>
                    <td className="px-6 py-4">{ mxrec}</td>
                  </tr>
                  <tr className=" border-b border-txtcol  bg-secondbg   ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      TXT
                    </th>
                  
                    <td className="px-6 py-4">
                      <Txtrec />
                    </td>
  
  
  
  
  
                    
                  </tr>

                  <tr className="border-b border-txtcol  bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      CNAME
                    </th>
                    <td className="px-6 py-4">{ cnamerec}</td>
                  </tr>

                  <tr className="  border-b border-txtcol bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      CAA
                    </th>
                    <td className="px-6 py-4">{caarec} </td>
                  </tr>
                  <tr className="border-b border-txtcol  bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      PTR
                    </th>
                    <td className="px-6 py-4">{ptrrec} </td>
                  </tr>
                  <tr className="  border-b border-txtcol bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      SRV
                    </th>
                    <td className="px-6 py-4">{ srvrec}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br></br>
            <p className=" ml-7 mt-5  text-lg text-white font-medium ">
              WHOIS information
            </p>
            <br></br>
            <div className="col-span-2 statuscard overflow-x-auto mt-3 ml-7 w-3/4 rounded-xl ">
              <table className="w-full text-sm text-left rounded-lg text-gray-500 dark:text-gray-400">
                <thead className=" text-xs text-gray-700 uppercase bg-fieldbg dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Parameters
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="  border-b border-txtcol bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Domain expiry
                    </th>
                    <td className="px-6 py-4">{expdate}</td>
                  </tr>
                  <tr className="border-b border-txtcol  bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      DNSSEC status
                    </th>
                    <td className="px-6 py-4">{dnsecc}</td>
                  </tr>

                  <tr className="  bg-secondbg  ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      DNS servers
                    </th>
                    <td className="px-6 py-4">
                      <Nameserver />
                    </td>
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

export default Domain;
