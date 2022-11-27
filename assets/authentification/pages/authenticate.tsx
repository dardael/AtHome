import React from "react";
import { createRoot } from 'react-dom/client';
import {Col, Form, Input, Row, Button} from "antd";
import Theme from '../../core/theme/theme'
const imageSrc = require('/assets/ressources/images/frogBackground.jpg')

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('root');
    const root = createRoot(container!);
    root.render(
        <Theme>
            <div style={{
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: '100% 100%',
                height: '100%'
            }}>
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
            </div>
        </Theme>
    );
})
