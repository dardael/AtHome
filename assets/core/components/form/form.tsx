import React, {useRef} from "react";
import {Form} from "antd";

const AthForm: React.FunctionComponent<{children, action, method}> = ({children, action, method='GET'}) => {
    let parentForm: HTMLFormElement | null;
    const [antForm] = Form.useForm();
    const completeOnFinish = () => {
        parentForm?.submit();
    }
    const completeOnFinishFailed = () => {
    }
    const onSubmit = (e) => {
        e.preventDefault();
        antForm?.submit();
    }

    return <>
        <form action={action} method={method} ref={node => { parentForm = node; }} onSubmit={onSubmit}>
            <Form
                form={antForm}
                labelWrap
                layout="vertical"
                onFinish={completeOnFinish}
                onFinishFailed={completeOnFinishFailed}
                component={'div'}
            >
                {children}
            </Form>
        </form>
    </>
}
export default AthForm;
function useRef<T>(arg0: null) {
    throw new Error("Function not implemented.");
}

