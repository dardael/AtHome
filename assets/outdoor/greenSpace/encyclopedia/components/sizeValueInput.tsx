import React from 'react';
import {InputNumber} from 'antd';

const SizeValueInput: React.FunctionComponent<{
    defaultValue?: number;
    value?: number;
    onChange?;
    placeholder?: string;
}> = ({defaultValue, value, onChange, placeholder}) => {
    return (
        <>
            <InputNumber
                style={{width: 60}}
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                precision={2}
                min={0}
                placeholder={placeholder}
            />
        </>
    );
};
export default SizeValueInput;
