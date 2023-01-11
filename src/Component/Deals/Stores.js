import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Pagination, Segmented } from 'antd';
import { List } from '../Coupon/List';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Spinner } from '../Spinner';

export const Stores = () => {

    const params = useParams();
    const singleStore = params.singleStore;
    const { URL, user } = useContext(AppContext);


    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetch(`${URL}api/web/coupons?store_slug=${singleStore}`)
            .then((response) => response.json())
            .then((actualData) => { setData(actualData); setIsLoading(false); })
            .catch((err) => {
                setData([]);
                setIsLoading(false);
            });
    }, []);

    console.log(data);
    const [style, setStyle] = useState("List");

    const [dataFrom, setDataFrom] = useState(0);
    const [dataTo, setDataTo] = useState(30);
    var len = Math.ceil(data.length / 30);
    const [vll, setvll] = useState(1);

    const LoadMore = (e) => {

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
        <div className="sect py-md-5 py-3">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between">

                            <h1 className="heading">
                                Category
                            </h1>
                            <div>
                                <Segmented
                                    onChange={(e) => setStyle(e)}
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
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="row w-100 mx-auto px-0">
                        <div className="col-lg-12 col-md-12">

                            {isLoading ?

                                <Spinner />

                                :

                                <>
                                    <div className="row">

                                        {data.length > 0 ? (data.slice(dataFrom, dataTo).map((item) => {
                                            return <List style={style} item={item} user={user} singleurl={item.coupon.slug} image={`${item.image_path}/${item.media.image}`} title={item.coupon.title} discount={item.coupon.discount} rprice={item.coupon.regular_price} cprice={item.coupon.compare_price} />
                                        })) : <div className="col-12">
                                            <p className="para fs-4">No Coupon Found!</p>
                                        </div>}

                                    </div>

                                    {data && data.length > 30 &&

                                        <div className='pagination mt-4 justify-content-center'>
                                            <Pagination defaultCurrent={vll} total={len} pageSize={1} showPrevNextJumpers={true} onChange={(e) => LoadMore(e)} />
                                        </div>

                                    }
                                </>


                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}