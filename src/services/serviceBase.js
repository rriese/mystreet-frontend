import axios from "axios";
import { toast } from "react-toastify";

const ENV = 'PRD';
const BASE_URL = ENV === 'PRD' ? 'https://mystreet-backend.herokuapp.com/' : 'http://localhost:8080/';

class ServiceBase {
    static getToken = () => {
        const userToken = JSON.parse(sessionStorage.getItem("user_token"));
        return userToken && userToken.token ? userToken.token : '';
    }
    static getBaseUrl() {
        return BASE_URL;
    }
    static getRequest = async (resource) => {
        let response;

        await axios
            .get(`${BASE_URL}${resource}`, {
                headers: {
                    'Authorization': `Bearer ${ServiceBase.getToken()}`
                }
            })
            .then(data => {
                response = {
                    responseType: 'OK',
                    content: data.data
                }
            })
            .catch(err => {
                let errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message;
                this.handleError(errorMessage);

                response = {
                    responseType: 'ERROR',
                    content: errorMessage
                }
            });

        return response;
    }
    static getRequestImage = async (resource) => {
        let response;

        await axios
            .get(`${BASE_URL}${resource}`, {
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${ServiceBase.getToken()}`
                }
            })
            .then(data => {
                response = {
                    responseType: 'OK',
                    content: data.data
                }
            })
            .catch(err => {
                let errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message;
                this.handleError(errorMessage);

                response = {
                    responseType: 'ERROR',
                    content: errorMessage
                }
            });

        return response;
    }
    static postRequestUpload = async (resource, body) => {
        let response;
        let token = ServiceBase.getToken();
        let headers = {};

        if (token) {
            headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }

        await axios
            .post(`${BASE_URL}${resource}`, body, { headers })
            .then(data => {
                response = {
                    responseType: 'OK',
                    content: data.data
                }
            })
            .catch(err => {
                let errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message;
                this.handleError(errorMessage);

                response = {
                    responseType: 'ERROR',
                    content: errorMessage
                }
            });

        return response;
    }
    static postRequest = async (resource, body, ) => {
        let response;
        let token = ServiceBase.getToken();
        let headers = {};

        if (token) {
            headers = {
                'Authorization': `Bearer ${token}`
            }
        }

        await axios
            .post(`${BASE_URL}${resource}`, body, { headers })
            .then(data => {
                response = {
                    responseType: 'OK',
                    content: data.data
                }
            })
            .catch(err => {
                let errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message;
                if (resource !== 'login') {
                    this.handleError(errorMessage);
                }

                response = {
                    responseType: 'ERROR',
                    content: errorMessage
                }
            });

        return response;
    }
    static putRequest = async (resource, body) => {
        let response;
        let token = ServiceBase.getToken();
        let headers = {};

        if (token) {
            headers = {
                'Authorization': `Bearer ${token}`
            }
        }

        await axios
            .put(`${BASE_URL}${resource}`, body, { headers })
            .then(data => {
                response = {
                    responseType: 'OK',
                    content: data.data
                }
            })
            .catch(err => {
                let errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message;
                this.handleError(errorMessage);

                response = {
                    responseType: 'ERROR',
                    content: errorMessage
                }
            });

        return response;
    }
    static deleteRequest = async (resource) => {
        let response;

        await axios
            .delete(`${BASE_URL}${resource}`, {
                headers: {
                    'Authorization': `Bearer ${ServiceBase.getToken()}`
                }
            })
            .then(data => {
                response = {
                    responseType: 'OK',
                    content: data.data
                }
            })
            .catch(err => {
                let errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message;
                this.handleError(errorMessage);

                response = {
                    responseType: 'ERROR',
                    content: errorMessage
                }
            });

        return response;
    }
    static handleError = (err) => {
        //Reiniciou o backend ou token expirou, necessário logar novamente para re-gerar o token
        if (err.includes('HmacSHA512') || err.includes('The Token has expired')) {
            sessionStorage.removeItem("user_token");
            sessionStorage.removeItem("user_info");

            toast.warning('Sessão encerrada, redirecionando para a página de login!');

            setTimeout(() => {
                document.location.reload();
            }, "3000");
        } else {
            toast.error(err);
        }
    }
}

export default ServiceBase;