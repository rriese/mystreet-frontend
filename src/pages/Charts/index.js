import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Spin, Col, Row } from 'antd';
import * as C from './styles'
import ServiceBase from '../../services/serviceBase';

const buildChart = (chartData) => ({
    chart: {
        type: 'column',
        // width: '',
        height: '100%',
    },
    title: {
        text: chartData.title,
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Quantidade'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Quantidade: <b>{point.y:.1f}</b>'
    },
    series: [{
        name: 'Quantidade',
        groupPadding: 0,
        data: chartData.data
    }],
    plotOptions: {
        column: {
            dataLabels: {
                enabled: true,
                formatter: function () {
                    return this.y
                }
            }
        },
        series: {
            dataLabels: {
                enabled: true,
                formatter: function () {
                    return this.y + '%'
                }
            }
        }
    }
});

function Charts() {
    const [loadingClaimsPerState, setLoadingClaimsPerState] = useState(false);
    const [loadingClaimsPerCity, setLoadingClaimsPerCity] = useState(false);
    const [loadingClaimsPerStatus, setLoadingClaimsPerStatus] = useState(false);
    const [loadingUsersPerProfile, setLoadingUsersPerProfile] = useState(false);
    const [loadingTopTenUsersClaims, setLoadingTopTenUsersClaims] = useState(false);
    const [claimsPerState, setClaimsPerState] = useState(null);
    const [claimsPerCity, setClaimsPerCity] = useState(null);
    const [usersPerProfile, setUsersPerProfile] = useState(null);
    const [claimsPerStatus, setClaimsPerStatus] = useState(null);
    const [topTenUsersClaims, setTopTenUsersClaims] = useState(null);

    const getClaimsPerState = async () => {
        setLoadingClaimsPerState(true);
        let serviceResponse = await ServiceBase.getRequest('api/chart/claimsperstate');

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            let data = serviceResponse.content.data;
            let newData = [];

            for (const property in data) {
                newData.push([property, data[property]]);
            }
            serviceResponse.content.data = newData;
            setClaimsPerState(serviceResponse.content);
        }
        setLoadingClaimsPerState(false);
    }

    const getClaimsPerCity = async () => {
        setLoadingClaimsPerCity(true);
        let serviceResponse = await ServiceBase.getRequest('api/chart/claimspercity');

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            let data = serviceResponse.content.data;
            let newData = [];

            for (const property in data) {
                newData.push([property, data[property]]);
            }
            serviceResponse.content.data = newData;
            setClaimsPerCity(serviceResponse.content);
        }
        setLoadingClaimsPerCity(false);
    }

    const getUsersPerProfile = async () => {
        setLoadingUsersPerProfile(true);
        let serviceResponse = await ServiceBase.getRequest('api/chart/usersperprofile');

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            let data = serviceResponse.content.data;
            let newData = [];

            for (const property in data) {
                newData.push([property, data[property]]);
            }
            serviceResponse.content.data = newData;
            setUsersPerProfile(serviceResponse.content);
        }
        setLoadingUsersPerProfile(false);
    }

    const getClaimsPerStatus = async () => {
        setLoadingClaimsPerStatus(true);
        let serviceResponse = await ServiceBase.getRequest('api/chart/claimsperstatus');

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            let data = serviceResponse.content.data;
            let newData = [];

            for (const property in data) {
                newData.push([property, data[property]]);
            }
            serviceResponse.content.data = newData;
            setClaimsPerStatus(serviceResponse.content);
        }
        setLoadingClaimsPerStatus(false);
    }

    const getTopTenUsersClaims = async () => {
        setLoadingTopTenUsersClaims(true);
        let serviceResponse = await ServiceBase.getRequest('api/chart/top10usersclaims');

        if (serviceResponse && serviceResponse.responseType === 'OK') {
            let data = serviceResponse.content.data;
            let newData = [];

            for (const property in data) {
                newData.push([property, data[property]]);
            }
            serviceResponse.content.data = newData;
            setTopTenUsersClaims(serviceResponse.content);
        }
        setLoadingTopTenUsersClaims(false);
    }

    const initialize = async () => {
        getClaimsPerState();
        getClaimsPerCity();
        getUsersPerProfile();
        getClaimsPerStatus();
        getTopTenUsersClaims();
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        <Card title="Gráficos">
            {/* <C.Div> */}
            <Row gutter={16}>
                <Col xs={24} xl={6} span={6}>
                    <Spin spinning={loadingClaimsPerState} size="large">
                        {claimsPerState && <HighchartsReact highcharts={Highcharts} options={buildChart(claimsPerState)} />}
                    </Spin>
                </Col>
                <Col xs={24} xl={6} span={6}>
                    <Spin spinning={loadingClaimsPerCity} size="large">
                        {claimsPerCity && <HighchartsReact highcharts={Highcharts} options={buildChart(claimsPerCity)} />}
                    </Spin>
                </Col>
                <Col xs={24} xl={6} span={6}>
                    <Spin spinning={loadingClaimsPerStatus} size="large">
                        {claimsPerStatus && <HighchartsReact highcharts={Highcharts} options={buildChart(claimsPerStatus)} />}
                    </Spin>
                </Col>
                <Col xs={24} xl={6} span={6}>
                    <Spin spinning={loadingUsersPerProfile} size="large">
                        {usersPerProfile && <HighchartsReact highcharts={Highcharts} options={buildChart(usersPerProfile)} />}
                    </Spin>
                </Col>
                <Col xs={24} xl={6} span={6}>
                    <Spin spinning={loadingTopTenUsersClaims} size="large">
                        {topTenUsersClaims && <HighchartsReact highcharts={Highcharts} options={buildChart(topTenUsersClaims)} />}
                    </Spin>
                </Col>
                {/* </C.Div> */}
            </Row>
        </Card>
    );
}

export default Charts;