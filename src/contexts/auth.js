import { createContext, useEffect, useState } from "react";
import axios from "axios";

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
        let token;
        let role;

        //Login
        await axios
            .post("http://localhost:8080/login", {
                email: email,
                password: password
            })
            .then(data => {
                token = data.data;
            })
            .catch(err => {
                response = 'Login ou senha incorretos';
            });

        //Role
        if (!response) {
            await axios
                .get("http://localhost:8080/api/utils/userrole", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(data => {
                    role = data.data
                })
                .catch(err => {
                    response = 'Erro buscando role';
                });
        }

        if (token && role) {
            sessionStorage.setItem("user_token", JSON.stringify({ email, role, token }));
            setUser({ email, role, token });
        }

        return response;
    };

    const signup = async (name, cpfCnpj, email, password) => {
        let response;

        await axios
            .post("http://localhost:8080/api/user/", {
                name: name,
                email: email,
                cpfCnpj: cpfCnpj,
                password: password
            })
            .catch(err => {
                response = err.response.data.message;
            });

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