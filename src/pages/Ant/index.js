import { React, useState } from 'react';
import { UserOutlined, DatabaseOutlined, LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, FloatButton } from 'antd';
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import ClaimModal from '../../components/Modal/claim';

const { Header, Content, Footer, Sider } = Layout;

const styles = {
  searchStyle: {
    display: 'flex',
    width: 200
  },
  floatbutton: {
    width: 66,
    height: 66
  }
}

const Template = ({ content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { signout } = useAuth();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <a href="#" onClick={() => navigate('/home')}><h3>MyStreet</h3></a>
          </Menu>
        </Header>
        <Content style={{ padding: '0 20px' }}>
          <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
            {<Sider theme="light" collapsible defaultCollapsed={true} style={{ background: colorBgContainer }} width={250}>
              <Menu
                mode="inline"
                style={{ height: '100%' }}
                items={[
                  {
                    key: 'profile-nav',
                    label: 'Perfil',
                    icon: <UserOutlined />,

                    children: [{
                      key: 'profile',
                      label: 'Meu perfil',
                      icon: <DatabaseOutlined />
                    }, {
                      key: 'my_claims',
                      label: 'Minhas reclamações',
                      icon: <DatabaseOutlined />
                    }, {
                      key: 'logout',
                      label: 'Sair',
                      icon: <LogoutOutlined />,
                      onClick: () => {
                        signout();
                        navigate("/");
                      }
                    }]
                  }
                ]}
              />
            </Sider>}
            <Content style={{ padding: '0 24px', minHeight: 280 }}>{content}</Content>
          </Layout>
        </Content>
        <FloatButton style={styles.floatbutton} icon={<PlusOutlined />} onClick={showModal} />
        <ClaimModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Footer style={{ textAlign: 'center' }}>MyStreet © 2023</Footer>
      </Layout>
    </>
  );
};

export default Template;