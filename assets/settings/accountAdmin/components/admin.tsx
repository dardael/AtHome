import React, {useEffect} from 'react';
import {Button, Collapse, Form, Input, message} from 'antd';
import LayoutWithToolbar from '../../../core/components/layoutWithToolbar';
import axios from 'axios';

interface passwordChangement {
    actualPassword: string;
    newPassword: string;
    repeatedNewPassword: string;
}
const Admin: React.FunctionComponent<{}> = ({}) => {
    const {Panel} = Collapse;
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const submitPasswordChange = async (formValues: passwordChangement) => {
        try {
            const response = await axios.post(
                '/settings/account/admin/update/password',
                formValues
            );
            messageApi.open({
                type: 'success',
                content: response.data.message,
            });
            form.resetFields();
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: error.response.data.message,
            });
        }
    };
    return (
        <>
            {contextHolder}
            <LayoutWithToolbar toolbar={<></>}>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header='Changer de mot de passe' key='1'>
                        <Form
                            layout={'vertical'}
                            onFinish={submitPasswordChange}
                            form={form}
                        >
                            <Form.Item
                                name={'actualPassword'}
                                label={'Mot de passe actuel'}
                                required
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Le mot de passe actuel doit être renseigné',
                                    },
                                ]}
                            >
                                <Input.Password></Input.Password>
                            </Form.Item>
                            <Form.Item
                                name={'newPassword'}
                                label={'Nouveau mot de passe'}
                                required
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Le nouveau mot de passe doit être renseigné',
                                    },
                                ]}
                            >
                                <Input.Password></Input.Password>
                            </Form.Item>
                            <Form.Item
                                name={'repeatedNewPassword'}
                                label={'Répétez mot de passe'}
                                dependencies={['new-password']}
                                required
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Le nouveau mot de passe doit être renseigné',
                                    },
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue('newPassword') ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    'Le mot de passe est différent'
                                                )
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password></Input.Password>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    style={{
                                        float: 'right',
                                    }}
                                >
                                    Changer le mot de passe
                                </Button>
                            </Form.Item>
                        </Form>
                    </Panel>
                </Collapse>
            </LayoutWithToolbar>
        </>
    );
};
export default Admin;
