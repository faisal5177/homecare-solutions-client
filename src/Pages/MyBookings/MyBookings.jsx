import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState({});

  // 🔄 Fetch bookings and their services
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5000/bookings?email=${user.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        setBookings(res.data);

        // Fetch service names for each booking
        res.data.forEach((booking) => {
          axios
            .get(`http://localhost:5000/services/${booking.service_id}`)
            .then((serviceRes) => {
              setServices((prev) => ({
                ...prev,
                [booking.service_id]: serviceRes.data.service_name,
              }));
            })
            .catch((err) => console.error('Error fetching service:', err));
        });
      })
      .catch((err) => console.error('Error fetching bookings:', err));
  }, [user?.email]);

  // 🗑️ Handle delete with SweetAlert confirm
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/bookings/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              // Remove from state without reloading
              setBookings((prev) => prev.filter((b) => b._id !== id));

              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Booking deleted successfully!',
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Delete failed',
                text: 'Could not delete the booking.',
              });
            }
          })
          .catch((err) => {
            console.error('Error deleting booking:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong while deleting.',
            });
          });
      }
    });
  };

  return (
    <div className='m-5'>
      <h2 className="text-3xl mb-4">Bookings: {bookings.length}</h2>

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
                    ? new Date(booking.serviceDate).toLocaleDateString(
                        'en-GB',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }
                      )
                    : 'No Date'}
                </td>
                <td>{booking.location || 'No Location'}</td>
                <td>
                  <button onClick={() => handleDelete(booking._id)}>
                    <RiDeleteBin6Fill className="text-red-600 w-[24px] h-[24px] ml-2" />
                  </button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
