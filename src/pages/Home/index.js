import { Empty } from 'antd';

import React from 'react';
import { Card, Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const carouselStyle = {
    borderRadius:'20px',overflow:'hidden',
    height:'400px',
    background:'teal',
}

const Home = () => (
    <Card title="Reclamações">
        <Card type="inner" title="Buraco na rua 10" extra={<div><b>Autor: Rafael Riese</b></div>}>
            <Carousel style={carouselStyle} autoplay>
                <div>
                    <h3 style={contentStyle}><img alt="Teste" width="100%" height="100%"
                        src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1600"
                    /></h3>
                </div>
                <div>
                    <h3 style={contentStyle}><img alt="Teste" width="100%" height="100%"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    /></h3>
                </div>
                <div>
                    <h3 style={contentStyle}><img alt="Teste" width="100%" height="100%"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    /></h3>
                </div>
                <div>
                    <h3 style={contentStyle}><img alt="Teste" width="100%" height="100%"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    /></h3>
                </div>
            </Carousel>
            &nbsp;
            <div class="card-description">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="Buraco na rua 10" extra={<div><b>Autor: Jessica Elis Salomon</b></div>}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="Buraco na rua 10" extra={<div><b>Autor: Jessica Elis Salomon</b></div>}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
        </Card>
    </Card>
);

export default Home;