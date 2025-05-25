import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyBookedServices = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/enriched-bookings?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch((err) => console.error('Error fetching bookings:', err));
    }
  }, [user?.email]);

  const handleStatusUpdate = (e, id) => {
    const newStatus = e.target.value;
    const data = { status: newStatus };

    fetch(`http://localhost:5000/bookings/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update status');
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your update has been placed!',
            showConfirmButton: false,
            timer: 1500,
          });

          // Update local state
          setBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking._id === id ? { ...booking, status: newStatus } : booking
            )
          );
        }
      })
      .catch((err) => {
        console.error('Error updating status:', err);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your update has been placed!',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div>
      <h2 className="text-3xl mb-4 font-semibold">
       Booked Services: {bookings.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Service Name</th>
              <th>Date</th>
              <th>Price</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={
                      booking.image ||
                      'https://i.ibb.co/2kRZ7wS/placeholder.png'
                    }
                    alt={booking.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{booking.name}</td>
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
                <td>{booking.price ? `${booking.price}৳` : 'N/A'}</td>
                <td>{booking.location || 'Unknown'}</td>
                <td>
                  <select
                    onChange={(e) => handleStatusUpdate(e, booking._id)}
                    defaultValue={booking.status || 'Change Status'}
                    className="select select-bordered select-xs w-full max-w-xs"
                  >
                    <option disabled>Change Status</option>
                    <option>Pending</option>
                    <option>working</option>
                    <option>Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookedServices;
