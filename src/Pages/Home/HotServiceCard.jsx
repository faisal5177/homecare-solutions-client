import React from 'react';
import { Link } from 'react-router-dom';

const HotServiceCard = ({ service }) => {
    const { _id, service_name, service_description, service_image, price, service_provider, created_at } = service;
    const { name: provider_name, image: provider_image } = service_provider;

    // Convert timestamp to a readable date format
    const formattedDate = new Date(created_at).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    return (
        <div className="card bg-base-100 shadow-md border rounded-lg p-3 mb-5">
            {/* Service Image */}
            <figure>
                <img className="rounded-t-lg w-full md:h-36 object-cover" src={service_image} alt={service_name} />
            </figure>

            {/* Card Body */}
            <div className="card-body p-3">
                <h2 className="text-lg font-semibold">{service_name}</h2>

                {/* Service Description (Max 80 Characters) */}
                <p className="text-gray-600 text-sm">
                    {service_description.length > 80 ? service_description.slice(0, 80) + '...' : service_description}
                </p>

                {/* Service Provider Info */}
                <div className="flex items-center gap-2 mt-2">
                    <img className="w-8 h-8 rounded-full border" src={provider_image} alt={provider_name} />
                    <p className="text-xs font-medium">{provider_name}</p>
                </div>

                {/* Price, Created Date & View Details Button */}
                <div className="flex justify-between items-center">
                    <p className="text-sm font-bold text-primary">${price}</p>
                    <p className="text-xs text-gray-500">{formattedDate}</p> {/* Show formatted date */}
                    <Link to={`/services/${_id}`}>
                        <button className="btn btn-xs btn-primary">Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotServiceCard;