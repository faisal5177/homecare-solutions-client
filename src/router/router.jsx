import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/SignIn/SignIn";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage"; 
import PrivateRoute from './PrivateRoute';
import ServiceBookingApply from './../Pages/ServiceBookingApply/ServiceBookingApply';
import AddService from './../Pages/AddService/AddService';
import ServiceDetails from './../Pages/ServiceDetails/ServiceDetails';
import ViewServiceBookingApplications from "../Pages/ViewServiceBookingApplications/ViewServiceBookingApplications";
import BookedServices from './../Pages/BookedService/BookedService';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />, 
    children: [
      { path: "/", element: <Home /> },
      {
        path: "serviceBookingApply",
        element: <PrivateRoute><ServiceBookingApply></ServiceBookingApply></PrivateRoute>,
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:5000/services/${params.id}`
          );
          const data = await response.json();
          console.log("Fetched service data:", data); 
          return data;
        },
      },     
      {
        path: 'services/:id',
        element: <PrivateRoute><ServiceDetails></ServiceDetails></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
      },
      
      {
        path: "addService",
        element: <PrivateRoute><AddService></AddService></PrivateRoute>
      },
      {
        path: "/serviceBookingApply/:id",
        element: <ServiceBookingApply />,
        loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
      }, 
      {
        path: "viewServiceBookingApplications/:id",
        element: <PrivateRoute><ViewServiceBookingApplications /></PrivateRoute>,
        loader: async ({ params }) => {
          try {
            const response = await fetch(`http://localhost:5000/service-application?serviceId=${params.id}`);
            if (!response.ok) throw new Error("Failed to load applications");
            return response.json();
          } catch (error) {
            console.error("Error loading applications:", error);
            return [];
          }
        }
      },                
      {
        path: "/bookedServices",
        element: (
          <PrivateRoute>
            <BookedServices/>
          </PrivateRoute>
        ),
      },
      { path: "/signIn", element: <SignIn /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default router;
