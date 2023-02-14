import React, {useEffect, useState} from 'react';
import {Button} from 'antd';
import {SortAscendingOutlined, SortDescendingOutlined} from '@ant-design/icons';
import PlantsSorterEntity from '../lib/PlantsSorter';
import {Plant} from '../entity/Plant';

const PlantsSorter: React.FunctionComponent<{
    onSort: Function;
    plants: Plant[];
    style;
}> = ({onSort, plants, style}) => {
    const [sortType, setSortType] = useState('ASC');

    const sortPlants = (): void => {
        const newSortType = sortType === 'ASC' ? 'DESC' : 'ASC';
        const plantSorter = new PlantsSorterEntity([...plants]);
        const sortedPlants =
            newSortType === 'ASC'
                ? plantSorter.sortByNameAsc()
                : plantSorter.sortByNameDesc();
        onSort(sortedPlants);
        setSortType(newSortType);
    };
    return (
        <>
            <Button
                onClick={sortPlants}
                icon={
                    sortType === 'ASC' ? (
                        <SortAscendingOutlined />
                    ) : (
                        <SortDescendingOutlined />
                    )
                }
                size={'large'}
                style={style}
            />
        </>
    );
};
export default PlantsSorter;
