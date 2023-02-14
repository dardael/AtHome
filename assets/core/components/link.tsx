import React from 'react';
import {Button} from 'antd';

const Link: React.FunctionComponent<{label: string; target: string}> = ({
    label,
    target,
}) => {
    return (
        <>
            <Button type='link' href={target}>
                {label}
            </Button>
        </>
    );
};
export default Link;
