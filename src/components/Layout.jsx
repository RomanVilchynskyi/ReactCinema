import React from 'react';
import { Breadcrumb, Layout as LayoutAntd, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer } = LayoutAntd;

import {
    DatabaseFilled,
    HomeFilled,
} from '@ant-design/icons';

const items = [
    {
        key: '1',
        label: <Link to="/">Home</Link>,
        icon: <HomeFilled />
    },
    {
        key: '2',
        label: <Link to="/films">Films</Link>,
        icon: <DatabaseFilled />,
    },
];

const Layout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <LayoutAntd className='Layout'>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb
                    style={{ margin: '16px 0' }}
                    items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
                />
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </LayoutAntd>
    );
};
export default Layout;