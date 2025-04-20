import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState({});

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/bookings?email=${user.email}`, {
          withCredentials: true,
        })
        .then((res) => {
          setBookings(res.data);
          res.data.forEach((booking) => {
            axios
              .get(`http://localhost:5000/services/${booking.service_id}`)
              .then((serviceRes) => {
                setServices((prevServices) => ({
                  ...prevServices,
                  [booking.service_id]: serviceRes.data.service_name,
                }));
              })
              .catch((err) => console.error('Error fetching service:', err));
          });
        })
        .catch((err) => console.error('Error fetching bookings:', err));
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/bookings/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setBookings((prevBookings) =>
          prevBookings.filter((b) => b._id !== id)
        );
      })
      .catch((error) => console.error('Error deleting booking:', error));
  };

  return (
    <div>
      <h2 className="text-3xl mb-4">My Bookings: {bookings.length}</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Service Date</th>
              <th>Location</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{services[booking.service_id] || 'Loading...'}</td>
                <td>
                  {booking.serviceDate
                    ? new Date(booking.serviceDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'No Date'}
                </td>
                <td>{booking.location || 'No Location'}</td>
                <td>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
