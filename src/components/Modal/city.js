import { useState, useEffect } from "react";
import { Modal, Input, Cascader, Spin, Upload, Button, Select } from 'antd';
import { toast } from "react-toastify";
import FloatLabel from "../FloatLabel";
import ServiceBase from "../../services/serviceBase";

const CityModal = ({ isModalOpen, setIsModalOpen, dataEdit, setDataEdit, getCities }) => {
    const [loading, setLoading] = useState(false);
    const [states, setStates] = useState([]);
    const [id, setId] = useState((dataEdit && dataEdit.id) || "");
    const [state, setState] = useState((dataEdit && dataEdit.state) || "");
    const [name, setName] = useState((dataEdit && dataEdit.name) || "");

    const handleCancel = () => {
        setIsModalOpen(false);
        clearInputFields();
    };

    const handleOk = async () => {
        if (!name) {
            toast.warn("Preencha todos os campos!");
        } else {
            if (id) {
                setLoading(true);
                let serviceResponse = await ServiceBase.putRequest('api/city/', {
                    id: id,
                    name: name
                });

                if (serviceResponse && serviceResponse.responseType === 'OK') {
                    toast.success('Cidade atualizada com sucesso!');
                    setIsModalOpen(false);
                }
                setLoading(false);
                getCities();
            } else {
                setLoading(true);
                let serviceResponse = await ServiceBase.postRequest(`api/city/${state}`, {
                    name: name
                });

                if (serviceResponse && serviceResponse.responseType === 'OK') {
                    toast.success('Cidade criada com sucesso!');
                    setIsModalOpen(false);
                }
                setLoading(false);
                getCities();
            }
            handleCancel();
        }
    }

    const getStates = async () => {
        try {
            setLoading(true);
            let res = await ServiceBase.getRequest('api/state/');
            setStates(res.content.sort((a, b) => (a.name > b.name ? 1 : -1)));
        } catch (error) { }
        setLoading(false);
    };

    const clearInputFields = () => {
        setDataEdit([{}]);
        setState("");
        setName("");
    }

    useEffect(() => {
        getStates();
    }, []);

    return (
        <Modal title="Cidade" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Spin spinning={loading} size="large">
                &nbsp;
                <Input type="hidden" value={id} />
                <FloatLabel label="Estado" value={state}>
                    <Select
                        value={state}
                        // onChange={setSelectedReports}
                        style={{ width: '100%' }}
                        onChange={setState}
                        options={states.map((item) => ({
                            value: item.name,
                            label: item.name,
                        }))}
                    />
                </FloatLabel>
                &nbsp;
                <FloatLabel label="Nome" value={name}>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </FloatLabel>
            </Spin>
        </Modal>
    )
}

export default CityModal;