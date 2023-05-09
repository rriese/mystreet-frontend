import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { Spin } from 'antd'
import ServiceBase from "../../services/serviceBase";
import { toast } from "react-toastify";

const SendEmail = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const handleLinkSend = async () => {
        if (!email) {
            toast.warn('Preencha o email!');
        } else {
            setLoading(true);
            let serviceResponse = await ServiceBase.postRequest('api/changepassword/sendemail/' + email);

            if (serviceResponse && serviceResponse.responseType === 'OK') {
                toast.success('Uma mensagem foi enviada para seu email contendo o link para alteração da senha!');
            }
            setLoading(false);
        }
    }

    return (
        <C.Container style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/img/fundo.jpg'})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}>
            <Spin spinning={loading} size="large">
                <C.Label>MYSTREET</C.Label>
                <C.Content>
                    <Input
                        type="email"
                        placeholder="Digite seu E-mail"
                        value={email}
                    onChange={(e) => [setEmail(e.target.value)]}
                    />
                    <Button Text="Enviar link" onClick={handleLinkSend} />
                    <C.LabelStyled>
                        Voltar para 
                        <C.Strong>
                            <Link to="/">&nbsp;Página inicial</Link>
                        </C.Strong>
                    </C.LabelStyled>
                </C.Content>
            </Spin>
        </C.Container>
    )
}

export default SendEmail;