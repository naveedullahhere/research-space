import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

export const BlogDetails = () => {

    const { URL } = useContext(AppContext);
    const params = useParams();
    const [data, setData] = useState([]);
    const [img, setImg] = useState(null);
    const singleBlog = params.singleBlog;


    useEffect(() => {
        fetch(`${URL}api/single-blog/${singleBlog}`)
            .then((response) => response.json())
            .then((actualData) => { setData(actualData.data); setImg(actualData.media_path); })
            .catch((err) => {
                setData([]);
            });
    }, []);

    return (
        <motion.div initial={{ transition: { duration: 1 }, opacity: 0 }} animate={{ transition: { duration: 1 }, opacity: 1 }} exit={{ transition: { duration: 1 }, opacity: 0 }}>
            <div className='sec py-5'>
                {data ?
                    <div className="container text-start">
                        <div className="row">
                            <div className="col-md-6 my-3">
                                <img src={`${img}/${data.image}`} alt="singleBlog" className='w-100 rounded-4' />
                            </div>
                            <div className="col-md-6 my-md-auto my-3">
                                <h6 className="heading mb-3" >
                                    {data.title}
                                </h6>
                                <p className="para-sm" dangerouslySetInnerHTML={{ __html: data.short_description }}>
                                </p>
                            </div>
                            <div className="col-md-12 my-3">
                                <p className="para-sm" dangerouslySetInnerHTML={{ __html: data.long_description }}>
                                </p>
                            </div>
                        </div>
                    </div>
                    : "Something Went Wrong!"}
            </div>
        </motion.div>
    )
}
