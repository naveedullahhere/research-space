import React from 'react';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import slide from './assets/home-slider.png';
import slide0 from './assets/home-slider0.png';
import Sliderz from "react-slick";
import slide1 from './assets/home-slider1.png';
import card0 from './assets/card0.png';
import { Link } from 'react-router-dom';
import card1 from './assets/card1.png';
import card2 from './assets/card2.png';
import card3 from './assets/card3.png';
import card4 from './assets/card4.png';
import Brand1 from './assets/Brands/Brand1.png';
import Brand2 from './assets/Brands/Brand2.png';
import Brand3 from './assets/Brands/Brand3.png';
import Brand4 from './assets/Brands/Brand4.png';
import Brand5 from './assets/Brands/Brand5.png';
import Brand6 from './assets/Brands/Brand6.png';
import Brand7 from './assets/Brands/Brand7.png';
import Brand8 from './assets/Brands/Brand8.png';
import Brand9 from './assets/Brands/Brand9.png';
import Brand0 from './assets/Brands/Brand0.png';
import Brand10 from './assets/Brands/Brand10.png';
import Brand11 from './assets/Brands/Brand11.png';
import Brand12 from './assets/Brands/Brand12.png';
import Brand13 from './assets/Brands/Brand13.png';
import Brand14 from './assets/Brands/Brand14.png';
import Brand15 from './assets/Brands/Brand15.png';
import Brand16 from './assets/Brands/Brand16.png';
import Brand17 from './assets/Brands/Brand17.png';
import TrustPiolot from './assets/trustpilot.png';
import { motion } from 'framer-motion';  

