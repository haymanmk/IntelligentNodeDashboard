import { useEffect } from "react";
import store from "./index.js";
import { Provider } from "react-redux";
import api_config from "src/pages/api_config.js";
import { storeAction } from "./state-slice.js";

export const StateProvider = (props) => {
  useEffect(() => {
    storeAction.setDomainName(location.hostname);

    fetch(api_config.config, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Context-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        // console.log(response);
        storeAction.setConfig(response);
      });
  }, []);

  return <Provider store={store}>{props.children}</Provider>;
};
