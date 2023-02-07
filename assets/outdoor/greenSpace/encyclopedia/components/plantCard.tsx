import React from "react";
import {Plant} from "../entity/Plant";
import {Avatar, Button, Card, Dropdown, Rate, Tooltip} from "antd";
import type { MenuProps } from 'antd';
import Meta from "antd/es/card/Meta";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun} from "@fortawesome/free-solid-svg-icons";
import SunshineRate from "./sunshineRate";
import WateringRate from "./wateringRate";

const PlantCard:React.FunctionComponent<{initialPlant: Plant, onDelete: Function, onEdit: Function}>
    = ({initialPlant, onDelete, onEdit}) =>{
    const actions: MenuProps['items'] = [{
        key: 0,
        label: ('Editer'),
        onClick: () => onEdit(initialPlant),
    }, {
        key: 1,
        label: ('Supprimer'),
        onClick: () => onDelete(initialPlant),
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
                <SunshineRate disabled={true} value={Number(initialPlant.sunshine)} />,
                <WateringRate disabled={true} value={Number(initialPlant.watering)} />
            ]}
            style={{height:'100%', width:300}}
        >
            <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={initialPlant.name}
                description={
                    <Tooltip title={initialPlant.scientificName}>
                        <span style={{height:40,
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            width: 200,
                            display: 'block'
                        }}>{initialPlant.scientificName}</span>
                    </Tooltip>
                }
            />
        </Card>
    </>
}
export default PlantCard;

