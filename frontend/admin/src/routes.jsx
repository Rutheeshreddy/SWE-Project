import Homepage from "./components/Homepage"
import ErrorPage from "./components/ErrorPage";
import Redirect from "./components/Redirect";
import Registration from "./components/Registration";
import Selection from "./components/Selection";

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
];

export default routes;