import Login from "./components/Login"
import ErrorPage from "./components/ErrorPage";

const routes = [
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },

];

export default routes;