import React, {useEffect, useReducer, useState} from 'react';
import {Button, Col, Input, Row, Select} from 'antd';
import PlantsFiltererEntity from '../lib/PlantsFilterer';
import {Plant} from '../entity/Plant';
import RusticityInput from './rusticityInput';
import FoliageSelect from './foliageSelect';
import TypeSelect from './typeSelect';
import {Sunshine} from '../entity/plant/Sunshine';
import {Watering} from '../entity/plant/Watering';
import {Unit} from '../entity/plant/Unit';
import SizeInput from './sizeInput';
import {Collapse} from 'antd';

const PlantsFilterer: React.FunctionComponent<{
    onFilter: Function;
    plants: Plant[];
}> = ({onFilter, plants}) => {
    const {Option} = Select;
    const {Panel} = Collapse;
    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'filter-by-name':
                    return {...state, name: action.name};
                case 'filter-by-rusticity':
                    return {
                        ...state,
                        rusticity: action.rusticity,
                    };
                case 'filter-by-foliage':
                    return {
                        ...state,
                        foliage: action.foliage,
                    };
                case 'filter-by-types':
                    return {
                        ...state,
                        types: action.types,
                    };
                case 'filter-by-sunshine':
                    return {
                        ...state,
                        sunshine: action.sunshine,
                    };
                case 'filter-by-watering':
                    return {
                        ...state,
                        watering: action.watering,
                    };
                case 'filter-by-size':
                    return {
                        ...state,
                        size: action.size,
                    };
                case 'clear-filters':
                    return {
                        name: '',
                        rusticity: null,
                        foliage: null,
                        types: [],
                        sunshine: [],
                        watering: [],
                        size: {
                            min: null,
                            max: null,
                            unit: Unit.METER,
                        },
                    };
                default:
                    return state;
            }
        },
        {
            name: '',
            rusticity: null,
            foliage: null,
            types: [],
            sunshine: [],
            watering: [],
            size: {
                min: null,
                max: null,
                unit: Unit.METER,
            },
        }
    );
    const filterPlants = (): void => {
        let filteredPlants = plants;
        if (state.name) {
            filteredPlants = new PlantsFiltererEntity(plants).filterByName(
                state.name
            );
        }
        if (typeof state.rusticity === 'number') {
            filteredPlants = new PlantsFiltererEntity(
                filteredPlants
            ).filterByRusticitySuperiorTo(state.rusticity);
        }
        if (state.foliage) {
            filteredPlants = new PlantsFiltererEntity(
                filteredPlants
            ).filterByFoliage(state.foliage);
        }
        if ((state.types ? state.types : []).length > 0) {
            filteredPlants = new PlantsFiltererEntity(
                filteredPlants
            ).filterByTypes(state.types);
        }
        if ((state.sunshine ? state.sunshine : []).length > 0) {
            filteredPlants = new PlantsFiltererEntity(
                filteredPlants
            ).filterBySunshine(state.sunshine);
        }
        if ((state.watering ? state.watering : []).length > 0) {
            filteredPlants = new PlantsFiltererEntity(
                filteredPlants
            ).filterByWatering(state.watering);
        }
        if (state.size.min || state.size.max) {
            filteredPlants = new PlantsFiltererEntity(
                filteredPlants
            ).filterBySize(state.size);
        }
        onFilter(filteredPlants);
    };
    useEffect(() => filterPlants(), [plants, state]);
    return (
        <>
            <Row gutter={[5, 0]}>
                <Col flex={'auto'} style={{width: 'min-content'}}>
                    <Row align={'middle'} gutter={[5, 0]}>
                        <Col flex={'215px'}>
                            <Input
                                onChange={(event) => {
                                    dispatch({
                                        name: event.target.value,
                                        type: 'filter-by-name',
                                    });
                                }}
                                size={'large'}
                                style={{
                                    width: 215,
                                }}
                                placeholder={'Nom de la plante'}
                                value={state.name}
                                title={'Nom ou nom scientifique de la plante'}
                            />
                        </Col>
                        <Col flex={'215px'}>
                            <TypeSelect
                                value={state.types}
                                allowClear
                                multiple
                                onChange={(value) => {
                                    dispatch({
                                        types: value,
                                        type: 'filter-by-types',
                                    });
                                }}
                                size={'large'}
                                style={{
                                    width: 215,
                                }}
                                placeholder={'Types'}
                            />
                        </Col>
                        <Col flex={'215px'}>
                            <FoliageSelect
                                value={state.foliage}
                                allowClear
                                onChange={(value) => {
                                    dispatch({
                                        foliage: value,
                                        type: 'filter-by-foliage',
                                    });
                                }}
                                size={'large'}
                                style={{
                                    width: 215,
                                }}
                                placeholder={'Feuillage'}
                            />
                        </Col>
                    </Row>
                    <Collapse ghost>
                        <Panel header='Filtres avancés' key='1'>
                            <Row align={'middle'} gutter={[5, 10]}>
                                <Col flex={'215px'}>
                                    <RusticityInput
                                        onChange={(value) => {
                                            dispatch({
                                                rusticity: value,
                                                type: 'filter-by-rusticity',
                                            });
                                        }}
                                        style={{
                                            width: 215,
                                            display: 'inline-block',
                                        }}
                                        value={state.rusticity}
                                        size={'large'}
                                        placeholder={'Rusticité'}
                                        title={'Rusticité'}
                                    />
                                </Col>
                                <Col flex={'215px'}>
                                    <Select
                                        value={state.sunshine}
                                        onChange={(value) => {
                                            dispatch({
                                                sunshine: value,
                                                type: 'filter-by-sunshine',
                                            });
                                        }}
                                        allowClear
                                        mode={'multiple'}
                                        style={{
                                            width: 215,
                                        }}
                                        size={'large'}
                                        placeholder={'Ensoleillement'}
                                    >
                                        {Sunshine.getLabels().map((label) => (
                                            <Option
                                                key={label.key}
                                                value={label.key}
                                            >
                                                {label.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </Col>
                                <Col flex={'215px'}>
                                    <Select
                                        value={state.watering}
                                        onChange={(value) => {
                                            dispatch({
                                                watering: value,
                                                type: 'filter-by-watering',
                                            });
                                        }}
                                        allowClear
                                        mode={'multiple'}
                                        style={{
                                            width: 215,
                                        }}
                                        size={'large'}
                                        placeholder={'Arrosage'}
                                    >
                                        {Watering.getLabels().map((label) => (
                                            <Option
                                                key={label.key}
                                                value={label.key}
                                            >
                                                {label.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </Col>
                                <Col flex={'215px'}>
                                    <SizeInput
                                        componentSize={'large'}
                                        initialValue={state.size}
                                        onChange={(value) => {
                                            dispatch({
                                                size: value,
                                                type: 'filter-by-size',
                                            });
                                        }}
                                        style={{
                                            display: 'inline-block',
                                            lineHeight: '40px',
                                            width: '215px',
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                </Col>
                <Col flex={'170px'} style={{marginTop: '1px'}}>
                    <Button
                        size={'large'}
                        onClick={() => dispatch({type: 'clear-filters'})}
                    >
                        Nettoyer les filtres
                    </Button>
                </Col>
            </Row>
        </>
    );
};
export default PlantsFilterer;
