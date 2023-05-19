import React, { useState, useEffect } from 'react';
import { Card, Empty, Spin, Button, Image, Switch } from 'antd';
import ServiceBase from '../../services/serviceBase';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Utils from '../../services/utils';
import ResolutionModal from '../../components/Modal/resolution';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const carouselStyle = {
    borderRadius: '20px', overflow: 'hidden',
    height: '500px',
    background: 'teal',
}

const Home = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataEdit, setDataEdit] = useState([{}]);
    const isCityHall = Utils.isCityHall();
    const [checked, setChecked] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const deleteResolution = async (claimId) => {
        setLoading(true);
        let serviceResponse = await ServiceBase.deleteRequest('api/resolution/' + claimId);

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            toast.success('Resolução deletada com sucesso!');
            await getClaims();
        }
        setLoading(false);
    }

    const getClaims = async () => {
        try {
            setLoading(true);
            
            let url = checked ? 'api/claim/myclaims' : 'api/claim/cityhallclaims';
            let res = await ServiceBase.getRequest(url);

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
    }, [checked]);

    return (
        <Spin spinning={loading} size="large">
            <Card title="Reclamações" extra={<Switch onChange={setChecked} checkedChildren="Exibindo minhas" unCheckedChildren="Exibindo todas" />}>
                {
                    claims.length > 0 ?
                        claims.map((item) => (
                            <Card onClick={() => navigate('/claim/' + item.id)} style={{ marginTop: 16, cursor: 'pointer' }} type="inner" title={item.title} extra={<div><b>Autor: {item.user && item.user.name}</b></div>}>
                                {item.images.length > 0 ?
                                    <Carousel dynamicHeight={true} onClick={(e) => e.stopPropagation()}>
                                        {
                                            item.images.map((image) => (
                                                // <div onClick={(e) => e.stopPropagation()}>
                                                    <Image onClick={(e) => e.stopPropagation()} src={image} />
                                                // </div>
                                            ))
                                        }
                                    </Carousel>
                                    :
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Sem imagens"} />
                                }
                                <br />
                                <div>
                                    <b>Descrição:</b> {item.description}<br />
                                    <b>Estado:</b> {item.state}<br />
                                    <b>Cidade:</b> {item.city}<br />
                                    <b>Bairro:</b> {item.district}<br />
                                </div>
                                {isCityHall &&
                                    <span style={{ float: 'right' }}>
                                        <Button type="default" size='small' onClick={(e) => { e.stopPropagation(); setDataEdit({ claimId: item.id, description: item.description }); showModal(); }}>
                                            {item.status && item.status.name === 'Concluído' ? 'Atualizar resolução' : 'Resolver'}
                                        </Button>
                                        {item.status && item.status.name === 'Concluído' &&
                                            <>
                                                &nbsp;
                                                <Button type="default" size='small' onClick={(e) => { e.stopPropagation(); deleteResolution(item.id)}}>
                                                    Apagar resolução
                                                </Button>
                                            </>
                                        }
                                    </span>
                                }
                            </Card>
                        ))
                        : <Empty description={"Sem reclamações"} />
                }
                {
                    isCityHall && isModalOpen && <ResolutionModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dataEdit={dataEdit} getClaims={getClaims} />
                }
            </Card >
        </Spin>
    )
}

export default Home;