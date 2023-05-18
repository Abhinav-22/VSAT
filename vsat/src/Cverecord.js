import React, { useState, useEffect } from "react";

const Cverecord = () => {
  const [cvereco, setCvereco] = useState([]);

  useEffect(() => {
    fetch("/cvelookup")
      .then((res) => res.json())
      .then((data) => {
        setCvereco(data);
       // a = data.SRV;
       // console.log(typeof a)
       // console.log(data.TXT);
        //onsole.log(typeof data.TXT)
       // console.log(typeof textreco);
      });
  }, []);
    
  if ( cvereco !== 'nil') {
    const Cverecod = cvereco.map((str, index) => (
      <p key={index}>
         {str}
      </p>
    ));
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {Cverecod}
      </p>
    );
  }
  else {
    return (
      <p className=" py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
        {cvereco}
      </p>
    );
  }

 
 
 
 

};

export default Cverecord;
