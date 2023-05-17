import React, { useState, useEffect } from "react";

const Srvrecord = () => {
  const [srvreco, setSrvreco] = useState([]);
var a = []
  useEffect(() => {
    fetch("/dnsinfo")
      .then((res) => res.json())
      .then((data) => {
        setSrvreco(data.SRV);
        a = data.SRV;
        console.log(typeof a)
       // console.log(data.TXT);
        //onsole.log(typeof data.TXT)
       // console.log(typeof textreco);
      });
  }, []);
    
  if ( srvreco !== 'nil') {
    const Srvrecod = srvreco.map((str, index) => (
      <p key={index}>
         {str}
      </p>
    ));
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {Srvrecod}
      </p>
    );
  }
  else {
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {srvreco}
      </p>
    );
  }

 
 
 
 

};

export default Srvrecord;
