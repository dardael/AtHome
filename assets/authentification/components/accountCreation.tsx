import React, {useEffect} from "react";
import {Button, Form, message} from "antd";
import TextInput from "../../core/components/form/items/textInput";
import PasswordInput from "../../core/components/form/items/passwordInput";
import AthForm from "../../core/components/form/form";

const AccountCreation:React.FunctionComponent<{}> = ({userAlreadyExists}) => {
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        if (userAlreadyExists) {
            messageApi.open({
                type: 'error',
                content: 'Un compte avec cet email existe déjà',
            });
        }
    }, []);
    return <>
        {contextHolder}
        <AthForm action='/account/create' method='GET'>
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
            <PasswordInput
                label="Vérification mot de passe"
                name="password-verification"
                required
                message= 'Renseignez à nouveau votre mot de passe'
            />
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{float: 'right', marginRight: '20px'}}>
                    Créer le compte
                </Button>
            </Form.Item>
        </AthForm>
    </>
}
export default AccountCreation;

