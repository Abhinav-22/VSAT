import React, { useState, useEffect } from "react";

const Ptrrec = () => {
  const [ptrreco, setPtrreco] = useState([]);
var a = []
  useEffect(() => {
    fetch("/dnsinfo")
      .then((res) => res.json())
      .then((data) => {
        setPtrreco(data.PTR);
        a = data.PTR;
        console.log(typeof a)
      //  console.log(data.TXT);
      //  console.log(typeof data.TXT)
      //  console.log(typeof textreco);
      });
  }, []);
    
  if ( ptrreco !== 'nil') {
    const Ptrrecord = ptrreco.map((str, index) => (
      <p key={index}>
        {index + 1}. {str}
      </p>
    ));
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {Ptrrecord}
      </p>
    );
  }
  else {
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {ptrreco}
      </p>
    );
  }

 
 
 
 

};

export default Ptrrec;
