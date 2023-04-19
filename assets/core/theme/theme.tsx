import {Button, Collapse, ConfigProvider, theme} from 'antd';
import React from 'react';

const Theme: React.FunctionComponent<{children}> = ({children}) => {
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#00b96b',
                    },
                    components: {
                        Collapse: {
                            colorFillAlter: '#00b96b',
                            colorTextHeading: '#ffffff',
                        },
                    },
                }}
            >
                {children}
            </ConfigProvider>
        </>
    );
};
export default Theme;
