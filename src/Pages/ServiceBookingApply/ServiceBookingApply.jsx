import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const ServiceBookingApply = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const submitServiceBooking = e => {
        e.preventDefault();
        const form = e.target;
        const linkedIn = form.linkedIn.value;
        const github = form.github.value;
        const resume = form.resume.value;

        const bookingData = {
            service_id: id,
            user_email: user.email,
            linkedIn,
            github,
            resume,
            status: 'Pending' // Optional: Default booking status
        };

        fetch(`http://localhost:5000/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your booking has been placed!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/myBookings');
                }
            })
            .catch(err => {
                console.error("Booking error:", err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong with your booking!",
                });
            });
    };

    return (
        <div className="card bg-base-100 w-full shadow-2xl">
            <h1 className="text-5xl font-bold text-center mt-6">Book Service and Good Luck!</h1>
            <form onSubmit={submitServiceBooking} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">LinkedIn URL</span>
                    </label>
                    <input type="url" name="linkedIn" placeholder="LinkedIn URL" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Github URL</span>
                    </label>
                    <input type="url" name='github' placeholder="Github URL" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Resume URL</span>
                    </label>
                    <input type="url" name='resume' placeholder="Resume URL" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Book</button>
                </div>
            </form>
        </div>
    );
};

export default ServiceBookingApply;
