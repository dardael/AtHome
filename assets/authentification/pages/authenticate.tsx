import React from "react";
import { createRoot } from 'react-dom/client';
import {Col, Form, Input, Row, Button} from "antd";

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('root');
    const root = createRoot(container!);
    root.render(
        <Row justify="space-around" align="middle" style={{height:'100%', backgroundColor:'brown'}}>
            <Col flex={3}></Col>
            <Col flex="400px" style={{
                height: '200px',
                backgroundColor: 'white',
                borderRadius: '40px',
            }}>
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{padding: '33px'}}
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
            </Col>
            <Col flex={2}></Col>
        </Row>
    );
})