export const Home = () => {

    const settings = {
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    };
    return (
        <motion.div initial={{ transition: { duration: 1 }, opacity: 0 }} animate={{ transition: { duration: 1 }, opacity: 1 }} exit={{ transition: { duration: 1 }, opacity: 0 }}>
            <div className="sliderMain position-relative">
                <CarouselProvider className='slider container bannerSlider'
                    naturalSlideWidth={100}
                    naturalSlideHeight={50}
                    totalSlides={3}
                    isPlaying={true}
                    interval={5000}
                >
                    <Slider>
                        <Slide index={0} className="mainSlide">
                            <div className="row w-100 h-100">
                                <div className="col-6 my-auto">
                                    <h5>
                                        A world full of wonder
                                    </h5>
                                    <h1 className='my-4'>We Write The Best Chapter for Your Brand</h1>
                                    <Link to={'/contact'} className="btn btn-dark">
                                        GET A QUOTE
                                    </Link>
                                </div>
                                <div className="col-6 sliderImage my-auto"><img src={slide} alt="slide" className='w-100' /></div>
                            </div>

                        </Slide>
                        <Slide index={1} className="mainSlide">
                            <div className="row w-100 h-100">
                                <div className="col-6 my-auto">
                                    <h5>
                                        A world full of wonder
                                    </h5>
                                    <h1 className='my-4'>We Write The Best Chapter for Your Brand</h1>
                                    <button className="btn btn-dark">
                                        GET A QUOTE
                                    </button>
                                </div>
                                <div className="col-6 sliderImage my-auto"><img src={slide0} alt="slide" className='w-100' /></div>
                            </div></Slide>
                        <Slide index={2} className="mainSlide">
                            <div className="row w-100 h-100">
                                <div className="col-6 my-auto">
                                    <h5>
                                        A world full of wonder
                                    </h5>
                                    <h1 className='my-4'>We Write The Best Chapter for Your Brand</h1>
                                    <button className="btn btn-dark">
                                        GET A QUOTE
                                    </button>
                                </div>
                                <div className="col-6 sliderImage my-auto"><img src={slide1} alt="slide" className='w-100' /></div>
                            </div></Slide>
                    </Slider>
                    <ButtonBack>Back</ButtonBack>
                    <ButtonNext>Next</ButtonNext>
                </CarouselProvider>
            </div>
            <div className="sec py-5">
                <div className="container">

                    <div className="row">
                        <div className="col-12">
                            <h1 className="heading">Our Services
                            </h1>
                            <p className="my-3 text-muted para-sm">
                                From branding strategies and graphic design to web development and SEO, our masterful team cover everything with perfection to help you transform your visionary company into a reality.
                            </p>
                        </div>
                        <div className="col-md-4 col-12 my-3">
                            <div className="crd rounded-4 h-100 shadow p-4 bg-light">
                                <div className="cardImg">
                                    <img src={card0} draggable={false} className={'w-card'} alt="card" />
                                </div>
                                <div className="content">
                                    <a href="https://mediachapter.us/graphic-design/" className='fs-3 text-dark my-3 d-inline-block'>
                                        Graphic Design					</a>
                                    <p className="para-sm text-muted">Whether you’re looking for an out-of-the-box logo design or game-changing stationery for your business, the top-rated designers at MediaChapter can do it for you.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-12 my-3">
                            <div className="crd rounded-4 h-100 shadow p-4 bg-light">
                                <div className="cardImg">
                                    <img src={card1} draggable={false} className={'w-card'} alt="card" />
                                </div>
                                <div className="content">
                                    <a href="https://mediachapter.us/web-development/" className='fs-3 text-dark my-3 d-inline-block'>
                                        Web Development					</a>
                                    <p className="para-sm text-muted">Want a website where people come, stay, and take desired actions? You are at the right place. Get in touch with us now to get a workable website for your business.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-12 my-3">
                            <div className="crd rounded-4 h-100 shadow p-4 bg-light">
                                <div className="cardImg">
                                    <img src={card2} draggable={false} className={'w-card'} alt="card" />
                                </div>
                                <div className="content">
                                    <a href="https://mediachapter.us/digital-marketing/" className='fs-3 text-dark my-3 d-inline-block'>
                                        Digital Marketing					</a>
                                    <p className="para-sm text-muted">Whether you’re a startup or a settled company, our profound digital experts will come up with innovative strategies to drive new clients to your website.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-12 my-3 ms-auto">
                            <div className="crd rounded-4 h-100 shadow p-4 bg-light">
                                <div className="cardImg">
                                    <img src={card3} draggable={false} className={'w-card'} alt="card" />
                                </div>
                                <div className="content">
                                    <a href="https://mediachapter.us/content-writing/" className='fs-3 text-dark my-3 d-inline-block'>
                                        Content Writing					</a>
                                    <p className="para-sm text-muted">No matter how good your logo or website is, you can’t increase engagement without creating high-quality, fresh, and unique content. At MediaChapter, we have creative writers who can do the job for you.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-12 my-3 me-auto">
                            <div className="crd rounded-4 h-100 shadow p-4 bg-light">
                                <div className="cardImg">
                                    <img src={card4} draggable={false} className={'w-card'} alt="card" />
                                </div>
                                <div className="content">
                                    <a href="https://mediachapter.us/seo" className='fs-3 text-dark my-3 d-inline-block'>
                                        SEO					</a>
                                    <p className="para-sm text-muted">Want a website where people come, stay, and take desired actions? You are at the right place. Get in touch with us now to get a workable website for your business.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sec py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="heading">
                                Our Recent Works
                            </h1>
                            <p className="para-sm text-muted my-3">
                                We create client-focused websites that generate desired results. Transform your digital presence with the help of our professional web developers.
                            </p>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="sec py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="heading">How It Works</h1>
                            <p className="my-3 para-sm text-muted">All it takes is three easy steps to get started your branding process with MediaChapter.</p>
                        </div>
                        <div className="col-12 my-5">
                            <div className="row">
                                <div className="col-md-4 col-12 my-md-0 my-4">
                                    <div className="main text-center">
                                        <div className="bg-danger px-4 py-2 rounded-2 text-white d-inline">
                                            STEP 01
                                        </div>
                                        <h4 className="heading fs-4 mt-4">
                                            Fill The Form
                                        </h4>
                                        <p className="text-muted para-sm">
                                            First things first. Tell us about your business and needs via the form so that we connect you with the right people.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 my-md-0 my-4">
                                    <div className="main text-center">
                                        <div className="bg-danger px-4 py-2 rounded-2 text-white d-inline">
                                            STEP 02
                                        </div>
                                        <h4 className="heading fs-4 mt-4">
                                            Connect With Experts

                                        </h4>
                                        <p className="text-muted para-sm">
                                            Once we get your form, we connect you with the required experts. You can keep in touch with them throughout the working process.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 my-md-0 my-4">
                                    <div className="main text-center">
                                        <div className="bg-danger px-4 py-2 rounded-2 text-white d-inline">
                                            STEP 03
                                        </div>
                                        <h4 className="heading fs-4 mt-4">
                                            Get The Project

                                        </h4>
                                        <p className="text-muted para-sm">
                                            If it’s a logo design, website, or content writing, we will hand over your project before the deadline and if it’s digital marketing or SEO-related work, we will share daily, weekly, and monthly reports with you.

                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-12 mx-auto mt-md-5">
                            <Link to="/contact" className="btn btn-main">GET A QUOTE</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sec py-5">
                <section className="customer-logos slider">
                    <Sliderz {...settings}>

                        <div className="slide"><img alt="" src={Brand1} /></div>
                        <div className="slide"><img alt="" src={Brand2} /></div>
                        <div className="slide"><img alt="" src={Brand3} /></div>
                        <div className="slide"><img alt="" src={Brand4} /></div>
                        <div className="slide"><img alt="" src={Brand5} /></div>
                        <div className="slide"><img alt="" src={Brand6} /></div>
                        <div className="slide"><img alt="" src={Brand7} /></div>
                        <div className="slide"><img alt="" src={Brand8} /></div>
                        <div className="slide"><img alt="" src={Brand9} /></div>
                        <div className="slide"><img alt="" src={Brand10} /></div>
                        <div className="slide"><img alt="" src={Brand11} /></div>
                        <div className="slide"><img alt="" src={Brand12} /></div>
                        <div className="slide"><img alt="" src={Brand13} /></div>
                        <div className="slide"><img alt="" src={Brand14} /></div>
                        <div className="slide"><img alt="" src={Brand15} /></div>
                        <div className="slide"><img alt="" src={Brand16} /></div>
                        <div className="slide"><img alt="" src={Brand17} /></div>

                    </Sliderz>
                </section>
            </div>
            <div className="sec py-5">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <img src={TrustPiolot} alt="trustpiolet" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
