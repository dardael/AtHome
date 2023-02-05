import React from "react";
import {Plant} from "../entity/Plant";
import {Avatar, Button, Card, Dropdown, Tooltip} from "antd";
import type { MenuProps } from 'antd';
import Meta from "antd/es/card/Meta";
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';

const PlantCard:React.FunctionComponent<{initialPlant: Plant}>
    = ({initialPlant}) =>{
    const actions: MenuProps['items'] = [{
        key: 0,
        label: ('Editer')
    }, {
        key: 1,
        label: ('Supprimer')
    }];
    return <>
        <Card
            cover={
            <>
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
                <Dropdown menu={{items: actions}} trigger={['click']} placement="topRight">
                    <Button shape="circle" style={{
                    top: 5, right: 5, position: 'absolute', width: 15
                    }} icon={<EllipsisOutlined />} />
                </Dropdown>
            </>
            }
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
            style={{height:'100%', width:300}}
        >
            <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={initialPlant.name}
                description={
                    <Tooltip title={initialPlant.description}>
                        <span style={{height:40,
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            width: 200,
                            display: 'block'
                        }}>{initialPlant.description}</span>
                    </Tooltip>
                }
            />
        </Card>
    </>
}
export default PlantCard;

