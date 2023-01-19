import { Segmented } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { List } from '../Coupon/List';
import { Spinner } from '../Spinner';
import { toast } from 'react-hot-toast';
import { TagsList } from '../Coupon/TagsList';

export const TagsHeader = () => {

    const { heartedTags, setCurrentTag, currentTag, URL, style, user, setStyle, dispatch } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [itmsFrom, setItemFrom] = useState('');
    const [img, setImg] = useState(null);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setCurrentTag("");
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }



    const handleTag = (item) => {
        setIsLoading(true);
        setData([]);

        fetch(`${URL}api/web/react-items?user_token=${user.data.user_token}&type=save&search=${item}`).then(res => res.json()).then(json => {
            if (json.length) {
                // toast.success("Item Found");
                setItemFrom("cart");
                setData(json);
                setIsLoading(false);

            }
            else {

                setIsLoading(false);
                setItemFrom("global");
                fetch(`${URL}api/web/coupons?user_id=${user ? user.data.id : ""}&search=${item}`).then(res => res.json()).then(json => {
                    setData(json)
                }).catch(err => {
                    toast.error("Something went wrong!");
                })
            }

        }).catch(err => {
            setIsLoading(false);
            toast.error("Something went wrong!");
        })



        if (currentTag === item) {
            setCurrentTag("");
        }
        else {
            setCurrentTag(item);
        }
    }

    return (
        <div className='container' ref={wrapperRef}>
            <div class="wrapper">
                <div class="icon"><i id="left" class="fa-solid fa-angle-left"></i></div>
                <ul class="tabs-box">
                    {heartedTags.map((item, i) => {
                        return <li key={i} class={`tab ${currentTag === item && "active"}`} onClick={() => handleTag(item)}>{item}</li>
                    })}
                </ul>
                <div class="icon"><i id="right" class="fa-solid fa-angle-right"></i></div>
            </div>



            <div class={`shopping-cart ${!currentTag && "cart-opened"}`} >
                <div class="shopping-cart-header row">
                    {/* <i class="fa fa-shopping-cart cart-icon"></i><span class="badge">3</span>
                    <div class="shopping-cart-total">
                        <span class="lighter-text">Total:</span>
                        <span class="main-color-text">$2,229.97</span>
                       
                    </div> */}
                    <div className="col-12">

                        <div className="d-flex justify-content-between">

                            <h1 className="heading">
                                {!isLoading && (itmsFrom === 'cart' ? `'${currentTag}' From Cart` : `Search Result for '${currentTag}'`)}
                            </h1>
                            <div>
                                {/* <Segmented
                                    onChange={(e) => dispatch(setStyle(e))}
                                    defaultValue={style}
                                    options={[
                                        {
                                            value: 'List',
                                            icon: <BarsOutlined />,
                                        },
                                        {
                                            value: 'Kanban',
                                            icon: <AppstoreOutlined />,
                                        },
                                    ]}
                                /> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mx-auto">
                        <div className='row w-100 mx-auto'>

                            {isLoading ?

                                <Spinner />

                                :
                                <>
                                    {data && data.slice(0, itmsFrom === "cart" ? data.length : 10).map((item) => {
                                        return <TagsList style={"Grid"} singleurl={item.coupon.slug} itemPerRow={'3'} key={item.coupon.id} item={item} user={user} image={`${item.image_path}/${item.media.image}`} title={item.coupon.title} discount={item.coupon.discount} rprice={item.coupon.regular_price} cprice={item.coupon.compare_price} />
                                    })}


                                    {itmsFrom === "global" && data.length ?
                                        <div className='w-100 text-center mt-3'>

                                            <a className="bg-signature text-white btn">
                                                See More
                                            </a>

                                        </div>
                                        : ""
                                    }

                                    {
                                        !data.length &&
                                        "No Data!"

                                    }

                                </>


                            }
                        </div>
                    </div>

                </div>
            </div >
        </div >
    )
}
