
import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export const Sidebar = ({ pageid }) => {
    const { user, removeUserData, dispatch } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const Logout = () => {
        setIsLoading(true);
        setTimeout(() => {
            dispatch(removeUserData(user.id));
            navigate("/login")
        }, 2000);
    }

    return (
        <>

            <div className="sidebar active">
                <div className="logo_content">
                    <div className="logo"> 
                        <div className="heading fs-4" style={{ "marginLeft": "5px" }}>{user.data.name}</div>
                    </div>
                    <i class='bx bx-menu-alt-right' id="btn" style={{ "fontSize": "25px" }}></i>
                </div>
                <ul className="nav_list ps-0 mt-0">
                    <li>
                        <Link className={`${pageid === "account" && "active"}`} to={'/my-account'}>
                            <i class='fa fa-user-circle'></i>
                            <span className="link_names">My Account</span>
                        </Link>
                        <span className="tooltip">My Account</span>
                    </li>
                    {user.data.user_type === "user" &&
                        <>
                            <li>
                                <Link to={'/projects'} className={`${pageid === "projects" && "active"}`}>
                                    <i class='fa fa-database' ></i>
                                    <span className="link_names">Projects</span>
                                </Link>
                                <span className="tooltip">Projects</span>
                            </li>
                            <li>
                                <Link to={'/invoices'} className={`${pageid === "invoice" && "active"}`}>
                                    <i class='fa fa-file-invoice' ></i>
                                    <span className="link_names">Invoices</span>
                                </Link>
                                <span className="tooltip">Invoices</span>
                            </li>
                            {/* <li>
                                <Link to={'/completed-projects'} className={`${pageid === "cproject" && "active"}`}>
                                    <i class='fa fa-project-diagram'></i>
                                    <span className="link_names">Completed Projects</span>
                                </Link>
                                <span className="tooltip">Completed Projects</span>
                            </li> */}
                        </>
                    }
                    <li>
                        <Link to={'/project-discussion'} className={`${pageid === "chat" && "active"}`}>
                            <i class='fa fa-mail-bulk' ></i>
                            <span className="link_names">Project Discussion</span>
                        </Link>
                        <span className="tooltip">Project Discussion</span>
                    </li>
                    <li>
                        <a href='#' onClick={Logout}>
                            {isLoading ?
                                <div className="spinner d-flex justify-content-center align-items-center">
                                    <div className="spinner-border" style={{ "float": "right" }} role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
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
