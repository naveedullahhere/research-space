import { Button, Card, Divider, Empty, Form, Input, List, Modal, Skeleton, Upload } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';

const Details = ({ order }) => {

    const { URL, user, dispatch, addUserData, APP_NAME } = useContext(AppContext);
    const [isLoading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const [currentProduct, setCurrentProduct] = useState('');
    const [title, setTitle] = useState('');
    const [err, setErr] = useState('');
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);

    const showModal = (item) => {
        setOpen(true);
        setCurrentProduct(item);
    };


    const onFinish = (values) => {
        console.log(values);
    };


    const [messages, setMessages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const handleUpload = () => {

        setUploading(true);
        const formData = new FormData();


        formData.append('order_id', order);
        formData.append('txt', title);
        formData.append('type', "message");
        formData.append('user_token', user.data.user_token);


        // console.log(messages, formData);


        var ffff = formData.get('file');

        console.log(ffff, formData);

        var data = {
            file: formData,
            order_id: order,
            user_token: user.data.user_token
        }

        // console.log(ffff);
        setUploading(true);
        fetch('https://eliteblue.net/research-space/api/webs/manage-files', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {

                if (data.success) {

                    toast.success(data.message);

                    // data.path.forEach(item => {
                    //     // console.log(item);
                    // });


                    for (const item of data.path) {
                        setFiles([...files, { file: item, files: data.files, title: data.title, file_id: data.file_id, name: user.data.name, created_at: data.created_at, user_token: user.data.user_token }]);
                    }

                } else {
                    toast.error(data.message);
                }

                setOpen(false);
                setMessages([]);
                setTitle('');
                setUploading(false);
            })
            .catch(() => {
                toast.error('upload failed.');
                setUploading(false);
            })
            .finally(() => {
                setUploading(false);
            });
    };




    return (
        <>
            <Modal
                title="Inquiry Now"
                open={open}
                onOk={handleUpload}

                confirmLoading={uploading}
                okText="Submit"
                cancelText="Cancel"
                onCancel={() => setOpen(false)}
            >
                <Form
                    form={form}
                    encType='multipart/form-data'
                    name="form_in_modal"
                    onFinish={onFinish}
                    initialValues={{ modifier: 'public' }}
                    layout={'vertical'}
                    style={{ maxWidth: "100%", marginTop: 18 }}
                >
                    {/* <div className='d-flex gap-2'> */}
                    <div className='w-100 d-flex flex-column'>
                        <div className="d-flex w-100">
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Type Message...' />
                        </div>
                    </div>
                    {/* </div> */}
                </Form >
            </Modal >
            <div className="row">
                <div className="col-12">

                    <div className="d-flex justify-content-between">
                        <h5 className="fw-bold">Details</h5>
                        <button className="btn btn-main" onClick={() => showModal(true)}>
                            Post Additional
                        </button>
                    </div>

                </div>
                <div className="col-md-9 mt-3">
                    <div className="row w-100 mx-auto">
                        <div className="col-md-4 px-1 my-2">
                            <Card size="small" className='shadow-sm' bordered={false}>
                                Order ID : 600
                            </Card>
                        </div>
                        <div className="col-md-4 px-1 my-2">
                            <Card size="small" className='shadow-sm' bordered={false}>
                                Number of Pages: 47
                            </Card>
                        </div>
                        <div className="col-md-4 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                Topic: pstr
                            </Card>
                        </div>
                        <div className="col-md-4 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                Spacing: Double
                            </Card>
                        </div>
                        <div className="col-md-4 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                Sources: No
                            </Card>
                        </div>
                        <div className="col-md-4 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                Customer’s Deadline:Three days
                            </Card>
                        </div>
                        <div className="col-md-4 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                Paper Format: 15
                            </Card>
                        </div>
                        <div className="col-md-4 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                Academic Level: one
                            </Card>
                        </div>
                        <div className="col-md-4 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                Paper Type: 13
                            </Card>
                        </div>
                        <div className="col-md-4 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                Paper Type file
                            </Card>
                        </div>
                        <div className="col-md-4 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                Paper Format file
                            </Card>
                        </div>
                        <div className="col-md-4 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                Paper Type description: wacwcwc
                            </Card>
                        </div>
                        <div className="col-md-4 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                Paper format description: APA
                            </Card>
                        </div>
                    </div>
                    <Divider className='my-2' />
                    <div className="row w-100 mx-auto">
                        <div className="col-md-6 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                1-Page Summary:PowerPoit Slides : 91
                            </Card>
                        </div>
                        <div className="col-md-6 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                1-Page Summary: Yes
                            </Card>
                        </div>
                        <div className="col-md-6 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                Statistical Analysis: Yes
                            </Card>
                        </div>
                        <div className="col-md-6 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                Abstract: Yes
                            </Card>
                        </div>
                        <div className="col-md-6 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                A Copy of Sources: No
                            </Card>
                        </div>
                        <div className="col-md-6 px-1 my-2">
                            <Card className='shadow-sm' size="small" bordered={false}>
                                Outline in Bullets: Yes
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mt-3">
                    <div className="row">
                        <div className="col-12 px-1 my-2">
                            <Card size="small" className='shadow-sm' title="Order Deadline:" bordered={false}>
                                18-Feb-2023 | 08:48 PM
                            </Card>
                        </div>
                        <div className="col-12 px-1 my-2">
                            <Card className='shadow-sm' size="small" title="Time Left:" bordered={false}>
                                3 Days 22 Hours 28 Minutes

                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details