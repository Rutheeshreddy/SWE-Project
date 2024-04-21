import Homepage from "./components/Homepage"
import ErrorPage from "./components/ErrorPage";
import Redirect from "./components/Redirect"
import CourseFeedbackPage from "./components/CourseFeedbackPage";
import RegisteredCourses from "./components/RegisteredCourses";
import CourseReg from "./components/CourseReg";

const routes = [
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/redirect/:token",
    element: < Redirect/>,
  },
  {
    path: "/registered-courses",
    element: <RegisteredCourses />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/course-registration",
    element: <CourseReg />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/course-feedback",
    element: <CourseFeedbackPage />,
    errorElement: <ErrorPage />,
  },
];

export default routes;