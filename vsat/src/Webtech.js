import React, { useState, useEffect } from "react";

const Webtech = (props) => {
  const [techrec, setTechrec] = useState([]);
  const [techinfo, setTechinfo] = useState();
  //var a = []
  useEffect(() => {
    if (props.isButtonClicked) {
      fetchData();
    }
  }, [props.isButtonClicked]);

  const fetchData = () => {
    fetch("/webtechscan")
      .then((res) => res.json())
      .then((data) => {
        setTechrec(data.Technologies);
        setTechinfo(data.Info);
        //console.log(data.Server);
      });
  };

  if (techinfo == "technologies found.") {
    const Webtec = techrec.map((str, index) => <p key={index}>{str}</p>);
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {Webtec}
      </p>
    );
  } else {
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {techinfo}
      </p>
    );
  }
};

export default Webtech;
