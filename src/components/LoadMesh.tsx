import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRecoilState } from "recoil";
import Connector from "./Connector";
import RectangleConnector from "./RectangleConnector";
import { directionState, directionPoint,directionSet } from "../store/directionState";
import DirectionArrow from "./DirectionArrow";
import { MeshData } from "./MeshData";

interface posProps{
    pos: String,
    w: number,
    h: number,
    d: number,
    position: [number, number, number],
    data: MeshData,
};

interface ProgressProps{
    name: String,
    percent: number,
    mini: boolean
}

interface loadMesh{
    geometry: any,
    visible : boolean,
    setVisible :  React.Dispatch<React.SetStateAction<boolean>>,
    setHoverd :  React.Dispatch<React.SetStateAction<boolean>>,
    useStore: any,
    setSetting: React.Dispatch<React.SetStateAction<boolean>>,
    isSettingOpen : boolean,
    offset: number,
    connectOn: boolean,
    showConnect: boolean,
    idx:number,
    type: String,
    width: number,
    height : number,
    angle : number,
    rotation : number,
    distance: number,
    cutting : number,
    setNum: React.Dispatch<React.SetStateAction<number>>,
    setOffset: React.Dispatch<React.SetStateAction<number>>,
    boxRef: any,
    connecStart:boolean,
    setConnecStart: React.Dispatch<React.SetStateAction<boolean>>,
    setConnecOn: React.Dispatch<React.SetStateAction<boolean>>,
    position:number,
    setPosArr: React.Dispatch<React.SetStateAction<posProps[]>>,
    posArr:posProps[],
    posName: String,
    billRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>,
    setX: React.Dispatch<React.SetStateAction<number>>,
    setY: React.Dispatch<React.SetStateAction<number>>,
    arr: Array<ProgressProps>
}

