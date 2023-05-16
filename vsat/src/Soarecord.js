import React, { useState, useEffect } from "react";

const Soarecord = () => {
  const [soareco, setSoareco] = useState([]);
var a = []
  useEffect(() => {
    fetch("/dnsinfo")
      .then((res) => res.json())
      .then((data) => {
        setSoareco(data.SOA);
        a = data.SOA;
        console.log(typeof a)
       // console.log(data.TXT);
        //onsole.log(typeof data.TXT)
       // console.log(typeof textreco);
      });
  }, []);
    
  if ( soareco !== 'nil') {
    const Soarecod = soareco.map((str, index) => (
      <p key={index}>
        {index + 1}. {str}
      </p>
    ));
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {Soarecod}
      </p>
    );
  }
  else {
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {soareco}
      </p>
    );
  }

 
 
 
 

};

export default Soarecord;
