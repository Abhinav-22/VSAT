import React, { useState, useEffect } from "react";

const Cnamerecord = () => {
  const [cnamereco, setCnamereco] = useState([]);
var a = []
  useEffect(() => {
    fetch("/dnsinfo")
      .then((res) => res.json())
      .then((data) => {
        setCnamereco(data.CNAME);
        a = data.CNAME;
        console.log(typeof a)
       // console.log(data.TXT);
        //onsole.log(typeof data.TXT)
       // console.log(typeof textreco);
      });
  }, []);
    
  if ( cnamereco !== 'nil') {
    const Cnamerecod = cnamereco.map((str, index) => (
      <p key={index}>
        {index + 1}. {str}
      </p>
    ));
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {Cnamerecod}
      </p>
    );
  }
  else {
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {cnamereco}
      </p>
    );
  }

 
 
 
 

};

export default Cnamerecord;
