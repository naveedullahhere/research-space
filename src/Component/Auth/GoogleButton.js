import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';


export const GoogleButton = ({ where }) => {
    const { continueWithSocials } = useContext(AppContext);



    // const login = useGoogleLogin({
    //     onSuccess: credentialResponse => console.log(credentialResponse),
    //     onError: () => toast.error("Something went wrong!"),
    //     flow: 'auth-code',
    // });

    return (
        <>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    continueWithSocials('google', credentialResponse.credential, where, window.location.href);
                }}
                text={'continue_with'}
                size={'large'}
                logo_alignment={'left'}
                // width={85%}
                
                theme={"filled_blue"}
                onError={() => {
                    toast.error("Something went wrong!");
                }}
            />


            {/* <div class="google-btn" onClick={() => { login(); }}>
                <div class="google-icon-wrapper">
                    <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                </div>
                <p class="btn-text"><b>Sign in with google</b></p>
            </div> */}

        </>
    )
}
