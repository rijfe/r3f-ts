import * as THREE from "three";
import { Cylinder } from "@react-three/drei";

interface ConnectorProps {
    top: number,
    bottom: number,
    height:number
}

function Connector(props : ConnectorProps){
    return (
        <Cylinder
            args={[props.top, props.bottom, props.height]}
        >
            <meshStandardMaterial color={"#00ffff"}/>
        </Cylinder>
    );
}

export default Connector;