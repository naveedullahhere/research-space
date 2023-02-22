
import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from "react-hot-toast";
import { AppContext } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Button, Empty, Form, Input, InputNumber, Modal, Select, Skeleton, Table, Tooltip, Upload } from 'antd';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Note } from '../SummerNote/Note';

const Orders = () => {


    const { URL, user, dispatch, noteValue, APP_NAME, setTitle } = useContext(AppContext);

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
        postData(`https://eliteblue.net/research-space/api/webs/fetch-orders`, { user_token: user.data.user_token })
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

        fetch(`https://eliteblue.net/research-space/api/webs/get-order-settings`).then(res => res.json())
            .then(data => {
                setDropdownsValues(data);
            }).catch((err) => {
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







    // 'erp_order_topic', 'erp_academic_name', 'erp_resource_materials', 'erp_order_message'



    const columns = [
        {
            title: 'Order Topic',
            dataIndex: 'erp_order_topic',
            key: 'erp_order_topic',
            ellipsis: {
                showTitle: false,
            },
            render: (erp_order_topic) => (
                <Tooltip placement="topLeft" title={erp_order_topic}>
                    <Link to={`/single-order/${data[data.findIndex((item) => item.erp_order_topic === erp_order_topic)].id}`}>{erp_order_topic}</Link>
                </Tooltip>
            ),
        },
        {
            title: 'Academic Name',
            dataIndex: 'erp_academic_name',
            key: 'erp_academic_name',
            ellipsis: {
                showTitle: false,
            },
            render: (erp_academic_name) => (
                <Tooltip placement="topLeft" title={erp_academic_name}>
                    {erp_academic_name}
                </Tooltip>
            ),
        },
        {
            title: 'Resource Materials',
            dataIndex: 'erp_resource_materials',
            key: 'erp_resource_materials',
            ellipsis: {
                showTitle: false,
            },
            render: (erp_resource_materials) => (
                <Tooltip placement="topLeft" title={erp_resource_materials}>
                    {erp_resource_materials}
                </Tooltip>
            ),
        },
        {
            title: 'Order Message',
            dataIndex: 'erp_order_message',
            key: 'erp_order_message',
            ellipsis: {
                showTitle: false,
            },
            render: (erp_order_message) => (
                <Tooltip placement="topLeft" title={erp_order_message}>
                    {erp_order_message}
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

        fetch(`https://eliteblue.net/research-space/api/webs/create-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                form.resetFields();
                console.log(json);
                if (json.success) {
                    // toast.success(json.message);
                }
                else {
                    toast.error(json.message);
                }
                setConfirmLoading(false);
            }).catch(err => {
                setConfirmLoading(false);
                toast.error("something went wrong!");
            })
    };

    const [selectedFile, setselectedFile] = useState(null);


    // const onFileUpload = () => {
    //     const formData = new FormData();
    //     formData.append("file", selectedFile);
    //     console.log(selectedFile); 
    //     axios({
    //         url: 'http://localhost:5000/upload',
    //         method: 'POST',
    //         data: formData,

    //     }).then((res) => {
    //         console.log(res);
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // };


    // console.log(dropdownsValues);


    return (
        <>
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
                    <div className='d-none'>
                        <Form.Item
                            name="erp_user_id"
                            initialValue={user?.data.user_token}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="erp_status"
                            initialValue={user?.data.user_token}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Subject or Discipline:</b> "If the required type of paper is missing, feel free to
                            pick “Other” and write your specific type of paper in the appeared tab."
                        </label>
                        <Form.Item name={['erp_subject_name']} label="Subject or Discipline:" rules={[{ required: true, message: 'This Field is Required!' }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={dropdownsValues ? [dropdownsValues.subject_type, {
                                    "label": "other",
                                    "value": "other"
                                }].flat() : []}
                            />
                        </Form.Item>
                    </div>
                    <div className="my-3">
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.erp_subject_name !== currentValues.erp_subject_name}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('erp_subject_name') === 'other' ? (
                                    <Form.Item
                                        name="erp_sub"
                                        label="Other Subject Discipline"
                                        rules={[{ required: true, message: 'This Field is Required!' }]}
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
                        <Form.Item name={['erp_order_topic']} label="Topic:" rules={[{ required: true, message: 'This Field is Required!' }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={[
                                    { value: 'Computer', label: 'Computer' },
                                    { value: 'Physics', label: 'Physics' },
                                    { value: 'Urdu', label: 'Urdu' },
                                    {
                                        "label": "I’ll Write the Topic",
                                        "value": "other"
                                    }
                                ]}

                            />
                        </Form.Item>
                    </div>

                    <div className="my-3">
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.erp_order_topic !== currentValues.erp_order_topic}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('erp_order_topic') === 'other' ? (
                                    <Form.Item
                                        name="erp_order_text"
                                        label="Other Topic"
                                        rules={[{ required: true, message: 'This Field is Required!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                ) : null
                            }
                        </Form.Item>
                    </div>

                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Paper Instructions:</b> "To ensure that the final paper meets your requirements, make sure your instructions are as clear and detailed as possible. This will decrease the chance of revisions in your order."
                        </label>
                        <Form.Item name={['erp_order_message']} label="Message:" rules={[{ required: false, message: 'This Field is Required!' }]}>
                            <Input.TextArea className='d-none' value={noteValue} />

                            <Note />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Academic Level:</b> "Please select the option that is the closest to your next obtainable degree."
                        </label>
                        <Form.Item name={['erp_academic_name']} label="Academic Level:" rules={[{ required: true, message: 'This Field is Required!' }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={dropdownsValues ? [dropdownsValues.academic_level, {
                                    "label": "Other (not listed above)",
                                    "value": "other"
                                }].flat() : []}

                            />
                        </Form.Item>
                    </div>
                    <div className="my-3">
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.erp_academic_name !== currentValues.erp_academic_name}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('erp_academic_name') === 'other' ? (
                                    <Form.Item
                                        name="erp_academic_description"
                                        label="Other Academic Level"
                                        rules={[{ required: true, message: 'This Field is Required!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                ) : null
                            }
                        </Form.Item>
                    </div>

                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Type of Paper:</b> "If the required type of paper is missing, feel free to pick “Other” and write your specific type of paper in the appeared tab."

                        </label>
                        <Form.Item name={['erp_paper_type']} label="Type of Paper:" rules={[{ required: true, message: 'This Field is Required!' }]}>
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
                        <Form.Item name={['erp_paper_format']} label="Paper Format:" rules={[{ required: true, message: 'This Field is Required!' }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={dropdownsValues ? dropdownsValues.paper_format : []}
                            />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <Form.Item name={['erp_language_name']} className='mb-0' label="Language and spelling style:" rules={[{ required: true, message: 'This Field is Required!' }]}>
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
                        <Form.Item name={['erp_resource_materials']} label="Will you provide any resource materials:" rules={[{ required: true, message: 'This Field is Required!' }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={[
                                    { value: 'yes', label: 'Yes' },
                                    { value: 'No', label: 'No' },
                                ]}
                            />
                        </Form.Item>
                    </div>
                    <div className="my-3">
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.erp_resource_materials !== currentValues.erp_resource_materials}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('erp_resource_materials') === 'yes' ? (
                                    <Form.Item
                                        name="erp_resource_file"
                                        label="Resource Material"

                                        rules={[{ required: true, message: 'Please Provide an Resource Material!' }]}
                                    >
                                        <Upload multiple={false} maxCount={1} >
                                            <Button type='default'>Upload</Button>
                                        </Upload>
                                    </Form.Item>
                                ) : null
                            }
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Number of Pages:</b> "Select the number of pages needed. Do not include Bibliography, Works Cited, or References pages because they are free."</label>
                        <Form.Item name={['erp_number_Pages']} label="Number of Pages:" rules={[{ required: true, message: 'This Field is Required!' }]}>
                            <InputNumber style={{ width: '100%' }} />

                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Spacing:</b>  “Double spaced pages contain approximately 300 words each, while single-spaced have 600.”</label>
                        <Form.Item name={['erp_spacing']} label="Spacing:" rules={[{ required: true, message: 'This Field is Required!' }]}>
                            {/* <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={[
                                    { value: 'SingleSpacing', label: 'Single Spacing' },
                                    { value: 'DoubleSpacing', label: 'Double Spacing' },
                                ]}
                            /> */}
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'> PowerPoint Slides:</b>  "The number of Power Point slides that will be delivered to you separately from your paper. Useful for those who need to present in front of class."</label>
                        <Form.Item name={['erp_powerPoint_slides']} label=" PowerPoint Slides:" rules={[{ required: true, message: 'This Field is Required!' }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </div>
                    <div className='my-3'>








                        <label className='fs-7'><b className='fs-7'> Sources:</b>  "This number of entries will be in your reference list or bibliography page.”</label>

                        <label className='fs-7'><b className='fs-7'>  FREE SOURCES:</b> If needed, you may request one (1) free source for every one (1) page of text that you order. For example, if you order 20 pages of text, you can request up to 20 sources for free.”</label>

                        <label className='fs-7'><b className='fs-7'>   EXTRA SOURCES:</b>      There is an additional cost of $1 per each extra source that exceeds the number of pages that you order. For example, if you order 10 pages and request 15 sources, there will be a total additional cost of $5 for the 5 extra sources.</label>


                        <Form.Item name={['erp_extra_source']} label="No. of EXTRA SOURCES:" rules={[{ required: true, message: 'This Field is Required!' }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <label className='fs-7'><b className='fs-7'>Deadline:</b>  "The time in which you will receive your completed paper. The countdown starts when we receive payment for your order. Please note that revision requests may exceed your deadline."</label>
                        <Form.Item name={['erp_deadline']} label="Deadline:" rules={[{ required: true, message: 'This Field is Required!' }]}>
                            <Select
                                defaultValue="Select an option"
                                className='text-dark'
                                options={[
                                    { value: 'erp_eight_hrs', label: '8 hours' },
                                    { value: 'erp_tf_hrs', label: '24 hours' },
                                    { value: 'erp_fe_hrs', label: '48 hours' },
                                    { value: 'erp_three_days', label: '  3 days' },
                                    { value: 'erp_five_days', label: '5 days' },
                                    { value: 'erp_seven_days', label: '  7 days' },
                                    { value: 'erp_fourteen_days', label: ' 14 days' },
                                    { value: 'erp_fourteen_plus_days', label: ' 14+ days' },
                                ]}
                            />
                        </Form.Item>
                    </div>
                    <div className='my-3'>
                        <Form.Item name={['erp_copy_sources']} label="Copy of Sources:" rules={[{ required: true, message: 'This Field is Required!' }]}>
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
                        <Form.Item name={['erp_page_summary']} label="1 Page Summary:" rules={[{ required: true, message: 'This Field is Required!' }]}>
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
                        <Form.Item name={['erp_paper_outline']} label="Paper Outline in Bullets:" rules={[{ required: true, message: 'This Field is Required!' }]}>
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
                        <Form.Item name={['erp_abstract_page']} label="Abstract Page:" rules={[{ required: true, message: 'This Field is Required!' }]}>
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
                        <Form.Item name={['erp_statistical_analysis']} label="Statistical Analysis:" rules={[{ required: true, message: 'This Field is Required!' }]}>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ >
    )
}

export default Orders