import ServiceBase from "./serviceBase";

class Utils {
    static isAdmin = () => {
        const userInfo = sessionStorage.getItem("user_info");

        if (userInfo) {
            return(JSON.parse(userInfo).userRole === 'ROLE_ADMIN');
        }

        return false;
    }

    static isVisitor = () => {
        const userInfo = sessionStorage.getItem("user_info");

        if (userInfo) {
            return(JSON.parse(userInfo).userRole === 'ROLE_VISITOR');
        }

        return false;
    }

    static isCityHall = () => {
        const userInfo = sessionStorage.getItem("user_info");

        if (userInfo) {
            return(JSON.parse(userInfo).userRole === 'ROLE_CITY_HALL');
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

    static getUserEmail = () => {
        const userToken = sessionStorage.getItem("user_token");

        if (userToken) {
            return (JSON.parse(userToken).email);
        }

        return '';
    }

    static availableStatesAndCities = async () => {
        let serviceResponse = await ServiceBase.getRequest('api/city/');
        let map = new Map();

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            
            for (let city of serviceResponse.content) {
                let cities = map.get(city.state.name);

                if (cities) {
                    cities.push({
                        value: city.name,
                        label: city.name
                    })
                } else {
                    map.set(city.state.name, [{
                        value: city.name,
                        label: city.name
                    }])
                }
            }
        }

        let result = [];
        for (const [key, value] of map) {
            result.push({
                value: key,
                label: key,
                children: value
            })
        }

        return result;
    }
}

export default Utils;