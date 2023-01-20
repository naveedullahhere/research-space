import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';


export const GoogleButton = ({ where }) => {
    const { continueWithSocials } = useContext(AppContext);



    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                continueWithSocials('google', credentialResponse.credential, where, window.location.href);
            }}
            text={'continue_with'}
            width={'100%'}
            theme={"filled_blue"}
            onError={() => {
                toast.error("Something went wrong!");
            }}
        />
    )
}
