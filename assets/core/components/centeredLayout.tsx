import React from "react";

const CenteredLayout:React.FunctionComponent<{children}> = ({children}) => {
    return <>
        <div style={{
            padding: '33px', minWidth:'200px', width: '400px', position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: '15px',
        }}>
            {children}
        </div>
    </>
}
export default CenteredLayout;
