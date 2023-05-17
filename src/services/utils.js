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
            },
            {
                value: 'Minas Gerais',
                label: 'Minas Gerais',
                children: [
                    {
                        value: 'Belo Horizonte',
                        label: 'Belo Horizonte'
                    }
                ],
            }
        ];
    }
}

export default Utils;