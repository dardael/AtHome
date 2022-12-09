import React from "react";
import {Form} from "antd";

const FormInput: React.FunctionComponent<{children, label: string, name: string, required: boolean, message?: string }>
    = ({children, label, name, required = false, message = null}) => {
    return <>
        <Form.Item
            label={label}
            name={name}
            rules={[{required: required, message: message}]}
        >
            {children}
        </Form.Item>
    </>
}
export default FormInput;
