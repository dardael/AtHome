import React from "react";
import { createRoot } from 'react-dom/client';
import {Form, Input, Button} from "antd";
import Theme from '../../core/theme/theme'
import Background from "../components/background";
import CenteredForm from "../../core/components/centeredForm";

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('root');
    const root = createRoot(container!);
    root.render(
        <Theme>
            <Background>
                <CenteredForm>
                    <>
                        <Form.Item
                            label="Identifiant"
                            name="username"
                            rules={[{required: true, message: 'Renseignez votre identifiant'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Mot de passe"
                            name="password"
                            rules={[{required: true, message: 'Renseignez votre mot de passe'}]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                Connexion
                            </Button>
                        </Form.Item>
                    </>
                </CenteredForm>
            </Background>
        </Theme>
    );
})
