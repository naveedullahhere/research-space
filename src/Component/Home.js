import { Alert, Empty, Form, Input, InputNumber, Modal, Pagination, Segmented, Skeleton, Tooltip } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Spinner } from './Spinner';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';



export const Home = () => {

    const { URL, setCartItems, cartItems, user, dispatch, style, setStyle, APP_NAME, setTitle, heartedTags } = useContext(AppContext);


    const [isLoading, setIsLoading] = useState(true);
    const [isStoreLoading, setIsStoreLoading] = useState(true);
    const [dataFrom, setDataFrom] = useState(0);
    const [dataTo, setDataTo] = useState(30);
    const [isErr, setIsError] = useState(false);
    const [currTab, setCurrTab] = useState(1);
    const [vll, setvll] = useState(1);
    const [slider, setSlider] = useState([]);
    const [dataDeal, setDealData] = useState([]);
    const [data, setData] = useState([]);
    const [img, setImg] = useState(null);
    const [imgDeal, setDealImg] = useState(null);

    var len = Math.ceil(data.length / 30);

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
            <div className="section py-5 text-whtie sec-1 bg-main" ref={page}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1 className="display-2 mb-0 fw-bold text-white">
                                Shop in style
                            </h1>
                            <p className="fs-5 text-muted">
                                With Research space
                            </p>
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
                                    <div className="d-flex justify-content-between"> 
                                        <h1 className="heading">
                                            Trending Packages
                                        </h1>
                                    </div>
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
                                                                <div className='mb-3'>                                                                                <Alert message="Our limit is exceed" type="warning" />
                                                                </div>
                                                            }
                                                            <div className='d-flex align-items-center justify-content-between'>

                                                                <div class="product-price">{item.discount_price && <strike>${item.discount_price}&nbsp;&nbsp;</strike>} $<span>{item.regular_price}</span>{item.subscription_duration}</div>
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
