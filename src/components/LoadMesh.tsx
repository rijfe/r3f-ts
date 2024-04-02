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
    useStore: any,
    setSetting: React.Dispatch<React.SetStateAction<boolean>>,
    isSettingOpen : boolean,
    offset: number
}

function LoadMesh({ geometry, state, setState, color, cp, setCp, cpArr, visible, setVisible, setHoverd, offset, useStore, setSetting, isSettingOpen} : loadMesh){
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
    const newArr = [];
    const restrictMovement = () => {
        // mesh의 현재 위치 가져오기
        const { y } = planeRef.current.position;
    
        // y축 이동만 허용
        planeRef.current.position.y = y;
        planeRef.current.position.x = 0;
        planeRef.current.position.z = 0;
      };

    useFrame(()=>{
       const boundary = {
        minX : -7, maxX:7, minY:-9, maxY: 9, minZ: -6, maxZ: 6
       }

       if(meshAllRef.current.position.x < boundary.minX || meshAllRef.current.position.x > boundary.maxX 
        || meshAllRef.current.position.y < boundary.minY || meshAllRef.current.position.y > boundary.maxY 
        || meshAllRef.current.position.z < boundary.minZ || meshAllRef.current.position.z > boundary.maxZ ){
            console.log('Mesh가 특정 영역을 벗어났습니다!');
            
            mateRef.current.color = new THREE.Color("#ff0000");
        }
        else{
            mateRef.current.color = focus ? new THREE.Color("#fcf000") : new THREE.Color("#ffffff");
            // if(focus){
            //     console.log(meshRef.current.geometry.attributes.position.array);
            // }
        }
        restrictMovement();
    });

    useEffect(() => {
        if (!geometry || !meshRef.current) return;
        const boundingBox = new THREE.Box3().setFromObject(meshRef.current);
        const center = boundingBox.getCenter(new THREE.Vector3());
        meshRef.current.geometry.center();
        setCp([]);
        setWidth([boundingBox.max.x, boundingBox.min.x]);
        setHeight([boundingBox.max.y, boundingBox.min.y]);
        setCenterZ(center.z);
        setFocus(false);
        console.log(boundingBox.max.x, boundingBox.min.x);
        console.log(boundingBox.max.z, boundingBox.min.z);
        const arr = meshRef.current.geometry.attributes.position.array;
        const {x,y,z} = meshRef.current.position;
        for(let i =0; i<arr.length; i+=3){
            newArr.push([arr[i]+x, arr[i+1]+y, arr[i+2]+z]);
        }

        // console.log(newArr);

    }, [geometry]);

    return( 
        <mesh ref={meshAllRef}>
            <mesh 
                geometry={geometry} 
                ref={meshRef}
                onDoubleClick={(event)=>{
                    event.stopPropagation();
                    setting(meshRef);
                    setVisible(!visible);
                    setFocus(!focus);
                    setSetting(!isSettingOpen);
                }}
                onPointerOver={()=>{
                    if(focus){
                        setHoverd(true);
                        setting(meshRef);
                    }
                    
                }}
                onPointerOut={()=>{
                    if(focus){
                        setHoverd(false);
                        setting(meshRef)
                    }
                }}
                position={[0,0,0]}                    
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
            <Plane ref={planeRef} args={[14,12]} rotation-x={Math.PI/2} position={[0,offset,0]} >
                <meshStandardMaterial side={THREE.DoubleSide} opacity={0.2}/>
            </Plane>
            <Connector meshRef={meshRef} top={2} bottom={2} height={4} useStore={useStore} visible={visible} setVisible={setVisible} setHoverd={setHoverd} />
        </mesh>
    );
}

export default LoadMesh;