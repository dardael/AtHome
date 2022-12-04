import React from "react";
import {Form} from "antd";

const AthForm: React.FunctionComponent<{children, onFinish}> = ({children, onFinish = null}) => {
    const completeOnFinish = (values) => {
        const formData = new FormData();
        for ( let key in values ) {
            formData.append(key, values[key]);
        }
        onFinish(values, formData);
    }
    return <>
        <Form
            labelWrap
            layout="vertical"
            onFinish={completeOnFinish}
        >
            {children}
        </Form>
    </>
}
export default AthForm;
