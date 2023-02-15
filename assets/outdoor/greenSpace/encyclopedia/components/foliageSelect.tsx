import React from 'react';
import {Select} from 'antd';
import {Foliage} from '../entity/plant/Foliage';

const FoliageSelect: React.FunctionComponent<{
    defaultValue?: number;
    value?;
    onChange?;
}> = ({defaultValue, value, onChange}) => {
    const {Option} = Select;
    return (
        <>
            <Select
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
            >
                {Foliage.getLabels().map((label) => (
                    <Option key={label.key} value={label.key}>
                        {label.label}
                    </Option>
                ))}
            </Select>
        </>
    );
};
export default FoliageSelect;
