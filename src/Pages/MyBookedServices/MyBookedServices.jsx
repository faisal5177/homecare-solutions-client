import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const MyBookedServices = () => {
    const [services, setServices] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:5000/services?email=${user.email}`)
        .then(res => res.json())
            .then(data => setServices(data))
    }, [user.email])

    return (
        <div>
            <h2 className='text-3xl'>My Booked Services: {services.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Service Title</th>
                            <th>Deadline</th>
                            <th>Booking Count</th>
                            <th>Bookings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            services.map((service, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{service.title}</td>
                                <td>{service.bookingDeadline}</td>
                                <td>{service.bookingCount}</td>
                                <td>
                                    <Link to={`/viewBookings/${service._id}`}>
                                        <button className='btn btn-link'>View Bookings</button>
                                    </Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBookedServices;