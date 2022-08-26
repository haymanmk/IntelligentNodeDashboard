import React, { useEffect, useState } from "react";
import api_config from "src/pages/api_config";

export const stateContext = React.createContext({
  domainName: "",
  config: {},
});

export const StateContextProvider = (props) => {
  const [domain, setDomain] = useState("");
  const [config, setConfig] = useState({});

  useEffect(async () => {
    setDomain(location.hostname);
    await fetch(api_config.config, {
      method: "GET",
      dataType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // use method json() to read the response stream
        // and parse the body part as JSON.
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setConfig(response);
      });
  }, []);
  return (
    <stateContext.Provider value={{ domainName: domain, config: config }}>
      {props.children}
    </stateContext.Provider>
  );
};
