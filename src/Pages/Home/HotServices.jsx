import React from 'react';
import HotServiceCard from './HotServiceCard';

const HotServices = ({ services = [] }) => {
    if (!services.length) {
        return <p className="text-center text-lg font-semibold mt-10">No services available</p>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                    <HotServiceCard key={service._id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default HotServices;
