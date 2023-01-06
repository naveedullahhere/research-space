
import React, { useContext, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { List } from '../Coupon/List';
import { Filter } from '../Filter/Filter';
import { Spinner } from '../Spinner';

export const Coupon = () => {

    const [category, setCategory] = useState([]);
    const [discount, setDiscount] = useState([]);
    const refMinPrice = useRef([null]);
    const refMaxPrice = useRef([]);
    const [sort, setSort] = useState(0);
    const [store, setStore] = useState("");
    const params = useParams();
    const value = params.value;
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [searchedCoupons, setSearchedCoupons] = useState();
    const [filterState, setFilterState] = useState(true);


    return (
        <>

            <div className="sect py-md-5 py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="heading">
                                Coupons
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row w-100 mx-auto px-0">
                            <div class="col-lg-3 col-md-12 col-sm-12 px-md-3 px-md-0">
                                <div class=" shadow border-0 rounded-4 my-1">
                                    <div class="col-12">
                                        <button class="btn bg-signature text-white w-100 px-3 py-2" id="toggle_filter" onClick={() => setFilterState(!filterState)}>Filters</button>
                                        <Filter
                                            setCategory={setCategory}
                                            category={category}
                                            setDiscount={setDiscount}
                                            discount={discount}
                                            setSort={setSort}
                                            sort={sort}
                                            setStore={setSort}
                                            store={store}
                                            refMinPrice={refMinPrice}
                                            refMaxPrice={refMaxPrice}

                                            filterState={filterState}
                                            setData={setData}
                                            setSearchedCoupons={setSearchedCoupons}
                                            setIsLoading={setIsLoading}
                                            type={'coupon'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-12">
                                {isLoading ?

                                    <Spinner />

                                    :

                                    searchedCoupons ? (searchedCoupons.map((item) => {
                                        return <List singleurl={item.coupon.slug} image={`${item.image_path}/${item.media.image}`} title={item.coupon.title} discount={item.coupon.discount} rprice={item.coupon.regular_price} cprice={item.coupon.compare_price} />
                                    })) : "No Coupon Found!"

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}