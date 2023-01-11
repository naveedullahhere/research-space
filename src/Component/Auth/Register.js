import React, { useState, useContext } from 'react';
import toast from "react-hot-toast";
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { PromiseButton } from '../Buttons/PromiseButton';

export const Register = () => {

    const { URL, addUserData, dispatch, user, WishlistItems, API_TOKEN } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at 8 char long'),
        confirmPwd: Yup.string()
            .required('Password is required')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState;

    const onSubmit = (data) => {
        let emailD = email;
        let passwordD = password;
        let usernameD = userName;
        setIsLoading(true)
        console.log(data.domain);
        postData(`${URL}api/web/signup`, { email: emailD, password: passwordD, name: usernameD, domain: data.domain })
            .then(data => {
                if (data.success != false) {
                    dispatch(addUserData(data.data, []));
                    toast.success(data.message);
                    navigate("/my-account");
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
                <form onSubmit={handleSubmit(onSubmit)} className="login-box" autocomplete="on">
                    <div className="fs-5">
                        <h1 className='fs-4 fw-bold'> CREATE YOUR ACCOUNT</h1>
                    </div>
                    <div className="input-box">
                        <input type="hidden" {...register('domain')} name="domain" value={window.location.href} />
                        <input type="text" name="username" class={`inputLogin ${errors.username && "form-control is-invalid"}`} id="username"  {...register('username', { required: true })} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-box">
                        <input type="email" name="email" class={`inputLogin ${errors.email && "form-control is-invalid"}`} {...register('email', { required: true, pattern: /^\S+@\S+$/i })} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                    </div>
                    {/* {errors.email && <span className='para-sm text-white'>Please Enter a Valid Email</span>} */}

                    <div className="input-box">
                        <input type="password" name="password" id="password"  {...register('password')} onChange={(e) => setPassword(e.target.value)}
                            className={`input pass-input ${errors.password ? 'is-invalid' : ''}`} />
                        <img src="assets/img/view.png" className="view-pass" alt="" />
                        <label htmlFor="password">Password</label>
                        <div className="invalid-feedback text-white">{errors.password?.message}</div>
                    </div>
                    <div className="input-box">
                        <input type="password" name="cpassword"  {...register('confirmPwd')}
                            className={`input pass-input ${errors.confirmPwd ? 'is-invalid' : ''}`} id="cpassword" />
                        <img src="assets/img/view.png" className="view-pass" alt="" />
                        <label htmlFor="cpassword">Confirm Password</label>
                        <div className="invalid-feedback text-white">{errors.confirmPwd?.message}</div>
                    </div>
                    {/* <div className="remember-me">
                        <input type="checkbox" checked name="" id="checkbox" />
                        <label htmlFor="checkbox" className='px-2'>Remember Me</label>
                    </div> */}

                    <button type='submit' className='py-2'>
                        <PromiseButton title={"Signup"} typ='text-white' loading={isLoading} />
                    </button>

                    <div className="auth-action">
                        <Link to="/login">Sign In</Link>
                        <a href="#">Forget Password?</a>
                    </div>
                </form>
            </div>

        </motion.div>
    )
}
