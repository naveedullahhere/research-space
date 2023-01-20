import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';


export const GoogleButton = () => {
    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
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
