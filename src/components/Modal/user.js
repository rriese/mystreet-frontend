import { useState } from "react";
import { Modal, Input, Cascader, Spin } from 'antd';
import { toast } from "react-toastify";
import ServiceBase from "../../services/serviceBase";
import { useNavigate, useLocation } from "react-router-dom";

const { TextArea } = Input;

const options = [
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
    }
];

const UserModal = ({ isModalOpen, setIsModalOpen, dataEdit, setDataEdit, getUsers }) => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(dataEdit.id || "");
    const [name, setName] = useState(dataEdit.name || "");
    const [cpfCnpj, setCpfCnpj] = useState(dataEdit.cpfCnpj || "");
    const [email, setEmail] = useState(dataEdit.email || "");

    const clearInputFields = () => {
        setDataEdit([{}]);
        setName("");
        setCpfCnpj("");
        setEmail("");
    }

    const handleCancel = () => {
        clearInputFields();
        setIsModalOpen(false);
    };

    const handleOk = async () => {
        if (!name ||
            !cpfCnpj ||
            !email) {
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

            }

            handleCancel();
            getUsers();
        }
        //         setLoading(true);

        //         let serviceResponse = await ServiceBase.postRequest('api/claim/', {
        //             title: title,
        //             description: description,
        //             state: state,
        //             city: city,
        //             district: district
        //         });

        //         if (serviceResponse.responseType === 'OK') {
        //             toast.success('Reclamação criada com sucesso!');
        //             setIsModalOpen(false);

        //             if (location.pathname === '/home') {
        //                 navigate(0);
        //             } else {
        //                 navigate('/home');
        //             }
        //         } else {
        //             toast.error(serviceResponse.content);
        //         }
        //         setLoading(false);
        //     }
    };

    return (
        <Modal title="Usuário" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Spin spinning={loading} size="large">
                &nbsp;
                <Input type="hidden" value={id} />
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" />
                &nbsp;
                <Input value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} placeholder="Cpf/Cnpj" />
                &nbsp;
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </Spin>
        </Modal>
    )
}

export default UserModal;