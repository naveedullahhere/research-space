
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
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

export const Saved = () => {
    const { URL, user, SavedItems, setSavedItems, APP_NAME, setTitle, style, setStyle, dispatch } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTitle(`Saved${APP_NAME}`);
        fetch(`${URL}api/web/react-items?user_id=${user ? user.data.id : ""}&user_token=${user.data.user_token}&type=save`)
            .then((response) => response.json())
            .then((actualData) => { setSavedItems(actualData); setIsLoading(false); })
        setIsLoading(false)

    }, [])


    return (
        <div>
            <div className="container-fluid px-0">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-4 col-2"><Sidebar pageid={'saved'} /></div>

                    <div className="col-xl-9 col-lg-9 col-md-8 col-10 ps-md-0" >
                        <div className='row w-100 mx-0 px-0'>
                            <div className="col-12 mx-0 px-0 text-center">
                                <div class="container-fluid">
                                    <div class="row shadow-sm">
                                        <div class="col-md-12 py-3">
                                            <div className="d-flex justify-content-between">
                                                <h1 class="text-uppercase text-black m-0">My Cart</h1>


                                                <div>
                                                    <Segmented
                                                        onChange={(e) => dispatch(setStyle(e))}
                                                        defaultValue={style}
                                                        options={[
                                                            {
                                                                value: 'List',
                                                                icon: <BarsOutlined />,
                                                            },
                                                            {
                                                                value: 'Kanban',
                                                                icon: <AppstoreOutlined />,
                                                            },
                                                        ]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
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
                                                    return <List hasCustom={'save'} style={style} item={item} user={user} singleurl={item.coupon.slug} image={`${item.image_path}/${item.media.image}`} title={item.coupon.title} discount={item.coupon.discount} rprice={item.coupon.regular_price} cprice={item.coupon.compare_price} />
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
