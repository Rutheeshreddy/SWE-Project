import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header"
import Courseregpage from "./components/CourseReg.jsx"

// const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header/>
    <RouterProvider router={router} />
  </React.StrictMode>

 
);

