
import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from "react-hot-toast";
import { AppContext } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';


export const Wishlist = () => {
    const { URL, user, dispatch, addUserData } = useContext(AppContext);


    return (
        <div>
            <div className="container-fluid px-0">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-4 col-2"><Sidebar pageid={'wishlist'} /></div>

                    <div className="col-xl-9 col-lg-9 col-md-8 col-10 ps-md-0" >
                        <div className='row w-100 mx-0 px-0'>
                            <div className="col-12 mx-0 px-0 text-center">
                                <div className=" rounded-3 p-4">
                                    <div className="mb-5 mt-3">
                                        <h3 className="heading fs-3 mb-3">Wishlist</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
