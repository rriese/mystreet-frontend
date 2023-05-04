import React, { useState, useEffect } from 'react';
import { Card, Carousel, Empty, Spin, Button } from 'antd';
import ServiceBase from '../../services/serviceBase';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const carouselStyle = {
    borderRadius: '20px', overflow: 'hidden',
    height: '500px',
    background: 'teal',
}

const Home = () => {
    const navigate = useNavigate();
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(false);

    const getClaims = async () => {
        try {
            setLoading(true);

            let res = await ServiceBase.getRequest('api/claim/cityhallclaims');

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
                        claims.map((item) => (
                            <Card onClick={() => navigate('/claim/' + item.id)} style={{ marginTop: 16, cursor: 'pointer' }} type="inner" title={item.title} extra={<div><b>Autor: {item.user.name}</b></div>}>
                                {item.images.length > 0 ?
                                    <Carousel style={carouselStyle} autoplay>
                                        {
                                            item.images.map((image) => (
                                                <div>
                                                    <h3 style={contentStyle}>
                                                        <img alt="Teste" width="100%" height="100%" src={image} />
                                                    </h3>
                                                </div>
                                            ))
                                        }
                                    </Carousel>
                                    :
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Sem imagens"} />
                                }
                                <br />
                                <div>
                                    {item.description}
                                </div>
                                <span style={{ float: 'right' }}>
                                    <Button type="primary" size='small' onClick={(e) => {e.stopPropagation(); alert('Vamos resolver em breve!')}}>
                                        Resolver
                                    </Button>
                                </span>
                            </Card>
                        ))
                        : <Empty description={"Sem reclamações"} />
                }
            </Card >
        </Spin>
    )
}

export default Home;