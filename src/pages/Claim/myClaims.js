import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaClock, FaCheck } from "react-icons/fa";
import { Space, Table, Spin, Button, Card } from 'antd';
import { toast } from "react-toastify";
import ServiceBase from "../../services/serviceBase";

const MyClaims = () => {
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(false);

    const getClaims = async () => {
        try {
            setLoading(true);
            let res = await ServiceBase.getRequest('api/claim/myclaims');
            setClaims(res.content.sort((a, b) => (a.title > b.title ? 1 : -1)));
            console.log(res.content);
        } catch (error) {
            toast.error(error);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {

    }

    useEffect(() => {
        getClaims();
    }, []);

    return (
        <>
            <Card title="Minhas Reclamações">
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
                            title: 'Status',
                            dataIndex: ['status', 'name'],
                            render: (text, _) => (
                                <center>
                                    {text === 'Pendente' ? <FaClock /> : <FaCheck />}
                                </center>
                            ),
                        },
                    ]} dataSource={claims} />
                </Spin>
            </Card>
        </>
    )
}

export default MyClaims;