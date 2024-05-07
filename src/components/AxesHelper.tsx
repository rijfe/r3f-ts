import * as THREE from "three";
import { Line, Text, Cone } from "@react-three/drei";
import { useEffect, useRef, useState} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Flex, Box } from "@react-three/flex";

interface AxesHelperProps {
    size: number,
    position: THREE.Vector3,
    visible: boolean
}

function AxesHelper(props:AxesHelperProps){
    const ref = useRef<THREE.Group>(null!);
    const [screenPosition, setScreenPosition] = useState<THREE.Vector3>(new THREE.Vector3());
    const { camera, scene } = useThree();

    return(
        <group ref={ref} >
            <Line
                points={[new THREE.Vector3(0,0,0),new THREE.Vector3(props.size,0,0)]}
                color="#9a0000"
                lineWidth={5}
                position={props.position}
                side={THREE.DoubleSide}
            />
            <Cone
                args={[1,2]}
                position={[56.1,-30,0]}
                rotation-z ={-Math.PI/2}
                visible={props.visible}
            >
                <meshStandardMaterial color={"#ff0000"} side={THREE.DoubleSide}/>
            </Cone>
            <Line
                points={[new THREE.Vector3(0,0,0),new THREE.Vector3(0,props.size,0)]}
                color="#009a00"
                lineWidth={5}
                position={props.position}
                side={THREE.DoubleSide}
            />
            <Cone
                args={[1,2]}
                position={[40,-14.47,0]}
                visible={props.visible}
            >
                <meshStandardMaterial color={"#00ff00"} side={THREE.DoubleSide}/>
            </Cone>
            <Line
                points={[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,props.size)]}
                color="#00009a"
                lineWidth={5}
                position={props.position}
                side={THREE.DoubleSide}
            />
            <Cone
                args={[1,2]}
                position={[40,-30,16.2]}
                rotation-x={Math.PI/2}
                visible={props.visible}
            >
                <meshStandardMaterial color={"#0000ff"} side={THREE.DoubleSide}/>
            </Cone>
            <Text color="#9a0000" position={[60, -30, 0]} scale={5} visible={props.visible}>
                X
            </Text>
            <Text color="#009a00" position={[40, -11, 0]} scale={5} visible={props.visible}>
                Y
            </Text>
            <Text color="#00009a" position={[40, -30, 19]} scale={5} visible={props.visible}>
                Z
            </Text>
        </group>
    );
}

export default AxesHelper;