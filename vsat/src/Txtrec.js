import React, { useState, useEffect } from "react";

const Txtrec = () => {
  const [textreco, setTextreco] = useState([]);

  useEffect(() => {
    fetch("/dnsinfo")
      .then((res) => res.json())
      .then((data) => {
        setTextreco(data.TXT);
        console.log(data.TXT);
      });
  }, []);
    
    
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
};

export default Txtrec;
