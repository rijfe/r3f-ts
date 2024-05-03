import * as THREE from "three";
import { Cylinder } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

interface ConnectorProps {
    top: number,
    bottom: number,
    height:number,
    useStore: any,
    visible: boolean,
    setVisible :  React.Dispatch<React.SetStateAction<boolean>>,
    setHoverd :  React.Dispatch<React.SetStateAction<boolean>>,
    meshRef : any,
    setSetting: React.Dispatch<React.SetStateAction<boolean>>,
    setNum: React.Dispatch<React.SetStateAction<number>>,
    x: number,
    angle: number
}

function Connector(props : ConnectorProps){
    const cylinderRef = useRef<THREE.Mesh>(null!);
    const [focus, setFocus] = useState<boolean>(false);
    const newArr: any = [];
    const mateRef = useRef(null!);
    const setting = props.useStore((state:any)=>state.setTarget);

    useFrame(()=>{
        if(focus){
            const box = new THREE.Box3().setFromObject(props.meshRef.current);
        }
    });

    useEffect(()=>{
        if(cylinderRef.current){
            const arr = cylinderRef.current.geometry.attributes.position.array;
            const {x,y,z} = cylinderRef.current.position;
            for(let i =0; i<arr.length; i+=3){
                newArr.push(new THREE.Vector3(arr[i]+x, arr[i+1]+y, arr[i+2]+z));
            }
        }
    },[cylinderRef, focus]);

    return (
        <Cylinder
            ref={cylinderRef}
            args={[props.top+props.angle/10, props.bottom, props.height]}
            position={[props.x,5,0]}
            onDoubleClick={(e)=>{
                e.stopPropagation();
                setting(cylinderRef);
                props.setVisible(!props.visible);
                props.setHoverd(true);
                setFocus(!focus);
                props.setSetting(true);
                props.setNum(5);
            }}
        >
            <meshStandardMaterial ref={mateRef} color={focus ? "#fcf000":"#00ffff"}/>
        </Cylinder>
    );
}

export default Connector;