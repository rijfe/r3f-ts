import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import { useRef, useState } from "react";

interface AxesHelperProps {
    size: number,
    posioin: THREE.Vector3,
    visible: boolean
}

function AxesHelper(props:AxesHelperProps){
    const ref = useRef<THREE.Group>(null!);
    const [vetor3, setVector3] = useState<THREE.Vector3>(null!);

    useFrame((state, delta)=>{
        setVector3(state.camera.position);
    });
    return(
        <group ref={ref} position={[10,-20,0]}>
            <Line
                points={[new THREE.Vector3(0,0,0),new THREE.Vector3(props.size,0,0)]}
                color="red"
                lineWidth={5}
                position={props.posioin}
                side={THREE.DoubleSide}
            />
            <Line
                points={[new THREE.Vector3(0,0,0),new THREE.Vector3(0,props.size,0)]}
                color="green"
                lineWidth={5}
                position={props.posioin}
                side={THREE.DoubleSide}
            />
            <Line
                points={[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,-props.size)]}
                color="blue"
                lineWidth={5}
                position={props.posioin}
                side={THREE.DoubleSide}
            />
            <Text color="red" position={[53, -30, 0]} scale={5} visible={props.visible} >
                X
            </Text>
            <Text color="green" position={[40, -15, 0]} scale={5} visible={props.visible}>
                Y
            </Text>
            <Text color="blue" position={[40, -30, -15]} scale={5} visible={props.visible}>
                Z
            </Text>
        </group>
    );
}

export default AxesHelper;