import React, {useEffect} from "react";
import {Button, Form, message} from "antd";
import TextInput from "../../core/components/form/items/textInput";
import PasswordInput from "../../core/components/form/items/passwordInput";
import Link from "../../core/components/link";
import AthForm from "../../core/components/form/form";

const Authentification:React.FunctionComponent<{fromAccountCreation?:boolean}> = ({fromAccountCreation = false}) => {
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        if(fromAccountCreation) {
            messageApi.open({
                type: 'success',
                content: 'Votre compte a été créé avec succés',
            });
        }
    }, []);
    return <>
        {contextHolder}
        <AthForm>
            <TextInput
                label="Email"
                name="email"
                required
                message= 'Renseignez votre Email'
                type='email'
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
        </AthForm>
    </>
}
export default Authentification;
