import React, {ReactNode} from "react";
import {Layout} from "antd";
const { Header, Content, Footer, Sider } = Layout;

const AthLayout:React.FunctionComponent<{children: ReactNode}> = ({children}) => {
    return (
        <Layout style={{minHeight:'100%'}}>
            <Content>{children}</Content>
        </Layout>
    );
};

export default AthLayout;
