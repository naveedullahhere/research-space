import React, { useContext } from 'react'; 
import { AppContext } from '../../context/AppContext';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { toast } from 'react-hot-toast';



export const FacebookButton = ({ where }) => {
    const { continueWithSocials } = useContext(AppContext);

    return (
        <>
            <LoginSocialFacebook
                appId='920872965587366'
                onResolve={(res) => {
                    continueWithSocials("facebook", res.data, where, window.location.href);
                }}

                onReject={(err) => {
                    toast.error("Something went wrong!");
                }} >

                <FacebookLoginButton />
            </LoginSocialFacebook>
        </>

        // <fb:login-button
        //     config_id="{730601482029779}"
        //     onlogin="checkLoginState();">
        // </fb:login-button>
    )
}
