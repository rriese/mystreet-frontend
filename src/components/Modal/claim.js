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

const ClaimModal = ({ isModalOpen, setIsModalOpen }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [teste, setTeste] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const clearInputFields = () => {
        setTitle("");
        setDescription("");
        setState("");
        setCity("");
        setDistrict("");
        setTeste("");
    }

    const handleCancel = () => {
        clearInputFields();
        setIsModalOpen(false);
    };

    const handleOk = async () => {
        if (!title ||
            !description ||
            !state ||
            !city ||
            !district) {
            toast.warn("Preencha todos os campos!");
        } else {
            setLoading(true);

            let serviceResponse = await ServiceBase.postRequest('api/claim/', {
                title: title,
                description: description,
                state: state,
                city: city,
                district: district
            });

            if (serviceResponse.responseType === 'OK') {
                toast.success('Reclamação criada com sucesso!');
                setIsModalOpen(false);

                if (location.pathname === '/home') {
                    navigate(0);
                } else {
                    navigate('/home');
                }
            } else {
                toast.error(serviceResponse.content);
            }
            setLoading(false);
        }
    };

    return (
        <Modal title="Nova Reclamação" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Spin spinning={loading} size="large">
                &nbsp;
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
                &nbsp;
                <TextArea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Descrição" />
                &nbsp;
                <span>
                    <Cascader value={teste} allowClear={false} onChange={(e) => { setState(e[0]); setCity(e[1]); }} options={options} style={{ width: '100%' }} placeholder="Estado/Cidade" />
                </span>
                &nbsp;
                <Input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="Bairro" />
            </Spin>
        </Modal>
    )
}

export default ClaimModal;