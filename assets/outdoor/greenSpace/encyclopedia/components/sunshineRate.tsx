import React from "react";
import {Rate} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun} from "@fortawesome/free-solid-svg-icons";

const SunshineRate:React.FunctionComponent<{defaultValue?: number, disabled?: boolean, value?: number, onChange?}>
    = ({defaultValue, disabled, value, onChange}) =>{

    return <>
        <Rate disabled={disabled} defaultValue={defaultValue} value={value} onChange={onChange} allowHalf count={1} character={<FontAwesomeIcon icon={faSun} />}/>
    </>
}
export default SunshineRate;

