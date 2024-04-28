import Homepage from "./components/Homepage"
import ErrorPage from "./components/ErrorPage";
import Redirect from "./components/Redirect";
import Registration from "./components/Registration";
import CourseDetailsPage from "./components/CourseDetailsPage";
import Selection from "./components/Selection";
import Grading from "./components/Grading";
import Feedback from './components/Feedback';


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
    path: "/selection",
    element: < Selection/>,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/feedback",
    element: < Feedback/>,
  },
  {
    path: "/grading",
    element: < Grading/>,
  },
  {
    path: "/course-details/:coursecode",
    element: <CourseDetailsPage />,
    errorElement: <ErrorPage />,
  }
];

export default routes;