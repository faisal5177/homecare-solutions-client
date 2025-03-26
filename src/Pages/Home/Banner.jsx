import { easeOut } from "motion";
import { motion } from "motion/react"

const Banner = () => {
    return (
        <div className="hero bg-base-200 min-h-96 border rounded-lg my-5 shadow-2xl">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="flex-1 flex-col-reverse">
                    <motion.img
                        animate={{ y: [50, 100, 50] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        src="https://i.ibb.co.com/d4GySw33/room-cleaning.jpg"
                        className="max-w-64 rounded-T-[40px] rounded-br[40px] border-l-8 border-b-8 border-sky-500 mb-5 rounded-3xl rounded-bl-none shadow-2xl"
                        alt="Box Office"
                    />
                    <motion.img
                        animate={{ x: [-100, -150, -100] }}
                        transition={{ duration: 10, delay: 5, repeat: Infinity }}
                        src="https://i.ibb.co.com/BW3rqLL/electrician-home.jpg"
                        className="max-w-60 rounded-T-[40px] rounded-br[40px] border-l-8 border-b-8 border-sky-500 rounded-3xl ml-[250px] right-24 rounded-bl-none shadow-2xl"
                        alt="Box Office"
                    />
                </div>

                <div className="flex-1">
                    <motion.h1
                        animate={{ x: 50 }}
                        transition={{ duration: 2, delay: 1, ease: easeOut, repeat: Infinity }}
                        className="text-5xl font-bold">Most Used <motion.span
                            animate={{ color: ['#ecf94a', '#34f0bd', '#f05834'] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >Services</motion.span></motion.h1>
                    <p className="py-6 text-sm">
                        <span>
                            <span className="font-bold text-lg text-green-400">Cleaning services</span> are essential for maintaining hygiene in homes and offices, especially for busy individuals. These services, including deep cleaning, carpet cleaning, and window cleaning, save time and ensure a healthier environment.
                        </span>
                        <br />
                        <span>
                            <span className="font-bold text-lg text-red-400">Electrician services</span> are crucial for resolving electrical issues like faulty fittings, lighting problems, and power outages. Skilled electricians ensure safety and efficiency, making this service vital for home maintenance and new installations.
                        </span>
                    </p>
                    <button className="btn btn-primary">All Services</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;