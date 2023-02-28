import React from 'react';
import { UserOutlined, DatabaseOutlined, LogoutOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const items2: MenuProps['items'] = [
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
        icon: <LogoutOutlined />
      }]
    }
]

const Test = React.FC = ({content}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <h3>MyStreet</h3>
        </Menu>
      </Header>
      <Content style={{ padding: '0 20px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          {<Sider style={{ background: colorBgContainer }} width={250}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['profile-nav']}
              defaultOpenKeys={['profile-nav']}
              style={{ height: '100%' }}
              items={items2}
            />
          </Sider>}
          <Content style={{ padding: '0 24px', minHeight: 280 }}>{content}</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>MyStreet © 2023</Footer>
    </Layout>
  );
};

export default Test;