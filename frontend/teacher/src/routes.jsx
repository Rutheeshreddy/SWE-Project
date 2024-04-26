import Homepage from "./components/Homepage"
import ErrorPage from "./components/ErrorPage";
import Redirect from "./components/Redirect"
import CourseSelectionPage from "./components/CourseSelectionPage";
import TaughtCoursesPage from "./components/TaughtCoursesPage";
import CourseDetailsPage from "./components/CourseDetailsPage";
import PastCourseDetailsPage from "./components/PastCourseDetailsPage";

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
    path: "/course-selection",
    element: <CourseSelectionPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/taught-courses",
    element: <TaughtCoursesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/course-details/:course",
    element: <CourseDetailsPage />,
    errorElement: <ErrorPage />,
  }, 
  {
    path: "/past-course-details",
    element: <PastCourseDetailsPage />,
    errorElement: <ErrorPage />,
  }
];

export default routes;