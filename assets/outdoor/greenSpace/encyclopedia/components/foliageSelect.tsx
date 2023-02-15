import React from 'react';
import {Select} from 'antd';
import {Foliage} from '../entity/plant/Foliage';
import {SizeType} from 'antd/lib/config-provider/SizeContext';

const FoliageSelect: React.FunctionComponent<{
    defaultValue?: number;
    value?;
    onChange?;
    allowClear?: boolean;
    style?;
    size?: SizeType;
    placeholder?: string;
}> = ({
    defaultValue,
    value,
    onChange,
    allowClear = false,
    style,
    size,
    placeholder,
}) => {
    const {Option} = Select;
    return (
        <>
            <Select
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                allowClear={allowClear}
                style={style}
                size={size}
                placeholder={placeholder}
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
