import React from 'react';
import {Rate, Select} from 'antd';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSun} from '@fortawesome/free-solid-svg-icons';
import {Type} from '../entity/plant/Type';

const TypeSelect: React.FunctionComponent<{
    defaultValue?: number;
    value?;
    onChange?;
    allowClear?: boolean;
    multiple?: boolean;
    style?;
    size?;
    placeholder?;
}> = ({
    defaultValue,
    value,
    onChange,
    allowClear = false,
    multiple = false,
    style,
    size,
    placeholder,
}) => {
    const {Option} = Select;
    return (
        <>
            <Select
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                allowClear={allowClear}
                mode={multiple ? 'multiple' : null}
                style={style}
                size={size}
                placeholder={placeholder}
            >
                {Type.getLabels().map((label) => (
                    <Option key={label.key} value={label.key}>
                        {label.label}
                    </Option>
                ))}
            </Select>
        </>
    );
};
export default TypeSelect;
