import Homepage from "./components/Homepage"
import ErrorPage from "./components/ErrorPage";
import Redirect from "./components/Redirect";
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
    element: < Redirect/>,
  },
  {
    path: "/feedback",
    element: < Redirect/>,
  },
  {
    path: "/grading",
    element: < Redirect/>,
  },
];

export default routes;