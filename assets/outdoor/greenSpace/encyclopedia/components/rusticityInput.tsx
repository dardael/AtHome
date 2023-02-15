import React from 'react';
import {InputNumber, Rate} from 'antd';
import {SizeType} from 'antd/lib/config-provider/SizeContext';

const RusticityInput: React.FunctionComponent<{
    defaultValue?: number;
    value?: number;
    onChange?;
    style?;
    size?: SizeType;
    placeholder?: string;
    title?: string;
}> = ({defaultValue, value, onChange, style, size, placeholder, title}) => {
    return (
        <>
            <InputNumber
                addonAfter='°C'
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                style={style}
                size={size}
                placeholder={placeholder}
                title={title}
            ></InputNumber>
        </>
    );
};
export default RusticityInput;
