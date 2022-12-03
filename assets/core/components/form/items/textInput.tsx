import React from "react";
import {Form, Input} from "antd";

const TextInput: React.FunctionComponent<{ label: string, name: string, required: boolean, message?: string }>
    = ({label, name, required = false, message = null}) => {
    return <>
        <Form.Item
            label={label}
            name={name}
            rules={[{required: required, message: {message}}]}
        >
            <Input/>
        </Form.Item>
    </>
}
export default TextInput;
