import Logo from '../assets/logof.png';
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export const Footer = () => {
    const { URL } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setIsLoading(true)

        data = JSON.stringify(data);
        fetch(`${URL}api/newsletter-subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    toast.success(json.message);
                }
                else {
                    toast.error(json.message);
                }
                setIsLoading(false);
                reset()
            }).catch(err => {
                toast.error("Something Went Wrong!");
                setIsLoading(false);
            })
    };
    const userid = 1;
    return (
        <footer className="pt-5">
            <div className="container py-md-5">
                <div className="row">
                    <div className="col-md-5 my-md-0 my-3">
                        <Link to="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
                            <img src={Logo} className={'w-75'} alt="" />
                        </Link>
                        <p className="para-sm">MediaChapter is a team of dedicated designers, developers, content creators, SEO specialists, digital marketers, and other experts who share a common passion for great brands</p>
                    </div>

                    <div className="col-md-2 my-md-0 my-3">
                        <h5>SITE MAP</h5>
                        <ul className="nav flex-column mt-3">
                            <li className="nav-item mb-2"><Link to="about" className="nav-link p-0 para-sm">ABOUT</Link></li>
                            <li className="nav-item mb-2"><Link to="portfolio" className="nav-link p-0 para-sm">PORTFOLIO</Link></li>
                            <li className="nav-item mb-2"><Link to="blog" className="nav-link p-0 para-sm">BLOGS</Link></li>
                            <li className="nav-item mb-2"><Link to="contact" className="nav-link p-0 para-sm">CONTACT</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-2 my-md-0 my-3">
                        <h5>OUR POLICIES</h5>
                        <ul className="nav flex-column mt-3">
                            <li className="nav-item mb-2"><Link to="/privacy-policy" className="nav-link p-0 para-sm">Privacy Policy</Link></li>
                            <li className="nav-item mb-2"><Link to="/terms-conditions" className="nav-link p-0 para-sm">Terms & Condition</Link></li>

                        </ul>
                    </div>

                    <div className="col-md-3 my-md-0 my-3">
                        <h5>Get Our Brochure
                        </h5>
                        <div className="d-flex w-100 gap-2 flex-column mt-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                <input id="newsletter1" type="text" class={`form-control shadow-none text-dark border-0 py-2 ${errors.email && "form-control is-invalid  text-dark"}`} {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email address" />
                                <input type="hidden" name="user_id" value={userid} />

                                <button className="btn btn-main w-100" type="submit">
                                    Subscribe
                                    {isLoading &&
                                        <div className="spinner-border me-5" style={{ "float": "right" }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    }
                                </button>
                                {errors.email && <span className='para-sm text-white'>Please Enter a Valid Email</span>}

                            </form>
                        </div>
                        <h5 className='my-3'>Follow US
                        </h5>
                        <div className="footericons d-flex gap-2 align-items-center">
                            <Link to='#' className="ico"><i className="fa-brands fa-facebook"></i></Link>
                            <Link to='#' className="ico"><i className="fa-brands fa-twitter"></i></Link>
                            <Link to='#' className="ico"><i className="fa-brands fa-instagram"></i></Link>
                            <Link to='#' className="ico"><i className="fa-brands fa-pinterest"></i></Link>
                            <Link to='#' className="ico"><i className="fa-brands fa-linkedin"></i></Link>
                        </div>
                    </div>
                </div>

            </div>
            <div className="pt-3 mt-4 border-top para-xs text-center bg-white">
                <p className='mb-0 pb-3 text-black'>Media Chapter is a registered trademark. Media Chapter is registered in Wyoming, United States. Company no: 45999-0038.
                </p>
            </div>

        </footer>
    )
}
