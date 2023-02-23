import React from 'react';
import {InputNumber} from 'antd';
import {SizeType} from 'antd/lib/config-provider/SizeContext';

const SizeValueInput: React.FunctionComponent<{
    defaultValue?: number;
    value?: number;
    onChange?;
    placeholder?: string;
    size?: SizeType;
}> = ({defaultValue, value, onChange, placeholder, size}) => {
    return (
        <>
            <InputNumber
                style={{width: 60, height: size === 'large' ? '40px' : ''}}
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                precision={2}
                min={0}
                placeholder={placeholder}
                size={size}
            />
        </>
    );
};
export default SizeValueInput;
