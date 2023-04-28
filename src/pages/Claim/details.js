import React, { useState, useEffect } from 'react';
import { Card, Carousel, Empty, Spin } from 'antd';
import { useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import ServiceBase from '../../services/serviceBase';

const Details = () => {
    let { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");

    const initialize = async () => {
        setLoading(true);
        
        let serviceResponse = await ServiceBase.getRequest('api/claim/' + id);

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            let data = serviceResponse.content;
            setTitle(data.title);
            toast.success("Dados carregados em memória");
        }
        setLoading(false);
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        
        <Spin spinning={loading} size="large">
            <Card title={"Detalhes da reclamação ID " + id}>
                {
                    title.length > 0 ?
                    <Card style={{ marginTop: 16 }} type="inner" title={"Teste"} extra={<div><b>Autor: Teste</b></div>}>

                    </Card>
                    : 
                    <Empty description={"Sem dados"} />
                }
            </Card>
        </Spin>
    )
}

export default Details;