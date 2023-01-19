import { Segmented } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { List } from '../Coupon/List';
import { Spinner } from '../Spinner';
import { toast } from 'react-hot-toast';
import { TagsList } from '../Coupon/TagsList';

export const TagsHeader = () => {

    const { heartedTags, setCurrentTag, currentTag, URL, style, user, setStyle, dispatch } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [img, setImg] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${URL}public/api/web/coupons?type=&category_ids=&store_id=&discount=&sort=0&min_price=&max_price=&type=deals&graph=featured`)
            .then((response) => response.json())
            .then((actualData) => { setData(actualData); setIsLoading(false); setImg(actualData.media_path); })
            .catch((err) => {
                setData([]);
                setIsLoading(false);
                toast.error("Something went wrong!");
            }
            );
    }, [])

    const handleTag = (item) => {
        if (currentTag === item) {
            setCurrentTag("");
        }
        else {
            setCurrentTag(item);
        }
        console.log(currentTag);
    }
    return (
        <div className='container'>
            <div class="wrapper">
                <div class="icon"><i id="left" class="fa-solid fa-angle-left"></i></div>
                <ul class="tabs-box">
                    {heartedTags.map((item, i) => {
                        return <li key={i} class={`tab ${currentTag === item && "active"}`} onClick={() => handleTag(item)}>{item}</li>
                    })}
                </ul>
                <div class="icon"><i id="right" class="fa-solid fa-angle-right"></i></div>
            </div>



            <div class={`shopping-cart ${!currentTag && "cart-opened"}`}>
                <div class="shopping-cart-header row">
                    {/* <i class="fa fa-shopping-cart cart-icon"></i><span class="badge">3</span>
                    <div class="shopping-cart-total">
                        <span class="lighter-text">Total:</span>
                        <span class="main-color-text">$2,229.97</span>
                       
                    </div> */}
                    <div className="col-12">

                        <div className="d-flex justify-content-between">

                            <h1 className="heading">
                                {currentTag}
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

                                data && data.slice(0, 5).map((item) => {
                                    return <TagsList style={"Grid"} singleurl={item.coupon.slug} itemPerRow={'3'} key={item.coupon.id} item={item} user={user} image={`${item.image_path}/${item.media.image}`} title={item.coupon.title} discount={item.coupon.discount} rprice={item.coupon.regular_price} cprice={item.coupon.compare_price} />
                                })}


                        </div>
                    </div>

                </div>
            </div >
        </div >
    )
}
