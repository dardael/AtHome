import React from "react";
import {Form} from "antd";

const CenteredForm:React.FunctionComponent<{children}> = ({children}) => {
    return <>
        <Form
            labelWrap
            layout="vertical"
            style={{
                padding: '33px', minWidth:'200px', width: '400px', position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                borderRadius: '15px',
            }}
        >
            {children}
        </Form>
    </>
}
export default CenteredForm;
