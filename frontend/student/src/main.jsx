import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Header from "./components/Header"
import Courseregpage from "./components/course_reg.jsx"

// const router = createBrowserRouter(routes);

const sample1 = [
  { id: 1, Course_ID: 'CS101', Instructor: 'John Doe', Credits: 3, Semester: 'Spring 2024', Elective: 'No' },
  { id: 2, Course_ID: 'ENG201', Instructor: 'Jane Smith', Credits: 4, Semester: 'Fall 2024', Elective: 'Yes' }
]

const sample2 = [
  { id: 1, Course_ID: 'CS111', Instructor: 'John Villa', Credits: 3, Semester: 'Spring 2024', Elective: 'No' },
  { id: 2, Course_ID: 'ENG201', Instructor: 'Jane Smith', Credits: 4, Semester: 'Fall 2024', Elective: 'Yes' }
]

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <Header/>
  //   <RouterProvider router={router} />
  // </React.StrictMode>

  <Courseregpage regCourses = {sample1} avalCourses = {sample2}/>
);

