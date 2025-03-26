import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2'; 

const ViewServiceBookingApplications = () => {
    const applications = useLoaderData();

    if (!applications) {
        return <p className="text-center text-xl font-semibold">Loading applications...</p>;
    }

    const handleStatusUpdate = (e, id) => {
        console.log(e.target.value, id);
        const data = { status: e.target.value };
    
        fetch(`https://job-protal-server-nine.vercel.app/job-applications/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        .then((res) => {
            if (!res.ok) throw new Error('Failed to update status');
            return res.json();
        })
        .then((data) => {
            if (data.modifiedCount) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Status has been updated.',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        })
        .catch(error => console.error('Error updating status:', error));
    };

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
                                            onChange={(e) => handleStatusUpdate(e, app._id)}
                                            defaultValue={app.status || 'Change Status'}
                                            className="select select-bordered select-xs w-full max-w-xs">
                                            <option disabled>Change Status</option>
                                            <option>Under Review</option>
                                            <option>Set Interview</option>
                                            <option>Hired</option>
                                            <option>Rejected</option>
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

export default ViewServiceBookingApplications;
