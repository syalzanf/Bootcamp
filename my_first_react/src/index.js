import React from "react"; //memanggil modul react
import ReactDOM from "react-dom/client"; 
import App from "./app";
import 'semantic-ui-css/semantic.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// const el = document.getElementById('root');
// const root = ReactDOM.createRoot(el);

// const app = <App />;
// ReactDOM.render(app, document.getElementById("root"));