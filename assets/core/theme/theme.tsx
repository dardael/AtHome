import {Button, ConfigProvider, theme} from 'antd';
import React from 'react';

const Theme: React.FunctionComponent<{children}> = ({children}) => {
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#00b96b',
                    },
                }}
            >
                {children}
            </ConfigProvider>
        </>
    );
};
export default Theme;
