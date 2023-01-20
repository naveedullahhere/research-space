import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


export const GoogleButton = () => {
    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                console.log(jwt_decode(credentialResponse.credential));
            }}
            text={'continue_with'}
            width={'50%'}
            theme={"filled_blue"}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )
}
