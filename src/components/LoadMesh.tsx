import { useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRecoilState } from "recoil";
import { CatmullRomLine } from "@react-three/drei";
import create from 'zustand';

interface loadMesh{
    geometry: any,
    state : boolean,
    setState :  React.Dispatch<React.SetStateAction<boolean>>,
    color: Array<string>,
    cp: THREE.Vector3Tuple[],
    setCp : React.Dispatch<React.SetStateAction<THREE.Vector3Tuple[]>>,
    cpArr : Array<any>,
    visible : boolean,
    setVisible :  React.Dispatch<React.SetStateAction<boolean>>,
    setHoverd :  React.Dispatch<React.SetStateAction<boolean>>,
    useStore: any
}

function LoadMesh({ geometry, state, setState, color, cp, setCp, cpArr, visible, setVisible, setHoverd, useStore} : loadMesh){
    const meshRef = useRef<THREE.Mesh>(null!);
    const mateRef = useRef<THREE.MeshStandardMaterial>(null!);
    const coneRef1 = useRef<THREE.Mesh>(null!);
    const coneRef2 = useRef<THREE.Mesh>(null!);
    const coneRef3 = useRef<THREE.Mesh>(null!);
    const coneRef4 = useRef<THREE.Mesh>(null!);

    const { camera, raycaster, scene } = useThree();
    const [pEnter, setPEnter] = useState<boolean>(false);
    const [curPoint, setCurPoint] = useState<THREE.Vector3>();
    const [focus, setFocus] = useState<boolean>(false);
    const [width, setWidth] = useState<Array<number>>([]);
    const [height, setHeight] = useState<Array<number>>([]);
    const [centerZ, setCenterZ] = useState<number>(0);
    const setting = useStore((state:any)=>state.setTarget);

    useEffect(() => {
        if (!geometry || !meshRef.current) return;

        const boundingBox = new THREE.Box3().setFromObject(meshRef.current);
        const center = boundingBox.getCenter(new THREE.Vector3());

        setCp([]);
        setWidth([boundingBox.max.x, boundingBox.min.x]);
        setHeight([boundingBox.max.y, boundingBox.min.y]);
        setCenterZ(center.z);
        setFocus(false);
    }, []);

    return( 
            <mesh 
                geometry={geometry} 
                ref={meshRef}
                onDoubleClick={(event)=>{
                    event.stopPropagation();
                    setting(event.object);
                    setVisible(!visible);
                    setFocus(!focus);
                }}
                onPointerOver={()=>{
                    if(focus){
                        setHoverd(true);
                    }
                    
                }}
                onPointerOut={()=>{
                    if(focus){
                        setHoverd(false);
                    }
                }}                       
            >
                <meshStandardMaterial ref={mateRef} color={focus ? "#fcf000" : "#ffffff"} side={THREE.DoubleSide}/>
                
                {state ? (cp.length > 0 ? <CatmullRomLine
                    points={cp}
                    color="red"
                    lineWidth={5}
                    closed={true}
                />:null):cpArr.length > 0 ? cpArr?.map((points:any, idx:number)=>(
                    points.length > 0 ? <CatmullRomLine
                        points={points}
                        color={`${color[idx]}`}
                        lineWidth={5}
                        closed={true}
                    />: null
                )) :null}
            {pEnter ? <mesh position={curPoint}>
                    <sphereGeometry args={[0.2]}/>
                    <meshStandardMaterial color="red"/>
                </mesh>:null}
            </mesh>      
    );
}

export default LoadMesh;