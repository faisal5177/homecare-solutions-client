import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ServiceToDo = () => {
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();
    const provider_email = localStorage.getItem("userEmail");

    useEffect(() => {
        if (!provider_email) {
            Swal.fire({
                icon: "error",
                title: "Unauthorized Access",
                text: "Please log in to view this page.",
            }).then(() => {
                navigate("/signIn");
            });
            return;
        }

        fetch(`http://localhost:5000/todo-services?provider_email=${provider_email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched Data:", data);
                setApplications(data);
            })
            .catch((error) => console.error("Error loading applications:", error));
    }, [navigate, provider_email]);

    return (
        <div>
            <h2 className="text-3xl">Applications for this Service</h2>
            {applications.length === 0 ? (
                <p className="text-center text-lg text-gray-500">No applications found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Update Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, index) => (
                                <tr key={app._id}>
                                    <th>{index + 1}</th>
                                    <td>{app.applicant_email}</td>
                                    <td>{app.status || "Pending"}</td>
                                    <td>
                                        <select
                                            value={app.status || "Pending"}
                                            className="select select-bordered select-xs w-full max-w-xs">
                                            <option>Pending</option>
                                            <option>Working</option>
                                            <option>Completed</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ServiceToDo;
