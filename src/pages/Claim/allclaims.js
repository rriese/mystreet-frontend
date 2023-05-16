import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaClock, FaCheck } from "react-icons/fa";
import { Space, Spin, Card, Tooltip } from 'antd';
import { Table } from 'ant-table-extensions';
import { toast } from "react-toastify";
import ServiceBase from "../../services/serviceBase";
import ClaimModal from "../../components/Modal/claim";

const AllClaims = () => {
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataEdit, setDataEdit] = useState([{}]);

    const getClaims = async () => {
        try {
            setLoading(true);
            let res = await ServiceBase.getRequest('api/claim/');

            for (let i of res.content) {
                let images = await ServiceBase.getRequest('api/image/' + i.id);
                i.images = images.content;
            }
            setClaims(res.content.sort((a, b) => (a.title > b.title ? 1 : -1)));
        } catch (error) {}
        setLoading(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
      };

    const handleDelete = async (id) => {
        setLoading(true);
        const serviceResponse = await ServiceBase.deleteRequest(`api/claim/${id}`);

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            const newArray = claims.filter((claim) => claim.id !== id);
            setClaims(newArray);
            toast.success("Reclamação deletada com sucesso!");
        }
        setLoading(false);
    }

    useEffect(() => {
        getClaims();
    }, []);

    return (
        <>
            <Card title="Todas as Reclamações">
                <Spin spinning={loading} size="large">
                    <Table columns={[
                        {
                            title: 'Título',
                            dataIndex: 'title'
                        },
                        {
                            title: 'Descrição',
                            dataIndex: 'description',
                            responsive: ['md']
                        },
                        {
                            title: 'Estado',
                            dataIndex: 'state',
                            responsive: ['lg']
                        },
                        {
                            title: 'Cidade',
                            dataIndex: 'city',
                            responsive: ['lg']
                        },
                        {
                            title: 'Bairro',
                            dataIndex: 'district',
                            responsive: ['lg']
                        },
                        {
                            title: 'Responsável',
                            dataIndex: ['user', 'name'],
                            responsive: ['lg']
                        },
                        {
                            title: 'Status',
                            dataIndex: ['status', 'name'],
                            render: (text, _) => (
                                <center>
                                    <Tooltip title={text}>
                                        {text === 'Pendente' ? <FaClock /> : <FaCheck />}
                                    </Tooltip>
                                </center>
                            ),
                        },
                        {
                            title: 'Ação',
                            key: 'action',
                            render: (_, record) => (
                                <Space size="middle">
                                    <FaEdit onClick={() => [
                                        setDataEdit({id: record.id, title: record.title, description: record.description, district: record.district, stateAndCity: [record.state, record.city], images: record.images}),
                                        showModal()
                                    ]} />
                                    <FaTrash onClick={() => handleDelete(record.id)} />
                                </Space>
                            ),
                        },
                    ]} dataSource={claims} exportableProps={{ showColumnPicker: true }} searchable />
                </Spin>
            </Card>
            {isModalOpen && <ClaimModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dataEdit={dataEdit} getClaims={getClaims} />}
        </>
    )
}

export default AllClaims;