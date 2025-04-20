import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

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

  return (
    <div>
      <h2 className="text-3xl mb-4 font-semibold">
        My Booked Services: {bookings.length}
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
              <th>Provider</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={booking.image || 'https://i.ibb.co/2kRZ7wS/placeholder.png'}
                    alt={booking.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{booking.name}</td>
                <td>
                  {booking.serviceDate
                    ? new Date(booking.serviceDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'No Date'}
                </td>
                <td>{booking.price ? `${booking.price}৳` : 'N/A'}</td>
                <td>{booking.company || 'Unknown'}</td>
                <td>{booking.status || 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookedServices;
