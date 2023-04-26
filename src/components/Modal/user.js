import { useState } from "react";
import { Modal, Input, Spin, Select, Cascader } from 'antd';
import { toast } from "react-toastify";
import ServiceBase from "../../services/serviceBase";
import Utils from "../../services/utils";

const UserModal = ({ isModalOpen, setIsModalOpen, dataEdit, setDataEdit, getUsers, isCityHall }) => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(dataEdit.id || "");
    const [name, setName] = useState(dataEdit.name || "");
    const [cpfCnpj, setCpfCnpj] = useState(dataEdit.cpfCnpj || "");
    const [email, setEmail] = useState(dataEdit.email || "");
    const [password, setPassword] = useState("");
    const [stateAndCity, setStateAndCity] = useState((dataEdit && dataEdit.stateAndCity) || []);
    const [userType, setUserType] = useState(dataEdit.userType || (isCityHall ? "ROLE_CITY_HALL" : null) || null);
    const [showDataOnCreate, setShowDataOnCreate] = useState(dataEdit.userType ? true : false);

    const clearInputFields = () => {
        setDataEdit([{}]);
        setName("");
        setCpfCnpj("");
        setEmail("");
        setUserType(null);
        setStateAndCity([]);
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
            (isCityHall ? !stateAndCity[0] : false) ||
            (dataEdit.id ? false : !password)) {
            toast.warn("Preencha todos os campos!");
        } else {
            setLoading(true);

            if (dataEdit.id) {
                let serviceResponse;
                
                if (isCityHall) {
                    serviceResponse = await ServiceBase.putRequest('api/user/', {
                        id: id,
                        name: name,
                        email: email,
                        cpfCnpj: cpfCnpj,
                        state: stateAndCity[0],
                        city: stateAndCity[1]
                    });
                } else {
                    serviceResponse = await ServiceBase.putRequest('api/user/', {
                        id: id,
                        name: name,
                        email: email,
                        cpfCnpj: cpfCnpj
                    });
                }

                if (serviceResponse && serviceResponse.responseType === 'OK') {
                    toast.success('Usuário atualizado com sucesso!');
                }
            } else {
                let resource = userType === 'ROLE_CITY_HALL' ? 'api/admin/createcityhalluser' :
                    userType === 'ROLE_ADMIN' ? 'api/admin/createadminuser' : 'api/user/';

                let serviceResponse;

                if (isCityHall) {
                    serviceResponse = await ServiceBase.postRequest(resource, {
                        name: name,
                        email: email,
                        cpfCnpj: cpfCnpj,
                        password: password,
                        state: stateAndCity[0],
                        city: stateAndCity[1]
                    });
                } else {
                    serviceResponse = await ServiceBase.postRequest(resource, {
                        name: name,
                        email: email,
                        cpfCnpj: cpfCnpj,
                        password: password
                    });
                }

                if (serviceResponse && serviceResponse.responseType === 'OK') {
                    toast.success('Usuário criado com sucesso!');
                }
            }

            handleCancel();
            getUsers();
        }
    };

    const getUserTypeOptions = (isCityHall) => {
        let data = [];

        if (isCityHall) {
            data.push({ value: 'ROLE_CITY_HALL', label: 'Prefeitura' });
        } else {
            data.push({ value: 'ROLE_ADMIN', label: 'Administrador' });
            data.push({ value: 'ROLE_VISITOR', label: 'Visitante' });
        }

        return data;        
    }

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
                    {!showDataOnCreate && <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />}
                    &nbsp;
                    {isCityHall && <Cascader value={stateAndCity} allowClear={false} onChange={(e) => { setStateAndCity(e); console.log(e) }} options={Utils.availableStatesAndCities()} style={{ width: '100%' }} placeholder="Estado/Cidade" />}
                    &nbsp;
                    <Select
                        style={{ width: '100%' }}
                        value={userType}
                        onSelect={(e) => setUserType(e)}
                        options={getUserTypeOptions(isCityHall)}
                        placeholder="Tipo de usuário"
                        disabled={showDataOnCreate}
                    />
                </Spin>
            </Modal>
        </>
    )
}

export default UserModal;