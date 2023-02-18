import { Button, Form, Input, Modal, Upload } from 'antd';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { UploadOutlined } from '@ant-design/icons';

const Files = () => {

    const [currentProduct, setCurrentProduct] = useState('');
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);

    const [form] = Form.useForm();
    const showModal = (item) => {
        setOpen(true);
        setCurrentProduct(item);
    };


    const onFinish = (values) => {
        console.log(values);
    };





    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file);
        });
        setUploading(true);
        fetch('http://localhost:65332/upload', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                setFileList([]);
                toast.success('upload successfully.');
                console.log(data.filePath);

                setFiles([...files, data.filePath])

                // setOpen(false)
            })
            .catch(() => {
                toast.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };


    console.log(files.flat());
    const props = {
        listType: 'picture',
        accept: "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf",
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },

        fileList,
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
                    name="form_in_modal"
                    onFinish={onFinish}
                    initialValues={{ modifier: 'public' }}
                    layout={'vertical'}
                    style={{ maxWidth: "100%", marginTop: 18 }}
                >
                    <Upload {...props}  >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form >
            </Modal >
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between">
                        <h5 className="fw-bold">Files</h5>
                        <button className="btn btn-main" onClick={() => showModal(true)}>
                            Upload Files
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Files