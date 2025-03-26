import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";
import Swal from "sweetalert2";

const ServiceBookingApply = ({onClose = () => {}}) => {
  const service = useLoaderData();
  const navigate = useNavigate();
  const { user } = useAuth(); 

  if (!service) {
    return <div>Loading service details...</div>;
  }

  const { _id, service_name, service_image, price, service_provider } = service;
  const { name: provider_name, email: provider_email } = service_provider || {};

  const [bookingDetails, setBookingDetails] = useState({
    serviceDate: "",
    specialInstructions: [],
  });

  const problemOptions = [
    "Leaking pipe",
    "Need electrical repair",
    "Roof leakage needs fixing",
    "Door or window repair needed",
    "Painting and coloring work required",
    "Furniture needs fixing",
    "AC not cooling properly",
    "Carpet has tough stains",
    "Plumbing issue in the kitchen",
    "Electric short circuit problem",
    "Kitchen is too greasy and needs cleaning",
    "Floor polish is damaged",
  ];

  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleProblemChange = (e) => {
    const { value, checked } = e.target;
    setBookingDetails((prev) => ({
      ...prev,
      specialInstructions: checked
        ? [...prev.specialInstructions, value]
        : prev.specialInstructions.filter((item) => item !== value),
    }));
  };

  const handleBooking = () => {
    if (!user) {
      Swal.fire("Error", "You must be logged in to book a service.", "error");
      return;
    }

    const bookingData = {
      service_id: _id,
      service_name,
      service_image,
      provider_email,
      provider_name,
      user_email: user.email,
      user_name: user.displayName || user.email,
      serviceDate: bookingDetails.serviceDate,
      specialInstructions: bookingDetails.specialInstructions,
      price,
      serviceStatus:
        bookingDetails.specialInstructions.length > 0 ? "Pending" : "Confirmed",
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData), 
    })    
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Booking Success!",
            text: "Your service has been booked successfully.",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/bookedServices");
              onClose();
            }
          });
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Book Service</h2>
        <p>
          <strong>Service:</strong> {service_name}
        </p>
        <p>
          <strong>Provider:</strong> {provider_name} ({provider_email})
        </p>
        <p>
          <strong>Price:</strong> ${price}
        </p>

        <label className="block text-sm font-medium mt-4">Service Date</label>
        <input
          type="date"
          name="serviceDate"
          className="border p-2 w-full rounded"
          value={bookingDetails.serviceDate}
          onChange={handleChange}
        />

        <label className="block text-sm font-medium mt-4">
          Select Problems
        </label>
        {problemOptions.map((problem, index) => (
          <div key={index}>
            <input
              type="checkbox"
              value={problem}
              onChange={handleProblemChange}
            />{" "}
            {problem}
          </div>
        ))}

        <div className="flex justify-end mt-4">
          <button
            className="btn btn-secondary mr-2"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleBooking}>
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceBookingApply;