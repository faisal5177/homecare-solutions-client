import { easeOut } from "motion";
import { motion } from "motion/react"
import { Link } from 'react-router-dom';

const Banner = ({ user }) => {
    return (
        <div className="hero bg-base-200 min-h-96 border rounded-lg my-5 shadow-2xl">
            <div className="hero-content ml-10 flex-col lg:flex-row-reverse">
                <div className="flex-1 flex-col-reverse">
                    <motion.img
                        animate={{ y: [50, 100, 50] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        src="https://i.ibb.co/d4GySw33/room-cleaning.jpg"
                        className="max-w-64 rounded-T-[40px] rounded-br[40px] border-l-8 border-b-8 border-sky-500 mb-5 rounded-3xl rounded-bl-none shadow-2xl"
                        alt="Cleaning Service"
                    />
                    <motion.img
                        animate={{ x: [-100, -150, -100] }}
                        transition={{ duration: 10, delay: 5, repeat: Infinity }}
                        src="https://i.ibb.co/BW3rqLL/electrician-home.jpg"
                        className="max-w-60 rounded-T-[40px] rounded-br[40px] border-l-8 border-b-8 border-sky-500 rounded-3xl ml-[250px] right-24 rounded-bl-none shadow-2xl"
                        alt="Electrician Service"
                    />
                </div>

                <div className="flex-1 mr-10">
                    <motion.h1
                        animate={{ x: 50 }}
                        transition={{ duration: 2, delay: 1, ease: easeOut, repeat: Infinity }}
                        className="text-5xl font-bold">Most Used <motion.span
                            animate={{ color: ['#ecf94a', '#34f0bd', '#f05834'] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >Services</motion.span></motion.h1>
                    <p className="py-6 text-sm">
                        <span>
                            <span className="font-bold text-xl mr-1 text-green-400">Cleaning services</span> help maintain hygiene in homes and offices.
                        </span>
                        <br />
                        <span>
                            <span className="font-bold mr-1 text-xl text-red-400">Electrician services</span> are essential for resolving electrical issues.
                        </span>
                    </p>

                    {user && (
                        <Link to='/allServices'>
                            <button className="btn btn-primary">All Services</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Banner;
