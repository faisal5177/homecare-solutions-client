import { Link, useLoaderData } from "react-router-dom";

const ServiceDetails = () => {
  const service = useLoaderData();

  const { _id, service_name, service_description, service_image, price, service_provider } = service;
  const { name: provider_name, image: provider_image, location } = service_provider || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img className="w-full h-64 object-cover" src={service_image} alt={service_name} />
        <div className="p-6">
          <h2 className="text-2xl font-semibold">{service_name}</h2>
          <p className="text-gray-600 mt-2">{service_description}</p>
          
          {provider_name && (
            <div className="flex items-center mt-4">
              <img className="w-12 h-12 rounded-full border" src={provider_image} alt={provider_name} />
              <div className="ml-3">
                <p className="text-lg font-semibold">{provider_name}</p>
                <p className="text-gray-500 text-sm">{location}</p>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-6">
            <p className="text-xl font-bold text-primary">${price}</p>
            <Link to={`/serviceBook/${_id}`}>
              <button className="btn btn-primary">Book Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;