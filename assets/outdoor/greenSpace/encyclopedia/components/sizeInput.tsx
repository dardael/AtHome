import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber} from 'antd';
import SizeValueInput from './sizeValueInput';
import {Unit} from '../entity/plant/Unit';
import UnitSelect from './unitSelect';
import {Size} from '../entity/plant/Size';

const SizeInput: React.FunctionComponent<{
    initialValue?: Size;
    onChange?;
}> = ({initialValue, onChange}) => {
    const [size, setSize] = useState(initialValue);
    useEffect(() => onChange(size), [size]);
    return (
        <Input.Group compact>
            <SizeValueInput
                value={size.min}
                placeholder={'Minimum'}
                onChange={(minimum) => setSize({...size, min: minimum})}
            />
            <Input
                style={{
                    width: 30,
                    borderLeft: 0,
                    borderRight: 0,
                    pointerEvents: 'none',
                }}
                placeholder='~'
                disabled
            />
            <SizeValueInput
                value={size.max}
                placeholder={'Maximum'}
                onChange={(maximum) => setSize({...size, max: maximum})}
            />
            <UnitSelect
                value={size.unit}
                onChange={(unit) => setSize({...size, unit: unit})}
            />
        </Input.Group>
    );
};
export default SizeInput;
