import { Modal, Input, Spin, Button } from 'antd';
import { useState } from 'react';
import { toast } from "react-toastify";
import ServiceBase from '../../services/serviceBase';

const { TextArea } = Input;

const ResolutionModal = ({ isModalOpen, setIsModalOpen, dataEdit }) => {
    const [id, setId] = useState('');
    const [claidId, setClaimId] = useState(dataEdit && dataEdit.claimId || '');
    const [claim, setClaim] = useState(dataEdit && dataEdit.description || '');
    const [resolution, setResolution] = useState('');

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = async () => {
        if (!resolution ||
            !claim ||
            !claidId) {
            toast.warn("Preencha todos os campos!");
        } else {
            let serviceResponse = await ServiceBase.postRequest('api/resolution/' + claidId, {
                description: resolution
            });

            if (serviceResponse && serviceResponse.responseType === 'OK') {
                toast.success('Resolução cadastrada com sucesso!');
            }
        }
    }

    return (
        <Modal title="Resolução" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Input type="hidden" value={id} />
            <Input value={claidId} disabled placeholder='Id da reclamação' />
            &nbsp;
            <TextArea rows={4} onChange={(e) => setClaim(e.target.value)} value={claim} placeholder='Reclamação' readOnly />
            &nbsp;
            <TextArea rows={4} onChange={(e) => setResolution(e.target.value)} value={resolution} placeholder='Resolução' />
        </Modal>
    )
}

export default ResolutionModal;