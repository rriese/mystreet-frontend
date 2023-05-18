import { useState, useEffect } from "react";
import { Modal, Input, Cascader, Spin, Upload, Button } from 'antd';
import { toast } from "react-toastify";
import ServiceBase from "../../services/serviceBase";
import { useNavigate, useLocation } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';
import Utils from "../../services/utils";
import FloatLabel from "../FloatLabel";

const { TextArea } = Input;

const ClaimModal = ({ isModalOpen, setIsModalOpen, dataEdit, getClaims }) => {
    const [fileList, setFileList] = useState([]);
    const [id, setId] = useState((dataEdit && dataEdit.id) || "");
    const [title, setTitle] = useState((dataEdit && dataEdit.title) || "");
    const [description, setDescription] = useState((dataEdit && dataEdit.description) || "");
    const [district, setDistrict] = useState((dataEdit && dataEdit.district) || "");
    const [loading, setLoading] = useState(false);
    const [stateAndCity, setStateAndCity] = useState((dataEdit && dataEdit.stateAndCity) || []);
    const [images, setImages] = useState((dataEdit && dataEdit.images) || []);
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const getCities = async () => {
        let serviceResponse = await Utils.availableStatesAndCitiesDev();
        setCities(serviceResponse);
    }

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

    const deleteImage = async (id) => {
        setLoading(true);

        let serviceResponse = await ServiceBase.deleteRequest('api/image/' + id);

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            toast.success('Imagem deletada com sucesso!');
            setImages(images.filter(x => x !== id));
        }
        setLoading(false);
    }

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
                    for await (const file of fileList) {
                        const formData = new FormData();
                        formData.append('image', file);

                        await ServiceBase.postRequestUpload(`api/image/${serviceResponse.content.id}/`, formData);
                    }

                    toast.success('Reclamação atualizada com sucesso!');
                    setIsModalOpen(false);
                    getClaims();
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
                    for await (const file of fileList) {
                        const formData = new FormData();
                        formData.append('image', file);

                        await ServiceBase.postRequestUpload(`api/image/${serviceResponse.content.id}/`, formData);
                    }

                    toast.success('Reclamação criada com sucesso!');
                    setIsModalOpen(false);

                    if (location.pathname === '/home') {
                        navigate(0);
                    } else {
                        navigate('/home');
                    }
                }
                setLoading(false);
            }
        }
    };

    const uploaderProps = {
        multiple: true,

        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },

        beforeUpload: (file) => {
            let fileListOld = fileList;
            if (fileListOld.length < 3) {
                fileListOld.push(file);
                setFileList(fileListOld);
            }
            return false;
        },
        fileList
    }

    useEffect(() => {
        getCities();
    }, []);

    return (
        <Modal title="Reclamação" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Spin spinning={loading} size="large">
                &nbsp;
                <Input type="hidden" value={id} />
                <FloatLabel label="Título" value={title}>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </FloatLabel>
                &nbsp;
                <FloatLabel label="Descrição" value={description}>
                    <TextArea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
                </FloatLabel>
                &nbsp;
                <span>
                    <FloatLabel label="Estado/Cidade" value={stateAndCity}>
                        <Cascader value={stateAndCity} allowClear={false} onChange={(e) => { setStateAndCity(e); }} options={cities} style={{ width: '100%' }} />
                    </FloatLabel>
                </span>
                &nbsp;
                <FloatLabel label="Bairro" value={district}>
                    <Input value={district} onChange={(e) => setDistrict(e.target.value)} />
                </FloatLabel>
                &nbsp;
                {
                    images.map((item, i) => (
                        <>
                            <div><a href="javascript:void(0);" onClick={() => deleteImage(item)}>Deletar imagem {i + 1}</a></div>
                        </>
                    ))
                }
                &nbsp;
                <div>
                    <Upload {...uploaderProps} accept="image/png, image/jpeg">
                        <Button icon={<UploadOutlined />}>Anexar imagens</Button>
                    </Upload>
                </div>
            </Spin>
        </Modal>
    )
}

export default ClaimModal;
