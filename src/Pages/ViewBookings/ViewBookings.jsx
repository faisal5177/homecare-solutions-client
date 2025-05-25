import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from 'sweetalert2';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [updated, setUpdated] = useState(false); // trigger for re-render
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/enriched-bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched bookings:', data);
        setBookings(data);
      })
      .catch((err) => console.error('Error fetching bookings:', err));
  }, [user?.email, updated]); // Add updated here

  const handleDelete = (id) => {
    // Optional confirmation with SweetAlert
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
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
              // Update bookings state
              setBookings((prev) => prev.filter((booking) => booking._id !== id));
              setUpdated((prev) => !prev); // Force re-fetch if needed

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
    <div className="m-5">
      <h2 className="text-3xl mb-4">All Service Bookings: {bookings.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Service Name</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.user_email || 'N/A'}</td>
                  <td>{booking.name || 'Unknown Service'}</td>
                  <td>{booking.location || user.location || 'No Location'}</td>
                  <td>{booking.status || 'Pending'}</td>
                  <td>
                    <button onClick={() => handleDelete(booking._id)}>
                      <RiDeleteBin6Fill className='text-red-600 w-[24px] h-[24px] ml-2' />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBookings;
