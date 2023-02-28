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
    };

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, signin, signup, signout }}
        >
            {children}
        </AuthContext.Provider>
    );
}