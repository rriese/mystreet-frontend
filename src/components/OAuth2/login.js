import { GoogleLogin } from 'react-google-login'
import useAuth from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";

const GoogleAuth2Login = () => {
    const { signin, signup } = useAuth();
    const navigate = useNavigate();

    const onSuccess = async (res) => {
        const notLogged = await signin(res.profileObj.email, res.profileObj.googleId);

        if (notLogged) {
            const signedUp = await signup(res.profileObj.name, res.profileObj.googleId, res.profileObj.email, res.profileObj.googleId);

            if (!signedUp) {
                await signin(res.profileObj.email, res.profileObj.googleId);
            }
        }
        navigate("/home");
    }

    const onFailure = (res) => {
        alert('Falha ao logar com o Google: ' + res)
    }

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID}
                buttonText='Logar com conta do Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
                prompt='select_account'
            />
        </div>
    )
}

export default GoogleAuth2Login;
