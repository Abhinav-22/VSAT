import React, { useState, useEffect } from "react";

const UrlRedirection = () => {
  const [url, setUrl] = useState([]);
  useEffect(() => {
    fetch("/urlredirection")
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.Links);
        console.log(data);
      });
  }, []);

  const Redirection = url.map((str, index) => (
    <p key={index}>
      {index + 1}. {str}
    </p>
  ));

  return (
    <p className="ml-3  py-1 text-xl text-white font-normal mb-4">
      {Redirection}
    </p>
  );
};

export default UrlRedirection;
