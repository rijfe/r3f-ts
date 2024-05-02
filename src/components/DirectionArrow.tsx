import { Line, Cone } from "@react-three/drei";
import * as THREE from "three";
import { useRecoilValue } from "recoil";
import { getDirectionPoint } from "../store/directionState";

function DirectionArrow(){
    const [x,y,z] = useRecoilValue(getDirectionPoint);
    return (
        <group
            rotation={[x,y,z]}  
            position={[0,0,7]}
        >
            <Line
                color="#750000"
                lineWidth={4}
                side={THREE.DoubleSide} 
                position={[0,0,0.5]}
                points={[new THREE.Vector3(0,0,0.7), new THREE.Vector3(0,0,0)]}          
            />
            <Cone
                args={[0.4,0.8]}
                // rotation={[x,y,z]}
                rotation-x={-Math.PI/2}
                // position={[0,0,7]}
            >
                <meshStandardMaterial color={"#ff0000"} side={THREE.DoubleSide}/>
            </Cone>
        </group>
    );
}

export default DirectionArrow;