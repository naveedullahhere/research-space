
import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export const Sidebar = ({ pageid }) => {
    const { user, removeUserData, dispatch } = useContext(AppContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const Logout = () => {
        setIsLoading(true);
        setTimeout(() => {
            dispatch(removeUserData(user.id));
            navigate("/login")
        }, 2000);
    }

    return (
        <>

            <div className="sidebar active db-bar">
                <div className="logo_content mb-4">
                    <div className="logo">
                        <div className="heading fs-4" style={{ "marginLeft": "5px" }}>{user.data.name}</div>
                    </div>
                </div>
                <ul className="nav_list ps-0 mt-0">
                    <li>
                        <Link className={`${pageid === "account" && "active"}`} to={'/my-account'}>
                            <i class='fa fa-user-circle'></i>
                            <span className="link_names">My Account</span>
                        </Link>
                        <span className="tooltip">My Account</span>
                    </li>
                    <li>
                        <Link className={`${pageid === "subscriptions" && "active"}`} to={'/my-subscriptions'}>
                            <i class='fa fa-comment-dollar'></i>
                            <span className="link_names">My Subscriptions</span>
                        </Link>
                        <span className="tooltip">My Subscriptions</span>
                    </li>

                    <li>
                        <a href='#' onClick={Logout}>
                            {isLoading ?
                                <i className='d-flex justify-content-center align-items-center'>
                                    <div className="spinner d-flex justify-content-center align-items-center">
                                        <div className="spinner-border" style={{ "float": "right" }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </i>
                                :
                                <i class='fa fa-power-off' ></i>
                            }
                            <span className="link_names">Logout</span>
                        </a>
                        <span className="tooltip">Logout</span>
                    </li>
                </ul>
            </div>

        </>
    )
}
