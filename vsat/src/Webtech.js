import React, { useState, useEffect } from "react";

const Webtech = () => {
  const [techrec, setTechrec] = useState([]);
//var a = []
  useEffect(() => {
    fetch("/webtechscan")
      .then((res) => res.json())
      .then((data) => {
        setTechrec(data.Technologies);
        //console.log(data.Server);
      });
  }, []);
    
 
    const Webtec = techrec.map((str, index) => (
      <p key={index}>
         {str}
      </p>
    ));
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {Webtec}
      </p>
    );
  
 

};

export default Webtech;
