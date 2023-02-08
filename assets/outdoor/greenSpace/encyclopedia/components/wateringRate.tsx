import React from "react";
import {Rate} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDroplet} from "@fortawesome/free-solid-svg-icons";

const WateringRate:React.FunctionComponent<{defaultValue?: number, disabled?: boolean, value?: number, onChange?}>
    = ({defaultValue, disabled, value, onChange}) =>{

    return <>
        <Rate disabled={disabled}
              defaultValue={defaultValue}
              value={value}
              onChange={onChange}
              count={3}
              character={<FontAwesomeIcon icon={faDroplet}/>}
              style={{color:'#0e7aff'}}
        />
    </>
}
export default WateringRate;

