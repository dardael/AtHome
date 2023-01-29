import React from "react";
import {Layout, Space} from "antd";

const LayoutWithToolbar:React.FunctionComponent<{children: React.ReactNode, toolbar: React.ReactNode}>
    = ({children, toolbar}) => {
    const {Header, Content} = Layout;

    return <>
        <Layout>
            <Header style={{backgroundColor: 'transparent', paddingTop: '12px'}}>
                    {toolbar}
            </Header>
            <Content>
                {children}
            </Content>
        </Layout>

    </>
}
export default LayoutWithToolbar;
