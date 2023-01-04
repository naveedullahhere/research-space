import { motion } from 'framer-motion';
import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Error } from './Error';
import { Spinner } from './Spinner';




export const Blog = () => {

    const { APP_NAME, setTitle, URL } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(true);
    const [isErr, setIsError] = useState(false);
    const [data, setData] = useState([]);
    const [img, setImg] = useState(null);

    useEffect(() => {
        fetch(`${URL}api/blogs?token=152784823qtjzdfg213&paginate=2&since_id=0`)
            .then((response) => response.json())
            .then((actualData) => { setData(actualData.data.data); setIsLoading(false); setImg(actualData.media_path); })
            .catch((err) => {
                setData([]);
                setIsError(true);
                setIsLoading(false);
            }
            );
    }, []);

    if (data.length > 0) {
        console.log(data[0].short_description);
    }


    setTitle(`${APP_NAME}Blog`);
    return (
        <motion.div initial={{ transition: { duration: 1 }, opacity: 0 }} animate={{ transition: { duration: 1 }, opacity: 1 }} exit={{ transition: { duration: 1 }, opacity: 0 }}>
            <div className="sec py-5 blog  ">
                <div className="container">
                    {
                        data.length >= 1 &&

                        <div className="row">
                            <div className="col-12">
                                <h1 className="heading">
                                    Boost Your Knowledge with Creative Blog
                                </h1>
                                <p className="para-sm text-muted">
                                    Reading can help you build opinions and make better decisions. Let’s go through our creative and informative blog and enhance your knowledge.
                                </p>
                            </div>
                            <div className="col-lg-11 mx-auto my-4">
                                <div className="row">
                                    {data.map((item) => {
                                        return <div className="col-lg-4 col-md-6 col-sm-6 col-12 my-3 text-start">
                                            <div className="card rounded-4 overflow-hidden shadow">
                                                <img src={`${img}/${item.image}`} className="card-img-top" alt="blog" />
                                                <div className="card-body my-3">
                                                    <h6 className="card-title">{item.title}</h6>
                                                    <p className="my-3 text-danger fs-smm">
                                                        {new Date(item.updated_at).toLocaleString("en-us")}
                                                    </p>
                                                    <p className="card-text para-sm fs-smm text-muted" dangerouslySetInnerHTML={{ __html: item.short_description }}>
                                                    </p>
                                                    <Link to={`/blog/${item.slug}`} className="text-danger">Read More ↗</Link>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>}
                    {isLoading &&
                        <Spinner />
                    }
                    {isErr &&
                        <Error />
                    }
                </div>
            </div>
            {/* <div className="sec py-5 blog">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="heading">
                                You May Also Like
                            </h1>
                            <p className="para-sm text-muted">
                                Looking for some more professionally-tailored blog posts? Take a look at some well-written blogs below.
                            </p>
                        </div>
                        <div className="col-lg-10 mx-auto my-4">
                            <div className="row">
                                <div className="col-md-6 my-3">
                                    <div className="card mb-3 text-start shadow h-100">
                                        <div className="row g-0 h-100">
                                            <div className="col-md-6">
                                                <img src="https://www.mediachapter.us/wp-content/uploads/2021/10/Why-you-should-choose-1-300x256.jpg" className="h-100 w-100 img-fluid rounded-start" alt="Blog" />
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <h6 className="card-title">Why you should choose PPC Services for your Small Business?</h6>
                                                    <p className="my-3 text-danger fs-smm">October 17, 2021  No Comments</p>
                                                    <p className="card-text para-sm fs-smm text-muted">Why you should choose PPC Services for your Small Business? PPC Services for Small Business PPC marketing is one of the most</p>
                                                    <a href="#" className="text-danger">Read More ↗</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 my-3">
                                    <div className="card shadow mb-3 text-start h-100">
                                        <div className="row g-0 h-100">
                                            <div className="col-md-6">
                                                <img src="https://www.mediachapter.us/wp-content/uploads/2021/10/8-reasons-why-your-300x256.jpg" className="h-100 w-100 img-fluid rounded-start" alt="Blog" />
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <h6 className="card-title">8 Reasons Why Your Website Needs Search Engine Optimization</h6>
                                                    <p className="my-3 text-danger fs-smm">October 17, 2021  No Comments</p>
                                                    <p className="card-text para-sm fs-smm text-muted">8 Reasons Why Your Website Needs Search Engine Optimization Moment’s consumers calculate on hunt machines to help them find everything</p>
                                                    <a href="#" className="text-danger">Read More ↗</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 my-3">
                                    <div className="card mb-3 text-start shadow h-100">
                                        <div className="row g-0 h-100">
                                            <div className="col-md-6">
                                                <img src="https://www.mediachapter.us/wp-content/uploads/2021/10/social-media-marketing-1-300x256.jpg" className="h-100 w-100 img-fluid rounded-start" alt="Blog" />
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <h6 className="card-title">Social Media Marketing for Businesses</h6>
                                                    <p className="my-3 text-danger fs-smm">January 10, 2022  No Comments</p>
                                                    <p className="card-text para-sm fs-smm text-muted">Social Media Marketing for Businesses Social media marketing is an important way for businesses of all sizes to reach prospects</p>
                                                    <a href="#" className="text-danger">Read More ↗</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 my-3">
                                    <div className="card mb-3 text-start shadow h-100">
                                        <div className="row g-0 h-100">
                                            <div className="col-md-6">
                                                <img src="https://www.mediachapter.us/wp-content/uploads/2021/10/9-principles-1-300x256.webp" className="h-100 w-100 img-fluid rounded-start" alt="Blog" />
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <h6 className="card-title">9 PRINCIPLES OF GOOD WEB DESIGN</h6>
                                                    <p className="my-3 text-danger fs-smm">February 14, 2022  No Comments</p>
                                                    <p className="card-text para-sm fs-smm text-muted">9 PRINCIPLES OF GOOD WEB DESIGN Effective website design should perform the intended function of delivering its message while placing</p>
                                                    <a href="#" className="text-danger">Read More ↗</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 my-">
                            <button className="btn btn-main">
                                SEE MORE
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
        </motion.div>
    )
}
