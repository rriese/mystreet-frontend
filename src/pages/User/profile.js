import React, { useEffect, useState } from "react";
import { Card, Input, Button, Spin, Tooltip } from 'antd';
import { toast } from "react-toastify";
import ServiceBase from "../../services/serviceBase";

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");

    const populateField = async () => {
        setLoading(true);

        let serviceResponse = await ServiceBase.getRequest("api/user/currentuser");

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            setId(serviceResponse.content.id);
            setName(serviceResponse.content.name);
            setEmail(serviceResponse.content.email);
            setCpfCnpj(serviceResponse.content.cpfCnpj);
        } else {
            toast.error(serviceResponse.content);
        }
        setLoading(false);
    }

    const saveProfile = async () => {
        if (!name ||
            !email ||
            !cpfCnpj) {
            toast.warn("Preencha todos os campos!");
        } else {
            setLoading(true);

            let serviceResponse = await ServiceBase.putRequest('api/user/', {
                id: id,
                name: name,
                email: email,
                cpfCnpj: cpfCnpj
            });

            if (serviceResponse && serviceResponse.responseType === 'OK') {
                toast.success('Perfil atualizado com sucesso!');
            } else {
                toast.error(serviceResponse.content);
            }
        }

        setLoading(false);
        populateField();
    }

    useEffect(() => {
        populateField();
    }, []);

    return (
        <Card title="Meu Perfil">
            <Spin spinning={loading} size="large">
                <center>
                    <Input type="hidden" value={id}></Input>
                    <Tooltip title="Nome">
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" style={{ width: '50%' }} /><br /><br />
                    </Tooltip>
                    <Tooltip title="Email">
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={{ width: '50%' }} /><br /><br />
                    </Tooltip>
                    <Tooltip title="Cpf/Cnpj">
                        <Input value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} placeholder="Cpf/Cnpj" style={{ width: '50%' }} /><br /><br />
                    </Tooltip>
                    <Button type="primary" onClick={() => saveProfile()}>Salvar</Button>
                </center>
            </Spin>
        </Card>
    )
}

export default Profile;