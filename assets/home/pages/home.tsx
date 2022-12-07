import React from "react";
import { createRoot } from 'react-dom/client';
import Theme from "../../core/theme/theme";

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('root');
    const root = createRoot(container!);
    root.render(
        <Theme>
            <div>Coucou</div>
        </Theme>
    );
})
