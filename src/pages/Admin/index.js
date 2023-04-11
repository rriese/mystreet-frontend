import { Card, Col, Row } from 'antd';
import React from 'react';
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Card title="Área Administrativa">
                <Row gutter={16}>
                    <Col span={6}>
                        <Card hoverable title="Gerir prefeituras" bordered={false} onClick={() => alert('Not implemented yet!')}>
                            Permite visualizar/cadastrar/editar prefeituras.
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card hoverable title="Gráficos" bordered={false} onClick={() => alert('Not implemented yet!')}>
                            Exibe os gráficos gerais do sistema
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card hoverable title="Relatórios" bordered={false} onClick={() => alert('Not implemented yet!')}>
                            Exibe as opções de relatórios para geração
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card hoverable title="Usuários" bordered={false} onClick={() => navigate('/admin/user')}>
                            Permite visualizar/cadastrar/editar usuários.
                        </Card>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default AdminPage;