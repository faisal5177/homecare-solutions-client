import {
    createBrowserRouter
  } from "react-router-dom";
  import MainLayout from "../layout/MainLayout";
import Home from './../Pages/Home/Home';
import SignIn from './../Pages/SignIn/SignIn';
import Register from './../Pages/Register/Register';
import ServiceDetails from './../Pages/ServiceDetails/ServiceDetails';
import PrivateRoute from './PrivateRoute';

  const router = createBrowserRouter([
    {
      path: "/",
      element:  <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/services/:id",
          element: (
            <PrivateRoute>
              <ServiceDetails />
            </PrivateRoute>
          ),
          loader: ({ params }) =>
            fetch(`http://localhost:5000/services/${params.id}`)
        },
        {
          path: "signIn",
          element: <SignIn></SignIn>
        },
        {
          path: "register",
          element: <Register></Register>
        },
      ],
    },
  ]);

  export default router;