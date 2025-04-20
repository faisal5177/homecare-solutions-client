import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/bookings?email=${user.email}`, {
          withCredentials: true,
        })
        .then((res) => setBookings(res.data));
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/bookings/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setBookings(bookings.filter((b) => b._id !== id));
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };

  return (
    <div>
      <h2 className="text-3xl mb-4">My Bookings: {bookings.length}</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Service ID</th>
              <th>Service Date</th>
              <th>Instructions</th>
              <th>Resume</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.service_id}</td>
                <td>{booking.serviceDate}</td>
                <td>{booking.specialInstructions || "N/A"}</td>
                <td>
                  <a
                    href={booking.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Resume
                  </a>
                </td>
                <td>
                <button onClick={() => handleDelete(booking._id)} className="btn btn-xs btn-error">
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
