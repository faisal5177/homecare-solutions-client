import registerLottieData from '../../assets/Lottie/register.json';
import { useContext, useState } from "react";
import Lottie from 'lottie-react';
import { AuthContext } from './../../context/AuthContext';
import SocialLogin from './../../shared/SocialLogin';

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const passwordValidationRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

        if (!passwordValidationRegex.test(password)) {
            setError("Password must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character.");
            setLoading(false);
            return;
        }

        setError(null);
        createUser(email, password)
            .then(Result => {
                setLoading(false);
                console.log(Result.user);
            })
            .catch(error => {
                setLoading(false);
                setError(error.message);
                console.log(error.message);
            });
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left w-96">
                        <Lottie animationData={registerLottieData} />
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className="text-5xl font-bold ml-8 mt-4">Register now!</h1>
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label htmlFor="email" className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input id="email" type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label htmlFor="password" className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input id="password" type="password" placeholder="password" name="password" className="input input-bordered" required />
                            </div>
                            {error && <div className="text-red-500">{error}</div>}
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" disabled={loading}>
                                    {loading ? "Registering..." : "Register"}
                                </button>
                            </div>
                            <div>
                                <SocialLogin></SocialLogin>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
