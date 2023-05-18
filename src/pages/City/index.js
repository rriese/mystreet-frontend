import React, { useEffect, useState } from "react";
import { Space, Spin, Card, Button } from 'antd';
import { Table } from 'ant-table-extensions';
import { FaTrash, FaEdit, FaClock, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import ServiceBase from "../../services/serviceBase";
import CityModal from "../../components/Modal/city";
// import StateModal from "../../components/Modal/state";

function City() {
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataEdit, setDataEdit] = useState([{}]);

    const getCities = async () => {
        try {
            setLoading(true);
            let res = await ServiceBase.getRequest('api/city/');
            setCities(res.content.sort((a, b) => (a.name > b.name ? 1 : -1)));
        } catch (error) { }
        setLoading(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        const serviceResponse = await ServiceBase.deleteRequest(`api/city/${id}`);

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            const newArray = cities.filter((city) => city.id !== id);
            setCities(newArray);
            toast.success("Cidade deletada com sucesso!");
        }
        setLoading(false);
    }

    useEffect(() => {
        getCities();
    }, []);

    return (
        <>
            <Card title="Cidades">
                <Button type="primary" onClick={() => [showModal()]}>
                    Nova Cidade
                </Button>
                <br />
                <br />
                <Spin spinning={loading} size="large">
                    <Table columns={[
                        {
                            title: 'Estado',
                            dataIndex: ['state', 'name']
                        },
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
                                        setDataEdit({ id: record.id, name: record.name, state: record.state.name }),
                                        showModal()
                                    ]} />
                                    <FaTrash onClick={() => handleDelete(record.id)} />
                                </Space>
                            ),
                        },
                    ]} dataSource={cities} exportableProps={{ showColumnPicker: true }} searchable />
                </Spin>
            </Card>
            {isModalOpen && <CityModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dataEdit={dataEdit} getCities={getCities} setDataEdit={setDataEdit} />}
        </>
    )
}

export default City;