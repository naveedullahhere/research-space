import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Spinner } from './Spinner';
import { toast } from 'react-toastify';
import Item from 'antd/es/list/Item';

export const BlogDetails = () => {

    const params = useParams();
    const [data, setData] = useState([]);
    const [img, setImg] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const singleBlog = params.singleBlog;



    useEffect(() => {

        fetch(`https://www.discounts-space.com/public/api/single-blog/${singleBlog}?token=152784823qtjzdfg213`)
            .then((response) => response.json())
            .then((actualData) => { setData(actualData.data); setIsLoading(false); setImg(actualData.image_path); })
            .catch((err) => {
                setData([]);
                setIsLoading(false);
                toast.error("something went wrong!");
            });
    }, []);


    console.log(data);


    return (
        <motion.div initial={{ transition: { duration: 1 }, opacity: 0 }} animate={{ transition: { duration: 1 }, opacity: 1 }} exit={{ transition: { duration: 1 }, opacity: 0 }}>
            <div className='sec py-5'>
                {data.id &&
                    <div className="container text-start single-blog">
                        <div className="row">
                            <div className="col-12">
                                <h2 class=" fs-2 main-heading fw-sm-bold text-start p-0 text-truncate">
                                    {data.title}
                                </h2>
                                <p class="fs-6 text-muted fw-sm-bold">

                                    By {data.username} Last Updated on {data.updated_at.split("T")[0]}
                                </p>
                                <p class="fs-6 text-main fw-sm-bold">

                                    0 Comments

                                </p>
                            </div>
                            <div className="col-md-12 mb-3">
                                <div dangerouslySetInnerHTML={{ __html: data.long_description }}>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {isLoading && <Spinner />}
            </div>
        </motion.div>
    )
}
