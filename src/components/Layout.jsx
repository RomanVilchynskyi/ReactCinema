import React from 'react';
import { Breadcrumb, Layout as LayoutAntd, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Content, Footer } = LayoutAntd;


import {
    DatabaseFilled,
    HomeFilled,
    LikeOutlined,
} from '@ant-design/icons';
import { useFavorite } from '../context/favorite.context';

const items = [
    {
        key: '/',
        label: <Link to="/">Home</Link>,
        icon: <HomeFilled />
    },
    {
        key: '/films',
        label: <Link to="/films">Films</Link>,
        icon: <DatabaseFilled />,
    },
    {
        key: '/liked',
        label: <Link to="/liked">Films</Link>,
        icon: <LikeOutlined />,
    },
];

const Layout = () => {
    const location = useLocation();
    const { favorites } = useFavorite();

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
                    selectedKeys={[location.pathname]}
                    items={items}
                    style={{ flex: 1}}
                />
                
                <div style={{ color: 'white', marginRight: '16px', fontWeight: 'bold' }}>
                    ❤️ Favorites: {favorites.length}
                </div>
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