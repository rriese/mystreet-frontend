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

            for (let i of res.content) {
                let images = await ServiceBase.getRequest('api/image/' + i.id);
                if (images && images.responseType === 'OK') {
                    let imageData = [];
                    for (let j of images.content) {
                        let img = await ServiceBase.getRequestImage('api/image/' + i.id + '/' + j);

                        if (img && img.responseType === 'OK') {
                            imageData.push(URL.createObjectURL(img.content));
                        }
                    }
                    i.images = imageData;
                }
            }
            setClaims(res.content.sort((a, b) => (a.title > b.title ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getClaims();
    }, []);

    return (
        <Spin spinning={loading} size="large">
            <Card title="Reclamações" >
                {
                    claims.length > 0 ?
                        claims.map((item, i) => (
                            <Card style={{ marginTop: 16 }} type="inner" title={item.title} extra={<div><b>Autor: {item.user.name}</b></div>}>
                                {item.images.length > 0 ?
                                    <Carousel style={carouselStyle} autoplay>
                                        {
                                            item.images.map((itemi, j) => (
                                                <div>
                                                    <h3 style={contentStyle}>
                                                        <img alt="Teste" width="100%" height="100%" src={itemi} />
                                                    </h3>
                                                </div>
                                            ))
                                        }
                                    </Carousel>
                                    :
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                }
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