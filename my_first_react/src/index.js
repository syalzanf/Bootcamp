import React from "react"; //memanggil modul react
import ReactDOM from "react-dom"; 
import App from "./app";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const app = <App />;
// ReactDOM.render(app, document.getElementById("root"));