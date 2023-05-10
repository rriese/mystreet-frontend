import { useState } from 'react';
import { Card, Select, Button, Spin } from 'antd';
import { toast } from "react-toastify";
import ServiceBase from '../../services/serviceBase';

const OPTIONS = ['Usuários cadastrados', 'Reclamações cadastradas'];

function Reports() {
    const [selectedReports, setSelectedReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const filteredOptions = OPTIONS.filter((o) => !selectedReports.includes(o));

    const handleGenerate = async () => {
        if (selectedReports.length === 0) {
            toast.warn('Selecione ao menos 1 relatório.');
        } else {
            setLoading(true);
            for (const report of selectedReports) {
                let url = '';

                if (report === 'Usuários cadastrados') {
                    url = 'api/report/excel/users/generate';
                } else if (report === 'Reclamações cadastradas') {
                    url = 'api/report/excel/claims/generate';
                }

                let serviceResponse = await ServiceBase.getRequest(url);

                if (serviceResponse && serviceResponse.responseType === 'OK') {
                    var link = document.createElement('a');
                    link.href = ServiceBase.getBaseUrl() + 'api/report/export/' + serviceResponse.content;
                    link.setAttribute('target', '_blank');
                    link.download = serviceResponse.content;
                    link.click();
                    link.remove();
                }
            }
            setLoading(false);
        }
    }

    return (
        <Spin spinning={loading} size="large">
            <Card title="Relatórios">
                <Select
                    mode="multiple"
                    placeholder="Relatórios disponíveis"
                    value={selectedReports}
                    onChange={setSelectedReports}
                    style={{ width: '100%' }}
                    options={filteredOptions.map((item) => ({
                        value: item,
                        label: item,
                    }))}
                />
                &nbsp;
                <Button style={{ width: '100%' }} type="primary" onClick={handleGenerate}>Gerar relatórios</Button>
            </Card>
        </Spin>
    )
}

export default Reports;