import React, { useContext } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from './Component/Home';
import { AnimatePresence } from 'framer-motion';
import { Contact } from './Component/Contact';
import { Blog } from './Component/Blog';
import { Login } from './Component/Auth/Login';
import { Register } from './Component/Auth/Register';
import { AppContext } from './context/AppContext';
import { BlogDetails } from './Component/BlogDetails';
import { Spinner } from './Component/Spinner';
import { PrivateRoutes } from './PrivateRoutes';
import { NotFound } from './Component/404';
import { MyAccount } from './Component/Dashboard/MyAccount';
import { Wishlist } from './Component/Dashboard/Wishlist';
import { SingleCoupon } from './Component/Coupon/SingleCoupon';
import { Deals } from './Component/Deals/Deals';
import { Coupon } from './Component/Deals/Coupon';
import { Forgot } from './Component/Auth/Forgot';
import { Search, SearchCouponDeals } from './Component/Search/SearchCouponDeals';
import { Video } from './Component/Video/Video';
import { Like } from './Component/Dashboard/Like';
import { SingleCollection } from './Component/Deals/SingleCollection';
import { Stores } from './Component/Deals/Stores';
import { Saved } from './Component/Dashboard/Saved';
import { SingleVideo } from './Component/Video/SingleVideo';


export const MainRoutes = () => {
    const { isPageLoading, user } = useContext(AppContext);

    const { pathname } = useLocation();
    return (
        <AnimatePresence>
            {isPageLoading ?
                <div className="my-4">
                    <Spinner />
                </div>
                :
                <Routes key={pathname} location={pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:singleBlog" element={<BlogDetails />} />
                    <Route path="/single-coupon/:singleCoupon" element={<SingleCoupon />} />
                    <Route path="/search/:searchedData" element={<SearchCouponDeals />} />
                    <Route path="/collections/:singleCollection" element={<SingleCollection />} />
                    <Route path="/video/:singleVideo" element={<SingleVideo />} />
                    <Route path="/stores/:singleStore" element={<Stores />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/coupons" element={<Coupon />} />
                    <Route path="/password/reset" element={<Forgot />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/video" element={<Video />} />
                    <Route path="/notfound" element={<NotFound />} />
                    <Route path="/*" element={<NotFound />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/saved" element={<Saved />} />
                        <Route path="/my-account" element={<MyAccount />} exact />
                        <Route path="/wishlist" element={<Wishlist />} exact />
                        <Route path="/like" element={<Like />} exact />
                        {/*  <Route path="/projects" element={user && user.data.user_type === "user" && user.data.is_varified ? <Projects /> : <NotFound />} />
                        <Route path="/projects/:singleProject" element={user && user.data.user_type === "user" && user.data.is_varified ? <SingleProject /> : <NotFound />} />
                        <Route path="/invoices" element={user && user.data.user_type === "user" && user.data.is_varified ? < Invoices /> : <NotFound />} />
                        <Route path="/invoices/:singleInvoice" element={user && user.data.user_type === "user" && user.data.is_varified ? <SingleInvoice /> : <NotFound />} exact /> */}
                        {/* <Route path="/completed-projects" element={user && user.data.user_type === "user" ? <CompletedProjects /> : <NotFound />} exact /> */}
                        {/* <Route path="/private-chat" element={<Chat />} /> */}
                        {/* <Route path="/project-discussion" element={user && user.data.user_type === "user" && user.data.is_varified ? <ProjectDiscussion /> : <NotFound />} /> */}
                        {/* <Route path="/project-discussion/:project" element={user && user.data.user_type === "user" ? <SingleProjectDiscussion /> : <NotFound />} exact /> */}
                        {/* <Route path="/project-discussion/:project" element={<SingleProjectDiscussion />} exact /> */}
                    </Route>
                </Routes>
            }
        </AnimatePresence>
    )
}
