import React from "react";
import {Plant} from "../entity/Plant";
import {Avatar, Button, Card, Dropdown, Tooltip} from "antd";
import type { MenuProps } from 'antd';
import Meta from "antd/es/card/Meta";
import { EllipsisOutlined } from '@ant-design/icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SunshineRate from "./sunshineRate";
import WateringRate from "./wateringRate";
import {faSnowflake} from "@fortawesome/free-regular-svg-icons";
import {Foliage} from "../entity/plant/Foliage";
const leaf = require('/assets/ressources/images/icones/leaf.png')
const autumn = require('/assets/ressources/images/icones/autumn.png')


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
                    src={'/outdoor/green-space/encyclopedia/plant/'+ initialPlant.id  +'/photo/get'}
                    style={{height: 180, width: 300}}
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
                <WateringRate disabled={true} value={Number(initialPlant.watering)} />,
                <>
                    <FontAwesomeIcon icon={faSnowflake} style={{height:20, marginTop:6}}/>
                    <span style={{verticalAlign:'text-bottom'}}> {Number(initialPlant.rusticity)}°C</span>
                </>,
            ]}
            style={{height:'100%', width:300}}
        >
            <Meta
                avatar={<Avatar src={initialPlant.foliage === Foliage.PERSISTENT
                    ? leaf
                    : autumn} />}
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

