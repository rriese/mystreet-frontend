import React, { useState, useEffect } from 'react';
import { Card, Carousel, Empty, Spin } from 'antd';
import ServiceBase from '../../services/serviceBase';
import { toast } from "react-toastify";

const contentStyle = {
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const carouselStyle = {
    borderRadius: '20px', overflow: 'hidden',
    height: '400px',
    background: 'teal',
}

const Home = () => {
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(false);

    const getClaims = async () => {
        try {
            setLoading(true);
            let res = await ServiceBase.getRequest('api/claim/');
            setClaims(res.content.sort((a, b) => (a.title > b.title ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getClaims();
    }, [setClaims]);

    return (
        <Spin spinning={loading} size="large">
            <Card title="Reclamações" >
                {
                    claims.length > 0 ?
                        claims.map((item, i) => (
                            <Card style={{ marginTop: 16 }} type="inner" title={item.title} extra={<div><b>Autor: {item.user.name}</b></div>}>
                                <Carousel style={carouselStyle} autoplay>
                                    <div>
                                        <h3 style={contentStyle}><img alt="Teste" width="100%" height="100%"
                                            src="https://gluby.com.br/storage/uploads/blog/posts/20230126_07295643357.png"
                                        /></h3>
                                    </div>
                                </Carousel>
                                &nbsp;
                                {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
                                <div>
                                    {item.description}
                                </div>
                            </Card>
                        ))
                        : <Empty />
                }
            </Card >
        </Spin>
    )
}

export default Home;