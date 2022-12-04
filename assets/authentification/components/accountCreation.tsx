import React from "react";
import {Button, Form} from "antd";
import TextInput from "../../core/components/form/items/textInput";
import PasswordInput from "../../core/components/form/items/passwordInput";
import AthForm from "../../core/components/form/form";
import axios from "axios";

const AccountCreation:React.FunctionComponent<{}> = ({}) => {
    const createAccount = (values, formData) => {
        axios.post('/account/create', formData).then(() => {window.location.href='/'})
    };

    return <>
        <AthForm onFinish={createAccount}>
            <TextInput
                label="Email"
                name="email"
                required
                message= 'Renseignez votre Email'
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
