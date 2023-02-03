import { Pagination, Segmented } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Spinner } from './Spinner';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';



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

    const page = useRef(null);

    return (
        <motion.div initial={{ transition: { duration: 1 }, opacity: 0 }} animate={{ transition: { duration: 1 }, opacity: 1 }} exit={{ transition: { duration: 1 }, opacity: 0 }}>

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
                                {isLoading ?

                                    <Spinner />
                                    :
                                    <>
                                        {
                                            data.map((item) => {
                                                return <div className="col-lg-4 col-md-4 col-12 my-3" key={item.id}>
                                                    <div class="product-card">
                                                        <div class="product-tumb">
                                                            <img src={`${img}/${item.image}`} alt="" />
                                                        </div>
                                                        <div class="product-details">
                                                            <h4><a href="">{item.title}</a></h4>
                                                            <div className="row">
                                                                <div className="col-9">
                                                                    <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                                                </div>
                                                                <div className="col-3">
                                                                    <p className='text-end' dangerouslySetInnerHTML={{ __html: item.subscription_duration }}></p>

                                                                </div>
                                                            </div>
                                                            <div class="product-bottom-details d-flex align-items-center justify-content-between">
                                                                <div class="product-price">${item.price}</div>
                                                                <div class="product-links">
                                                                    <button className="py-2 btn btn-main" onClick={() => addToCart(item)} >
                                                                        Add to Cart
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
