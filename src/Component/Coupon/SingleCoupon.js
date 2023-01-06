import React from 'react'
import { useParams } from 'react-router-dom';

export const SingleCoupon = () => {

    const params = useParams();
    const singleCoupon = params.singleCoupon;

    return (
        <div>{singleCoupon}</div>
    )
}
