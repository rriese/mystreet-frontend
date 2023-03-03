import { useRef } from "react";
import { Modal, Input, Cascader } from 'antd';
import { toast } from "react-toastify";
import ServiceBase from "../../services/serviceBase";

const { TextArea } = Input;

const options = [
    {
        value: 'sc',
        label: 'Santa Catarina',
        children: [
            {
                value: 'jgua',
                label: 'Jaraguá do Sul'
            },
        ],
    }
];

const ClaimModal = ({ isModalOpen, setIsModalOpen }) => {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const stateCityRef = useRef([]);
    const districtRef = useRef();

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = async () => {
        if (
            !titleRef.current.input.value ||
            !descriptionRef.current.resizableTextArea.textArea.value ||
            (stateCityRef.current.innerText === 'Estado/Cidade') ||
            !districtRef.current.input.value
        ) {
            toast.warn("Preencha todos os campos!");
        } else {
            let state = stateCityRef.current.innerText.split('/')[0].trim();
            let city = stateCityRef.current.innerText.split('/')[1].trim();
            
            let serviceResponse = await ServiceBase.postRequest('api/claim/', {
                title: titleRef.current.input.value,
                description: descriptionRef.current.resizableTextArea.textArea.value,
                state: state,
                city: city,
                discrict: districtRef.current.input.value
            });

            if (serviceResponse.responseType === 'OK') {
                toast.success('Reclamação criada com sucesso!');

                titleRef.current.input.value = '';

                setIsModalOpen(false);
            } else {
                toast.error(serviceResponse.content);
            }
        }        
    };

    return (
        <Modal title="Nova Reclamação" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            &nbsp;
            <Input ref={titleRef} placeholder="Título" />
            &nbsp;
            <TextArea ref={descriptionRef} rows={4} placeholder="Descrição" />
            &nbsp;
            <span ref={stateCityRef}>
                <Cascader options={options} style={{ width: '100%' }} placeholder="Estado/Cidade" />
            </span>
            &nbsp;
            <Input ref={districtRef} placeholder="Bairro" />
        </Modal>
    )
}

export default ClaimModal;