import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Space, Table, Spin, Button, Card } from 'antd';
import { toast } from "react-toastify";
import ServiceBase from "../../services/serviceBase";
import UserModal from "../../components/Modal/user";

const CityHall = () => {
    const [users, setUsers] = useState([]);
    const [dataEdit, setDataEdit] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getUsers = async () => {
        try {
            setLoading(true);
            let res = await ServiceBase.getRequest('api/user/cityhall');
            setUsers(res.content.sort((a, b) => (a.name > b.name ? 1 : -1)));
        } catch (error) {}
        setLoading(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        const serviceResponse = await ServiceBase.deleteRequest(`api/user/${id}`);

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            const newArray = users.filter((user) => user.id !== id);
            setUsers(newArray);
            toast.success("Prefeitura deletada com sucesso!");
        }
        setLoading(false);
    };

    useEffect(() => {
        getUsers();
    }, [setUsers]);

    return (
        <>
            <Card title="Prefeituras">
                <Button type="primary" onClick={() => [showModal()]}>
                    Nova Prefeitura
                </Button>
                <br />
                <br />
                <Spin spinning={loading} size="large">
                    <Table columns={[
                        {
                            title: 'Nome',
                            dataIndex: 'name',
                            key: 'name'
                        },
                        {
                            title: 'Email',
                            dataIndex: 'email',
                            key: 'email',
                            responsive: ['md']
                        },
                        {
                            title: 'Cnpj',
                            dataIndex: 'cpfCnpj',
                            key: 'cpfCnpj',
                            responsive: ['lg']
                        },
                        {
                            title: 'Estado',
                            dataIndex: 'state',
                            key: 'state',
                            responsive: ['lg']
                        },
                        {
                            title: 'Cidade',
                            dataIndex: 'city',
                            key: 'city',
                            responsive: ['lg']
                        },
                        {
                            title: 'Ação',
                            key: 'action',
                            responsive: ['sm'],
                            render: (_, record) => (
                                <Space size="middle">
                                    <FaEdit onClick={() => [
                                        setDataEdit({ id: record.id, name: record.name, email: record.email, cpfCnpj: record.cpfCnpj, userType: record.profile.name, stateAndCity: [record.state, record.city] }),
                                        showModal()
                                    ]} />
                                    <FaTrash onClick={() => handleDelete(record.id)} />
                                </Space>
                            ),
                        },
                    ]} dataSource={users} />
                </Spin>
            </Card>
            {isModalOpen && (<UserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dataEdit={dataEdit} setDataEdit={setDataEdit} getUsers={getUsers} isCityHall={true} />)}
        </>
    );
};

export default CityHall;