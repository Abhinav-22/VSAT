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
    <p className="px-6 py-4 font-large text-gray-900 whitespace-nowrap dark:text-white">
      {Redirection}
    </p>
  );
};

export default UrlRedirection;
