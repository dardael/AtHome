import React from "react";
const imageSrc = require('/assets/ressources/images/frogBackground.jpg')

const Background:React.FunctionComponent<{children}> = ({children}) => {
    return <>
        <div style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: '100% 100%',
            height: '100%'
        }}>
            {children}
        </div>
    </>
}
export default Background;
