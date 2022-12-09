import {Avatar, Button, Dropdown, Layout, Menu} from "antd";
import { UserOutlined } from '@ant-design/icons';
import React from "react";
import type { MenuProps } from 'antd';

const MainLayout:React.FunctionComponent<{}> = () => {
    const { Header, Content, Footer, Sider } = Layout;
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a href="/logout">
                    Se déconnecter
                </a>
            ),
        },];
    return <>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible>
                <Menu mode="inline"></Menu>
            </Sider>
            <Layout>
                <Header style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Dropdown menu={{items}} trigger={['click']}>
                        <Avatar style={{cursor: 'pointer'}} icon={<UserOutlined />}></Avatar>
                    </Dropdown>
                </Header>
                <Content></Content>
                <Footer></Footer>
            </Layout>
        </Layout>
    </>
}
export default MainLayout;
