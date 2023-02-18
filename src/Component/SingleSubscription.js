import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from './Dashboard/Sidebar';
import { Divider, Empty, List, Skeleton } from 'antd';

const SingleSubscription = () => {

    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isDownloading, setDownloading] = useState(false);
    const [data, setData] = useState(null);
    const [file, setFile] = useState(null);
    const subscription = params.subscription;

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://eliteblue.net/research-space/api/webs/single-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: subscription }),
        })
            .then((response) => response.json())
            .then((actualData) => { setData(actualData.order); setIsLoading(false); })
            .catch((err) => {
                setIsLoading(false);
                toast.error("something went wrong!");
            }
            );
    }, []);

    console.log(data, navigator);

    const dataset = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];

    return (
        <motion.div initial={{ transition: { duration: 1 }, opacity: 0 }} animate={{ transition: { duration: 1 }, opacity: 1 }} exit={{ transition: { duration: 1 }, opacity: 0 }}>
            <div className="container-fluid px-0">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-4 col-2"><Sidebar pageid={'subscriptions'} /></div>

                    <div className="col-xl-9 col-lg-9 col-md-8 col-10 user-profile">
                        <div className='row w-100 mx-0 px-0'>
                            <div className="col-12 mx-0 px-0 text-center">
                                <div className="profile-page text-start">
                                    <div className="p-4 ps-2">
                                        {isLoading ? <div className="my-4">
                                            <Skeleton active />
                                        </div> :
                                            !data ?
                                                <Empty description="Something went wrong!" />
                                                :
                                                <div className="mb-5">
                                                    <div className="row w-100 mx-auto">
                                                        <div className="col-12">
                                                            <h3 className="heading fs-3 mb-3">Your Subscription</h3>
                                                        </div>


                                                        <div className="col-md-8">
                                                            <div className="card rounded-3 subscription">
                                                                <Divider orientation="left">Order Details</Divider>
                                                                <List
                                                                    size="large"
                                                                    bordered
                                                                >
                                                                    <List.Item> <p className='mb-0 d-flex justify-content-between'><div>{data?.title}</div> <div><span className='fw-bold'>No. of Pages: </span>{data?.no_of_pages}</div></p> </List.Item>
                                                                </List>
                                                            </div>

                                                            <div className="card rounded-3 subscription mt-3">
                                                                <Divider orientation="left">Details</Divider>
                                                                <List
                                                                    size="large"
                                                                    bordered
                                                                >
                                                                    <List.Item>  <span className='fw-bold'>Details</span></List.Item>
                                                                    <List.Item> <p className='mb-0 d-flex justify-content-between'><span className='fw-bold'>Subtotal: </span>${data?.order_total}</p> </List.Item>
                                                                    <List.Item> <p className='mb-0 d-flex justify-content-between'><span className='fw-bold'>Discount: </span>- ${data?.coupon_discount}</p> </List.Item>
                                                                    <List.Item> <p className='mb-0 d-flex justify-content-between'><span className='fw-bold'>Grand Total: </span>${data?.grand_total}</p> </List.Item>
                                                                </List>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="card rounded-3 subscription">
                                                                <Divider orientation="left">Customer Info</Divider>
                                                                <List
                                                                    size="large"
                                                                    bordered
                                                                >
                                                                    <List.Item> <p className='mb-0'><span className='fw-bold'>Customer</span><br />{data?.billing_first_name}-{data?.billing_last_name}
                                                                    </p> </List.Item>
                                                                    {/* <List.Item> <a href={`mailto:${data?.email}`}><span className='fw-bold'>Email</span><br />{data?.email}</a> </List.Item> */}
                                                                    {/* <List.Item> <p className='mb-0'><span className='fw-bold'>Phone Address</span><br /><a href={`tel:${data?.billing_phone}`}> {data?.billing_phone}</a></p> </List.Item> */}
                                                                    <List.Item>
                                                                        <p className='mb-0'>
                                                                            <span className='fw-bold'>Billing Address</span>
                                                                            <br />
                                                                            {data?.billing_email}
                                                                            <br />
                                                                            {data?.billing_phone}
                                                                            <br />
                                                                            {data?.billing_street_address}
                                                                            <br />
                                                                            {data?.billing_city}
                                                                            <br />
                                                                            {data?.billing_country}
                                                                        </p>
                                                                    </List.Item>
                                                                    <List.Item> <p className='mb-0'><span className='fw-bold'>Subscription Duration</span><br />{data?.subscription_duration}/mo</p> </List.Item>

                                                                </List>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-8">

                                                        </div>
                                                    </div>

                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default SingleSubscription