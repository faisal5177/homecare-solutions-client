import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../Pages/Home/Home';
import SignIn from '../Pages/SignIn/SignIn';
import Register from '../Pages/Register/Register';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import PrivateRoute from './PrivateRoute';
import ServiceBookingApply from './../Pages/ServiceBookingApply/ServiceBookingApply';
import AddService from './../Pages/AddService/AddService';
import ServiceDetails from './../Pages/ServiceDetails/ServiceDetails';
import AllServices from '../Pages/AllServices/AllServices';
import MyBookings from '../Pages/MyBookings/MyBookings';
import ViewBookings from '../Pages/ViewBookings/ViewBookings';
import MyBookedServices from '../Pages/MyBookedServices/MyBookedServices';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: 'serviceBookingApply',
        element: (
          <PrivateRoute>
            <ServiceBookingApply></ServiceBookingApply>
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:5000/services/${params.id}`
          );
          const data = await response.json();
          console.log('Fetched service data:', data);
          return data;
        },
      },
      {
        path: 'services/:id',
        element: (
          <PrivateRoute>
            <ServiceDetails></ServiceDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/services/${params.id}`),
      },

      {
        path: 'addService',
        element: (
          <PrivateRoute>
            <AddService></AddService>
          </PrivateRoute>
        ),
      },
      {
        path : 'myBookings',
        element : <PrivateRoute><MyBookings></MyBookings></PrivateRoute>,
      },
      {
        path : 'viewBookings/:service_id',
        element : <PrivateRoute><ViewBookings></ViewBookings></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/service-bookings?serviceId=${params.service_id}`)
      },
      {
        path: 'myBookedServices',
        element: <PrivateRoute><MyBookedServices></MyBookedServices></PrivateRoute>,
      },
      {
        path: "/serviceBookingApply/:id",
        element: (
          <PrivateRoute>
            <ServiceBookingApply />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/services/${params.id}`),
      },
      {
        path: 'allServices',
        element: (
          <PrivateRoute>
            <AllServices></AllServices>
          </PrivateRoute>
        ),
      },
      { path: '/signIn', element: <SignIn /> },
      { path: '/register', element: <Register /> },
    ],
  },
]);

export default router;
