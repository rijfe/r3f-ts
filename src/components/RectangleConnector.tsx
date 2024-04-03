import * as THREE from "three";
import { Box } from "@react-three/drei";
import { useState } from "react";

interface RectangleConnectorProps{
    width: number,
    height:number,
    depth:number,
}

function RectangleConnector(props:RectangleConnectorProps){
    const [focus, setFocus] = useState<boolean>(false);

    return(
        <Box 
            args={[props.width, props.height, props.depth]}
            onDoubleClick={(e)=>{
                e.stopPropagation();
                setFocus(!focus);
            }}
            position={[0,5,0]}
            rotation-x={Math.PI/2}
        >
            <meshStandardMaterial color={focus ? "#fcf000":"#00ffff"}/>
        </Box>
    );
}

export default RectangleConnector;