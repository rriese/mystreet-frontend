import axios from "axios";

const ENV = 'DEV';
const BASE_URL = ENV === 'PRD' ?  'https://mystreet-backend.herokuapp.com/' : 'http://localhost:8080/';

class ServiceBase {
    static getToken = () => {
        const userToken = JSON.parse(sessionStorage.getItem("user_token"));
        return userToken && userToken.token ? userToken.token : '';
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
                response = {
                    responseType: 'ERROR',
                    content: err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message
                }
            });

        return response;
    }
    static postRequest = async (resource, body) => {
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
                response = {
                    responseType: 'ERROR',
                    content: err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message
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
                response = {
                    responseType: 'ERROR',
                    content: err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message
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
                response = {
                    responseType: 'ERROR',
                    content: err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message
                }
            });

        return response;
    }
}

export default ServiceBase;