function LoadMesh({ geometry, arr ,type,connectOn,setX,setPosArr,posName, position, boxRef,idx,posArr, showConnect, visible, setVisible, setHoverd, offset, setOffset,useStore, setSetting, isSettingOpen, width, height, connecStart, setY, angle, setNum} : loadMesh){
    const meshRef = useRef<THREE.Mesh>(null!);
    const meshAllRef = useRef<THREE.Mesh>(null!);
    const edgeRef = useRef<THREE.Mesh>(null!);
    const mateRef = useRef<THREE.MeshStandardMaterial>(null!);

    const [dircetion, setDirectionState] = useRecoilState(directionState);
  
    const { camera, raycaster, scene,gl } = useThree();
    
    const [focus, setFocus] = useState<boolean>(false);
    const [conF, setConF] = useState<boolean>(false);
    const [centerZ, setCenterZ] = useState<number>(0);
    const [curY, setCurY] = useState<number>(0);
    const [box3, setBox3] = useState<THREE.Box3>(null!);
    const setting = useStore((state:any)=>state.setTarget);
    const newArr: THREE.Vector3[] = [];
    const vector3 : THREE.Vector3[] = [];
    const world = useMemo(()=> new THREE.Vector3(), []);

    
    useFrame(()=>{
        if(boxRef != undefined){
            const boxCenter = boxRef.getWorldPosition(world);
        
            const boundary = {
                minX : boxCenter.x-4.5, maxX:boxCenter.x+4.5, minY:boxCenter.y-9, maxY: boxCenter.y+9, minZ: boxCenter.z-6, maxZ: boxCenter.z+6
            };
            if(meshAllRef.current){
                const allBoundingBox = new THREE.Box3().setFromObject(meshAllRef.current);
                const box = new THREE.Box3().setFromObject(boxRef);
                const boundingBox = new THREE.Box3().setFromObject(meshRef.current);
                const center = meshRef.current.getWorldPosition(world);
                if(center.x -3 < boundary.minX || center.x+3 > boundary.maxX 
                || center.y -7 < boundary.minY || center.y +7 > boundary.maxY 
                || center.z -5.5 < boundary.minZ || center.z +5.5 > boundary.maxZ ){           
                    mateRef.current.color = new THREE.Color("#ff0000");
                }
                else{
                    mateRef.current.color = focus ? new THREE.Color("#fcf000") : new THREE.Color("#ffffff");

                }
                if(curY != meshAllRef.current.position.y){
                    
                    setCurY(meshAllRef.current.position.y);
                    
                }
                
            }
            setX(meshAllRef.current.position.x);
            setY(meshAllRef.current.position.y);
            if(dircetion == 'yes' && posArr[idx].pos === posName &&  !posArr[idx].data.caculating){
                let newArr = [...posArr];
                newArr[idx].data.dirPoint = [camera.rotation.x,camera.rotation.y,camera.rotation.z];
                newArr[idx].data.dirState=true;
                setPosArr(newArr);
                setDirectionState("no");
            }
        }
        
        // billRef.current.quaternion.copy(camera.quaternion);
    })
    useEffect(() => {
        if (!geometry || !meshRef.current) return;
        else{
            const boundingBox = new THREE.Box3().setFromObject(meshRef.current);
            const center = boundingBox.getCenter(new THREE.Vector3());
            meshRef.current.geometry.center();
                        
            let newArr = [...posArr];
            newArr[idx].data.planeY= offset+boundingBox.max.y*0.3;
            setPosArr(newArr);
            setCenterZ(center.z);
            setFocus(false);
            setOffset(offset+boundingBox.max.y);
            
            setBox3(boundingBox);
        }
        
    }, [geometry, offset]);

    useEffect(() => {
        const boundingBox = new THREE.Box3().setFromObject(meshRef.current);
        const center = meshRef.current.getWorldPosition(world);
        if(curY != 0){ 
            setOffset(offset+curY+1);
            let newArr = [...posArr];
            if(newArr[idx].position[1] < 0){
                newArr[idx].data.planeY=offset-curY+1;
            }
            else newArr[idx].data.planeY=offset+curY+1;
            setPosArr(newArr);
        }

    }, [curY,offset]);

    return( 
        <mesh ref={meshAllRef} >
            
            <mesh 
                geometry={geometry} 
                ref={meshRef}
                onDoubleClick={(event)=>{
                    event.stopPropagation();
                    if(!posArr[idx].data.caculating){
                        setting(meshAllRef);
                        setVisible(!visible);
                        setFocus(!focus);
                        setSetting(!isSettingOpen);
                    }
                    
                }}
                onPointerOver={()=>{
                    if(focus && !conF){
                        setHoverd(true);
                        setting(meshAllRef);
                    }
                    
                }}
                onPointerOut={()=>{
                    if(focus && !conF){
                        setHoverd(false);
                        setting(meshRef);
                    }
                }}
                onClick={(e)=>{
                    // setFocus(!focus);
                }}
                position={[0,0,0]}                    
            >
                <meshStandardMaterial ref={mateRef} color={focus ? "#fcf000" : "#ffffff"} side={THREE.DoubleSide}/>
                
            </mesh>
            {connectOn ? type === "Ellipse" ? <Connector arr={posArr} idx={idx} conF={conF} setConF={setConF} posName={posName} angle={angle} x={position} setNum={setNum} setSetting={setSetting} top={width} bottom={width} height={height} useStore={useStore} visible={visible} setVisible={setVisible} setHoverd={setHoverd} /> : <RectangleConnector angle={angle} useStore={useStore} x={position} width={width}  height={width} depth={height} visible={visible} setVisible={setVisible}/> : null}
            {connecStart &&showConnect  ? type === "Ellipse" ? <Connector idx={idx} arr={posArr} conF={conF} setConF={setConF} posName={posName} angle={angle}  x={position} setNum={setNum} setSetting={setSetting} top={width} bottom={width} height={height} useStore={useStore} visible={visible} setVisible={setVisible} setHoverd={setHoverd} /> : <RectangleConnector angle={angle} useStore={useStore} x={position} width={width}  height={width} depth={height} visible={visible} setVisible={setVisible}/> : null}
            
        </mesh>
    );
}

export default LoadMesh;