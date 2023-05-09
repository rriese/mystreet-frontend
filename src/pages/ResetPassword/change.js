import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import ServiceBase from '../../services/serviceBase';
import { useNavigate } from "react-router-dom";
import { Result, Spin } from 'antd';
import { toast } from "react-toastify";

const ChangePassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const initialize = async () => {
        setLoading(true);
        let serviceResponse = await ServiceBase.getRequest('api/changepassword/' + token);

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            setIsTokenValid(true);
            setEmail(serviceResponse.content.email);
        }
        setLoading(false);
    }

    const handleSave = async () => {
        setLoading(true);
        let serviceResponse = await ServiceBase.postRequest('api/changepassword/' + email + '/' + token, {
            password
        });

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            toast.success('Senha atualizada com sucesso!');
            navigate('/');
        }
        setLoading(false);
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        <>
            <Spin spinning={loading} size="large">
                {isTokenValid ?
                    <C.Container style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/img/fundo.jpg'})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}>

                        <C.Label>MYSTREET</C.Label>
                        <C.Content>
                            <Input
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => [setPassword(e.target.value)]}
                            />
                            <Button Text="Salvar" onClick={handleSave} />
                        </C.Content>
                    </C.Container>
                    :
                    <Result
                        status="404"
                        title="404"
                        subTitle="Desculpe, o token não existe na base de dados."
                    />}
            </Spin>
        </>
    )
}

export default ChangePassword;