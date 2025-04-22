import React from 'react';
import { Link } from 'react-router-dom';

const HotServiceCard = ({ service }) => {
  const { _id, service_name, service_description, service_image, price, service_provider, created_at } = service;
  const provider_name = service_provider?.name || "Unknown";
  const provider_image = service_provider?.image || "https://i.ibb.co/2FsfXqM/default-avatar.png";

  const formattedDate = new Date(created_at).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="card bg-white shadow-md border rounded-lg p-3 mb-5">
      <figure>
        <img className="rounded-t-lg w-full h-40 object-cover" src={service_image} alt={service_name} />
      </figure>

      <div className="card-body p-3">
        <h2 className="text-lg font-semibold">{service_name}</h2>
        <p className="text-gray-600 text-sm">
          {service_description.length > 80 ? service_description.slice(0, 80) + '...' : service_description}
        </p>

        {/* Service Provider Info */}
        <div className="flex items-center gap-2 mt-2">
          <img className="w-8 h-8 rounded-full border" src={provider_image} alt={provider_name} />
          <p className="text-xs font-medium">{provider_name}</p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-sm font-bold text-primary">${price}</p>
          <p className="text-xs text-gray-500">{formattedDate}</p>
          <Link to={`/services/${_id}`}>
            <button className="btn btn-xs btn-primary">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotServiceCard;
