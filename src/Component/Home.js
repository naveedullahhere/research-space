import { Alert, Button, Empty, Form, Input, InputNumber, Modal, Pagination, Segmented, Skeleton, Steps, Tooltip } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Spinner } from './Spinner';
import { AppstoreOutlined, BarsOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Banner from './assets/banner.png';



export const Home = () => {

    const { URL, setCartItems, cartItems, user, dispatch, style, setStyle, APP_NAME, setTitle, heartedTags } = useContext(AppContext);


    const [isLoading, setIsLoading] = useState(true);
    const [isErr, setIsError] = useState(false);
    const [slider, setSlider] = useState([]);
    const [data, setData] = useState([]);
    const [img, setImg] = useState(null);

    useEffect(() => {
        setTitle(`Home${APP_NAME}`);
        fetch(`https://eliteblue.net/research-space/api/webs/subscription`)
            .then((response) => response.json())
            .then((actualData) => { setData(actualData.data); setIsLoading(false); setImg(actualData.image_path); })
            .catch((err) => {
                setData([]);
                setIsError(true);
                setIsLoading(false);
                toast.error("something went wrong!");
            }
            );
        fetch(`${URL}public/api/web/slider`)
            .then((response) => response.json())
            .then((actualData) => { setSlider(actualData); })
            .catch((err) => {
                setSlider([]);
                toast.error("something went wrong!");
            }
            );
    }, []);

    const addToCart = (item) => {
        dispatch(setCartItems(item));
        toast.success("Item added to cart!");
    }

    console.log(data);

    const page = useRef(null);



    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be ${min}',
        },
    };


    const [currentProduct, setCurrentProduct] = useState('');
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const showModal = (item) => {
        setOpen(true);
        setCurrentProduct(item);
    };

    const handleOk = () => {

        setConfirmLoading(true);
        form
            .validateFields()
            .then((values) => {
                onCreate(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
                setConfirmLoading(false);
            });
    };

    const onFinish = (values) => {
        console.log(values);
    };


    const onCreate = (data) => {
        console.log(data);
        fetch(`https://eliteblue.net/research-space/api/webs/inquire-now`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                form.resetFields();
                console.log(json);
                if (json.success) {
                    setConfirmLoading(false);
                    toast.success(json.message);
                }

            }).catch(err => {
                setConfirmLoading(false);
                toast.error("something went wrong!");
            })
    };


    const [current, setCurrent] = useState(0);

    const steps = [
        {
            title: 'First',
        },
        {
            title: 'Second',
        },
        {
            title: 'Last',
        },
    ];

    const items = steps.map((item) => ({
        key: item.title,
    }));

    return (
        <motion.div initial={{ transition: { duration: 1 }, opacity: 0 }} animate={{ transition: { duration: 1 }, opacity: 1 }} exit={{ transition: { duration: 1 }, opacity: 0 }}>
            <Modal

                title="Inquiry Now"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                okText="Submit"
                cancelText="Cancel"
                onCancel={() => setOpen(false)}

            >
                <Alert
                    className='mt-3'
                    message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
                    type="warning"
                    closable
                />
                <Form
                    form={form}
                    name="form_in_modal"
                    onFinish={onFinish}
                    initialValues={{ modifier: 'public' }}
                    layout={'vertical'}

                    style={{ maxWidth: "100%", marginTop: 18 }}
                    validateMessages={validateMessages}
                >
                    {/* <Form.Item name={['domain']} label="domain" style={{ display: "none" }} initialValue={window.location.href} >
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user_id']} label="user_id" style={{ display: "none" }} initialValue={null} >
                        <Input />
                    </Form.Item>
                    <Form.Item name={['page_name']} label="page_name" style={{ display: "none" }} initialValue={document.title.split("-")[1]} >
                        <Input />
                    </Form.Item> */}
                    <Form.Item name={['product_id']} label="package_name" style={{ display: "none" }} initialValue={currentProduct} >
                        <Input />
                    </Form.Item>
                    <Form.Item name={['name']} label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['email']} label="Email" rules={[{ type: 'email', required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['phone']} label="Phone" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['message']} label="Message">
                        <Input.TextArea />
                    </Form.Item>
                </Form >
            </Modal >
            <div className="section py-5 bg-main" ref={page}>
                <div className="container py-md-5">
                    <div className="row">
                        <div className="col-md-8 text-start my-auto">
                            <h1 className="display-4 mb-0 fw-bold text-white">
                                The Biggest Database of Essays
                                Written in English
                            </h1>
                            <p className="fs-5 text-light">
                                Find inspiring essay samples today and use them for own papers!

                            </p>
                            <Link to={`${user ? "/contact" : "/register"}`}>
                                <Button type="default" icon={<ArrowRightOutlined />} size='large'>
                                    {user ? "Inquire Now" : "Signup Now"}
                                </Button>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <img src={Banner} alt="" className='w-100 p-md-1 p-5' />
                        </div>
                    </div>
                </div>
            </div>

            <div className="sec py-md-5 py-3 howItWorks">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="heading text-center">
                                How it works
                            </h1>
                            <p className="para">
                                We’ve simplified the process to its max for you to enjoy!

                            </p>
                        </div>
                        <div className="col-md-8 mx-auto my-3">
                            <Steps direction="horizontal" current={current} items={items} size="large" />
                        </div>
                        <div className='my-4'>
                            <iframe data-src="https://www.youtube.com/embed/r3TLHoXFfHg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" loading="lazy" className="w-100" style={{ height: '50vh' }} src="https://www.youtube.com/embed/r3TLHoXFfHg?enablejsapi=1&amp;origin=https%3A%2F%2Fstudentshare.org"  ></iframe>
                        </div>
                        <div>
                            <Button size='large' type='primary'>START SEARCHING</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sect py-md-5 py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className='row w-100 mx-auto'>
                                <div className="col-12">
                                    <h1 className="heading text-center">
                                        Our Services for Students

                                    </h1>
                                </div>
                                {isLoading ? <div className="my-5">
                                    <Skeleton active />
                                </div>
                                    :
                                    !data.length ?
                                        <div className="my-5">
                                            <Empty description="Something went wrong!" />
                                        </div>
                                        :
                                        data.map((item) => {
                                            return <div className="col-lg-4 col-md-6 col-12 my-3" key={item.id}>
                                                <div class="product-card">
                                                    <div class="product-tumb">
                                                        <img src={`${img}/${item.image}`} alt="" />
                                                    </div>
                                                    <div class="product-details">
                                                        <h4><a href="">{item.title}</a></h4>
                                                        <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                                        <div class="product-bottom-details">
                                                            {!item.stock &&
                                                                <div className='mb-3'>                                                                                <Alert message="Our limit is exceed!" type="info" />
                                                                </div>
                                                            }
                                                            <div className='d-flex align-items-center justify-content-between'>

                                                                <div class="product-price">{item.discount_price && <strike className="fs-sm">${item.discount_price}&nbsp;&nbsp;</strike>} $<span>{item.regular_price}</span> <br /> /{item.subscription_duration} Months</div>
                                                                <div class="product-links">
                                                                    {
                                                                        item?.stock
                                                                            ?
                                                                            <Link className="py-2 btn btn-main" to={`/checkout/${item.slug}`} >
                                                                                Buy Now
                                                                            </Link>
                                                                            :
                                                                            <Tooltip placement="top" title={"Inquire Now"}>
                                                                                <button className="py-2 btn btn-main type-light text-white" onClick={() => showModal(item.id)}>
                                                                                    Notify Me
                                                                                </button>
                                                                            </Tooltip>
                                                                    }
                                                                    {/* <button className="py-2 btn btn-main" onClick={() => addToCart(item)} >
                                                                            Buy Now
                                                                        </button> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
