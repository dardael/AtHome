import {Avatar, Button, Dropdown, Layout, Menu} from "antd";
import { UserOutlined } from '@ant-design/icons';
import React from "react";
import type { MenuProps } from 'antd';

const MainLayout:React.FunctionComponent<{}> = () => {
    const { Header, Content, Footer, Sider } = Layout;
    type MenuItem = Required<MenuProps>['items'][number];

    const getItem = (
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem => {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }
    const dropdownItems: MenuProps['items'] = [
        getItem(
            (
                <a href="/logout">
                    Se déconnecter
                </a>
            ),
            'logout'
        ),
    ];

    const menuItems: MenuProps['items'] = [
        getItem('Extérieur', 'outdoor', null, [
            getItem('Espace vert', 'greenSpace'),
        ], 'group'),
        getItem('Intérieur', 'indoor', null, [
        ], 'group'),
    ];
    return <>
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgb(1 122 71)'}}>
                <Dropdown menu={{items: dropdownItems}} trigger={['click']}>
                    <Avatar style={{cursor: 'pointer'}} icon={<UserOutlined />}></Avatar>
                </Dropdown>
            </Header>
            <Layout>
                <Sider theme={'dark'} collapsible style={{backgroundColor: '#00b96b'}}>
                    <Menu defaultSelectedKeys={['greenSpace']} mode="inline" items={menuItems} style={{backgroundColor: '#00b96b'}}></Menu>
                </Sider>
                <Content></Content>
                <Footer></Footer>
            </Layout>
        </Layout>
    </>
}
export default MainLayout;
