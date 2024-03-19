import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRecoilState } from "recoil";
import { CatmullRomLine, Plane } from "@react-three/drei";
import create from 'zustand';
import Connector from "./Connector";

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
    const meshAllRef = useRef<THREE.Mesh>(null!);
    const mateRef = useRef<THREE.MeshStandardMaterial>(null!);
    const planeRef = useRef<THREE.Mesh>(null!);
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

    useFrame(()=>{
       const boundary = {
        minX : -7, maxX:7, minY:-9, maxY: 9, minZ: -6, maxZ: 6
       }
    //    console.log(meshAllRef.current.position);
       if(meshAllRef.current.position.x < boundary.minX || meshAllRef.current.position.x > boundary.maxX 
        || meshAllRef.current.position.y < boundary.minY || meshAllRef.current.position.y > boundary.maxY 
        || meshAllRef.current.position.z < boundary.minZ || meshAllRef.current.position.z > boundary.maxZ ){
            console.log('Mesh가 특정 영역을 벗어났습니다!');
            // meshRef.current.material = new THREE.MeshStandardMaterial()
            mateRef.current.color = new THREE.Color("#ff0000");
        }
        else{
            mateRef.current.color = focus ? new THREE.Color("#fcf000") : new THREE.Color("#ffffff");
        }
    });

    useEffect(() => {
        if (!geometry || !meshRef.current) return;

        const boundingBox = new THREE.Box3().setFromObject(meshRef.current);
        const center = boundingBox.getCenter(new THREE.Vector3());

        setCp([]);
        setWidth([boundingBox.max.x, boundingBox.min.x]);
        setHeight([boundingBox.max.y, boundingBox.min.y]);
        setCenterZ(center.z);
        setFocus(false);
        console.log(`mixX: ${boundingBox.min.x} maxX:${boundingBox.max.x}`);

    }, [geometry]);

    return( 
        <mesh ref={meshAllRef}>
            <mesh 
                geometry={geometry} 
                ref={meshRef}
                onDoubleClick={(event)=>{
                    event.stopPropagation();
                    setting(meshAllRef);
                    setVisible(!visible);
                    setFocus(!focus);
                }}
                onPointerOver={()=>{
                    if(focus){
                        setHoverd(true);
                        setting(meshAllRef);
                    }
                    
                }}
                onPointerOut={()=>{
                    if(focus){
                        setHoverd(false);
                        setting(meshRef)
                    }
                }}                       
            >
                <meshStandardMaterial ref={mateRef} color={focus ? "#fcf000" : "#ffffff"} side={THREE.DoubleSide}/>
                {/* {state ? (cp.length > 0 ? <CatmullRomLine
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
                </mesh>:null} */}
            </mesh>
             <Plane ref={planeRef} args={[14,12]} rotation-x={Math.PI/2} position={[0,6,0]} >
                <meshStandardMaterial  side={THREE.DoubleSide} opacity={0.2}/>
            </Plane>
            <Connector top={2} bottom={2} height={4}/>
        </mesh>
    );
}

export default LoadMesh;