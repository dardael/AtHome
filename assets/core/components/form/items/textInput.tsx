import React from "react";
import {Input} from "antd";
import FormInput from "./formInput";

const TextInput: React.FunctionComponent<{ label: string, name: string, required: boolean, message?: string }>
    = ({label, name, required = false, message = null}) => {
    return <>
        <FormInput
            label={label}
            name={name}
            required={required}
            message= {message}
        >
            <Input/>
        </FormInput>
    </>
}
export default TextInput;
