import ServiceBase from "./serviceBase";

class Utils {
    static isAdmin = () => {
        const userInfo = sessionStorage.getItem("user_info");

        if (userInfo) {
            return(JSON.parse(userInfo).isAdmin);
        }

        return false;
    }

    static getUserName = () => {
        const userInfo = sessionStorage.getItem("user_info");

        if (userInfo) {
            return(JSON.parse(userInfo).userName);
        }

        return '';
    }
}

export default Utils;