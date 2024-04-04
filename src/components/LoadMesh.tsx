import { useRef, useState, useEffect } from "react";
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
    const newArr = [];
    const restrictMovement = () => {
        // mesh의 현재 위치 가져오기
        // planeRef.current.position.x = 0;
        // planeRef.current.position.z = 0;
      };

    useFrame(()=>{
       const boundary = {
        minX : -7, maxX:7, minY:-9, maxY: 9, minZ: -6, maxZ: 6
       }
       const allBoundingBox = new THREE.Box3().setFromObject(meshRef.current);
       const box = new THREE.Box3().setFromObject(boxRef.current);
    //    console.log(box.min.x);

       if(allBoundingBox.min.x < box.min.x || allBoundingBox.max.x > box.max.x 
        || allBoundingBox.min.y < box.min.y || allBoundingBox.max.y > box.max.y 
        || allBoundingBox.min.z < box.min.z || allBoundingBox.max.z > box.max.z ){
            // console.log('Mesh가 특정 영역을 벗어났습니다!');
            
            mateRef.current.color = new THREE.Color("#ff0000");
        }
        else{
            mateRef.current.color = focus ? new THREE.Color("#fcf000") : new THREE.Color("#ffffff");
            // if(focus){
            //     console.log(meshRef.current.geometry.attributes.position.array);
            // }
        }
        // planeRef.current.position.x = 0;
        // planeRef.current.position.z = 0;
        if(curY !== meshAllRef.current.position.y){
            setCurY(meshAllRef.current.position.y);
            setOffset(offset+curY);
        }
        restrictMovement();
    });
    // useHelper(lightHelper1, THREE.DirectionalLightHelper);
    // useHelper(lightHelper2, THREE.DirectionalLightHelper);
    useEffect(() => {
        if (!geometry || !meshRef.current) return;
        const boundingBox = new THREE.Box3().setFromObject(meshRef.current);
        const center = boundingBox.getCenter(new THREE.Vector3());
        meshRef.current.geometry.center();
        setCp([]);
        setCenterZ(center.z);
        setFocus(false);
        console.log(boundingBox.max.x, boundingBox.min.x);
        console.log(boundingBox.max.z, boundingBox.min.z);
        console.log(boundingBox.max.y, boundingBox.min.y);
        const arr = meshRef.current.geometry.attributes.position.array;
        const {x,y,z} = meshRef.current.position;
        for(let i =0; i<arr.length; i+=3){
            newArr.push([arr[i]+x, arr[i+1]+y, arr[i+2]+z]);
        }

        // console.log(newArr);
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
            {connectOn ? type === "Ellipse" ? <Connector setNum={setNum} setSetting={setSetting} meshRef={meshRef} top={width} bottom={width} height={height} useStore={useStore} visible={visible} setVisible={setVisible} setHoverd={setHoverd} /> : <RectangleConnector width={width}  height={width} depth={height}/> : null}
        </mesh>
    );
}

export default LoadMesh;