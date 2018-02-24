import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/bulma.css";
import "./styles/font-awesome.min.css";
import App from "./containers/App";
import registerServiceWorker from "./workers/registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
