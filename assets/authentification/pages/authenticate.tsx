import React from "react";
import { createRoot } from 'react-dom/client';
import {Form, Input, Button} from "antd";
import Theme from '../../core/theme/theme'
import Background from "../components/background";
import CenteredForm from "../../core/components/form/centeredForm";
import TextInput from "../../core/components/form/items/textInput";
import PasswordInput from "../../core/components/form/items/passwordInput";
import Link from "../../core/components/link";

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('root');
    const root = createRoot(container!);
    root.render(
        <Theme>
            <Background>
                <CenteredForm>
                    <>
                        <TextInput
                            label="Identifiant"
                            name="username"
                            required
                            message= 'Renseignez votre identifiant'
                        />
                        <PasswordInput
                            label="Mot de passe"
                            name="password"
                            required
                            message= 'Renseignez votre mot de passe'
                        />
                        <Form.Item>
                            <Link
                                target="/account/creation"
                                label="Créer un compte"
                            />
                            <Button type="primary" htmlType="submit" style={{float: 'right', marginRight: '20px'}}>
                                Se connecter
                            </Button>
                        </Form.Item>
                    </>
                </CenteredForm>
            </Background>
        </Theme>
    );
})
