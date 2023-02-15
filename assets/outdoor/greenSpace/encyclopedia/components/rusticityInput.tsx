import React from 'react';
import {InputNumber, Rate} from 'antd';

const RusticityInput: React.FunctionComponent<{
    defaultValue?: number;
    value?: number;
    onChange?;
}> = ({defaultValue, value, onChange}) => {
    return (
        <>
            <InputNumber
                addonAfter='°C'
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
            ></InputNumber>
        </>
    );
};
export default RusticityInput;
