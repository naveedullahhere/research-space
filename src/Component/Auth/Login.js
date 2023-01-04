import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import toast from "react-hot-toast";
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {

    const { URL, dispatch, addUserData, user, removeUserData } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // user && navigate("/my-account");

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onBlur" });

    const onSubmit = (data) => {
        let emailD = email;
        let passwordD = password;
        setIsLoading(true);
        postData(`${URL}api/signin`, { email: emailD, password: passwordD })
            .then(data => {
                if (data.success != false) {
                    toast.success(data.message);
                    dispatch(addUserData(data.data)); 
                    if (data.data.is_varified) {
                        navigate("/my-account");
                    }
                    else {
                        navigate("/verify");
                    }
                    reset();
                } else {
                    toast.error(data.message);
                }
                setIsLoading(false);
            }).catch((err) => {
                setIsLoading(false);
                toast.error("Something went wrong!");

            });

    };

    async function postData(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
    return (
        <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ transition: { duration: 0.3 }, opacity: 0, x: 100 }}>
            <div className="loginMain">

                <form onSubmit={handleSubmit(onSubmit)} className="login-box" method='POST' autoComplete="new-password">
                    <div className="title">
                        <h1>LOGIN</h1>
                    </div>
                    <div className="input-box">
                        <input type="text" name="email" autoComplete={`false`} className={`inputLogin ${errors.email && " is-invalid"}`} id="username" required {...register('email', { pattern: /^\S+@\S+$/i })} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="username">Email</label>
                    </div>

                    {errors.email && <span className='para-sm text-white'>Please Enter a Valid Email</span>}

                    <div className="input-box">
                        <input type="password" name="password" autoComplete="new-password" className="input pass-input" id="password"  {...register('password',)} required onChange={(e) => setPassword(e.target.value)} />
                        <img src="assets/img/view.png" className="view-pass" alt="" />
                        <label htmlFor="password">Password</label>
                    </div>
                    {/* <div className="remember-me">
                        <input type="checkbox" checked name="" id="checkbox" />
                        <label htmlFor="checkbox" className='ps-2'>Remember Me</label>
                    </div> */}
                    <button type="submit" className=''>
                        Login
                        {isLoading &&
                            <div className="spinner-border me-5" style={{ "float": "right" }} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                    </button>
                    <div className="auth-action">
                        <Link to="/register">Sign Up</Link>
                        <a href="#">Forget Password?</a>
                    </div>
                </form>
            </div>

        </motion.div>
    )
}
