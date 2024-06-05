import * as THREE from "three";
import { Cylinder } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

interface ProgressProps{
    name: String,
    percent: number,
    mini: boolean
}

interface ConnectorProps {
    top: number,
    bottom: number,
    height:number,
    useStore: any,
    visible: boolean,
    setVisible :  React.Dispatch<React.SetStateAction<boolean>>,
    setHoverd :  React.Dispatch<React.SetStateAction<boolean>>,
    setSetting: React.Dispatch<React.SetStateAction<boolean>>,
    setNum: React.Dispatch<React.SetStateAction<number>>,
    x: number,
    angle: number,
    posName: String,
    conF: boolean,
    setConF : React.Dispatch<React.SetStateAction<boolean>>,
    arr: Array<ProgressProps>
}

function Connector(props : ConnectorProps){
    const cylinderRef = useRef<THREE.Mesh>(null!);
    const [focus, setFocus] = useState<boolean>(false);
    const newArr: any = [];
    const mateRef = useRef(null!);
    const setting = props.useStore((state:any)=>state.setTarget);

    const [y,setY] = useState<number>(5);

    // useFrame(()=>{
    //     if(focus){
    //         const box = new THREE.Box3().setFromObject(props.meshRef.current);
    //     }
    // });

    useEffect(()=>{
        if(cylinderRef.current){
            const arr = cylinderRef.current.geometry.attributes.position.array;
            const {x,y,z} = cylinderRef.current.position;
            for(let i =0; i<arr.length; i+=3){
                newArr.push(new THREE.Vector3(arr[i]+x, arr[i+1]+y, arr[i+2]+z));
            }
        }
    },[cylinderRef, focus]);

    useEffect(()=>{
        if(props.posName === "pos1"||props.posName === "pos2"||props.posName === "pos3") setY(-5);
    },[]);

    return (
        <Cylinder
            ref={cylinderRef}
            args={[props.top+props.angle/10, props.bottom, props.height]}
            position={[props.x,y,0]}
            rotation-x={y===-5 ? Math.PI : 0}
            onDoubleClick={(e)=>{
                e.stopPropagation();
                if(props.arr.findIndex(item => item.name === props.posName) === -1){
                    setting(cylinderRef);
                    props.setVisible(!props.visible);
                    props.setHoverd(true);
                    props.setConF(!props.conF);
                    props.setSetting(true);
                }
                
                
            }}
            onClick={(e)=>{
                e.stopPropagation();
                if(props.arr.findIndex(item => item.name === props.posName) === -1){
                    setFocus(!focus);
                    props.setNum(5);
                }
                
            }}  
        >
            <meshStandardMaterial ref={mateRef} color={focus ? "#fcf000":"#00ffff"}/>
        </Cylinder>
    );
}

export default Connector;