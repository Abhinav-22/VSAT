import React, { useState, useEffect } from "react";

const Webserver = (props) => {
  const [serverrec, setServerrec] = useState([]);
  var a = [];

  useEffect(() => {
    if (props.isButtonClicked) {
      fetchData();
    }
  }, [props.isButtonClicked]);

  const fetchData = () => {
    fetch("/webtechscan")
      .then((res) => res.json())
      .then((data) => {
        setServerrec(data.Server);
        console.log(data.Server);
      });
  };

  if (serverrec.len > 1) {
    const Webser = serverrec.map((str, index) => <p key={index}>{str}</p>);
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {Webser}
      </p>
    );
  } else {
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {serverrec}
      </p>
    );
  }
};

export default Webserver;
