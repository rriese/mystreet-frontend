import { Modal, Input, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import ServiceBase from '../../services/serviceBase';

const { TextArea } = Input;

const ResolutionModal = ({ isModalOpen, setIsModalOpen, dataEdit, getClaims }) => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [claimId, setClaimId] = useState(dataEdit && dataEdit.claimId || '');
    const [claim, setClaim] = useState(dataEdit && dataEdit.description || '');
    const [resolution, setResolution] = useState('');

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = async () => {
        setLoading(true);

        if (!resolution ||
            !claim ||
            !claimId) {
            toast.warn("Preencha todos os campos!");
        } else {
            if (id) {
                let serviceResponse = await ServiceBase.putRequest('api/resolution/', {
                    id: id,
                    description: resolution
                });

                if (serviceResponse && serviceResponse.responseType === 'OK') {
                    toast.success('Resolução atualizada com sucesso!');
                    getClaims();
                }
            } else {
                let serviceResponse = await ServiceBase.postRequest('api/resolution/' + claimId, {
                    description: resolution
                });

                if (serviceResponse && serviceResponse.responseType === 'OK') {
                    toast.success('Resolução cadastrada com sucesso!');
                    getClaims();
                }
            }
            setIsModalOpen(false);
        }
        setLoading(false);
    }

    const getResolutionData = async () => {
        setLoading(true);
        let serviceResponse = await ServiceBase.getRequest('api/resolution/' + claimId);

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            setId(serviceResponse.content.id);
            setResolution(serviceResponse.content.description);
        }
        setLoading(false);
    }

    useEffect(() => {
        getResolutionData();
    }, []);

    return (
        <Modal title="Resolução" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Spin spinning={loading} size="large">
                <Input type="hidden" value={id} />
                <Input value={claimId} disabled placeholder='Id da reclamação' />
                &nbsp;
                <TextArea rows={4} onChange={(e) => setClaim(e.target.value)} value={claim} placeholder='Reclamação' readOnly />
                &nbsp;
                <TextArea rows={4} onChange={(e) => setResolution(e.target.value)} value={resolution} placeholder='Resolução' />
            </Spin>
        </Modal>
    )
}

export default ResolutionModal;