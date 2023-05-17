import React, { useEffect, useState } from "react";
import { Space, Spin, Card, Button } from 'antd';
import { Table } from 'ant-table-extensions';
import { FaTrash, FaEdit, FaClock, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import ServiceBase from "../../services/serviceBase";
import StateModal from "../../components/Modal/state";

function State() {
    const [loading, setLoading] = useState(false);
    const [states, setStates] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataEdit, setDataEdit] = useState([{}]);

    const getStates = async () => {
        try {
            setLoading(true);
            let res = await ServiceBase.getRequest('api/state/');
            setStates(res.content.sort((a, b) => (a.name > b.name ? 1 : -1)));
        } catch (error) { }
        setLoading(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        const serviceResponse = await ServiceBase.deleteRequest(`api/state/${id}`);

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            const newArray = states.filter((state) => state.id !== id);
            setStates(newArray);
            toast.success("Estado deletado com sucesso!");
        }
        setLoading(false);
    }

    useEffect(() => {
        getStates();
    }, []);

    return (
        <>
            <Card title="Estados">
                <Button type="primary" onClick={() => [showModal()]}>
                    Novo Estado
                </Button>
                <br />
                <br />
                <Spin spinning={loading} size="large">
                    <Table columns={[
                        {
                            title: 'Nome',
                            dataIndex: 'name'
                        },
                        {
                            title: 'Ação',
                            key: 'action',
                            render: (_, record) => (
                                <Space size="middle">
                                    <FaEdit onClick={() => [
                                        setDataEdit({ id: record.id, name: record.name }),
                                        showModal()
                                    ]} />
                                    <FaTrash onClick={() => handleDelete(record.id)} />
                                </Space>
                            ),
                        },
                    ]} dataSource={states} exportableProps={{ showColumnPicker: true }} searchable />
                </Spin>
            </Card>
            {isModalOpen && <StateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dataEdit={dataEdit} getStates={getStates} />}
        </>
    )
}

export default State;