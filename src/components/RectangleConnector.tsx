import * as THREE from "three";
import { Cylinder } from "@react-three/drei";
import { useState } from "react";

interface RectangleConnectorProps{
    width: number,
    height:number,
    depth:number,
}

function RectangleConnector(props:RectangleConnectorProps){
    const [focus, setFocus] = useState<boolean>(false);

    return(
        <Cylinder 
            args={[props.width, props.height, props.depth, 4]}
            onDoubleClick={(e)=>{
                e.stopPropagation();
                setFocus(!focus);
            }}
            position={[0,5,0]}
            rotation-y={Math.PI/4}
        >
            <meshStandardMaterial color={focus ? "#fcf000":"#00ffff"}/>
        </Cylinder>
    );
}

export default RectangleConnector;