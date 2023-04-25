import { useState } from "react";
import { Modal, Input, Cascader, Spin, Upload, Button, Divider } from 'antd';
import { toast } from "react-toastify";
import ServiceBase from "../../services/serviceBase";
import { useNavigate, useLocation } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';
import Utils from "../../services/utils";

const { TextArea } = Input;

const ClaimModal = ({ isModalOpen, setIsModalOpen, dataEdit, getClaims }) => {
    const [fileList, setFileList] = useState([]);
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
        // alert('Vamos testar o upload!');

        // const formData = new FormData();
        // fileList.forEach((file) => {
        //     formData.append('files[]', file);
        // });

        // let serviceResponse = await ServiceBase.postRequest('api/image/643ddcbacd5875259347636c/', formData);

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

    const uploaderProps = {
        // multiple: true,
        // maxCount: 3,

        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },

        beforeUpload: (file) => {
            alert("BEFORE");
            setFileList([...fileList, file]);
            return false;
        },
        fileList
    }

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
                    <Cascader value={stateAndCity} allowClear={false} onChange={(e) => { setStateAndCity(e); console.log(e) }} options={Utils.availableStatesAndCities()} style={{ width: '100%' }} placeholder="Estado/Cidade" />
                </span>
                &nbsp;
                <Input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="Bairro" />
                &nbsp;
                <div>
                    <Upload {...uploaderProps}>
                        <Button icon={<UploadOutlined />}>Anexar imagens</Button>
                    </Upload>
                </div>
            </Spin>
        </Modal>
    )
}

export default ClaimModal;
