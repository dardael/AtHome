import React, {useEffect, useState} from 'react';
import {Input} from 'antd';
import PlantsFiltererEntity from '../lib/PlantsFilterer';
import {Plant} from '../entity/Plant';

const PlantsFilterer: React.FunctionComponent<{
    onFilter: Function;
    plants: Plant[];
    style;
}> = ({onFilter, plants, style}) => {
    const [filter, setFilter] = useState('');
    const filterPlants = (value: string): void => {
        onFilter(new PlantsFiltererEntity(plants).filterByName(value));
        setFilter(value);
    };
    useEffect(() => filterPlants(filter), [plants]);
    return (
        <>
            <Input
                onChange={(event) => filterPlants(event.target.value)}
                size={'large'}
                style={{...style, width: 200}}
                placeholder={'Nom de la plante'}
                defaultValue={filter}
            />
        </>
    );
};
export default PlantsFilterer;
