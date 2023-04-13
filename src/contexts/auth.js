import { createContext, useEffect, useState } from "react";
import ServiceBase from "../services/serviceBase";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = sessionStorage.getItem("user_token");

        if (userToken) {
            setUser(JSON.parse(userToken));
        }
    }, []);

    const signin = async (email, password) => {
        let response;
        let serviceResponse = await ServiceBase.postRequest('login', {
            email: email,
            password: password
        });

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            let token = serviceResponse.content;

            sessionStorage.setItem("user_token", JSON.stringify({ email, token }));
            setUser({ email, token });

            let isAdminServiceResponse = await ServiceBase.getRequest('api/utils/isadmin');
            let isAdmin = false;

            if (isAdminServiceResponse && isAdminServiceResponse.responseType === 'OK') {
                isAdmin = isAdminServiceResponse.content;
            }

            let currentUser = await ServiceBase.getRequest('api/user/currentuser');
            let userName = '';

            if (currentUser && currentUser.responseType === 'OK') {
                userName = currentUser.content.name;
            }
            sessionStorage.setItem("user_info", JSON.stringify({ isAdmin, userName }));
        } else {
            response = 'Login ou senha incorretos';
        }
        return response;
    };

    const signup = async (name, cpfCnpj, email, password) => {
        let response;
        let serviceResponse = await ServiceBase.postRequest('api/user/', {
            name: name,
            email: email,
            cpfCnpj: cpfCnpj,
            password: password
        });

        if (serviceResponse && serviceResponse.responseType === 'ERROR') {
            response = serviceResponse.content;
        }
        return response;
    };

    const signout = () => {
        setUser(null);
        sessionStorage.removeItem("user_token");
        sessionStorage.removeItem("user_info");
    };

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, signin, signup, signout }}
        >
            {children}
        </AuthContext.Provider>
    );
}