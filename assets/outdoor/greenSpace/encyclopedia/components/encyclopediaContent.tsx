import React from "react";
import LayoutWithToolbar from "../../../../core/components/layoutWithToolbar";
import {Button} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const EncyclopediaContent:React.FunctionComponent<{}>
    = ({}) => {
    return <>
        <LayoutWithToolbar toolbar={
            <Button size={'large'} type="primary" icon={<PlusOutlined />}  style={{float: 'right'}}>
                Ajouter
            </Button>
        }>
            <></>
        </LayoutWithToolbar>
    </>
}
export default EncyclopediaContent;
