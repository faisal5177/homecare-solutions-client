import React, { useEffect, useState } from 'react';
import HotServiceCard from './HotServiceCard';

const HotServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/services')
        .then(res => res.json())
        .then(data => {
            setServices(data);
        })
    },[])

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                    services.map(service =><HotServiceCard key={service._id}  service={service}></HotServiceCard>)
                }
            </div>
        </div>
    );
};

export default HotServices;