import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Header from "./components/Header"
import Courseregpage from "./components/CourseReg.jsx"

// const router = createBrowserRouter(routes);

// const reg = [
//   { id: 1, course_id: 'CS101', coursename:'Intro to Computers', instructor: 'John Doe', credits: 3, semester: 'Spring 2024', slot: 'N', current : [150, 200], elective: 'Free'},
//   { id: 2, course_id: 'ENG201', coursename: 'English Grammar', instructor: 'Jane Smith', credits: 4, semester: 'Fall 2024', slot: 'Z', current: [31, 49], elective: 'Departmental'}
// ]

// const aval = [
//   { id: 1, course_id: 'CS111', coursename: 'Comp Sci 2', instructor: 'John Villa', credits: 3, semester: 'Spring 2024', slot: 'J', current: [16, 100], elective: null},
//   { id: 2, course_id: 'ENG281', coursename: 'English Intro', instructor: 'Jane Smith', credits: 4, semester: 'Fall 2024', slot: 'K', current: [25, 50], elective: null}
// ]

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <Header/>
  //   <RouterProvider router={router} />
  // </React.StrictMode>

  <Courseregpage regCourses = {reg} avalCourses = {aval}/>
);

