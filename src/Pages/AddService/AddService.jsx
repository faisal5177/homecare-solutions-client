import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const AddService = ({ setServices }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Updated User Data:", user);
  }, [user]);

  const handleAddService = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());

    const newService = {
      service_image:
        initialData.service_image ||
        user?.photoURL ||
        "https://placehold.co/150",
      service_name: initialData.service_name,
      price: parseFloat(initialData.price),
      service_area: initialData.location,
      service_description: initialData.description,
      service_provider: {
        provider_id: user?.uid || "N/A",
        name: initialData.provider_name || user?.displayName || "Unknown",
        image:
          initialData.image ||
          user?.photoURL ||
          "https://i.ibb.co/2FsfXqM/default-avatar.png",
        email: initialData.email || user?.email || "Not Available",
      },
      created_at: new Date().toISOString(),
    };

    console.log("Service Data to be Added:", newService);

    try {
      const response = await fetch(`http://localhost:5000/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      setLoading(false);

      if (response.ok && data.serviceId) {
        Swal.fire("Success", "Service has been added successfully!", "success");

        if (setServices) {
          setServices((prevServices) => [
            ...prevServices,
            { ...newService, _id: data.serviceId },
          ]);
        }

        navigate("/allServices");
      } else {
        Swal.fire("Error", data?.error || "Failed to add service!", "error");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error adding service:", error);
      Swal.fire("Error", error.message || "Something went wrong!", "error");
    }
  };

  return (
    <div className="mx-auto px-10 w-full border-2 border-gray-300 rounded-lg shadow-lg my-10">
      <h2 className="text-2xl font-bold text-center mt-5">Add a New Service</h2>

      {/* Service Provider Info */}
      <div className="text-center my-4">
        <h3 className="text-lg font-semibold">Service Provider</h3>
        <img
          src={user?.photoURL || "https://i.ibb.co/2FsfXqM/default-avatar.png"}
          alt="Image"
          width="50"
          className="mx-auto rounded-full"
        />
        <p><strong>Name:</strong> {user?.displayName || "Unknown"}</p>
        <p><strong>Email:</strong> {user?.email || "Not Available"}</p>
      </div>

      <form onSubmit={handleAddService} className="card-body">
        {/* Provider Name */}
        <div className="form-control">
          <label className="label">Service Provider Name</label>
          <input
            type="text"
            name="provider_name"
            defaultValue={user?.displayName || ""}
            className="w-full input input-bordered"
            required
          />
        </div>

        {/* Provider Email */}
        <div className="form-control">
          <label className="label">Service Provider Email</label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email || ""}
            className="w-full input input-bordered"
            required
          />
        </div>

        {/* Provider Image */}
        <div className="form-control">
          <label className="label">Service Provider Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={user?.photoURL || ""}
            className="w-full input input-bordered"
          />
        </div>

        {/* Service Image */}
        <div className="form-control">
          <label className="label">Service Image URL</label>
          <input
            type="text"
            name="service_image"
            placeholder="Image URL"
            className="w-full input input-bordered"
          />
        </div>

        {/* Service Name */}
        <div className="form-control">
          <label className="label">Service Name</label>
          <input
            type="text"
            name="service_name"
            placeholder="Service Name"
            className="w-full input input-bordered"
            required
          />
        </div>

        {/* Price */}
        <div className="form-control">
          <label className="label">Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full input input-bordered"
            required
          />
        </div>

        {/* Location */}
        <div className="form-control">
          <label className="label">Service Location</label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full input input-bordered"
            required
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">Description</label>
          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary w-full font-bold"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Service"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
