import React, { useState, useEffect } from 'react';
import { Card, Carousel, Empty, Spin, Button, Result } from 'antd';
import { useParams } from 'react-router-dom'
import ServiceBase from '../../services/serviceBase';
import Utils from '../../services/utils';

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

const Details = () => {
    let { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [claimData, setClaimData] = useState({});
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    const [resolution, setResolution] = useState(null);

    const initialize = async () => {
        setLoading(true);
        await getClaimData();
        await getLikes();
        await getResolution();
        setLoading(false);
    }

    const getClaimData = async () => {
        let serviceResponse = await ServiceBase.getRequest('api/claim/' + id);

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            let data = serviceResponse.content;

            let images = await ServiceBase.getRequest('api/image/' + id);
            if (images && images.responseType === 'OK') {
                let imageData = [];
                for (let i of images.content) {
                    let img = await ServiceBase.getRequestImage('api/image/' + id + '/' + i);

                    if (img && img.responseType === 'OK') {
                        imageData.push(URL.createObjectURL(img.content));
                    }
                }
                data.images = imageData;
            }
            setClaimData(data);
        }
    }

    const getLikes = async () => {
        let serviceResponse = await ServiceBase.getRequest('api/like/' + id);
        if (serviceResponse && serviceResponse.responseType === 'OK') {
            setLikes(serviceResponse.content);

            let currentUserEmail = Utils.getUserEmail();
            for (let like of serviceResponse.content) {
                if (like.user.email === currentUserEmail) {
                    setLiked(true);
                }
            }
        }
    }

    const getResolution = async () => {
        let serviceResponse = await ServiceBase.getRequest('api/resolution/' + id);
        if (serviceResponse && serviceResponse.responseType === 'OK') {
            setResolution(serviceResponse.content.description);
        }
    }

    const like = async () => {
        setLiked(true);
        let serviceResponse = await ServiceBase.postRequest('api/like/' + id);

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            await getLikes();
        }
    }

    const dislike = async () => {
        setLiked(false);
        let serviceResponse = await ServiceBase.deleteRequest('api/like/byclaim/' + id);

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            await getLikes();
        }
    }

    useEffect(() => {
        initialize();
    }, []);

    return (

        <Spin spinning={loading} size="large">
            {claimData.title ?
                <Card title={"Detalhes da reclamação (#" + id + ")"}>
                    <Card style={{ marginTop: 16 }} type="inner" title={"Teste"} extra={<div><b>Autor: Teste</b></div>}>
                        {claimData.images.length > 0 ?
                            <Carousel style={carouselStyle} autoplay>
                                {
                                    claimData.images.map((image) => (
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
                        <Button type="primary" size='small' onClick={() => liked ? dislike() : like()}>
                            {liked ? "Descurtir" : "Curtir"}
                        </Button>
                        &nbsp;&nbsp; {likes.length} curtida(s)
                        <span style={{ float: 'right' }}>
                            <b>Status: {claimData.status && claimData.status.name ? claimData.status.name : "Pendente"}</b>
                        </span>
                        <br />
                        <br />
                        <div>
                            {claimData.description}
                        </div>
                        <div>
                            <center><b>Solução: {resolution ? resolution : 'Aguardando prefeitura'}</b></center>
                        </div>
                        <br />
                        <b>
                            Cidade: {claimData.city}
                            <br />
                            Estado: {claimData.state}
                            <br />
                            Bairro: {claimData.district}
                        </b>
                    </Card>
                </Card>
                : !loading && <Result
                    status="404"
                    title="404"
                    subTitle="Desculpe, a página que você visitou não existe."
                />}
        </Spin>
    )
}

export default Details;