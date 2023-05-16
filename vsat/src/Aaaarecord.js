import React, { useState, useEffect } from "react";

const Aaaarecord = () => {
  const [aaaareco, setAaaareco] = useState([]);
var a = []
  useEffect(() => {
    fetch("/dnsinfo")
      .then((res) => res.json())
      .then((data) => {
        setAaaareco(data.AAAA);
        a = data.AAAA;
        console.log(typeof a)
       // console.log(data.TXT);
        //onsole.log(typeof data.TXT)
       // console.log(typeof textreco);
      });
  }, []);
    
  if ( aaaareco !== 'nil') {
    const Aaaarecod = aaaareco.map((str, index) => (
      <p key={index}>
        {index + 1}. {str}
      </p>
    ));
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {Aaaarecod}
      </p>
    );
  }
  else {
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {aaaareco}
      </p>
    );
  }

 
 
 
 

};

export default Aaaarecord;
