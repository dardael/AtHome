import {Avatar, Dropdown, Layout, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import React, {ReactNode} from 'react';
import type {MenuProps} from 'antd';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTree, faBookAtlas} from '@fortawesome/free-solid-svg-icons';
const logo = require('/assets/ressources/images/garden.png');

const MainLayout: React.FunctionComponent<{children: ReactNode}> = ({
    children,
}) => {
    const {Header, Content, Footer, Sider} = Layout;
    type MenuItem = Required<MenuProps>['items'][number];

    const getItem = (
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group'
    ): MenuItem => {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    };
    const dropdownItems: MenuProps['items'] = [
        getItem(<a href='/logout'>Se déconnecter</a>, 'logout'),
    ];

    const menuItems: MenuProps['items'] = [
        getItem(
            'Extérieur',
            'outdoor',
            null,
            [
                getItem(
                    'Espace vert',
                    'greenSpace',
                    <FontAwesomeIcon icon={faTree} />,
                    [
                        getItem(
                            'Encyclopédie',
                            'encyclopedia',
                            <FontAwesomeIcon icon={faBookAtlas} />
                        ),
                    ]
                ),
            ],
            'group'
        ),
        getItem('Intérieur', 'indoor', null, [], 'group'),
    ];
    return (
        <>
            <Layout style={{minHeight: '100vh'}}>
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'rgb(1 122 71)',
                    }}
                >
                    <Avatar src={logo} style={{marginRight: '10px'}} />
                    <h1
                        style={{
                            flex: 'auto',
                            color: 'white',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            fontSize: '18px',
                            lineHeight: '32px',
                        }}
                    >
                        AtHome
                    </h1>
                    <Dropdown menu={{items: dropdownItems}} trigger={['click']}>
                        <Avatar
                            style={{cursor: 'pointer'}}
                            icon={<UserOutlined />}
                        ></Avatar>
                    </Dropdown>
                </Header>
                <Layout>
                    <Sider theme={'dark'} collapsible>
                        <Menu
                            theme={'dark'}
                            defaultOpenKeys={['greenSpace']}
                            defaultSelectedKeys={['encyclopedia']}
                            mode='inline'
                            items={menuItems}
                        ></Menu>
                    </Sider>
                    <Content>{children}</Content>
                </Layout>
            </Layout>
        </>
    );
};
export default MainLayout;
