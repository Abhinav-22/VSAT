import React, { useState, useEffect } from "react";

const Caarecord = () => {
  const [caareco, setCaareco] = useState([]);
var a = []
  useEffect(() => {
    fetch("/dnsinfo")
      .then((res) => res.json())
      .then((data) => {
        setCaareco(data.CAA);
        a = data.CAA;
        console.log(typeof a)
       // console.log(data.TXT);
        //onsole.log(typeof data.TXT)
       // console.log(typeof textreco);
      });
  }, []);
    
  if ( caareco !== 'nil') {
    const Caarecod = caareco.map((str, index) => (
      <p key={index}>
        {index + 1}. {str}
      </p>
    ));
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {Caarecod}
      </p>
    );
  }
  else {
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {caareco}
      </p>
    );
  }

 
 
 
 

};

export default Caarecord;
