import { useState } from 'react';
import { Card, Select, Button } from 'antd';
import { toast } from "react-toastify";
import ServiceBase from '../../services/serviceBase';

const OPTIONS = ['Usuários cadastrados', 'Reclamações cadastradas'];

function Reports() {
    const [selectedReports, setSelectedReports] = useState([]);
    const filteredOptions = OPTIONS.filter((o) => !selectedReports.includes(o));

    const handleGenerate = async () => {
        if (selectedReports.length === 0) {
            toast.warn('Selecione ao menos 1 relatório.');
        } else {
            for (const report of selectedReports) {
                let url = 'api/report/excel/';
                let name = '';
                if (report === 'Usuários cadastrados') {
                    name = 'users'
                } else if (report === 'Reclamações cadastradas') {
                    name = 'claims';
                }
                url += name;

                var link = document.createElement('a');
                link.href = ServiceBase.getBaseUrl() + url;
                link.download = name;
                link.setAttribute('target', '_blank');
                link.click();
                link.remove();
            }
        }
    }

    return (
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
    )
}

export default Reports;