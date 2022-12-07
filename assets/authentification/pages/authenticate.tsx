import React from "react";
import { createRoot } from 'react-dom/client';
import Theme from '../../core/theme/theme'
import Background from "../components/background";
import CenteredLayout from "../../core/components/centeredLayout";
import Authentification from "../components/authentification";

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('root');
    const root = createRoot(container!);
    root.render(
        <Theme>
            <Background>
                <CenteredLayout>
                    <Authentification fromAccountCreation={atHome.fromAccountCreation} hasLoggingError={atHome.hasLoggingError}/>
                </CenteredLayout>
            </Background>
        </Theme>
    );
})
