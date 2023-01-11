
import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from "react-hot-toast";
import { AppContext } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '../Spinner';
import { List } from '../Coupon/List';


export const Saved = () => {
    const { URL, user, SavedItems, setSavedItems, API_TOKEN } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {


        return () => {

            fetch(`${URL}api/web/react-items?user_id=${user ? user.data.id : ""}&user_token=${user.data.user_token}&type=save`)
                .then((response) => response.json())
                .then((actualData) => { setSavedItems(actualData); setIsLoading(false); })
            setIsLoading(false)
        }
    }, [])


    return (
        <div>
            <div className="container-fluid px-0">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-4 col-2"><Sidebar pageid={'saved'} /></div>

                    <div className="col-xl-9 col-lg-9 col-md-8 col-10 ps-md-0" >
                        <div className='row w-100 mx-0 px-0'>
                            <div className="col-12 mx-0 px-0 text-center">
                                <div className=" rounded-3 p-4 pb-0">
                                    <div className="mt-3">
                                        <h3 className="heading fs-3 mb-3">Saved</h3>
                                    </div>
                                </div>
                                <div className="itemz mt-3">
                                    {/* {isLoading ?

                                        <Spinner />

                                        :

                                        searchedCoupons ? (searchedCoupons.map((item) => {
                                            return <List singleurl={item.coupon.slug} image={`${item.image_path}/${item.media.image}`} title={item.coupon.title} discount={item.coupon.discount} rprice={item.coupon.regular_price} cprice={item.coupon.compare_price} />
                                        })) : "No Coupon Found!"

                                    } */}

                                    <div className="row">
                                        {SavedItems && SavedItems.success === false
                                            ?
                                            <div className="mt-3">
                                                <h3 className="fs-5 mb-3">No Coupon Found</h3>
                                            </div>
                                            :
                                            isLoading ? <Spinner />

                                                :

                                                SavedItems.length > 0 ? (SavedItems.map((item) => {
                                                    return <List hasCustom={'save'} style={'grid'} item={item} user={user} singleurl={item.coupon.slug} image={`${item.image_path}/${item.media.image}`} title={item.coupon.title} discount={item.coupon.discount} rprice={item.coupon.regular_price} cprice={item.coupon.compare_price} />
                                                })) : <Spinner />



                                        }
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
