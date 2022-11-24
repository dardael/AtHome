import React from "react";
import { createRoot } from 'react-dom/client';
import AthLayout from "../../core/components/layout";

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('root');
    const root = createRoot(container!);
    root.render( <AthLayout>coucou</AthLayout>);
})
