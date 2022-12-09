import React from "react";
import { createRoot } from 'react-dom/client';
import Theme from "../../core/theme/theme";
import MainLayout from "../components/mainLayout";

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('root');
    const root = createRoot(container!);
    root.render(
        <Theme>
           <MainLayout></MainLayout>
        </Theme>
    );
})
