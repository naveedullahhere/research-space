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
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/coupons" element={<Coupon />} />
                    <Route path="/password/reset" element={<Forgot />} />
                    <Route path="/login" element={!user ? <Login /> : <NotFound />} />
                    <Route path="/notfound" element={<NotFound />} />
                    <Route path="/*" element={<NotFound />} />
                    <Route path="/register" element={!user ? <Register /> : <NotFound />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/my-account" element={user && user.data.is_varified ? <MyAccount /> : <NotFound />} exact />
                        <Route path="/wishlist" element={user && user.data.is_varified ? <Wishlist /> : <NotFound />} exact />
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
