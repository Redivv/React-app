import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./global.css";
import "./boostrapOverrides.css";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById("root")
);
