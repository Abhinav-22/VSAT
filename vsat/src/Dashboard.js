import React, { useState, useEffect } from "react";
import logo from "./img/transparent.svg";
import { Link, useNavigate } from "react-router-dom";
import supabase from "./config/supabaseClient";
import usePortStore from "./stores/portStore";
import useDomainStore from "./stores/storeDomain";
import useGlanceStore from "./stores/glanceStore";
import usePortListStore from "./stores/portListStore";

//import useDomainStore from "./stores/storeDomain";

import Pdfgen from "./Pdfgen";
import cover from "./img/cover.jpg";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authCompany, setAuthCompany] = useState("");
  const [ports, setPorts] = useState("Loading...");
  const [apiDomainval, setApiDomain] = useState("");
  const [txtval, setTxtval] = useState();
  const [tokenval, setTokenval] = useState();
  const [domainflag, setDomainFlag] = useState(false);
  const [timeScanned, setTimeScanned] = useState("");
  const [openP, setOpenP] = useState([]);
  const [countP, setCountP] = useState("Loading...");
  const [phisdetail, setPhisdetail] = useState("");
  const [ssldate, setSsldate] = useState("");

  // ----GLANCE----
  const [domainscan, setDomainscan] = useState("loading...");
  const [domaintime, setDomaintime] = useState("Loading");
  const [sslLive, setSSLLive] = useState("Loading...");
  const [ssltime, setSSLtime] = useState("Loading...");
  const [phish, setPhish] = useState("Loading...");
  const [phishtime, setPhishtime] = useState("loading...");
  const [httpSec, setHttpSec] = useState("Loading...");
  const [httptime, setHttptime] = useState("Loading...");
  const [dataleak, setDataleak] = useState("Loading...");
  const [datatime, setDatatime] = useState("Loading...");
  const [countptime, setCountPtime] = useState("Loading...");

  //-----action----
  const [domainaction, setDomainaction] = useState("Loading...");
  const [webaction, setWebaction] = useState("Loading...");
  const [dataaction, setDataaction] = useState("Loading...");
  const [networkaction, setNetworkaction] = useState("Loading...");

  const [supssl, setsupSSL] = useState("nil");

  const [gportCount, setgportCount] = useState(null);
  const setDomainval = useDomainStore((state) => state.updateDomain);
  const domainStoredval = useDomainStore((state) => state.domainval);
  const resetDomain = useDomainStore((state) => state.resetDomain);
  const [validSSL, setValidSSL] = useState("Loading...");

  // ----------STORES---------
  const HSTSstatus = useGlanceStore((state) => state.HSTSstatus);
  const sslstatus = useGlanceStore((state) => state.sslstatus);
  const phishstatus = useGlanceStore((state) => state.phishtankstatus);
  const portstatus = usePortStore((state) => state.scanports);
  const setSSLstatus = useGlanceStore((state) => state.updateSSLstatus);
  const breachstatus = useGlanceStore((state) => state.databreachstatus);

  const setDomainStatus = useGlanceStore((state) => state.updateDomainstatus);
  const setDatabreach = useGlanceStore((state) => state.updateBreachstatus);

  const setHSTSstatus = useGlanceStore((state) => state.updateHSTSstatus);
  const setPhishstatus = useGlanceStore((state) => state.updatePhishstatus);

  const setportsCount = usePortStore((state) => state.updatePorts);
  const setportsList = usePortListStore((state) => state.updateOpenPorts);

  useEffect(() => {
    console.log("workingggg");
    // console.log(portsCount);

    // console.log("---------------");
    console.log(ports);
    resetDomain();
    console.log(domainStoredval);

    const uploadDomain = async () => {
      console.log(domainStoredval);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("api")
        .upsert({ id: user.id, domain: domainStoredval })
        .select();
      if (error) {
        console.log(error.message);
      }
    };

    const assignDomain = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase.from("users").select();
      data.map((us) => {
        if (user.id === us.uuid) {
          setApiDomain(us.website);
          setDomainval(us.website);
          console.log(us.website);
        }
      });
      uploadDomain();
    };

    const apiDomain = async () => {
      const { data, error } = await supabase.from("api").select();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      data.map((us) => {
        if (user.id === us.id) {
          assignDomain();
        }
      });
      console.log(apiDomainval);
      // updateDomain();
    };
    const fetchDetails = async () => {
      // await delay(1000);

      const { data, error } = await supabase.from("users").select();
      if (error) {
        // setDomain(null);
        console.log(error);
      }
      if (data) {
        try {
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
                if (us.txt_status == false) {
                  console.log(us.txt_status);

                  navigate("/txt");
                }
                // console.log(typeof us.txt_status);
              }
            });
            apiDomain();
            console.log(domainStoredval);
          }
        } catch (e) {
          if (e.name == "TypeError") navigate("/confirmresubmission");
        }
      }
    };
    fetchDetails();

    const setservertxt = async (val) => {
      const response = await fetch("/settxt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ txt: val }),
      });
      console.log(response);
    };
    const setGlobalTXT = async () => {
      console.log("inside setglobaltxt");
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("txt")
        .select("id, txtval")
        .eq("id", user.id);
      console.log(data);
      data.map((us) => {
        if (user.id === us.id) {
          console.log(us.txtval);
          setservertxt(us.txtval);
        }
      });
    };

    setGlobalTXT();

    const setserverURL = async (val) => {
      const response = await fetch("/api/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ string: val }),
      });
      console.log(response);
    };
    const setserverEmail = async (val) => {
      const response = await fetch("/setemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: val }),
      });
      console.log(response);
    };

    const setGlobalURL = async () => {
      console.log("inside setglobal URLLL");
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("users")
        .select("uuid, website, email")
        .eq("uuid", user.id);
      console.log(data);
      data.map((us) => {
        if (user.id === us.uuid) {
          console.log(us.website);
          setserverURL(us.website);
          setserverEmail(us.email);
        }
      });
    };
    setGlobalURL();

    const fetchGlance = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase.from("glance").select();
      console.log("GLance fetch bro", data);
      data.map((us) => {
        if (user.id === us.id) {
          console.log("ENTERED MAPPPPPPPPPPP");
          setDomainscan(us.domainres);
          setDomaintime(us.domaintime);
          setSSLLive(us.sslres);
          setSSLtime(us.ssltime);
          setPhish(us.phishres);
          setPhishtime(us.phishtime);
          setHttpSec(us.httpres);
          setHttptime(us.httptime);
          setDataleak(us.breachres);
          setDatatime(us.breachtime);
          setCountP(us.portres);
          setCountPtime(us.porttime);
          if (us.phishres == "Secure" && us.httpres == "Secure") {
            setWebaction("No Action is Required");
          } else setWebaction("Action is Required");
          if (us.breachres == "Breach Found !") setDataaction("Data Breach Found ");
          else setDataaction(" Data is Secure");
          if (us.sslres == "valid" && us.domainres == "Secure")
            setDomainaction("No Action is Required");
          else setDomainaction("Action is Required");
        }
      });
    };

    fetchGlance();
  }, []);

  const uploadPorts = async (dataports) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("ports")
      .upsert({
        id: user.id,
        openports: dataports.openPorts,
        port_count: dataports.openPorts.length,
      })
      .select();
    if (error) {
      console.log(error.message);
    }
  };

  const scanssl = () => {
    return new Promise((resolve, reject) => {
      var ssl = "";
      var domm = "";
      fetch("/sslexpiry")
        .then((res) => res.json())
        .then((data) => {
          setValidSSL(data.SSLExpiry);
          console.log(data);
          console.log(typeof data.SSLExpiry);
          if (data.SSLExpiry == "No SSL Certificate") {
            setSSLstatus("             NOT FOUND !!!");
            setSsldate("Not present");
            ssl = "not found";
          } else {
            setSSLstatus("        SECURE!!!");
            setSsldate(data.SSLExpiry);
            ssl = "valid";
            const currentDate = new Date();
            console.log(currentDate);

            const futureDate = new Date(data.SSLExpiry);

            console.log(futureDate);
            const timeDiff = futureDate.getTime() - currentDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            console.log(daysDiff);
            console.log(timeDiff);
            if (daysDiff >= 20) {
              setDomainscan("Secure");
              domm = "Secure";
            } else if (daysDiff >= 0) {
              setDomainscan("Expires in " + daysDiff + "Days");
              domm = "Expires in " + daysDiff + "Days";
            } else {
              setDomainscan("Not secure");
              domm = "Not secure";
            }
          }
          console.log(ssl, domm);
          resolve({ ssl, domm });
        })
        .catch((error) => reject(error));
    });
  };

  const supassl = async (sslres1, domainres1) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(sslres1, domainres1);
    const { data, error } = await supabase
      .from("glance")
      .upsert({
        id: user.id,
        ssltime: new Date().toLocaleString(),
        sslres: sslres1,
        domaintime: new Date().toLocaleString(),
        domainres: domainres1,
      })
      .select();
    if (error) {
      console.log(error);
    }
  };

  const scanphish = async () => {
    return new Promise((resolve, reject) => {
      fetch("/phishtank")
        .then((res) => res.json())
        .then((data) => {
          if (data.Sitedetails === "Is a phish") {
            console.log("keriii");
            setPhishstatus("        NOT SECURE !!!");
            setPhisdetail(data.Sitedetails);
            resolve("Not Secure");
          } else {
            setPhishstatus("         SECURE!!");
            setPhisdetail(data.Sitedetails);
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
        setHttpSec("NOT SECURE!");
        return "Not Secure";
      } else {
        setHSTSstatus("          SECURE");
        setHttpSec("SECURE");
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

  const scanbreach = async () => {
    try {
      const response = await fetch("/dataleak");
      const data = await response.json();
      console.log(data);
      console.log(data.DataLeak);
      if (data.DataLeak === false) {
        setDataleak("No Breach found");
        setDatabreach("No Breach found");
        return "No Breach Found";
      } else {
        setDataleak("Breach Found !");
        setDatabreach("Breach Found !");
        return "Breach Found !";
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const supabreach = async (breachstat) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(breachstat);
      const { data, error } = await supabase
        .from("glance")
        .upsert({
          id: user.id,
          breachtime: new Date().toLocaleString(),
          breachres: breachstat,
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
  const fetchHost = async () => {
    try {
      const response = await fetch("/hostname");
      const data = await response.json();
      console.log(data);
      console.log(data.HostnameFlag);
      console.log(data.ValidHostname);
      return data.ValidHostname;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchPorts = async (host) => {
    try {
      console.log("inside fetchPorts");
      console.log(host);
      const response = await fetch(
        `https://vsatportscan.azurewebsites.net/scan/${host}`
      );
      const dataports = await response.json();
      console.log(typeof dataports);
      console.log(dataports.openPorts);
      setOpenP(dataports.openPorts);
      setportsList(dataports.openPorts);
      setCountP(dataports.openPorts.length);
      console.log(dataports.openPorts.length);
      setportsCount(dataports.openPorts.length);
      uploadPorts(dataports);
      return dataports.openPorts.length;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const supaports = async (open) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(open);
      const { data, error } = await supabase
        .from("glance")
        .upsert({
          id: user.id,
          porttime: new Date().toLocaleString(),
          portres: open,
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

  const scan = async () => {
    setLoading(true);

    try {
      const { ssl, domm } = await scanssl();
      await supassl(ssl, domm);
    } catch (error) {
      console.error(error);
    }

    try {
      const httpstat = await scanhttp();
      await supahttp(httpstat);
    } catch (error) {
      console.error(error);
    }

    try {
      const breachstat = await scanbreach();
      await supabreach(breachstat);
    } catch (error) {
      console.error(error);
    }

    try {
      const phii = await scanphish();
      await supaphish(phii);
    } catch (error) {
      console.error(error);
    }

    try {
      const host = await fetchHost();
      const open = await fetchPorts(host);
      await supaports(open);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);

    window.location.reload();
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

  const setVals = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    var open = [];
    const { data, error } = await supabase.from("ports").select();

    data.map((us) => {
      if (user.id === us.id) {
        console.log(us.openports);
        open = us.openports;
        console.log(open);
      }
    });
    const response = await fetch("/pdfdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        netsec: networkaction,
        datasec: dataaction,
        websec: webaction,
        domsec: domainaction,
        openport: open,
        portlen: countP,
        httpsec: httpSec,
        phishstat: phishstatus,
        domainr: domainscan,
        sslres: sslLive,
        breaches: dataleak,
        phishdetail: phisdetail,
        sslexpiry: ssldate,
      }),
    });
    console.log(response);
  };

  const downloadpdf = async () => {
    fetch("/download_pdf")
      .then((response) => response.blob())
      .then((blob) => {
        const pdfUrl = URL.createObjectURL(blob);
        window.open(pdfUrl, "_blank");
      })
      .catch((error) => console.error(error));
  };

  const navPdf = async () => {
    // navigate("/pdfgen");
    await setVals();
    await downloadpdf();
  };
  return (
    <>
      {" "}
      <div className="grid grid-cols-6 gap-0 h-full">
        <div className="sidebar">
          <aside className="h-screen sticky top-0" aria-label="Sidebar">
            <div className="sticky h-full px-3 py-4 overflow-y-auto bg-secondbg  drop-shadow-xl  ">
              <Link to="/" className="flex items-center pl-2.5 mb-5">
                <img src={logo} className="h-14 mr-3 sm:h-14" alt="VSAT Logo" />
              </Link>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center p-2 text-base font-normal
                     rounded-lg text-white 
                  hover:bg-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400  group-hover:text-white bi bi-pie-chart"
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
                    className="flex items-center p-2 text-base font-normal
                   rounded-lg text-white 
                    hover:bg-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white bi bi-globe2"
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
                    className="flex items-center p-2 text-base font-normal
                     rounded-lg text-white hover:bg-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white bi bi-hdd-network"
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
                    className="flex items-center p-2 text-base font-normal
                    rounded-lg text-white hover:bg-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6  transition duration-75 text-gray-400 group-hover:text-white bi bi-database"
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
                    className="flex items-center p-2 text-base font-normal
                    rounded-lg text-white 
                   hover:bg-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6  transition duration-75 text-gray-400 group-hover:text-white bi bi-link"
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
                    className="flex items-center p-2 text-base font-normal
                     rounded-lg text-white 
                    hover:bg-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6  transition duration-75 text-gray-400 group-hover:text-white bi bi-diagram-3"
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
                  <div className="flex justify-center logo rounded-full bg-secondbg drop-shadow-lg	 ">
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
                  {domainStoredval}{" "}
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
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
        {/* ================================== */}

        <div className="pane bg-mainbg col-span-5">
          <h2 className="mt-7 ml-7 text-3xl md:text-3xl xl:text-3xl font-semibold tracking-tight text-white">
            Security Dashboard
          </h2>
          <p className="mt-3 ml-7 py-2 text-xl text-white font-light mb-4">
            Welcome,
            <span className="user font-semibold">&nbsp;{authName}</span>
          </p>
          <div className="grid ml-7 grid-cols-4 justify-center">
            <div className="web h-20 w-64 drop-shadow-lg bg-gradient-to-r from-gradbl1 to-gradbl2 shadow shadow-slate-700 rounded-xl hover:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="guard float-right mt-5 mr-2 text-white bi bi-shield-shaded"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 14.933a.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067v13.866zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"
                />
              </svg>

              <span className="user font-semibold text-lg ml-2 text-white">
                Web Security
              </span>
              <br />
              <span className="user font-medium text-md ml-2 text-white">
                {webaction}
              </span>
            </div>
            <div className="net h-20 w-64 drop-shadow-lg bg-gradient-to-r from-gradbl1 to-gradbl2 shadow shadow-slate-700 rounded-xl hover:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="text-white bi bi-hdd-network float-right mt-5 mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M4.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zM3 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8.5v3a1.5 1.5 0 0 1 1.5 1.5h5.5a.5.5 0 0 1 0 1H10A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5H.5a.5.5 0 0 1 0-1H6A1.5 1.5 0 0 1 7.5 10V7H2a2 2 0 0 1-2-2V4zm1 0v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1zm6 7.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5z" />
              </svg>

              <span className="user font-semibold text-lg ml-2 text-white">
                Network Security
              </span>
              <br />
              <span className="user font-medium text-md ml-2 text-white">
                {networkaction}{" "}
              </span>
            </div>
            <div className="data h-20 w-64 drop-shadow-lg bg-gradient-to-r from-gradbl1 to-gradbl2 shadow shadow-slate-700 rounded-xl hover:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="text-white bi bi-database float-right mt-5 mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313ZM13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 5.698ZM14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13V4Zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 8.698Zm0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525Z" />
              </svg>

              <span className="user font-semibold text-lg ml-2 text-white">
                Data Security
              </span>
              <br />
              <span className="user font-medium text-md ml-2 text-white">
                {dataaction}{" "}
              </span>
            </div>
            <div className="asset h-20 w-64 drop-shadow-lg bg-gradient-to-r from-gradbl1 to-gradbl2 shadow shadow-slate-700 rounded-xl hover:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="text-white bi bi-gear float-right mt-5 mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
              </svg>

              <span className="user font-semibold text-lg ml-2 text-white">
                Domain Security
              </span>
              <br />
              <span className="user font-medium text-md ml-2 text-white">
                {domainaction}{" "}
              </span>
            </div>
          </div>

          <p className=" ml-7 mt-5  text-lg text-white font-medium ">
            Security at a glance
          </p>

          <div className="scan grid grid-cols-3 gap-3">
            <div className="col-span-2 statuscard overflow-x-auto mt-3 ml-7 w-full rounded-xl ">
              <table className="w-full text-sm text-left rounded-lg text-gray-500 dark:text-gray-400">
                <thead className=" text-xs text-gray-700 uppercase bg-fieldbg dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Scan
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ClassName
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Result
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
                      Domain scan status
                    </th>
                    <td className="px-6 py-4">{domaintime}</td>
                    <td className="px-6 py-4">
                      <span className="bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                        Domain
                      </span>
                    </td>
                    <td className="px-6 py-4">{domainscan}</td>
                  </tr>
                  <tr className=" border-b bg-secondbg border-txtcol ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      SSL scan status
                    </th>
                    <td className="px-6 py-4">{ssltime}</td>
                    <td className="px-6 py-4">
                      <span className="bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                        Domain
                      </span>
                    </td>
                    <td className="px-6 py-4">{sslLive}</td>
                  </tr>
                  <tr className=" border-b bg-secondbg border-txtcol ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Phishtank status
                    </th>
                    <td className="px-6 py-4">{phishtime}</td>
                    <td className="px-6 py-4">
                      <span className="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                        Web
                      </span>
                    </td>
                    <td className="px-6 py-4">{phish}</td>
                  </tr>
                  <tr className=" border-b bg-secondbg border-txtcol ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      HTTP security header status
                    </th>
                    <td className="px-6 py-4">{httptime}</td>
                    <td className="px-6 py-4">
                      <span className="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                        Web
                      </span>
                    </td>
                    <td className="px-6 py-4">{httpSec}</td>
                  </tr>
                  <tr className=" border-b bg-secondbg border-txtcol ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Data breach status
                    </th>
                    <td className="px-6 py-4">{datatime}</td>
                    <td className="px-6 py-4">
                      <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                        Data
                      </span>
                    </td>
                    <td className="px-6 py-4">{dataleak}</td>
                  </tr>
                  <tr className="bg-secondbg ">
                    <td className="w-4 p-4">
                      <div className="flex items-center"></div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Network ports open
                    </th>
                    <td className="px-6 py-4">{countptime}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                        Network
                      </span>
                    </td>
                    <td className="px-6 py-4">{countP}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className=" col-span-1 mt-3 ml-7 w-5/6  h-94 rounded-xl bg-secondbg mr-12 ">
              <p className="ml-3 mt-3  text-lg text-white  font-normal ">
                VSAT Tools
              </p>
              <a
                href="https://vsatsec.gitbook.io/vsat-docs/documentation/overview"
                target="_blank"
              >
                <button className="mt-3 my-auto mx-auto flex gap-2 justify-center align-middle bg-fieldbg hover:bg-blue-700 text-white font-medium text-left rounded-xl h-20 w-64">
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
              </a>

              <button
                className="mt-3 my-auto mx-auto flex gap-2 justify-center align-middle bg-fieldbg hover:bg-blue-700 text-white font-medium text-left rounded-xl h-20 w-64"
                onClick={navPdf}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-download my-auto"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                </svg>
                <span className="my-auto ttspan ml-3 flex justify-center">
                  Generate security report
                </span>
              </button>
              <button
                className="mt-3 my-auto mx-auto flex gap-2 justify-center align-middle bg-fieldbg hover:bg-blue-700 text-white font-medium text-left rounded-xl h-20 w-64"
                onClick={scan}
                disabled={loading}
              >
                {loading ? (
                  <div>
                    <div className="flex items-center">
                      <div className="my-auto mt-7 mr-3 ttspan flex animate-spin rounded-full h-5 w-4 border-t-2 border-b-2 border-white-900 "></div>
                    </div>
                  </div>
                ) : (
                  <p></p>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-search my-auto"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>

                <span className="my-auto ttspan flex justify-center">
                  Quick scan
                </span>
              </button>
            </div>
          </div>
          <div className="scan grid grid-cols-4 gap-3">
            <div className="ml-7 mb-3 mt-3 col-span-2  h-52 bg-cover-blue rounded-xl ">
              <img
                src={cover}
                className="w-56 h-full float-right rounded-xl drop-shadow-xl"
                alt="cover image"
              />
              <p className="ml-3 pt-4  text-xl text-white  font-semibold ">
                Do a security logging checkup right now
              </p>
              <p className="ml-3 pt-3  text-md text-white  font-medium ">
                Know the status of your security logging and infrastructure
              </p>
              <Link to="/survey" target="_blank">
                <button className="h-10 w-32 ml-3 mt-5 bg-cover-white rounded-2xl text-cover-blue text-center hover:bg-gray-400 hover:text-white ">
                  <span className="my-auto ttspan text-center flex justify-center font-bold ">
                    Go to survey
                  </span>
                </button>
              </Link>
            </div>
            <div className="col-span-2 mr-10 bg-fieldbg h-52 mt-3 rounded-xl"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
