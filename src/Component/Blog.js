import { Spinner } from './Spinner';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const Blog = () => {

    const [data, setData] = useState([]);
    const [img, setImg] = useState(null);


    useEffect(() => {
        fetch(`https://www.discounts-space.com/api/blogs?token=152784823qtjzdfg213&paginate=2&since_id=25`)
            .then((response) => response.json())
            .then((actualData) => { setData(actualData.data.data); console.log(actualData.data.data); setImg(actualData.image_path); })
            .catch((err) => {
                setData([]);
            });
    }, []);

    return (
        <>
            <div className="container sect py-md-5 py-3 text-start">
                <div className="row">
                    <div className="col-12">
                        <h2 className='ps-0 heading'>BLOGS</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 col-12">

                        {data.length > 0

                            ?

                            data.map((item) => {
                                return <div className="blog-detail blog-grid-view">
                                    <Link to={`/blog/${item.id}`}><img className='b-img rounded-5 mb-3' src={`${img}/${item.image}`} alt={item.title} /></Link>

                                    <p className='text-start p-0 heading-md-h'>{item.title}</p>
                                    <div className="by-time f d-flex justify-content-between">
                                        <small><p>{item["username "]}</p></small>
                                        <small><p>{item.updated_at.split("T")[0]}</p></small>
                                    </div>

                                    <p className='pata-text' dangerouslySetInnerHTML={{ __html: item.short_description }}></p>
                                    <button href="#" class="btn bg-signature text-white mb-4 px-4 py-2 rounded-5">
                                        Read More
                                    </button>
                                </div>
                            })

                            :

                            <Spinner />

                        }



                    </div>
                    <div className="col-md-4 col-12 py-3">
                        <h2 className='text-start'> TOP CATEGORIES <hr className='m-0' /></h2>
                        <div className="row d-flex justify-content-center px-3">
                            <div className="col-lg-6 my-lg-0 my-2">
                                <button href="#" class="btn top-cat-btn bg-signature text-white px-2 py-2 rounded-5">
                                    <i class="fa-solid me-1 fa-key"></i>
                                    ACCESSORIES
                                </button>
                            </div>
                            <div className="col-lg-6 my-lg-0 my-2">
                                <button href="#" class="btn top-cat-btn bg-signature text-white px-2 py-2 rounded-5">
                                    <i class="fa-solid me-1 fa-paintbrush"></i>
                                    Beauty
                                </button>
                            </div>

                        </div>
                        <div className="row d-flex justify-content-center px-3">
                            <div className="col-lg-6  my-2">
                                <button href="#" class="btn top-cat-btn bg-signature text-white px-2 py-2 rounded-5">
                                    <i class="fa-solid me-1 fa-car"></i>
                                    AUTOMOTIVE
                                </button>
                            </div>
                            <div className="col-lg-6  my-2">
                                <button href="#" class="btn top-cat-btn bg-signature text-white px-2 py-2 rounded-5">
                                    <i class="fa-solid me-1 fa-book"></i>
                                    BOOKS/MEDIA
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
