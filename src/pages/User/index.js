import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Space, Spin, Button, Card } from 'antd';
import { Table } from 'ant-table-extensions';
import { toast } from "react-toastify";
import ServiceBase from "../../services/serviceBase";
import UserModal from "../../components/Modal/user";

const User = () => {
    const [users, setUsers] = useState([]);
    const [dataEdit, setDataEdit] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getUsers = async () => {
        try {
            setLoading(true);
            let res = await ServiceBase.getRequest('api/user/excludecityhall');
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
            toast.success("Usuário deletado com sucesso!");
        }
        setLoading(false);
    };

    useEffect(() => {
        getUsers();
    }, [setUsers]);

    return (
        <>
            <Card title="Usuários">
                <Button type="primary" onClick={() => [showModal()]}>
                    Novo Usuário
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
                            title: 'Cpf/Cnpj',
                            dataIndex: 'cpfCnpj',
                            key: 'cpfCnpj',
                            responsive: ['lg']
                        },
                        {
                            title: 'Ação',
                            key: 'action',
                            responsive: ['sm'],
                            render: (_, record) => (
                                <Space size="middle">
                                    <FaEdit onClick={() => [
                                        setDataEdit({ id: record.id, name: record.name, email: record.email, cpfCnpj: record.cpfCnpj, userType: record.profile.name }),
                                        showModal()
                                    ]} />
                                    <FaTrash onClick={() => handleDelete(record.id)} />
                                </Space>
                            ),
                        },
                    ]} dataSource={users} exportableProps={{ showColumnPicker: true }} searchable />
                </Spin>
            </Card>
            {isModalOpen && (<UserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dataEdit={dataEdit} setDataEdit={setDataEdit} getUsers={getUsers} />)}
        </>
    );
};

export default User;