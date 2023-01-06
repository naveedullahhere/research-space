import { Button, Tooltip } from 'antd'
import React, { useState } from 'react'

export const List = ({ title, style, discount, rprice, cprice, image, singleurl }) => { 
    return (
        <>
            <div className="col-12 p-0">
                <div className="main-list-card shadow bg-white">
                    <div className="my-sm-2 my-1 px-3 py-md-3 px-md-3 py-2">
                        <div className="row align-items-center">
                            <div className="col-lg-2 col-md-2 col-3 d-flex align-items-center justify-content-center">
                                <div className="listViewBanner p-2">

                                    <img src={image} className="w-100 h-100" alt={`${title}`} />
                                </div>
                            </div>
                            <div className=" col-lg-7 col-md-7 col-9">
                                <div className="card-txt h-100 d-flex justify-content-between flex-column gap-2">
                                    <a className="text-black" href={`/single-coupon/${singleurl}`}>
                                        <h4 className="  fs-4 mb-0">
                                            {title}
                                        </h4>
                                    </a>
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


                                            <img width="20px" src="https://discounts-space.com/flags/us.svg" alt="US" />

                                            <span className="mx-2 ">

                                                Home &amp; Kitchen</span>
                                            Fullfilled By
                                            Amazon
                                        </p>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-8 mx-auto h-100 main-card-foot d-md-block d-flex justify-content-md-start justify-content-center my-md-auto my-2">
                                <div className="row">
                                    <div className="d-flex cpnDcImg col-md-12 justify-content-lg-end justify-content-md-center justify-content-end" style={{ marginBottom: '102px' }}>
                                        <div className="getCode w-75 position-relative">
                                            <a href="https://amzn.to/3HStzjL" target="_blank" className="getCodeCouponTopLayer" data-coupon-code="Hello">
                                                <img src="https://discounts-space.com/frontend/img/getcode.png" alt="getCoupon" className="w-100 position-relative h-100" style={{ zIndex: 8 }} />

                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="widgets flex-md-column flex-row">
                                    <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack">
                                        <p className="mb-0 fs-12 d-md-block d-none">
                                            Save
                                        </p>

                                        <Tooltip title="save">


                                            <div className="wishlist like-container d-fle align-items-center btn bg-white">
                                                <div className="heart like-reaction text-center" data-reaction="save" data-type="coupon" data-id="466">


                                                    <img src="https://discounts-space.com/frontend/img/bookmark-line.png" className="w-75 p-1 save_img " alt="Wishlist" />


                                                </div>
                                            </div>
                                        </Tooltip>

                                    </div>

                                    <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack">
                                        <p className="mb-0 fs-12 d-md-block d-none">
                                            Wishlist
                                        </p>

                                        <Tooltip title="wishlist">
                                            <div className="wishlist like-container d-fle align-items-center btn bg-white">
                                                <div className="heart like-reaction text-center" data-reaction="wishlist" data-type="coupon" data-id="466">


                                                    <img src="https://discounts-space.com/frontend/img/heart-line.png" className="w-75 heart_img " alt="Wishlist" />


                                                </div>
                                            </div>
                                        </Tooltip>
                                    </div>

                                    <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack">
                                        <p className="mb-0 fs-12 d-md-block d-none">
                                            Like
                                        </p>

                                        <Tooltip title="like">
                                            <div className="like-container d-flex align-items-center btn bg-white p-0">
                                                <div className="like like-reaction" data-toggle="tooltip" data-placement="bottom" data-reaction="like" data-type="coupon" data-id="466">

                                                    <img style={{ height: '40px' }} src="https://discounts-space.com/frontend/img/like-line.png" className="w-75 like_img " alt="Like" />
                                                </div>
                                            </div>
                                        </Tooltip>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
