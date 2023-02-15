import React, {useReducer, useState} from 'react';
import LayoutWithToolbar from '../../../../core/components/layoutWithToolbar';
import {Button, Col, message, Row} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import axios from 'axios';
import {Plant} from '../entity/Plant';
import PlantCard from './plantCard';
import PlantModal from './plantModal';
import PlantsFilterer from './plantsFilterer';
import PlantsSorter from './plantsSorter';
import PlantsSorterEntity from '../lib/PlantsSorter';

const EncyclopediaContent: React.FunctionComponent<{
    initialPlants: Plant[];
}> = ({initialPlants}) => {
    const [messageApi, contextHolder] = message.useMessage();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedPlant, setEditedPlant] = useState(null);
    const [state, dispatch] = useReducer(
        (state, action) => {
            let plants;
            switch (action.type) {
                case 'add':
                    plants = state.plants.concat([action.plant]);
                    return {
                        ...state,
                        plants: plants,
                    };
                case 'update':
                    plants = state.plants.map((displayedPlant) =>
                        action.plant.id === displayedPlant.id
                            ? action.plant
                            : displayedPlant
                    );
                    return {
                        ...state,
                        plants: plants,
                    };
                case 'delete':
                    plants = state.plants.filter(
                        (displayedPlant: Plant) =>
                            displayedPlant.id !== action.plant.id
                    );
                    return {
                        ...state,
                        plants: plants,
                    };
                case 'sort-and-filter':
                    return {
                        ...state,
                        displayedPlants: action.displayedPlants,
                    };
                default:
                    return state;
            }
        },
        {
            plants: initialPlants,
            displayedPlants: new PlantsSorterEntity(
                initialPlants
            ).sortByNameAsc(),
        }
    );

    const showModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setEditedPlant(null);
    };
    const onPlantSaved = async (plant: Plant) => {
        const isEditing = !!editedPlant;
        setIsModalOpen(false);
        setEditedPlant(null);
        if (!isEditing) {
            dispatch({type: 'add', plant: plant});
        } else {
            dispatch({type: 'update', plant: plant});
        }
    };
    const deletePlant = async (plant: Plant) => {
        dispatch({type: 'delete', plant: plant});
        await axios.post(
            '/outdoor/green-space/encyclopedia/plant/delete/' + plant.id
        );
        messageApi.open({
            type: 'success',
            content:
                'La plante "' +
                plant.name +
                '" a été correctement supprimée de l\'encyclopédie.',
        });
    };

    const openEditPlantModal = (plant: Plant) => {
        setEditedPlant(plant);
        setIsModalOpen(true);
    };

    return (
        <>
            {contextHolder}
            <LayoutWithToolbar
                toolbar={
                    <>
                        <Row gutter={[5, 0]}>
                            <Col flex={'auto'}>
                                <PlantsFilterer
                                    onFilter={(sortedAndFilteredPlants) =>
                                        dispatch({
                                            type: 'sort-and-filter',
                                            displayedPlants:
                                                sortedAndFilteredPlants,
                                        })
                                    }
                                    plants={state.plants}
                                />
                            </Col>
                            <Col flex={'40px'}>
                                <PlantsSorter
                                    onSort={(sortedAndFilteredPlants) =>
                                        dispatch({
                                            type: 'sort-and-filter',
                                            displayedPlants:
                                                sortedAndFilteredPlants,
                                        })
                                    }
                                    plants={state.displayedPlants}
                                    style={{verticalAlign: 'middle'}}
                                />
                            </Col>
                            <Col flex={'110px'}>
                                <Button
                                    onClick={showModal}
                                    size={'large'}
                                    type='primary'
                                    icon={<PlusOutlined />}
                                    style={{verticalAlign: 'middle'}}
                                >
                                    Ajouter
                                </Button>
                            </Col>
                        </Row>
                    </>
                }
            >
                <>
                    <Row
                        justify={'start'}
                        gutter={[16, 16]}
                        style={{marginLeft: 'unset', marginRight: 'unset'}}
                    >
                        {state.displayedPlants.map((plant) => {
                            return (
                                <Col
                                    key={plant.id}
                                    flex={'auto 300px'}
                                    style={{height: 350}}
                                >
                                    <PlantCard
                                        onEdit={openEditPlantModal}
                                        initialPlant={plant}
                                        onDelete={deletePlant}
                                    ></PlantCard>
                                </Col>
                            );
                        })}
                    </Row>
                    <PlantModal
                        plant={editedPlant}
                        onSave={onPlantSaved}
                        onCancel={closeModal}
                        mustShow={isModalOpen}
                    />
                </>
            </LayoutWithToolbar>
        </>
    );
};
export default EncyclopediaContent;
