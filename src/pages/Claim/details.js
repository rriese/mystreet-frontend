import React, { useState, useEffect } from 'react';
import { Card, /*Carousel,*/ Empty, Spin, Button, Result, Form, Input, List, Image } from 'antd';
import { Comment } from '@ant-design/compatible';
import { useParams } from 'react-router-dom';
import ServiceBase from '../../services/serviceBase';
import Utils from '../../services/utils';
import { toast } from "react-toastify";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'comentários' : 'comentário'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Comentar
            </Button>
        </Form.Item>
    </>
);

const Details = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [loadingComment, setLoadingComment] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [claimData, setClaimData] = useState({});
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    const [resolution, setResolution] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(null);

    const initialize = async () => {
        setLoading(true);
        getComments();
        await getClaimData();
        await getLikes();
        await getResolution();
        setLoading(false);
    }

    const actions = (id) => [
        <span onClick={() => deleteComment(id)}>
            <span className="comment-action"><b>Deletar</b></span>
        </span>
    ];

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

    const getComments = async () => {
        setLoadingComment(true);
        let serviceResponse = await ServiceBase.getRequest('api/comment/' + id);
        if (serviceResponse && serviceResponse.responseType === 'OK') {
            let result = [];
            for (let comment of serviceResponse.content) {
                let obj = {
                    author: comment.user.name,
                    content: <p>{comment.description}</p>,
                    datetime: new Date(comment.createdAt).toLocaleString()
                };

                if (Utils.getUserEmail() === comment.user.email) {
                    obj.actions = actions(comment.id)
                }

                result.push(obj);
            }
            setComments(result);
        }
        setLoadingComment(false);
    }

    const saveComment = async () => {
        if (!comment) return;

        setSubmitting(true);

        let serviceResponse = await ServiceBase.postRequest('api/comment/' + id, {
            description: comment
        });

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            setComment(null);
            toast.success('Comentário adicionado com sucesso!');
            await getComments();
        }
        setSubmitting(false);
    }

    const deleteComment = async (id) => {
        setLoadingComment(true);
        let serviceResponse = await ServiceBase.deleteRequest('api/comment/' + id);

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            toast.success('Comentário deletado com sucesso!');
            await getComments();
        }
        setLoadingComment(false);
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        <Spin spinning={loading} size="large">
            {claimData.title ?
                <Card title={"Detalhes da reclamação"}>
                    <Card style={{ marginTop: 16 }} type="inner" title={claimData.title} extra={<div><b>Autor: {claimData.user.name}</b></div>}>
                        {claimData.images.length > 0 ?
                            <Carousel dynamicHeight={true} showArrows={true} autoPlay infiniteLoop>
                                {
                                    claimData.images.map((image) => (
                                        <div>
                                            <Image src={image} />
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
                            {claimData.status && claimData.status.name === 'Concluído' ? <font color='green'><b>Status: {claimData.status.name}</b></font> : <font color='red'><b>Status: Pendente</b></font>}
                        </span>
                        <br />
                        <br />
                        <div>
                            {claimData.description}
                        </div>
                        <br />
                        <div>
                            <b>Solução: {resolution ? resolution : 'Aguardando prefeitura'}</b>
                        </div>
                        <br />
                        <b>
                            Cidade: {claimData.city}
                            <br />
                            Estado: {claimData.state}
                            <br />
                            Bairro: {claimData.district}
                        </b>

                        <Spin spinning={loadingComment} size="large">
                            {comments.length > 0 && <CommentList comments={comments} />}
                            <Comment
                                content={
                                    <Editor
                                        onChange={(e) => setComment(e.target.value)}
                                        onSubmit={saveComment}
                                        submitting={submitting}
                                        value={comment}
                                    />
                                }
                            />
                        </Spin>
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