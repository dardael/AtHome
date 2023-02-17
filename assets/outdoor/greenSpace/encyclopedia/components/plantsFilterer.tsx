import React, {useEffect, useReducer, useState} from 'react';
import {Button, Input, Select} from 'antd';
import PlantsFiltererEntity from '../lib/PlantsFilterer';
import {Plant} from '../entity/Plant';
import PlantsSorterEntity from '../lib/PlantsSorter';
import RusticityInput from './rusticityInput';
import FoliageSelect from './foliageSelect';
import TypeSelect from './typeSelect';
import {Type} from '../entity/plant/Type';
import {Sunshine} from '../entity/plant/Sunshine';

const PlantsFilterer: React.FunctionComponent<{
    onFilter: Function;
    plants: Plant[];
    style?;
}> = ({onFilter, plants, style}) => {
    const {Option} = Select;
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
                case 'clear-filters':
                    return {
                        name: '',
                        rusticity: null,
                        foliage: null,
                        types: [],
                        sunshine: [],
                    };
                default:
                    return state;
            }
        },
        {name: '', rusticity: null, foliage: null, types: [], sunshine: []}
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
        onFilter(filteredPlants);
    };
    useEffect(() => filterPlants(), [plants, state]);
    return (
        <>
            <Input
                onChange={(event) => {
                    dispatch({
                        name: event.target.value,
                        type: 'filter-by-name',
                    });
                }}
                size={'large'}
                style={{
                    ...style,
                    marginRight: 5,
                    width: 200,
                    verticalAlign: 'middle',
                }}
                placeholder={'Nom de la plante'}
                value={state.name}
                title={'Nom ou nom scientifique de la plante'}
            />
            <RusticityInput
                onChange={(value) => {
                    dispatch({
                        rusticity: value,
                        type: 'filter-by-rusticity',
                    });
                }}
                style={{
                    ...style,
                    marginRight: 5,
                    width: 100,
                    verticalAlign: 'middle',
                }}
                value={state.rusticity}
                size={'large'}
                placeholder={'Rusticité'}
                title={'Rusticité'}
            />
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
                    ...style,
                    width: 200,
                    verticalAlign: 'middle',
                    marginRight: 5,
                }}
                placeholder={'Feuillage'}
            />
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
                    ...style,
                    width: 200,
                    verticalAlign: 'middle',
                    marginRight: 5,
                }}
                placeholder={'Types'}
            />
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
                    ...style,
                    width: 200,
                    verticalAlign: 'middle',
                    marginRight: 5,
                }}
                size={'large'}
                placeholder={'Ensoleillement'}
            >
                {Sunshine.getLabels().map((label) => (
                    <Option key={label.key} value={label.key}>
                        {label.label}
                    </Option>
                ))}
            </Select>
            <Button
                style={{verticalAlign: 'middle'}}
                size={'large'}
                onClick={() => dispatch({type: 'clear-filters'})}
            >
                Nettoyer les filtres
            </Button>
        </>
    );
};
export default PlantsFilterer;
