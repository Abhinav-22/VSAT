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

  const getData = async () => {
    const response = await fetch(
      `https://vsatportscan.azurewebsites.net/scan/103.195.186.173`
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
    // const dataports = await response.json();
    // if (!dataports) {
    //   console.log("The array is empty");
    // }
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
