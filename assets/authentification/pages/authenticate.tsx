import React from "react";
import { createRoot } from 'react-dom/client';
import {Form, Input, Button} from "antd";
import Theme from '../../core/theme/theme'
import Background from "../components/background";

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('root');
    const root = createRoot(container!);
    root.render(
        <Theme>
            <Background>
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
                </Form>
            </Background>
        </Theme>
    );
})
