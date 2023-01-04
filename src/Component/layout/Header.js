import Logo from '../assets/logo.png';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from '../../context/AppContext';
import React, { useState, useEffect, useContext } from 'react';


export const Header = () => {

    const { dispatch, removeUserData, user } = useContext(AppContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isActive, setActive] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setActive(false);
    }, [pathname])

    const toggleClass = () => {
        setActive(!isActive);
    };
    return (
        <>
            <div className="navigation-wrap bg-white start-header start-style">
                <div className="">
                    <div className="row w-100 mx-auto">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-md navbar-light px-xl-5 px-3">
                                <Link className="navbar-brand me-lg-5" to={'/'}><img src={Logo} alt="MediaChapter" width="136" /></Link>
                                <button class={`navbar-toggler ${isActive && ""}`} onClick={toggleClass} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={isActive} >
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div class={`collapse navbar-collapse justify-content-evenly ${isActive ? "show" : " "}`} id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto py-4 py-md-0 gap-3 pb-3">
                                        <li class={`nav-item pl-4 pl-md-0 ml-0 ml-md-4 ${pathname === '/' && "active"}`}>
                                            <Link class={`nav-link`} to='/'>Home</Link>
                                        </li>
                                        <li class={`nav-item pl-4 pl-md-0 ml-0 ml-md-4 ${pathname === '/About' && "active"}`}>
                                            <Link class={`nav-link`} to="/about">About</Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Services</Link>
                                            <ul className="dropdown-menu">
                                                <li><Link className="dropdown-item" to={'/graphic-design'}>Graphics Design</Link></li>
                                                <li><Link className="dropdown-item" to={'/web-development'}>Web Development</Link></li>
                                                <li><Link className="dropdown-item" to={'/seo'}>SEO</Link></li>
                                                <li><Link className="dropdown-item" to={'/digital-marketing'}>Digital Marketing</Link></li>
                                                <li><Link className="dropdown-item" to={'/content-writing'}>Content Writing</Link></li>
                                            </ul>
                                        </li>

                                        <li class={`nav-item pl-4 pl-md-0 ml-0 ml-md-4 ${pathname === '/Portfolio' && "active"}`}>
                                            <Link class={`nav-link`} to={'/portfolio'}>Portfolio</Link>
                                        </li>
                                        <li class={`nav-item pl-4 pl-md-0 ml-0 ml-md-4 ${pathname === '/pricing' && "active"}`}>
                                            <Link class={`nav-link`} to={'/pricing'}>Pricing</Link>
                                        </li>
                                        <li class={`nav-item pl-4 pl-md-0 ml-0 ml-md-4 ${pathname === '/Blog' && "active"}`}>
                                            <Link class={`nav-link`} to={'/blog'}>Blog</Link>
                                        </li>
                                        <li class={`nav-item pl-4 pl-md-0 ml-0 ml-md-4 ${pathname === '/Contact' && "active"}`}>
                                            <Link class={`nav-link`} to={'/contact'}>Contact</Link>
                                        </li>

                                    </ul>
                                    <div className='d-flex align-items-md-center gap-3 flex-md-row flex-column'>
                                        <div className="navbar-nav">
                                            <div className="nav-item dropdown">
                                                <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                        <path fill="#212121" d="M11.5,8 C12.3284271,8 13,8.67157288 13,9.5 L13,10 C13,11.9714437 11.14049,14 8,14 C4.85950997,14 3,11.9714437 3,10 L3,9.5 C3,8.67157288 3.67157288,8 4.5,8 L11.5,8 Z M8,1.5 C9.51878306,1.5 10.75,2.73121694 10.75,4.25 C10.75,5.76878306 9.51878306,7 8,7 C6.48121694,7 5.25,5.76878306 5.25,4.25 C5.25,2.73121694 6.48121694,1.5 8,1.5 Z" />
                                                    </svg> {user ? user.data.name : "Accounts"}
                                                </Link>
                                                {user ?
                                                    <ul className="dropdown-menu">
                                                        {!user.data.is_varified &&

                                                            <li><Link className="dropdown-item" to={'verify'}>Verify</Link></li>

                                                        }
                                                        {user && user.data.is_varified &&
                                                            <>
                                                                <li><Link className="dropdown-item" to={'my-account'}>Account</Link></li>
                                                                {
                                                                    user.data.user_type === "user" &&
                                                                    <>
                                                                        <li><Link className="dropdown-item" to={'projects'}>Projects</Link></li>
                                                                        <li><Link className="dropdown-item" to={'invoices'}>Invoices</Link></li>
                                                                        {/* <li><Link className="dropdown-item" to={'completed-projects'}>Completed Projects</Link></li> */}
                                                                    </>
                                                                }
                                                                <li><Link className="dropdown-item" to={'/project-discussion'}>Discussion</Link></li>
                                                            </>
                                                        }
                                                        <li><Link className="dropdown-item" onClick={() => { dispatch(removeUserData()); navigate("/login") }}>Logout</Link></li>
                                                    </ul>
                                                    :
                                                    <ul className="dropdown-menu">
                                                        <li><Link className="dropdown-item" to={'login'}>Login</Link></li>
                                                        <li><Link className="dropdown-item" to={'register'}>Signup</Link></li>
                                                    </ul>
                                                }
                                            </div>
                                        </div>
                                        <Link to={'/contact'} className="btn btn-main text-uppercase">
                                            GET A proposal
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
