import { Card, Col, Row } from 'antd';
import React from 'react';
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Card title="Área Administrativa">
                <Row gutter={16}>
                    <Col xs={24} xl={6} span={6}>
                        <Card hoverable title="Gerir prefeituras" bordered={false} onClick={() => navigate('/admin/cityhall')}>
                            <div>Permite visualizar/cadastrar/editar prefeituras.</div>
                        </Card>
                    </Col>
                    <Col xs={24} xl={6} span={6}>
                        <Card hoverable title="Gráficos" bordered={false} onClick={() => navigate('/admin/charts')}>
                            Exibe os gráficos gerais do sistema
                        </Card>
                    </Col>
                    <Col xs={24} xl={6} span={6}>
                        <Card hoverable title="Relatórios" bordered={false} onClick={() => navigate('/admin/reports')}>
                            Exibe as opções de relatórios para geração
                        </Card>
                    </Col>
                    <Col xs={24} xl={6} span={6}>
                        <Card hoverable title="Usuários" bordered={false} onClick={() => navigate('/admin/user')}>
                            Permite visualizar/cadastrar/editar usuários.
                        </Card>
                    </Col>
                    <Col xs={24} xl={6} span={6}>
                        <Card hoverable title="Reclamações" bordered={false} onClick={() => navigate('/admin/claims')}>
                            Permite visualizar/cadastrar/editar reclamações.
                        </Card>
                    </Col>
                    <Col xs={24} xl={6} span={6}>
                        <Card hoverable title="Estados" bordered={false} onClick={() => navigate('/admin/states')}>
                            Permite visualizar/cadastrar/editar estados.
                        </Card>
                    </Col>
                    <Col xs={24} xl={6} span={6}>
                        <Card hoverable title="Cidades" bordered={false} onClick={() => navigate('/admin/cities')}>
                            Permite visualizar/cadastrar/editar cidades.
                        </Card>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default AdminPage;