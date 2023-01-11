import Logo from '../assets/discount-space-logo.png';
import Logowhite from '../assets/discount-space-logo-whitee.png';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from '../../context/AppContext';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Spinner } from '../Spinner';

export const Header = () => {
    const { user, removeUserData, dispatch, API_TOKEN, URL } = useContext(AppContext);

    const [data, setData] = useState([]);
    const [stores, setStores] = useState([]);


    useEffect(() => {
        fetch(`${URL}api/web/stores`)
            .then((response) => response.json())
            .then((actualData) => { setStores(actualData); })
            .catch((err) => {
                setStores([]);
            });
        fetch(`${URL}api/web/category?type=coupon`)
            .then((response) => response.json())
            .then((actualData) => { setData(actualData.data); })
            .catch((err) => {
                setData([]);
            });
    }, []);


    const { search, setSearch } = useContext(AppContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isActive, setActive] = useState(false);
    const [ismobnav, setmobnav] = useState(true);


    useEffect(() => {
        window.scrollTo(0, 0);
        setActive(false);
    }, [pathname])

    const toggleClass = () => {
        setActive(!isActive);
    };

    const toggleMobNav = () => {
        setmobnav(!ismobnav);
    };

    const Logout = () => {
        dispatch(removeUserData(user.id));
        navigate("/login")
    }

    return (
        <>
            <div className="navigation-wrap bg-white start-header start-style">
                <div className="">
                    <div className="row w-100 ">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-md navbar-light px-xl-3 px-3">
                                <Link to={'/'}>
                                    <img src={Logo} alt="MediaChapter" className='blogo' width="180" />
                                    <img src={Logowhite} alt="MediaChapter" className='wlogo' width="180" />
                                </Link>

                                <div className='d-flex gap-4'>
                                    <div class="custom-dropdown-area mx-2 mobflag text-uppercase position-relative">
                                        <div class="dropdown-toggle country-list flag">
                                            <img src="https://discounts-space.com/flags/us.svg" class="" style={{ width: '35px' }} alt="US Selected" />

                                            <ul class="custom-Dropdown p-2" >
                                                <li>
                                                    <a class="dropdown-item" href="https://www.discounts-space.com/countrysort/226">
                                                        <img src="https://www.discounts-space.com/flags/us.svg" class="" style={{ width: "35px" }} alt="US" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <span className='my-auto'><i class="fa fa-search search-toggle" onClick={toggleClass} aria-hidden="true"></i></span>
                                    <button class={`navbar-toggler ${isActive ? "notactive" : "Activated"}`} onClick={toggleClass}>
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                </div>
                                <div class={`nav-css navbar-collapse justify-content-between ${isActive ? " " : "show"}`} id="navbarSupportedContent">
                                    <div className='d-flex mx-auto'>
                                        <div className="col-md-12 col-sm-2">
                                            <form class="m-0 searchbar position-relative" action='/search/&'>
                                                <div class="search ps-3 w-100 d-flex justify-content-between mx-2 rounded-5 border border-white shadow overflow-hidden">
                                                    <div class="fields  my-auto">
                                                        <input type="text" name="query_search" class="searchbar mx-2 w-100 border-0" onChange={(e) => setSearch(e.target.value)} placeholder="Search Coupons &amp; Deals" id="show-user" />
                                                    </div>
                                                    <button type='submit' class="search-btn main-header-search border-0 py-2 px-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi bi-search" viewBox="0 0 16 16">
                                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className='d-flex '>
                                        {/* <div class="custom-dropdown-area mx-4 text-uppercase position-relative">
                                            <div class="dropdown-toggle country-list flag">
                                                <img src="https://discounts-space.com/flags/us.svg" class="" style={{ width: '35px' }} alt="US Selected" />

                                                <ul class="custom-Dropdown p-2" >
                                                    <li>
                                                        <a class="dropdown-item" href="https://www.discounts-space.com/countrysort/226">
                                                            <img src="https://www.discounts-space.com/flags/us.svg" class="" style={{ width: "35px" }} alt="US" />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div> */}
                                        <div class="right-links">


                                            {user ?

                                                <div class="custom-dropdown-area cat-dropdown text-uppercase">
                                                    <li class="list-unstyled dropdown-toggle" data-bs-toggle="dropdown"><Link to="#">{user.data.name}</Link></li>

                                                    <ul class="custom-Dropdown dd" id="style-1" style={{ display: 'block' }}>



                                                        <li><Link class="dropdown-item" to={'/my-account'}>My Account</Link></li>
                                                        <li><Link class="dropdown-item" onClick={Logout}>Logout</Link></li>



                                                    </ul>
                                                </div>
                                                :
                                                <div class="buttons d-flex justify-content-center">
                                                    <Link to={'/login'} class="btn log text-dark  py-2">
                                                        LOGIN
                                                    </Link>
                                                    <Link to="register" class="btn bg-signature text-white px-4 py-2 rounded-5">
                                                        SIGNUP
                                                    </Link>
                                                </div>

                                            }
                                        </div>
                                    </div>
                                </div>
                            </nav>

                            <span class={`overlay  ${isActive && "is-active"}`}></span>
                            <nav class={`sidebar mob px-0 ${isActive && "show"}`}>

                                <ul class="list">
                                    <li class="px-2 lh">
                                        <form class="m-0 searchbar position-relative" action="https://discounts-space.com/search-result" method="get">  <div class="search ps-2 d-flex justify-content-between mx-2 rounded-3 border border-white shadow overflow-hidden">
                                            <div class="fields">
                                                <input type="text" name="coupon" class="ps-3" placeholder="Search Coupons &amp; Deals" id="show-user" />
                                            </div>
                                            <button type="submit" class="search-btn main-header-search border-0 py-2 px-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi bi-search" viewBox="0 0 16 16">
                                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                                                </svg>
                                            </button>
                                        </div>

                                            <ul class="searchData" id="style-1"></ul>



                                        </form>



                                    </li>
                                    <li>
                                        <a href="#" onClick={toggleMobNav} class="comm-btn"  >Category
                                            <span class={` ${ismobnav ? "fas fa-caret-down third" : "fas fa-caret-down third rotate"}`} aria-hidden="true"></span>
                                        </a>
                                        <ul class={` ${ismobnav ? "comm-show" : "comm-show show2"}`}>
                                            {data

                                                ?

                                                data.map((item) => {
                                                    return <li key={item.id}><Link class="dropdown-item" to={`/collections/${item.slug}`}>{item.title}</Link></li>
                                                })

                                                :

                                                <Spinner />

                                            }


                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#" onClick={toggleMobNav} class="comm-btn"  >Store
                                            <span class={` ${ismobnav ? "fas fa-caret-down third" : "fas fa-caret-down third rotate"}`} aria-hidden="true"></span>
                                        </a>
                                        <ul class={` ${ismobnav ? "comm-show" : "comm-show show2"}`}>
                                            {stores

                                                ?

                                                stores.map((item) => {
                                                    return <li key={item.id}><Link class="dropdown-item" to={`/stores/${item.slug}`}>{item.title}</Link></li>
                                                })

                                                :

                                                <Spinner />

                                            }


                                        </ul>
                                    </li>
                                    <li class=" linkz  ">
                                        <Link to="coupons">Coupons</Link>
                                    </li>
                                    <li class=" linkz">
                                        <Link to="deals">Deals</Link>
                                    </li>
                                    <li class=" linkz  ">
                                        <a href="https://discounts-space.com/video">Video</a>
                                    </li>
                                    <li class="linkz  ">
                                        <a href="https://discounts-space.com/blog">Blog</a>
                                    </li>
                                    <li class="linkz  ">
                                        <a href="https://discounts-space.com/contact">Contact</a>
                                    </li>

                                    <li class="px-3 py-3">
                                        <div class="side-nav-buttons d-flex">
                                            <a href="https://discounts-space.com/login" class="log rounded-pill mx-1 px-4 text-center text-black">Login</a>
                                            <a href="https://discounts-space.com/register" class="sign bg-signature px-4 mx-1 text-center rounded-3">Signup</a>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div >
            <div class="top-links bg-black nav-2 container-fluid">
                <div class="row">
                    <div class="col-12 d-flex justify-content-center ">
                        <div class="custom-dropdown-area cat-dropdown mx-4 text-uppercase">
                            <li class="list-unstyled  dropdown-toggle py-3" data-bs-toggle="dropdown"><Link to="#jgggg">CATEGORIES</Link></li>

                            <ul class="custom-Dropdown dd" id="style-1" style={{ display: 'block' }}>


                                {data

                                    ?

                                    data.map((item) => {
                                        return <li key={item.id}><Link class="dropdown-item" to={`/collections/${item.slug}`}>{item.title} </Link></li>
                                    })

                                    :

                                    <Spinner />

                                }


                            </ul>
                        </div>


                        <div class="custom-dropdown-area cat-dropdown mx-4 text-uppercase">
                            <li class="list-unstyled  dropdown-toggle py-3" data-bs-toggle="dropdown"><Link to="#jgggg">Stores</Link></li>

                            <ul class="custom-Dropdown dd" id="style-1" style={{ display: 'block' }}>


                                {stores

                                    ?

                                    stores.map((item) => {
                                        return <li key={item.id}><Link class="dropdown-item" to={`/stores/${item.slug}`}>{item.title} </Link></li>
                                    })

                                    :

                                    <Spinner />

                                }


                            </ul>
                        </div>

                        <Link to="coupons" class="mx-4 text-uppercase py-3
                         list-unstyled li-links py-2
                        ">Coupons</Link>
                        <Link to="deals" class="mx-4 text-uppercase py-3
                         list-unstyled li-links py-2
                        ">Deals</Link>
                        <Link to="video" class="mx-4 text-uppercase py-3
                           list-unstyled li-links py-2
                           ">Video Show</Link>
                        <Link to="blog" class="mx-4 text-uppercase py-3
                        list-unstyled li-links py-2
                          ">blog</Link>
                        <Link to="contact" class="mx-4 text-uppercase py-3
                        list-unstyled li-links py-2
                          ">contact</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
