import { Pagination } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import slider0 from "./assets/DiscountSp/slider.png";
import { List } from './Coupon/List';
import { Deal } from './Deals/Deal';
import { Spinner } from './Spinner';

export const Home = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [dataFrom, setDataFrom] = useState(0);
    const [dataTo, setDataTo] = useState(30);
    const [isErr, setIsError] = useState(false);
    const [currTab, setCurrTab] = useState(1);
    const [vll, setvll] = useState(1);
    const [data, setData] = useState([]);
    const [img, setImg] = useState(null);

    var len = Math.ceil(data.length / 30);

    useEffect(() => {
        fetch(`https://discounts-space.com/public/api/coupons?token=152784823qtjzdfg213&type=&category_ids=&store_id=&discount=&sort=0&min_price=&max_price=&type=deals&search=`)
            .then((response) => response.json())
            .then((actualData) => { setData(actualData); setIsLoading(false); setImg(actualData.media_path); })
            .catch((err) => {
                setData([]);
                setIsError(true);
                setIsLoading(false);
                toast.error("something went wrong!");
            }
            );
    }, []);


    const page = useRef(null);

    const LoadMore = (e) => {

        page.current.scrollIntoView({ behavior: 'smooth' });
        setvll(e)
        setTimeout(() => {
            if (len === e) {
                let val = len - 1;
                val *= 30;
                setDataFrom(val);
                setDataTo(data.length);
            }
            else if (e === 1) {
                setDataFrom(0);
                setDataTo(30);
            }
            else {
                setDataFrom(e * 30 - 30);
                setDataTo(e * 30);
            }
            setIsLoading(false);
        }, 2000);
        setIsLoading(true);



    }

    return (
        <>
            <div className="section sec-1" ref={page}>

                <div className="slider">
                    <div id="carouselExample" className="carousel slide">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={slider0} className="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="sect py-md-5 py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12">
                            <div className='row w-100 mx-auto'>
                                <div className="col-12">
                                    <h1 className="heading">
                                        Featured Deals
                                    </h1>
                                </div>
                                {isLoading ?

                                    <Spinner />
                                    :
                                    <>

                                        {data && data.slice(dataFrom, dataTo).map((item) => {
                                            return <List singleurl={item.coupon.slug} image={`${item.image_path}/${item.media.image}`} title={item.coupon.title} discount={item.coupon.discount} rprice={item.coupon.regular_price} cprice={item.coupon.compare_price} />
                                        })}

                                        <div className='pagination mt-4 justify-content-center'>
                                            <Pagination defaultCurrent={vll} total={len} pageSize={1} showPrevNextJumpers={true} onChange={(e) => LoadMore(e)} />
                                        </div>

                                    </>
                                }
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 p-0">
                            <div className='row w-100 mx-auto'>
                                <div className="col-12">
                                    <h1 className="heading">
                                        hot deals
                                    </h1>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <Deal img={"https://discounts-space.com/images/media/coupon16717282291874257781.jpg?v=110482"} title={"Air Fryer Oven"} link={"https://discounts-space.com/single-coupons/air-fryer-oven"} />
                                    <Deal img={"https://discounts-space.com/images/media/coupon16717282291874257781.jpg?v=110482"} title={"Air Fryer Oven"} link={"https://discounts-space.com/single-coupons/air-fryer-oven"} />
                                    <Deal img={"https://discounts-space.com/images/media/coupon16717282291874257781.jpg?v=110482"} title={"Air Fryer Oven"} link={"https://discounts-space.com/single-coupons/air-fryer-oven"} />
                                    <Deal img={"https://discounts-space.com/images/media/coupon16717282291874257781.jpg?v=110482"} title={"Air Fryer Oven"} link={"https://discounts-space.com/single-coupons/air-fryer-oven"} />
                                    <Deal img={"https://discounts-space.com/images/media/coupon16717282291874257781.jpg?v=110482"} title={"Air Fryer Oven"} link={"https://discounts-space.com/single-coupons/air-fryer-oven"} />
                                    <Deal img={"https://discounts-space.com/images/media/coupon16717282291874257781.jpg?v=110482"} title={"Air Fryer Oven"} link={"https://discounts-space.com/single-coupons/air-fryer-oven"} />
                                    <Deal img={"https://discounts-space.com/images/media/coupon16717282291874257781.jpg?v=110482"} title={"Air Fryer Oven"} link={"https://discounts-space.com/single-coupons/air-fryer-oven"} />
                                    <Deal img={"https://discounts-space.com/images/media/coupon16717282291874257781.jpg?v=110482"} title={"Air Fryer Oven"} link={"https://discounts-space.com/single-coupons/air-fryer-oven"} />
                                    <Deal img={"https://discounts-space.com/images/media/coupon16717282291874257781.jpg?v=110482"} title={"Air Fryer Oven"} link={"https://discounts-space.com/single-coupons/air-fryer-oven"} />
                                    <Deal img={"https://discounts-space.com/images/media/coupon16717282291874257781.jpg?v=110482"} title={"Air Fryer Oven"} link={"https://discounts-space.com/single-coupons/air-fryer-oven"} />
                                    <Deal img={"https://discounts-space.com/images/media/coupon16717282291874257781.jpg?v=110482"} title={"Air Fryer Oven"} link={"https://discounts-space.com/single-coupons/air-fryer-oven"} />
                                    <Deal img={"https://discounts-space.com/images/media/coupon16717282291874257781.jpg?v=110482"} title={"Air Fryer Oven"} link={"https://discounts-space.com/single-coupons/air-fryer-oven"} />
                                    <Deal img={"https://discounts-space.com/images/media/coupon16717282291874257781.jpg?v=110482"} title={"Air Fryer Oven"} link={"https://discounts-space.com/single-coupons/air-fryer-oven"} />
                                    <Deal img={"https://discounts-space.com/images/media/coupon16717282291874257781.jpg?v=110482"} title={"Air Fryer Oven"} link={"https://discounts-space.com/single-coupons/air-fryer-oven"} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
