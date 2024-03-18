import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Line, Text, Cone } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

interface AxesHelperProps {
    size: number,
    posioin: THREE.Vector3,
    visible: boolean
}

function AxesHelper(props:AxesHelperProps){
    const ref = useRef<THREE.Group>(null!);
    const [vetor3, setVector3] = useState<THREE.Vector3>(null!);
    // const set = useThree((state) => state.set);
    // useEffect(()=>{
    //     console.log(set);
    // },[]);
    // console.log(useThree().camera);
    useFrame(({gl, scene, camera})=>{
        gl.render(scene,camera);
    }, 1);
    return(
        <group ref={ref} position={[10,-20,0]}>
            <Line
                points={[new THREE.Vector3(0,0,0),new THREE.Vector3(props.size,0,0)]}
                color="#9a0000"
                lineWidth={5}
                position={props.posioin}
                side={THREE.DoubleSide}
            />
            <Cone
                args={[1,2]}
                position={[51.1,-30,0]}
                rotation-z ={-Math.PI/2}
            >
                <meshStandardMaterial color={"#ff0000"} side={THREE.DoubleSide}/>
            </Cone>
            <Line
                points={[new THREE.Vector3(0,0,0),new THREE.Vector3(0,props.size,0)]}
                color="#009a00"
                lineWidth={5}
                position={props.posioin}
                side={THREE.DoubleSide}
            />
            <Cone
                args={[1,2]}
                position={[40,-18.7,0]}
            >
                <meshStandardMaterial color={"#00ff00"} side={THREE.DoubleSide}/>
            </Cone>
            <Line
                points={[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,props.size)]}
                color="#00009a"
                lineWidth={5}
                position={props.posioin}
                side={THREE.DoubleSide}
            />
            <Cone
                args={[1,2]}
                position={[40,-30,11.2]}
                rotation-x={Math.PI/2}
            >
                <meshStandardMaterial color={"#0000ff"} side={THREE.DoubleSide}/>
            </Cone>
            <Text color="#9a0000" position={[53, -30, 0]} scale={5} visible={props.visible}>
                X
            </Text>
            <Text color="#009a00" position={[40, -15, 0]} scale={5} visible={props.visible}>
                Y
            </Text>
            <Text color="#00009a" position={[37, -30, 15]} scale={5} visible={props.visible}>
                Z
            </Text>
        </group>
    );
}

export default AxesHelper;