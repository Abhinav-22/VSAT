import React, { useState, useEffect } from "react";

const Txtrec = () => {
  const [textreco, setTextreco] = useState([]);
var a = []
  useEffect(() => {
    fetch("/dnsinfo")
      .then((res) => res.json())
      .then((data) => {
        setTextreco(data.TXT);
        a = data.TXT;
        console.log(typeof a)
        console.log(data.TXT);
        console.log(typeof data.TXT)
        console.log(typeof textreco);
      });
  }, []);
    
  if ( textreco !== 'nil') {
    const Trecord = textreco.map((str, index) => (
      <p key={index}>
        {index + 1}. {str}
      </p>
    ));
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {Trecord}
      </p>
    );
  }
  else {
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {textreco}
      </p>
    );
  }

 
 
 
 

};

export default Txtrec;
