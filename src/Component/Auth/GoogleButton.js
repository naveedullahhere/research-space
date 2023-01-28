import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


export const GoogleButton = ({ where }) => {
    const { continueWithSocials } = useContext(AppContext);



    const login = useGoogleLogin({
        onSuccess: async response => {
            const data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${response.access_token}`
                }
            });


            console.log(data.data);

            continueWithSocials('google', data.data, where, window.location.href)

        },
        onError: () => toast.error("Something went wrong!"),
    });

    return (
        <>
            {/* <GoogleLogin
                onSuccess={(credentialResponse) => {
                    continueWithSocials('google', credentialResponse.credential, where, window.location.href);
                }}
                text={'continue_with'}
                size={'large'}
                logo_alignment={'left'}
                // width={85%}
                auto_select="false"

                theme={"filled_blue"}
                onError={() => {
                    toast.error("Something went wrong!");
                }}
            /> */}


            <div class="google-btn d-flex align-items-center" onClick={login}>
                <div class="google-icon-wrapper">
                    <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                </div>
                <div>

                    <p class="btn-text text-white mb-0">{where === "login" ? "Sign in" : "Signup" }  with google</p>

                </div>
            </div>

        </>
    )
}
