import { useState } from "react";
import { Modal, Input, Spin, Select } from 'antd';
import { toast } from "react-toastify";
import ServiceBase from "../../services/serviceBase";

const UserModal = ({ isModalOpen, setIsModalOpen, dataEdit, setDataEdit, getUsers }) => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(dataEdit.id || "");
    const [name, setName] = useState(dataEdit.name || "");
    const [cpfCnpj, setCpfCnpj] = useState(dataEdit.cpfCnpj || "");
    const [email, setEmail] = useState(dataEdit.email || "");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState(dataEdit.userType || null);
    const [userTypeDisabled, setUserTypeDisabled] = useState(dataEdit.userType ? true : false);

    const clearInputFields = () => {
        setDataEdit([{}]);
        setName("");
        setCpfCnpj("");
        setEmail("");
        setUserType(null);
    }

    const handleCancel = () => {
        clearInputFields();
        setIsModalOpen(false);
    };

    const handleOk = async () => {
        if (!name ||
            !cpfCnpj ||
            !email ||
            !userType ||
            (dataEdit.id ? false : !password)) {
            toast.warn("Preencha todos os campos!");
        } else {
            setLoading(true);

            if (dataEdit.id) {
                let serviceResponse = await ServiceBase.putRequest('api/user/', {
                    id: id,
                    name: name,
                    email: email,
                    cpfCnpj: cpfCnpj
                });

                if (serviceResponse && serviceResponse.responseType === 'OK') {
                    toast.success('Usuário atualizado com sucesso!');
                } else {
                    toast.error(serviceResponse.content);
                }
            } else {
                let resource = userType === 'ROLE_CITY_HALL' ? 'api/admin/createcityhalluser' :
                    userType === 'ROLE_ADMIN' ? 'api/admin/createadminuser' : 'api/user/';

                let serviceResponse = await ServiceBase.postRequest(resource, {
                    name: name,
                    email: email,
                    cpfCnpj: cpfCnpj,
                    password: password
                });

                if (serviceResponse && serviceResponse.responseType === 'OK') {
                    toast.success('Usuário criado com sucesso!');
                } else {
                    toast.error(serviceResponse.content);
                }
            }

            handleCancel();
            getUsers();
        }
    };

    return (
        <>
            <Modal title="Usuário" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Spin spinning={loading} size="large">
                    &nbsp;
                    <Input type="hidden" value={id} />
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" />
                    &nbsp;
                    <Input value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} placeholder="Cpf/Cnpj" />
                    &nbsp;
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    &nbsp;
                    {!userTypeDisabled && <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />}
                    &nbsp;
                    <Select
                        style={{ width: '100%' }}
                        value={userType}
                        onSelect={(e) => setUserType(e)}
                        options={[
                            { value: 'ROLE_ADMIN', label: 'Administrador' },
                            { value: 'ROLE_CITY_HALL', label: 'Prefeitura' },
                            { value: 'ROLE_VISITOR', label: 'Visitante' }
                        ]}
                        placeholder="Tipo de usuário"
                        disabled={userTypeDisabled}
                    />
                </Spin>
            </Modal>
        </>
    )
}

export default UserModal;