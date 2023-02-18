
import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from "react-hot-toast";
import { AppContext } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Button, Empty, Form, Input, InputNumber, Modal, Select, Skeleton, Table, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Orders = () => {


    const { URL, user, dispatch, addUserData, APP_NAME, setTitle } = useContext(AppContext);

    const [data, setData] = useState([]);
    const [userName, setUserName] = useState(user.data.name);
    const [userPhone, setUserPhone] = useState(user.data.phone_number);
    const [userAbout, setUserAbout] = useState(user.data.about);
    const [dropdownsValues, setDropdownsValues] = useState(null);
    const [isActiveEditPass, setisActiveEditPass] = useState("false");
    const [isLoading, setIsLoading] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(false);



    useEffect(() => {
        setIsLoading(true);
        postData(`https://eliteblue.net/research-space/api/webs/get-orders`, { user_token: user.data.user_token })
            .then(data => {
                if (data.success != false) {
                    toast.success(data.message);
                    setData(data.order);

                } else {
                    toast.error(data.message);
                }
                setIsLoading(false);
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
                toast.error("Something went wrong!");
            });

        fetch(`https://eliteblue.net/research-space/api/webs/get-order-settings`).then(res => res.json())
            .then(data => {
                setDropdownsValues(data);
            }).catch((err) => {
                toast.error("Something went wrong!");
            });

    }, [])

    console.log(dropdownsValues);

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
                <Tooltip placement="topLeft" title={subscription_duration}>
                    {subscription_duration}
                </Tooltip>
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
                <Tooltip placement="topLeft" title={coupon_discount}>
                    {coupon_discount}
                </Tooltip>
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
                <Tooltip placement="topLeft" title={order_total}>
                    {order_total}
                </Tooltip>
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
                <Tooltip placement="topLeft" title={grand_total}>
                    {grand_total}
                </Tooltip>
            ),
        },
    ];

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();


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

    const [selectedFile, setselectedFile] = useState(null);


    const onFileUpload = () => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        console.log(selectedFile);
        // axios.post("http://localhost:800/api/uploadfile", formData, {
        //     headers: {
        //         "content-type": "multipart/form-data",
        //     },
        // });

        axios({
            url: 'http://localhost:5000/upload',
            method: 'POST',
            data: formData,

        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    };





    return (
        <motion.div initial={{ transition: { duration: 1 }, opacity: 0 }} animate={{ transition: { duration: 1 }, opacity: 1 }} exit={{ transition: { duration: 1 }, opacity: 0 }}>

            {/* <input type="file" name="" onChange={(e) => setselectedFile(e.target.files[0])} />
            <Button type='primary' onClick={onFileUpload} >Upload</Button> */}

            <Modal

                title="Paper Details:"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                okText="Create"
                centered={true}
                width='80%'
                cancelText="Cancel"
                className='order'
                onCancel={() => setOpen(false)}

            >
                <Form
                    form={form}
                    name="form_in_modal"
                    onFinish={onFinish}
                    initialValues={{ modifier: 'public' }}
                    layout={'vertical'}
                    style={{ maxWidth: "100%", marginTop: 18 }}
                >
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Subject or Discipline:</b> "If the required type of paper is missing, feel free to
                            pick “Other” and write your specific type of paper in the appeared tab."
                        </label>
                        <Form.Item name={['subject_discipline']} label="Subject or Discipline:" rules={[{ required: false }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={dropdownsValues ? dropdownsValues.subject_type : []}
                            />
                        </Form.Item>
                    </div>
                    <div className="my-3">
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.subject_discipline !== currentValues.subject_discipline}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('subject_discipline') === 'other' ? (
                                    <Form.Item
                                        name="other_subject_discipline"
                                        label="Other Subject Discipline"
                                    >
                                        <Input />
                                    </Form.Item>
                                ) : null
                            }
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Topic:</b> "Please provide us with a clear topic of your assignment up to 300 symbols. If you don’t have a specific topic, use the default writer’s choice option or use the “Subject or Discipline” chosen above."
                        </label>
                        <Form.Item name={['topic']} label="Topic:" rules={[{ required: false }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={[
                                    { value: 'Computer', label: 'Computer' },
                                    { value: 'Physics', label: 'Physics' },
                                    { value: 'Urdu', label: 'Urdu' },
                                ]}
                            />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Paper Instructions:</b> "To ensure that the final paper meets your requirements, make sure your instructions are as clear and detailed as possible. This will decrease the chance of revisions in your order."
                        </label>
                        <Form.Item name={['message']} label="Message:">
                            <Input.TextArea />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Academic Level:</b> "Please select the option that is the closest to your next obtainable degree."
                        </label>
                        <Form.Item name={['Academic_Level']} label="Academic Level:" rules={[{ required: false }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={dropdownsValues ? dropdownsValues.academic_level : []}
                            />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Type of Paper:</b> "If the required type of paper is missing, feel free to pick “Other” and write your specific type of paper in the appeared tab."

                        </label>
                        <Form.Item name={['Type_of_Paper']} label="Type of Paper:" rules={[{ required: false }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={dropdownsValues ? dropdownsValues.document_type : []}
                            />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Paper Format:</b> "Format of your in-text citations, references and title page. The         format/citation style also applies to any Works Cited and/or References pages."
                        </label>
                        <Form.Item name={['Paper_Format']} label="Paper Format:" rules={[{ required: false }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={dropdownsValues ? dropdownsValues.paper_format : []}
                            />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <Form.Item name={['Language_and_spelling']} className='mb-0' label="Language and spelling style:" rules={[{ required: false }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={dropdownsValues ? dropdownsValues.language_style : []}
                            />
                        </Form.Item>
                        <label className='fs-7'> For Example: color (American) ---- Colour (British)
                        </label>
                    </div>

                    <div className='my-3'>
                        <Form.Item name={['resource_materials']} label="Will you provide any resource materials:" rules={[{ required: false }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={[
                                    { value: 'Yes', label: 'Yes' },
                                    { value: 'No', label: 'No' },
                                ]}
                            />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Number of Pages:</b> "Select the number of pages needed. Do not include Bibliography, Works Cited, or References pages because they are free."</label>
                        <Form.Item name={['Number_of_Pages']} label="Number of Pages:" rules={[{ required: false }]}>
                            <InputNumber style={{ width: '100%' }} />

                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Spacing:</b>  “Double spaced pages contain approximately 300 words each, while single-spaced have 600.”</label>
                        <Form.Item name={['Spacing']} label="Spacing:" rules={[{ required: false }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={[
                                    { value: 'SingleSpacing', label: 'Single Spacing' },
                                    { value: 'DoubleSpacing', label: 'Double Spacing' },
                                ]}
                            />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'> PowerPoint Slides:</b>  "The number of Power Point slides that will be delivered to you separately from your paper. Useful for those who need to present in front of class."</label>
                        <Form.Item name={['PowerPoint_Slides']} label=" PowerPoint Slides:" rules={[{ required: false }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </div>
                    <div className='my-3'>








                        <label className='fs-7'><b className='fs-7'> Sources:</b>  "This number of entries will be in your reference list or bibliography page.”</label>

                        <label className='fs-7'><b className='fs-7'>  FREE SOURCES:</b> If needed, you may request one (1) free source for every one (1) page of text that you order. For example, if you order 20 pages of text, you can request up to 20 sources for free.”</label>

                        <label className='fs-7'><b className='fs-7'>   EXTRA SOURCES:</b>      There is an additional cost of $1 per each extra source that exceeds the number of pages that you order. For example, if you order 10 pages and request 15 sources, there will be a total additional cost of $5 for the 5 extra sources.</label>


                        <Form.Item name={['EXTRA_SOURCES']} label="No. of EXTRA SOURCES:" rules={[{ required: false }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Deadline:</b>  "The time in which you will receive your completed paper. The countdown starts when we receive payment for your order. Please note that revision requests may exceed your deadline."</label>
                        <Form.Item name={['Deadline']} label="Deadline:" rules={[{ required: false }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={[
                                    { value: 'SingleSpacing', label: 'Single Spacing' },
                                    { value: 'DoubleSpacing', label: 'Double Spacing' },
                                ]}
                            />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <Form.Item name={['Copy_of_Sources']} label="Copy of Sources:" rules={[{ required: false }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={[
                                    { value: 'Yes', label: 'Yes' },
                                    { value: 'No', label: 'No' },
                                ]}
                            />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <Form.Item name={['Page_Summary']} label="1 Page Summary:" rules={[{ required: false }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={[
                                    { value: 'Yes', label: 'Yes' },
                                    { value: 'No', label: 'No' },
                                ]}
                            />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <Form.Item name={['Paper_Outline_in_Bullets']} label="Paper Outline in Bullets:" rules={[{ required: false }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={[
                                    { value: 'Yes', label: 'Yes' },
                                    { value: 'No', label: 'No' },
                                ]}
                            />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <Form.Item name={['Abstract_Page']} label="Abstract Page:" rules={[{ required: false }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={[
                                    { value: 'Yes', label: 'Yes' },
                                    { value: 'No', label: 'No' },
                                ]}
                            />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Statistical Analysis:</b>  If your order requires statistical analysis or a significant amount of mathematical calculations, there will be an additional charge of 15%. To see a list of features that qualify as "statistical analysis," click here.</label>
                        <Form.Item name={['Statistical_Analysis']} label="Statistical Analysis:" rules={[{ required: false }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={[
                                    { value: 'Yes', label: 'Yes' },
                                    { value: 'No', label: 'No' },
                                ]}
                            />
                        </Form.Item>
                    </div>
                </Form >
            </Modal >
            <div className="container-fluid px-0">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-4 col-2"><Sidebar pageid={'order'} /></div>

                    <div className="col-xl-9 col-lg-9 col-md-8 col-10" >
                        <div className='row w-100 mx-0 px-0 h-100'>
                            <div className="col-12 mx-0 px-0 user-profile h-100">
                                <div className="profile-page text-start">
                                    <div className="p-4">
                                        <div className="mb-5 mt-3">
                                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                                <h3 className="heading fs-3 mb-3">Manage Orders</h3>
                                                <button className="btn btn-main" onClick={() => setOpen(true)}>Create Order</button>
                                            </div>
                                            {isLoading ? <div className="my-4">
                                                <Skeleton active />
                                            </div> :
                                                !data ?
                                                    <Empty description="Something went wrong!" />
                                                    :
                                                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />

                                            }
                                            <Link to='/single-order/kuch-bhiii' className="btn btn-main">goo</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div >
    )
}

export default Orders