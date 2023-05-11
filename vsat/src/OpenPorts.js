import React, { useState, useEffect } from "react";
import usePortListStore from "./stores/portListStore";
import usePortStore from "./stores/portStore";

import supabase from "./config/supabaseClient";

const OpenPorts = () => {
  const [countP, setCountP] = useState("Loading...");
  const [openP, setOpenP] = useState([]);

  const portsList = usePortListStore((state) => state.openports);
  const portsCount = usePortStore((state) => state.scanports);
  const setportsCount = usePortStore((state) => state.updatePorts);
  const setportsList = usePortListStore((state) => state.updateOpenPorts);

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

  // const fetchHost = async () => {
  //   var val = "";
  //   await fetch("/hostname")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       console.log(data.HostnameFlag);
  //       console.log(data.ValidHostname);
  //       return data.ValidHostname;
  //     });
  // };
  // const fetchPorts = async (host) => {
  //   console.log("inside fetchports");
  //   console.log(host);
  //   const response = await fetch(
  //     `https://vsatportscan.azurewebsites.net/scan/${host}`
  //   )
  //     .then((res) => res.json())
  //     .then((dataports) => {
  //       console.log(typeof dataports);
  //       console.log(dataports.openPorts);
  //       setOpenP(dataports.openPorts);
  //       setportsList(dataports.openPorts);
  //       setCountP(dataports.openPorts.length);
  //       console.log(dataports.openPorts.length);
  //       setportsCount(dataports.openPorts.length);

  //       uploadPorts(dataports);
  //     });
  //   // const dataports = await response.json();
  //   // if (!dataports) {
  //   //   console.log("The array is empty");
  //   // }
  // };
  // const getData = async () => {
  //   const host = await fetchHost();
  //   await fetchPorts(host);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);
  const fetchHost = () => {
    return fetch("/hostname")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.HostnameFlag);
        console.log(data.ValidHostname);
        return data.ValidHostname;
      });
  };

  const getData = async () => {
    const host = await fetchHost();
    await fetchPorts(host);
  };

  const fetchPorts = async (host) => {
    console.log("inside fetchports");
    console.log(host);
    const response = await fetch(
      `https://vsatportscan.azurewebsites.net/scan/${host}`
    )
      .then((res) => res.json())
      .then((dataports) => {
        console.log(typeof dataports);
        console.log(dataports.openPorts);
        setOpenP(dataports.openPorts);
        setportsList(dataports.openPorts);
        setCountP(dataports.openPorts.length);
        console.log(dataports.openPorts.length);
        setportsCount(dataports.openPorts.length);

        uploadPorts(dataports);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const Ports = openP.map((str, index) => (
    <p key={index}>
      {index + 1}. {str}
    </p>
  ));
  return <p>{Ports}</p>;
};

export default OpenPorts;
