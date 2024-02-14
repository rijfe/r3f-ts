import * as THREE from "three";
import { Line, Text } from "@react-three/drei";

interface AxesHelperProps {
    size: number,
    posioin: THREE.Vector3,
    visible: boolean
}

function AxesHelper(props:AxesHelperProps){
    return(
        <>
            <Line
                points={[new THREE.Vector3(0,0,0),new THREE.Vector3(props.size,0,0)]}
                color="red"
                lineWidth={5}
                position={props.posioin}
            />
            <Line
                points={[new THREE.Vector3(0,0,0),new THREE.Vector3(0,props.size,0)]}
                color="green"
                lineWidth={5}
                position={props.posioin}
            />
            <Line
                points={[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,props.size)]}
                color="blue"
                lineWidth={5}
                position={props.posioin}
            />
            <Text color="red" position={[153, -50, 0]} scale={5} visible={props.visible}>
                X
            </Text>
            <Text color="green" position={[130, -25, 0]} scale={5} visible={props.visible}>
                Y
            </Text>
            <Text color="blue" position={[130, -50, 25]} scale={5} visible={props.visible}>
                Z
            </Text>
        </>
    );
}

export default AxesHelper;