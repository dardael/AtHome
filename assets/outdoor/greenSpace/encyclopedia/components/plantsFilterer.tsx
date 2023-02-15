import React, {useEffect, useReducer, useState} from 'react';
import {Input} from 'antd';
import PlantsFiltererEntity from '../lib/PlantsFilterer';
import {Plant} from '../entity/Plant';
import PlantsSorterEntity from '../lib/PlantsSorter';
import RusticityInput from './rusticityInput';

const PlantsFilterer: React.FunctionComponent<{
    onFilter: Function;
    plants: Plant[];
    style?;
}> = ({onFilter, plants, style}) => {
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
                default:
                    return state;
            }
        },
        {name: '', rusticity: null}
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
                style={{...style, width: 200, verticalAlign: 'middle'}}
                placeholder={'Nom de la plante'}
                defaultValue={state.name}
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
                    marginLeft: 5,
                    width: 100,
                    verticalAlign: 'middle',
                }}
                defaultValue={state.rusticity}
                size={'large'}
                placeholder={'Rusticité'}
                title={'Rusticité'}
            />
        </>
    );
};
export default PlantsFilterer;
