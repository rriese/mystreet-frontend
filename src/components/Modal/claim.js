import { useState } from "react";
import { Modal, Input, Cascader, Spin } from 'antd';
import { toast } from "react-toastify";
import ServiceBase from "../../services/serviceBase";
import { useNavigate, useLocation } from "react-router-dom";
import { getStatusClassNames } from "antd/es/_util/statusUtils";

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

const ClaimModal = ({ isModalOpen, setIsModalOpen, dataEdit, getClaims }) => {
    const [id, setId] = useState((dataEdit && dataEdit.id) || "");
    const [title, setTitle] = useState((dataEdit && dataEdit.title) || "");
    const [description, setDescription] = useState((dataEdit && dataEdit.description) || "");
    const [district, setDistrict] = useState((dataEdit && dataEdit.district) || "");
    const [loading, setLoading] = useState(false);
    const [stateAndCity, setStateAndCity] = useState((dataEdit && dataEdit.stateAndCity) || []);
    const navigate = useNavigate();
    const location = useLocation();

    const clearInputFields = () => {
        setTitle("");
        setDescription("");
        setStateAndCity("");
        setDistrict("");
        setStateAndCity([]);
    }

    const handleCancel = () => {
        clearInputFields();
        setIsModalOpen(false);
    };

    const handleOk = async () => {
        if (!title ||
            !description ||
            !stateAndCity[0] ||
            !district) {
            toast.warn("Preencha todos os campos!");
        } else {
            if (id) {
                setLoading(true);

                let serviceResponse = await ServiceBase.putRequest('api/claim/', {
                    id: id,
                    title: title,
                    description: description,
                    state: stateAndCity[0],
                    city: stateAndCity[1],
                    district: district
                });

                if (serviceResponse.responseType === 'OK') {
                    toast.success('Reclamação atualizada com sucesso!');
                    setIsModalOpen(false);
                    getClaims();
                } else {
                    toast.error(serviceResponse.content);
                }
                setLoading(false);
            } else {
                setLoading(true);

                let serviceResponse = await ServiceBase.postRequest('api/claim/', {
                    title: title,
                    description: description,
                    state: stateAndCity[0],
                    city: stateAndCity[1],
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
        }
    };

    return (
        <Modal title="Reclamação" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Spin spinning={loading} size="large">
                &nbsp;
                <Input type="hidden" value={id} />
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
                &nbsp;
                <TextArea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Descrição" />
                &nbsp;
                <span>
                    <Cascader value={stateAndCity} allowClear={false} onChange={(e) => { setStateAndCity(e); console.log(e) }} options={options} style={{ width: '100%' }} placeholder="Estado/Cidade" />
                </span>
                &nbsp;
                <Input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="Bairro" />
            </Spin>
        </Modal>
    )
}

export default ClaimModal;
