import { useState } from "react";
import { Modal, Input, Cascader, Spin, Upload, Button } from 'antd';
import { toast } from "react-toastify";
import FloatLabel from "../FloatLabel";
import ServiceBase from "../../services/serviceBase";

const StateModal = ({ isModalOpen, setIsModalOpen, dataEdit, getStates }) => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState((dataEdit && dataEdit.id) || "");
    const [name, setName] = useState((dataEdit && dataEdit.name) || "");

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = async () => {
        if (!name) {
            toast.warn("Preencha todos os campos!");
        } else {
            if (id) {
                setLoading(true);
                let serviceResponse = await ServiceBase.putRequest('api/state/', {
                    id: id,
                    name: name
                });

                if (serviceResponse && serviceResponse.responseType === 'OK') {
                    toast.success('Estado atualizado com sucesso!');
                    setIsModalOpen(false);
                }
                setLoading(false);
                getStates();
            } else {
                setLoading(true);
                let serviceResponse = await ServiceBase.postRequest('api/state/', {
                    name: name
                });

                if (serviceResponse && serviceResponse.responseType === 'OK') {
                    toast.success('Estado criado com sucesso!');
                    setIsModalOpen(false);
                }
                setLoading(false);
                getStates();
            }
        }
    }

    return (
        <Modal title="Estado" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Spin spinning={loading} size="large">
                &nbsp;
                <Input type="hidden" value={id} />
                <FloatLabel label="Nome" value={name}>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </FloatLabel>
            </Spin>
        </Modal>
    )
}

export default StateModal;