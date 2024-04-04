import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRecoilState } from "recoil";
import { CatmullRomLine, Plane, useHelper } from "@react-three/drei";
import create from 'zustand';
import Connector from "./Connector";
import RectangleConnector from "./RectangleConnector";

interface loadMesh{
    geometry: any,
    setCp : React.Dispatch<React.SetStateAction<THREE.Vector3Tuple[]>>
    visible : boolean,
    setVisible :  React.Dispatch<React.SetStateAction<boolean>>,
    setHoverd :  React.Dispatch<React.SetStateAction<boolean>>,
    useStore: any,
    lightHelper1: React.MutableRefObject<THREE.DirectionalLight>,
    lightHelper2: React.MutableRefObject<THREE.DirectionalLight>,
    setSetting: React.Dispatch<React.SetStateAction<boolean>>,
    isSettingOpen : boolean,
    offset: number,
    connectOn: boolean,
    type: String,
    width: number,
    height : number,
    angle : number,
    rotation : number,
    distance: number,
    cutting : number,
    setNum: React.Dispatch<React.SetStateAction<number>>,
    setOffset: React.Dispatch<React.SetStateAction<number>>,
    boxRef: any
}

function LoadMesh({ geometry, type,connectOn, lightHelper1, boxRef,setCp, visible, setVisible, setHoverd, offset, setOffset,useStore, setSetting, isSettingOpen, width, height, angle, distance, rotation, cutting, setNum} : loadMesh){
    const meshRef = useRef<THREE.Mesh>(null!);
    const meshAllRef = useRef<THREE.Mesh>(null!);
    const mateRef = useRef<THREE.MeshStandardMaterial>(null!);

    const { camera, raycaster, scene } = useThree();
    const [pEnter, setPEnter] = useState<boolean>(false);
    const [curPoint, setCurPoint] = useState<THREE.Vector3>();
    const [focus, setFocus] = useState<boolean>(false);
    const [centerZ, setCenterZ] = useState<number>(0);
    const [curY, setCurY] = useState<number>(0);
    const setting = useStore((state:any)=>state.setTarget);
    const newArr = []

    const world = useMemo(()=> new THREE.Vector3(), []);

    useFrame(()=>{
        const boxCenter = boxRef.current.getWorldPosition(world);
        const boundary = {
            minX : boxCenter.x-4, maxX:boxCenter.x+4, minY:boxCenter.y-9, maxY: boxCenter.y+9, minZ: boxCenter.z-6, maxZ: boxCenter.z+6
        }
        const allBoundingBox = new THREE.Box3().setFromObject(meshRef.current);
        const box = new THREE.Box3().setFromObject(boxRef.current);
        const center = meshRef.current.getWorldPosition(world);

       if(center.x -3 < boundary.minX || center.x+3 > boundary.maxX 
        || center.y -7 < boundary.minY || center.y +7 > boundary.maxY 
        || center.z -5.5 < boundary.minZ || center.z +5.5 > boundary.maxZ ){           
            mateRef.current.color = new THREE.Color("#ff0000");
        }
        else{
            mateRef.current.color = focus ? new THREE.Color("#fcf000") : new THREE.Color("#ffffff");
        
        }
       
        if(curY !== meshAllRef.current.position.y){
            setCurY(meshAllRef.current.position.y);
            setOffset(offset+curY);
        }
    })
    useEffect(() => {
        if (!geometry || !meshRef.current) return;
        const boundingBox = new THREE.Box3().setFromObject(meshRef.current);
        const center = boundingBox.getCenter(new THREE.Vector3());
        meshRef.current.geometry.center();
        const box = new THREE.Box3().setFromObject(boxRef.current);
        setCp([]);
        setCenterZ(center.z);
        setFocus(false);

        const arr = meshRef.current.geometry.attributes.position.array;
        const {x,y,z} = meshRef.current.position;
        for(let i =0; i<arr.length; i+=3){
            newArr.push([arr[i]+x, arr[i+1]+y, arr[i+2]+z]);
        }
        setOffset(offset+curY);
    }, [geometry,offset]);

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
                    setSetting(!isSettingOpen);
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
                position={[0,0,0]}                    
            >
                <meshStandardMaterial ref={mateRef} color={focus ? "#fcf000" : "#ffffff"} side={THREE.DoubleSide}/>
            </mesh>
            {connectOn ? type === "Ellipse" ? <Connector setNum={setNum} setSetting={setSetting} meshRef={meshRef} top={width} bottom={width} height={height} useStore={useStore} visible={visible} setVisible={setVisible} setHoverd={setHoverd} /> : <RectangleConnector width={width}  height={width} depth={height}/> : null}
        </mesh>
    );
}

export default LoadMesh;