
import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from "react-hot-toast";
import { AppContext } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Empty, Skeleton, Table, Tooltip } from 'antd';
import { Link } from 'react-router-dom';



export const MySubscriptions = () => {
    const { URL, user, dispatch, addUserData, APP_NAME, setTitle } = useContext(AppContext);

    const [data, setData] = useState([]);
    const [userName, setUserName] = useState(user.data.name);
    const [userPhone, setUserPhone] = useState(user.data.phone_number);
    const [userAbout, setUserAbout] = useState(user.data.about);
    const [isActiveEditPass, setisActiveEditPass] = useState("false");
    const [isLoading, setIsLoading] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(false);



    useEffect(() => {
        setIsLoading(true);
        postData(`https://eliteblue.net/research-space/api/webs/get-orders`, { user_token: user.data.user_token })
            .then(data => {
                if (data.success != false) {
                    // toast.success(data.message);
                    setData(data.order);
                } else {
                    // toast.error(data.message);
                }
                setIsLoading(false);
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
                toast.error("Something went wrong!");
            });
    }, [])


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











    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ellipsis: {
                showTitle: false,
            },
            render: (title, i) => (
                <Tooltip placement="topLeft" title={title}>
                    <Link to={`${data[data.findIndex((item) => item.title === title)].slug}`}>{title}</Link>
                </Tooltip>
            ),
        },
        {
            title: 'Duration',
            dataIndex: 'subscription_duration',
            key: 'subscription_duration',
            ellipsis: {
                showTitle: false,
            },
            render: (subscription_duration) => (
                <p className="mb-0">

                    {/* <Tooltip placement="topLeft" title={subscription_duration}> */}
                    {subscription_duration} /mo
                    {/* </Tooltip> */}
                </p>
            ),
        },

        {
            title: 'Total Discount',
            dataIndex: 'coupon_discount',
            key: 'coupon_discount',
            ellipsis: {
                showTitle: false,
            },
            render: (coupon_discount) => (
                <p className="mb-0">

                    {/* // <Tooltip placement="topLeft" title={coupon_discount}> */}
                    $  {coupon_discount ? coupon_discount : 0}
                    {/* // </Tooltip> */}
                </p>
            ),
        },
        {
            title: 'Total Amount',
            dataIndex: 'order_total',
            key: 'order_total',
            ellipsis: {
                showTitle: false,
            },
            render: (order_total) => (
                <p className="mb-0">

                    {/* // <Tooltip placement="topLeft" title={order_total}> */}
                    $ {order_total}
                    {/* // </Tooltip> */}
                </p>
            ),
        },
        {
            title: 'Grand Total',
            dataIndex: 'grand_total',
            key: 'grand_total',
            ellipsis: {
                showTitle: false,
            },
            render: (grand_total) => (
                <p className="mb-0">

                    {/* // <Tooltip placement="topLeft" title={grand_total}> */}
                    $ {grand_total}
                    {/* // </Tooltip> */}
                </p>
            ),
        },
    ];


    // const datatable = [
    //     {
    //         key: '1',
    //         subscription: 'John Brown',
    //         status: 32,
    //         amount: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    //     },
    //     {
    //         key: '2',
    //         subscription: 'Jim Green',
    //         status: 42,
    //         amount: 'London No. 2 Lake Park, London No. 2 Lake Park',
    //     },
    //     {
    //         key: '3',
    //         subscription: 'Joe Black',
    //         status: 32,
    //         amount: 'Sydney No. 1 Lake Park, Sydney No. 1 Lake Park',
    //     },
    //     {
    //         key: '4',
    //         subscription: 'Joe Black',
    //         status: 32,
    //         amount: 'Sydney No. 1 Lake Park, Sydney No. 1 Lake Park',
    //     },
    //     {
    //         key: '5',
    //         subscription: 'Joe Black',
    //         status: 32,
    //         amount: 'Sydney No. 1 Lake Park, Sydney No. 1 Lake Park',
    //     },
    // ];



    // const columns = [
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //         width: 150,
    //     },
    //     {
    //         title: 'Age',
    //         dataIndex: 'age',
    //         width: 150,
    //     },
    //     {
    //         title: 'Address',
    //         dataIndex: 'address',
    //     },
    // ];




    // const data = [];
    // for (let i = 0; i < 100; i++) {
    //     data.push({
    //         key: i,
    //         name: `Edward King ${i}`,
    //         age: 32,
    //         address: `London, Park Lane no. ${i}`,
    //     });
    // }


    return (
        <div className="container-fluid px-0">
            <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-4 col-2"><Sidebar pageid={'subscriptions'} /></div>

                <div className="col-xl-9 col-lg-9 col-md-8 col-10" >
                    <div className='row w-100 mx-0 px-0 h-100'>
                        <div className="col-12 mx-0 px-0 user-profile h-100">
                            <div className="profile-page text-start">
                                <div className="p-4">
                                    <div className="mb-5">

                                        <h3 className="heading fs-3 mb-3">Manage Subscription</h3>
                                        {isLoading ? <div className="my-4">
                                            <Skeleton active />
                                        </div> :
                                            !data ?
                                                <Empty description="Something went wrong!" />
                                                :
                                                <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
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









