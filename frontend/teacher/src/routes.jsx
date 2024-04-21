import Homepage from "./components/Homepage"
import ErrorPage from "./components/ErrorPage";
import Redirect from "./components/Redirect"
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

];

export default routes;