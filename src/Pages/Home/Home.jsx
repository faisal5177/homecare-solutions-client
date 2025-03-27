import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import HotServices from './HotServices';
import useAuth from './../../hooks/useAuth';

const Home = () => {
    const { user } = useAuth(); 
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched Services for Home:", data);
                setServices(data.slice(0, 6));
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching services:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <Banner user={user} />
            {loading ? (
                <p className="text-center text-lg font-semibold mt-10">Loading services...</p>
            ) : (
                <HotServices services={services} />
            )}
        </div>
    );
};

export default Home;
