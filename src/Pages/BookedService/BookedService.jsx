import React, { useEffect, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAuth from "./../../hooks/useAuth";

const BookedServices = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`http://localhost:5000/bookings?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch((error) => console.error("Error fetching bookings:", error))
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  const handleDelete = (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/bookings/${bookingId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount === 1) {
              setBookings((prev) =>
                prev.filter((booking) => booking._id !== bookingId)
              );
              Swal.fire(
                "Deleted!",
                "Your booking has been deleted.",
                "success"
              );
            }
          })
          .catch((error) => console.error("Error deleting booking:", error));
      }
    });
  };

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className="container mx-auto my-5 px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">
        My Booked Services: {bookings.length}
      </h2>

      {loading ? (
        <div>Loading booked services...</div>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">No booked services found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div key={booking._id} className="border p-4 rounded-lg shadow-md">
              <img
                src={booking.service_image}
                alt={booking.service_name}
                className="w-full h-48 object-contain rounded bg-gray-100"
                />
              <h3 className="text-lg font-bold mt-2">{booking.service_name}</h3>
              <p>
                <strong>Provider:</strong> {booking.provider_name}
              </p>
              <p>
                <strong>Date:</strong> {booking.serviceDate}
              </p>
              <div className="flex justify-between items-center">
                <p>
                  <strong>Problems:</strong>{" "}
                  {booking.specialInstructions?.length > 0
                    ? booking.specialInstructions.join(", ")
                    : "No problems selected"}
                </p>
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="text-red-600 hover:text-red-800 p-2"
                >
                  <RiDeleteBin5Fill />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedServices;