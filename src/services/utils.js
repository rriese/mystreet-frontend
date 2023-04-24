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

    static availableStatesAndCities = () => {
        return [
            {
                value: 'Santa Catarina',
                label: 'Santa Catarina',
                children: [
                    {
                        value: 'Jaraguá do Sul',
                        label: 'Jaraguá do Sul'
                    },
                    {
                        value: 'Joinville',
                        label: 'Joinville'
                    },
                ],
            },
            {
                value: 'Paraná',
                label: 'Paraná',
                children: [
                    {
                        value: 'Curitiba',
                        label: 'Curitiba'
                    }
                ],
            }
        ];
    }
}

export default Utils;