import React from "react";
import { createRoot } from 'react-dom/client';
import Theme from '../../core/theme/theme'
import Background from "../components/background";
import AccountCreation from "../components/accountCreation";
import CenteredLayout from "../../core/components/centeredLayout";
document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('root');
    const root = createRoot(container!);
    root.render(
        <Theme>
            <Background>
                <CenteredLayout>
                    <AccountCreation userAlreadyExists={atHome.userAlreadyExists}/>
                </CenteredLayout>
            </Background>
        </Theme>
    );
})
