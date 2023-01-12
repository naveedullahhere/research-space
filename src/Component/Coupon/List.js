import { Button, Tooltip } from 'antd'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HeartOutlined, HeartFilled, LikeFilled, LikeOutlined, BookFilled, BookOutlined } from '@ant-design/icons';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';


export const List = ({ title, style, discount, rprice, cprice, image, singleurl, item, hasCustom }) => {

    const { URL, user, API_TOKEN, setWishlistItems, setLikedItems, setSavedItems } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState({ 'save': false, 'like': false, 'wishlist': false });
    const navigate = useNavigate();
    const handleItem = (data) => {
        if (!user) {
            toast.error("Please Login!");
            return navigate('/login');
        }
        console.log(isLoading[data], data);
        var typp = data;
        setIsLoading({ ...isLoading, [typp]: true });
        postData(`${URL}api/web/reaction-post`, { type: data, user_token: user && user.data.user_token, reference_type: "coupon", comment: "", reference_id: item.coupon.id })
            .then(data => {
                if (data.success != false) {

                    item[typp] = true;
                    toast.success(`${typp} successfully!`);

                } else {
                    item[typp] = false;
                    toast.success(`Remove ${typp} successfully!`);
                }
                fetch(`${URL}api/web/react-items?user_id=${user ? user.data.id : ""}&user_token=${user.data.user_token}&type=${typp}`)
                    .then((response) => response.json())
                    .then((actualData) => {
                        if (typp === "wishlist") {
                            setWishlistItems(actualData);
                        }
                        else if (typp === "like") {
                            setLikedItems(actualData);
                        }
                        else if (typp === "save") {
                            setSavedItems(actualData);
                        }
                    })
                setIsLoading({ ...isLoading, [typp]: false });
            }).catch((err) => {

                setIsLoading({ ...isLoading, [typp]: false });
                toast.error("Something went wrong!");

            });

    };
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

    // console.log(item);

    if (style === "List")
        return (
            <>
                <div className="col-12 p-0 mainview">
                    <div className="main-list-card shadow bg-white">
                        <div className="my-sm-2 my-1 px-3 py-md-3 px-md-3 py-2">
                            <div className="row align-items-center">
                                <div className="col-lg-2 col-md-2 col-3 d-flex align-items-center justify-content-center">
                                    <Link className="text-black" to={`/single-coupon/${singleurl}`}>

                                        <div className="listViewBanner p-2">

                                            <img src={image} className="w-100 h-100" alt={`${title}`} />

                                        </div>
                                    </Link>
                                </div>
                                <div className=" col-lg-7 col-md-7 col-9">
                                    <div className="card-txt h-100 d-flex justify-content-between flex-column gap-2">
                                        <Link className="text-black" to={`/single-coupon/${singleurl}`}>
                                            <h4 className="text-start fs-4 mb-0">
                                                {title}
                                            </h4>
                                        </Link>
                                        <p className="para text-muted d-flex align-items-center">
                                            <strike className="text-black">${rprice} </strike>
                                            <span className="tag mb-0 text-white rounded-pill mx-2">

                                                -{discount}%

                                            </span>
                                            <span className="priz fs-5">
                                                ${cprice}


                                            </span>

                                        </p>
                                        <div className="d-flex justify-content-between align-items-baseline">
                                            <p className="para mb-0">


                                                <img width="20px" src={`${item.country && item.flag_url}/${(item.country.iso).toLowerCase()}.png`} alt="US" />

                                                <span className="mx-2 ">

                                                    {item.category && item.category.title}</span>
                                                Fullfilled By &nbsp;
                                                {item.store && item.store[0].title}
                                            </p>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-8 mx-auto h-100 main-card-foot d-md-block d-flex justify-content-md-start justify-content-center my-md-auto my-2">
                                    <div className="row">
                                        <div className="d-flex cpnDcImg col-md-12 justify-content-lg-end justify-content-md-center justify-content-end" style={{ marginBottom: '102px' }}>
                                            <div className="getCode w-75 position-relative">
                                                <a href={item.coupon.affiliate_url} target="_blank" className="getCodeCouponTopLayer" data-coupon-code="Hello">
                                                    <img src="https://discounts-space.com/frontend/img/getcode.png" alt="getCoupon" className="w-100 position-relative h-100" style={{ zIndex: 8 }} />

                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    {hasCustom && hasCustom === 'wishlist' &&
                                        <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack" onClick={() => handleItem("wishlist")}>
                                            <p className="mb-0 fs-12 d-md-block d-none">
                                                Wishlist
                                            </p>

                                            <Tooltip title="wishlist">
                                                <div className="btn p-0">
                                                    {isLoading.wishlist ? <div className="spinner d-flex justify-content-center align-items-center">
                                                        <div className="spinner-border" style={{ "float": "right" }} role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div> :

                                                        item.wishlist ?

                                                            <HeartFilled />
                                                            :

                                                            <HeartOutlined />

                                                    }
                                                </div>
                                            </Tooltip>
                                        </div>
                                    }

                                    {hasCustom && hasCustom === 'like' &&
                                        <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack" onClick={() => handleItem("like")}>
                                            <p className="mb-0 fs-12 d-md-block d-none">
                                                Like
                                            </p>

                                            <Tooltip title="like">
                                                <div className="btn p-0">

                                                    {isLoading.like ? <div className="spinner d-flex justify-content-center align-items-center">
                                                        <div className="spinner-border" style={{ "float": "right" }} role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div> : item.like ?

                                                        <LikeFilled />

                                                        :

                                                        <LikeOutlined />
                                                    }
                                                </div>
                                            </Tooltip>
                                        </div>
                                    }
                                    {hasCustom && hasCustom === 'save' &&
                                        <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack" onClick={() => handleItem("save")}>
                                            <p className="mb-0 fs-12 d-md-block d-none">
                                                Like
                                            </p>

                                            <Tooltip title="save">
                                                <div className="btn p-0">

                                                    {isLoading.save ? <div className="spinner d-flex justify-content-center align-items-center">
                                                        <div className="spinner-border" style={{ "float": "right" }} role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div> : item.save ?

                                                        <BookFilled />

                                                        :

                                                        <BookOutlined />

                                                    }
                                                </div>
                                            </Tooltip>
                                        </div>
                                    }
                                    {!hasCustom &&
                                        <div className="widgets flex-md-column flex-row">
                                            <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack" onClick={() => handleItem("save")}>
                                                <p className="mb-0 fs-12 d-md-block d-none">
                                                    Save
                                                </p>

                                                <Tooltip title="save">


                                                    <div className="btn p-0">

                                                        {isLoading.save ? <div className="spinner d-flex justify-content-center align-items-center">
                                                            <div className="spinner-border" style={{ "float": "right" }} role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div> : item.save ?

                                                            <BookFilled />

                                                            :

                                                            <BookOutlined />
                                                        }
                                                    </div>
                                                </Tooltip>

                                            </div>

                                            <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack" onClick={() => handleItem("wishlist")}>
                                                <p className="mb-0 fs-12 d-md-block d-none">
                                                    Wishlist
                                                </p>

                                                <Tooltip title="wishlist">
                                                    <div className="btn p-0">
                                                        {isLoading.wishlist ? <div className="spinner d-flex justify-content-center align-items-center">
                                                            <div className="spinner-border" style={{ "float": "right" }} role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div> : item.wishlist ?

                                                            <HeartFilled />
                                                            :

                                                            <HeartOutlined />
                                                        }
                                                    </div>
                                                </Tooltip>
                                            </div>


                                            <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack" onClick={() => handleItem("like")}>
                                                <p className="mb-0 fs-12 d-md-block d-none">
                                                    Like
                                                </p>

                                                <Tooltip title="like">
                                                    <div className="btn p-0">


                                                        {isLoading.like ? <div className="spinner d-flex justify-content-center align-items-center">
                                                            <div className="spinner-border" style={{ "float": "right" }} role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div> : item.like ?

                                                            <LikeFilled />

                                                            :

                                                            <LikeOutlined />
                                                        }


                                                    </div>
                                                </Tooltip>
                                            </div>

                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </>
        )
    else {
        return (
            <div className="col-md-4 col-sm-6 p-0 grid px-2 my-2 mainview">
                <div className="main-list-card shadow bg-white h-100">
                    <div className="my-sm-2 my-1 px-3 pt-md-3 px-md-3 pt-2">
                        <div className="align-items-center">
                            <div className="mb-4">
                                <div className="listViewBanner p-2">
                                    <img src={image} className="w-100 h-100" alt={`${title}`} />
                                </div>
                            </div>
                            <div className="">
                                <div className="card-txt h-100 d-flex justify-content-between flex-column gap-3">
                                    <a className="text-black" href={`/single-coupon/${singleurl}`}>
                                        <h4 className="heading fs-4 mb-0">
                                            {title}
                                        </h4>
                                    </a>
                                    <p className="para text-muted d-flex align-items-center mb-0">
                                        <strike className="text-black">${rprice} </strike>
                                        <span className="tag mb-0 text-white rounded-pill mx-2">

                                            -{discount}%

                                        </span>
                                        <span className="priz fs-5">
                                            ${cprice}


                                        </span>

                                    </p>
                                    <div className="d-flex justify-content-between align-items-baseline">
                                        <p className="para mb-0">


                                            <img width="20px" src={`${item.country && item.flag_url}/${(item.country.iso).toLowerCase()}.png`} alt="US" />

                                            <span className="mx-2 ">

                                                {item.category && item.category.title}</span>
                                            Fullfilled By &nbsp;
                                            {item.store && item.store[0].title}
                                        </p>

                                    </div>
                                </div>
                            </div>
                            <div className="row my-4 itemsz-row mx-auto w-100">
                                <div className="col-md-8 col-6">

                                    <div className="getCode position-relative w-75 mx-auto">
                                        <a href={item.coupon.affiliate_url} target="_blank" className="getCodeCouponTopLayer" data-coupon-code="Hello">
                                            <img src="https://discounts-space.com/frontend/img/getcode.png" alt="getCoupon" className="w-100 position-relative h-100" style={{ zIndex: 8 }} />

                                        </a>
                                    </div>
                                </div>
                                <div className={`col-md-4 col-6 position-relative my-auto ${hasCustom && "d-flex justify-content-center align-items-center"}`}>
                                    {hasCustom && hasCustom === 'wishlist' &&
                                        <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack" onClick={() => handleItem("wishlist")}>
                                            <p className="mb-0 fs-12 d-md-block d-none">
                                                Wishlist
                                            </p>

                                            <Tooltip title="wishlist">
                                                <div className="btn p-0">
                                                    {isLoading.wishlist ? <div className="spinner d-flex justify-content-center align-items-center">
                                                        <div className="spinner-border" style={{ "float": "right" }} role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div> : item.wishlist ?

                                                        <HeartFilled />
                                                        :

                                                        <HeartOutlined />
                                                    }
                                                </div>
                                            </Tooltip>
                                        </div>
                                    }

                                    {hasCustom && hasCustom === 'like' &&
                                        <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack" onClick={() => handleItem("like")}>
                                            <p className="mb-0 fs-12 d-md-block d-none">
                                                Like
                                            </p>

                                            <Tooltip title="like">
                                                <div className="btn p-0">

                                                    {isLoading.like ? <div className="spinner d-flex justify-content-center align-items-center">
                                                        <div className="spinner-border" style={{ "float": "right" }} role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div> : item.like ?

                                                        <LikeFilled />

                                                        :

                                                        <LikeOutlined />
                                                    }
                                                </div>
                                            </Tooltip>
                                        </div>
                                    }

                                    {hasCustom && hasCustom === 'save' &&
                                        <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack" onClick={() => handleItem("save")}>
                                            <p className="mb-0 fs-12 d-md-block d-none">
                                                Save
                                            </p>

                                            <Tooltip title="save">
                                                <div className="btn p-0">

                                                    {isLoading.save ? <div className="spinner d-flex justify-content-center align-items-center">
                                                        <div className="spinner-border" style={{ "float": "right" }} role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div> : item.save ?

                                                        <BookFilled />

                                                        :

                                                        <BookOutlined />

                                                    }
                                                </div>
                                            </Tooltip>
                                        </div>
                                    }

                                    {!hasCustom &&
                                        <div className="widgets top-50 start-50 translate-middle flex-md-column flex-row">
                                            <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack" onClick={() => handleItem("save")}>
                                                <p className="mb-0 fs-12 d-md-block d-none">
                                                    Save
                                                </p>

                                                <Tooltip title="save">


                                                    <div className="btn p-0">
                                                        {isLoading.save ? <div className="spinner d-flex justify-content-center align-items-center">
                                                            <div className="spinner-border" style={{ "float": "right" }} role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div> : item.save ?

                                                            <BookFilled />

                                                            :

                                                            <BookOutlined />
                                                        }
                                                    </div>
                                                </Tooltip>

                                            </div>

                                            <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack" onClick={() => handleItem("wishlist")}>
                                                <p className="mb-0 fs-12 d-md-block d-none">
                                                    Wishlist
                                                </p>

                                                <Tooltip title="wishlist">
                                                    <div className="btn p-0">
                                                        {isLoading.wishlist ? <div className="spinner d-flex justify-content-center align-items-center">
                                                            <div className="spinner-border" style={{ "float": "right" }} role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div> : item.wishlist ?

                                                            <HeartFilled />
                                                            :

                                                            <HeartOutlined />
                                                        }
                                                    </div>
                                                </Tooltip>
                                            </div>

                                            <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack" onClick={() => handleItem("like")}>
                                                <p className="mb-0 fs-12 d-md-block d-none">
                                                    Like
                                                </p>

                                                <Tooltip title="like">
                                                    <div className="btn p-0">
                                                        {isLoading.like ? <div className="spinner d-flex justify-content-center align-items-center">
                                                            <div className="spinner-border" style={{ "float": "right" }} role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div> : item.like ?

                                                            <LikeFilled />

                                                            :

                                                            <LikeOutlined />
                                                        }
                                                    </div>
                                                </Tooltip>


                                            </div>

                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
