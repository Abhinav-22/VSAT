import React, { useState, useEffect } from "react";

const Mxrecord = () => {
  const [mxreco, setMxreco] = useState([]);
var a = []
  useEffect(() => {
    fetch("/dnsinfo")
      .then((res) => res.json())
      .then((data) => {
        setMxreco(data.MX);
        a = data.MX;
        console.log(typeof a)
       // console.log(data.TXT);
        //onsole.log(typeof data.TXT)
       // console.log(typeof textreco);
      });
  }, []);
    
  if ( mxreco !== 'nil') {
    const Mxrecod = mxreco.map((str, index) => (
      <p key={index}>
        {index + 1}. {str}
      </p>
    ));
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {Mxrecod}
      </p>
    );
  }
  else {
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {mxreco}
      </p>
    );
  }

 
 
 
 

};

export default Mxrecord;
