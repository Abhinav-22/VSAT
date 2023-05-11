import React, { useState, useEffect } from "react";

const Nameserver = () => {
  const [server, setServer] = useState([]);

  useEffect(() => {
    fetch("/whoislookup")
      .then((res) => res.json())
      .then((data) => {
        setServer(data.Whoisinfo.name_servers);
        console.log(data);
      });
  }, []);
  const n_server = server.map((str, index) => (
    <p key={index}>
      {index + 1}. {str}
    </p>
  ));

  return (
    <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
      {n_server}
    </p>
  );
};
export default Nameserver;
