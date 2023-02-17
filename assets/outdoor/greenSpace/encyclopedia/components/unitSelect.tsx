import React from 'react';
import {Rate, Select} from 'antd';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSun} from '@fortawesome/free-solid-svg-icons';
import {Type} from '../entity/plant/Type';
import {Unit} from '../entity/plant/Unit';

const UnitSelect: React.FunctionComponent<{
    defaultValue?: number;
    value?;
    onChange?;
}> = ({defaultValue, value, onChange}) => {
    const {Option} = Select;
    return (
        <>
            <Select
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
            >
                {Unit.getLabels().map((label) => (
                    <Option key={label.key} value={label.key}>
                        {label.label}
                    </Option>
                ))}
            </Select>
        </>
    );
};
export default UnitSelect;
