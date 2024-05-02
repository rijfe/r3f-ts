import * as THREE from "three";
import { Cylinder } from "@react-three/drei";
import { useRef, useState } from "react";

interface RectangleConnectorProps{
    width: number,
    height:number,
    depth:number,
    x:number,
    useStore: any,
    visible: boolean,
    setVisible :  React.Dispatch<React.SetStateAction<boolean>>,
    angle: number
}

function RectangleConnector(props:RectangleConnectorProps){
    const [focus, setFocus] = useState<boolean>(false);
    const setting = props.useStore((state:any)=>state.setTarget);
    const cylinderRef = useRef<THREE.Mesh>(null!);

    return(
        <Cylinder 
            args={[props.width+props.angle/10, props.height, props.depth, 4,]}
            onDoubleClick={(e)=>{
                e.stopPropagation();
                setFocus(!focus);
                setting(cylinderRef);
                props.setVisible(!props.visible);
            }}
            position={[props.x,5,0]}
            rotation-y={Math.PI/4}
            ref={cylinderRef}
        >
            <meshStandardMaterial color={focus ? "#fcf000":"#00ffff"} side={THREE.DoubleSide}/>
        </Cylinder>
    );
}

export default RectangleConnector;