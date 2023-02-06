import React, { useContext } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Home } from './Component/Home';
import { AnimatePresence } from 'framer-motion';
import { Contact } from './Component/Contact';
import { Login } from './Component/Auth/Login';
import { Register } from './Component/Auth/Register';
import { AppContext } from './context/AppContext';
import { Spinner } from './Component/Spinner';
import { PrivateRoutes } from './PrivateRoutes';
import { NotFound } from './Component/404';
import { MyAccount } from './Component/Dashboard/MyAccount';
import { Forgot } from './Component/Auth/Forgot';
import { toast } from 'react-hot-toast'; 
import Cart from './Component/Cart';
import Checkout, { Chechkout } from './Component/Chechkout';
import { Product } from './Component/Product';
import { ProductDetails } from './Component/ProductDetails';
import { MySubscriptions } from './Component/Dashboard/MySubscriptions';
import SingleSubscription from './Component/SingleSubscription';


export const MainRoutes = () => {
    const { isPageLoading, addUserData, dispatch, URL } = useContext(AppContext);

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const continueWithSocials = (type, credentials, where, domain) => {

        if (where === 'login') {

            fetch(`${URL}api/web/loginwithsocial`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ credentials: credentials, type: type, domain: domain })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success != false) {
                        dispatch(addUserData(data.data, []));
                        toast.success(data.message);
                        navigate('/');
                    } else {
                        toast.error(data.message);
                    }
                }).catch((err) => {
                    toast.error("Something went wrong!");
                })
        }
        else if (where === 'signup') {
            if (type === 'facebook') {
                fetch(`${URL}api/web/signupwithsocial`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ credentials: credentials, type: type, domain: domain })
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success != false) {
                            dispatch(addUserData(data.data, []));
                            toast.success(data.message);
                            navigate('/');

                        } else {
                            toast.error(data.message);
                        }
                    }).catch((err) => {
                        toast.error("Something went wrong!");
                    })
            }

            else {
                fetch(`${URL}api/web/signupwithsocial`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ credentials: credentials, type: type, domain: domain })
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success != false) {
                            dispatch(addUserData(data.data, []));
                            toast.success(data.message);
                            navigate('/');

                        } else {
                            toast.error(data.message);
                        }
                    }).catch((err) => {
                        toast.error("Something went wrong!");
                    })
            }
        }

        else {
            toast.error("Something went wrong!");
        }
    }
    return (
        <AnimatePresence>
            {isPageLoading ?
                <div className="my-4">
                    <Spinner />
                </div>
                :
                <Routes key={pathname} location={pathname}>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:singleBlog" element={<BlogDetails />} /> */}
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/product/:singleProduct" element={<ProductDetails />} /> 
                    <Route path="/password/reset" element={<Forgot />} />
                    <Route path="/notfound" element={<NotFound />} />
                    <Route path="/*" element={<NotFound />} />
                    <Route path="/login" element={<Login continueWithSocials={continueWithSocials} />} />
                    <Route path="/register" element={<Register continueWithSocials={continueWithSocials} />} />
                    <Route path="/cart" element={<Cart />} exact />
                    {/* <Route path="/cart" element={<  Cart />}  /> */}
                    <Route element={<PrivateRoutes />}>
                        <Route path="/checkout/:item" element={<Checkout />} exact />
                        {/* <Route path="/checkout" element={<Checkout />} exact /> */}
                        <Route path="/my-account" element={<MyAccount />} exact />
                        <Route path="/my-subscriptions" element={<MySubscriptions />} exact />
                        <Route path="/my-subscriptions/:subscription" element={<SingleSubscription />} />
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
