import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Card, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ServiceBase from '../../services/serviceBase';

const dataa = [{
    href: 'https://ant.design',
    title: `ant design part`,
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}];

const Search = () => {
    const { term } = useParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const search = async () => {
        setLoading(true);

        let serviceResponse = await ServiceBase.getRequest('api/claim/find/' + term);

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            let result = [];

            for (const claim of serviceResponse.content) {
                let likesResponse = await ServiceBase.getRequest('api/like/' + claim.id);
                let commentsResponse = await ServiceBase.getRequest('api/comment/' + claim.id);

                result.push({
                    href: 'https://mystreet-frontend.vercel.app/claim/' + claim.id,
                    title: claim.title,
                    description: claim.user.name,
                    content: claim.description,
                    likes: likesResponse && likesResponse.responseType === 'OK' ? likesResponse.content.length : 0,
                    comments: commentsResponse && commentsResponse.responseType === 'OK' ? commentsResponse.content.length : 0
                });
            }
            setData(result);
        }

        setLoading(false);
    }

    useEffect(() => {
        search();
    }, [term]);

    return (
        <Spin spinning={loading} size="large">
            <Card title="Resultados encontrados">
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <Space><LikeOutlined />{item.likes}</Space>,
                                <Space><MessageOutlined />{item.comments}</Space>
                            ]}
                        >
                            <List.Item.Meta
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </Card>
        </Spin>
    )
}

export default Search;