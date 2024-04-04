import styled from "styled-components";
import { useState, useRef,useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, ThreeEvent, useThree, useFrame,useLoader } from "@react-three/fiber";
import { OrbitControls, CatmullRomLine,Loader, OrthographicCamera, Cone, TransformControls, Plane, useHelper} from "@react-three/drei";
import { BufferGeometry } from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from "three";
import { pointState, getPointState } from "../store/pointState";
import { useRecoilState, useRecoilValue } from "recoil";

import create from 'zustand';

import logo from "../img/free-icon-file-and-folder-8291136.png";
import visibleLogo from "../img/free-icon-eye-5368960.png";
import inVisibleLogo from "../img/free-icon-invisible-symbol-84529.png";

import AxesHelper from "../components/AxesHelper";
import HeadContainer from "../components/HeadContainer";
import ListItem from "../components/ListItem";
import DetailList from "../components/DetailList";
import ViewList from "../components/ViewList";
import PartList from "../components/PartList";
import LoadMesh from "../components/LoadMesh";
import Camera from "../components/Camera";
import Connector from "../components/Connector";
import SettingBox from "../components/SettingBox";
import { off } from "process";
import RectangleConnector from "../components/RectangleConnector";

const useStore = create((set:any)=>({target: null, setTarget: (target : any)=>set({target}) }));
const test = useLoader.preload(STLLoader, ["/models/5X500L V2-CAD BLOCK JIG_형상추가.stl"]);
function STLLoadPage(){
    const groupRef = useRef<THREE.Group>(null!);
    const ref = useRef(null!);
    const cameraRef = useRef<THREE.OrthographicCamera>(null!);
    const controlRef = useRef(null!);
    const lightHelper1 = useRef<THREE.DirectionalLight>(null!);
    const lightHelper2 = useRef<THREE.DirectionalLight>(null!);
    const boxRef = useRef(null!);

    const [isEnter, setIsEnter] = useState<boolean>(false);
    const [isDrop, setIsDrop] = useState<boolean>(false);
    const [state, setState] = useState<boolean>(false);

    const [settingNum, setSettingNum] = useState<number>(1);

    const [offset, setOffset] = useState<number>(6.0);
    const [planeY, setPlaneY] = useState<number>(6.0);
    const [conWid, setConWid] = useState<number>(4.0);
    const [conHei, setConHei] = useState<number>(3.0);
    const [conAngle, setConAngle] = useState<number>(4.0);
    const [conRota, setConRota] = useState<number>(0.0);
    const [conDis, setConDis] = useState<number>(0.0);
    const [conCut, setConCut] = useState<number>(50.0);

    const [color, setColor] = useState<Array<string>>([]);
    const [cp, setCp] = useState<THREE.Vector3Tuple[]>([]);

    const [open, setOpen] = useState<boolean>(false);
    const [partOpen, setPartOpen] = useState<boolean>(false);
    const [settingOpen, setSettingOpen] = useState<boolean>(false);
    const [connectOn, setConnectOn] = useState<boolean>(false);
    const [showConnect, setShowConnect] = useState<boolean>(false);

    const [visible, setVisible] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);
    const [jigVisible, setJigVisible] = useState<boolean>(true);
    const planeRef = useRef<THREE.Mesh>(null!);
    const [cpArr, setCpArr] = useState<Array<any>>([]);
    const [type, setType] = useState<String>("Ellipse");
    const point = useRecoilValue(getPointState);
    

    const [geometry, setGeometry] = useState<Array<BufferGeometry>>([]);
    const [jigGeometry, setJigGeometry] = useState<BufferGeometry>(null!);
    const [jigOpen, setJigOpen] = useState<boolean>(false);

    const handleDrop = (event : React.DragEvent) =>{
        event.preventDefault();
        const file = event.dataTransfer.files[0];

        loading(file);
    }

    const handleUpload = ({ target }:any) => {
        const file = target.files[0]
        loading(file);
    };

    const loading = (file:File) =>{
        const loader = new STLLoader();
        if(file){
            if(!file.name.includes("stl")){
                window.alert("잘못된 파일 형식입니다.");
            }
            else{
                loader.load(URL.createObjectURL(file), geo=>{
                    setGeometry(prev => [...prev, geo]);
                });
                setIsDrop(true);
            }
        }
        
    };

    const { target, setTarget } = useStore();

    // const camera = new THREE.OrthographicCamera(-1,1,-1,1,0.1,2000);

    useEffect(()=>{
      
    },[geometry, jigGeometry, open, partOpen]);
    return(
        <Container>
            <HeadContainer>
            </HeadContainer>

            <Bodycontainer >
                <ListItem setIsSetOpen={setSettingOpen} isSetOpen={settingOpen} handleUpload={handleUpload} setIsOpen={setOpen} setIsPartOpen={setPartOpen} isOpen={open} isPartOpen={partOpen}/>
                <DetailList isOpen={open} setGeo={setJigGeometry} setJig={setJigOpen} setIsDrop={setIsDrop} setIsOpen={setOpen}/>
                <PartList isPartOpen={partOpen} lineNum={2}/>
                <SettingBox num={settingNum} setNum={setSettingNum} type={type} setType={setType} isSettingOpen={settingOpen} boffset={offset} setBoffset={setOffset} width={conWid} setWidth={setConWid} height={conHei} setHeight={setConHei} angle={conAngle} setAngle={setConAngle} rotation={conRota} setRotation={setConRota} distance={conDis} setDistance={setConDis} cutting={conCut} setCutting={setConCut}/>
    
                {isDrop ? 
                    <>
                        <Canvas
                            ref={ref}
                            onDragEnter={(event:React.DragEvent)=>{
                                event.preventDefault();
                            }}
                            onDragLeave={(event:React.DragEvent)=>{
                                event.preventDefault();
                            }}
                            onDragOver={(event:React.DragEvent)=>{
                                event.preventDefault();
                            }}
                            onDrop={(e)=>{e.preventDefault(); handleDrop(e);}}
                            // onContextMenu={(e)=>{console.log(e); }}
                            style={{zIndex:30}}
                            orthographic
                            // camera={camera}
                            camera={{
                                left:-8000,
                                right: 8000,
                                top:8000,
                                bottom: 8000,
                                zoom:6,
                                near:-8000,
                                far:2000
                            }}
                        >   

                            {/* <Camera cameraRef={cameraRef}/> */}
                            
                            {jigGeometry ?<ViewList lightRef2={lightHelper2} lightRef={lightHelper1} cameraRef={cameraRef} controlRef={controlRef}/>:null}

                            
                            {/* <directionalLight intensity={0.6} position={[0,1,0]}/> */}
                            {/* <directionalLight intensity={0.6} position={[0,-1,0]}/> */}
                            {/* <directionalLight intensity={0.6} position={[1,0,0]}/> */}
                            {/* <directionalLight intensity={0.6} position={[-1,0,0]}/> */}
                            <directionalLight ref={lightHelper1} intensity={0.5} position={[10,0,40]} rotation-y={-Math.PI/4}/>
                            <directionalLight ref={lightHelper2} intensity={0.5} position={[-10,0,40]} rotation-y={Math.PI/4}/>
                            {/* <directionalLight ref={lightHelper2} intensity={0.7} position={[-1,1,1]} /> */}
                            {/* <directionalLight intensity={0.6} position={[0,0,-1]}/> */}                            
                            <group ref={groupRef}>
                                {jigOpen  ?
                                    <mesh position={[0,0,0]} geometry={jigGeometry} visible={jigVisible}  scale={[0.4,0.4,0.4]}>
                                        <meshStandardMaterial color={"#ffffff"} opacity={0} side={THREE.DoubleSide} />
                                    </mesh>
                                :null}
                                {/* <mesh position={[19.5,-18.47,0]}>
                                    <boxGeometry args={[14,18,12]}/>
                                    <meshStandardMaterial transparent={true} opacity={0.5} color="#2196f3" side={THREE.DoubleSide}/>
                                </mesh>
                                <mesh position={[19.5,18.47,0]}>
                                    <boxGeometry args={[14,18,12]}/>
                                    <meshStandardMaterial transparent={true} opacity={0.5} color="#2196f3" side={THREE.DoubleSide}/>
                                </mesh>
                                <mesh position={[0,-18.47,0]}>
                                    <boxGeometry args={[14,18,12]}/>
                                    <meshStandardMaterial transparent={true} opacity={0.5} color="#2196f3" side={THREE.DoubleSide}/>
                                </mesh>
                                <mesh position={[0,18.47,0]}>
                                    <boxGeometry args={[14,18,12]}/>
                                    <meshStandardMaterial transparent={true} opacity={0.5} color="#2196f3" side={THREE.DoubleSide}/>
                                </mesh>
                                <mesh position={[-19.5,-18.47,0]}>
                                    <boxGeometry args={[14,18,12]}/>
                                    <meshStandardMaterial transparent={true} opacity={0.5} color="#2196f3" side={THREE.DoubleSide}/>
                                </mesh> */}
                                <mesh 
                                    ref={boxRef}
                                    position={[-8,7.4,0]} scale={0.4}
                                    onPointerOver={()=>{
                                        setShowConnect(true);
                                    }}
                                    onPointerOut={()=>{
                                        setShowConnect(false);
                                    }}
                                    onClick={()=>{
                                        setConnectOn(true);
                                    }}
                                >
                                    <boxGeometry args={[14,18,12]}/>
                                    <meshStandardMaterial transparent={true} opacity={0.3} color="#2156f8" side={THREE.DoubleSide}/>
                                    {geometry.length > 0 ? geometry.map((geo, idx)=>(<LoadMesh boxRef={boxRef} lightHelper1={lightHelper1} lightHelper2={lightHelper2} setOffset={setPlaneY} setNum={setSettingNum} type={type}  connectOn={connectOn} offset={offset} isSettingOpen={settingOpen}  setSetting={setSettingOpen} geometry={geo} setHoverd={setHovered}  setCp={setCp}  visible={visible} setVisible={setVisible} useStore={useStore} width={conWid} height={conHei} angle={conAngle} rotation={conRota} distance={conDis} cutting={conCut}/>)) : null}
                                    {/* {showConnect ? {
                                        type === "Rectangle" ? <Connector top={2} bottom={2} height={4} useStore={useStore} visible={visible} setVisible={setVisible} setHoverd={setHoverd}/> : <RectangleConnector/>
                                    } : null} */}
                                   {geometry.length > 0 ? <Plane ref={planeRef} args={[14,12]} rotation-x={Math.PI/2} position={[0,planeY,0]} >
                                        <meshStandardMaterial side={THREE.DoubleSide} opacity={0.2}/>
                                    </Plane>: null}
                                </mesh>
                                
                            </group>
                            <AxesHelper posioin={new THREE.Vector3(40,-30,0)} visible={true} size={10}/>
                            <OrbitControls ref={controlRef} dampingFactor={0.3} rotateSpeed={0.8} panSpeed={0.5}  mouseButtons={{RIGHT: THREE.MOUSE.ROTATE, MIDDLE:THREE.MOUSE.PAN}}/>
                            {target && visible &&<TransformControls object={target} position={[0,0,0]} mode={hovered ? "translate" : "rotate"} size={hovered ? 0.2 : 0.4} onClick={(e)=>{e.stopPropagation();}} onPointerDown={(e)=>{e.stopPropagation();}} scale={0.3}/>}
                            
                        </Canvas>
                    <Loader/>
                    <LineBtn onClick={()=>{
                        setJigVisible(!jigVisible);
                    }}>
                        {jigVisible ? <img src={inVisibleLogo} style={{width:"4rem", height:"4rem"}} alt="Save Line" title="Save Line"/> : <img src={visibleLogo} style={{width:"4rem", height:"4rem"}} alt="Add Line" title="Add Line"/>}
                    </LineBtn>
                </>
                :
                <FileUploadBox 
                    onDragEnter={(event)=>{
                        event.preventDefault();
                        setIsEnter(true);
                    }}
                    onDragLeave={(event)=>{
                        event.preventDefault();
                        setIsEnter(false);
                    }}
                    onDragOver={(event)=>{
                        event.preventDefault();
                    }}
                    onDrop={handleDrop}
                    style={{borderColor:`${isEnter ? 'red' : 'black'}`}}
                >
                    <FileImg src={logo}/>
                    <BoxText>Drop a STL File.</BoxText>
                </FileUploadBox>
                
                }
            </Bodycontainer>
            
        </Container>
    );
}

export default STLLoadPage;

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction:column;
`;

const Bodycontainer = styled.div`
    flex:1;
    display:flex;
    flex-direction:row;
`;

const LineBtn = styled.div`
    position:absolute;
    display:flex;
    justify-content:center;
    align-items:center;
    width: 5rem;
    height: 5rem;
    right:2rem;
    top:8rem;
    z-index: 50;
    &:hover{

    }
`;

const FileUploadBox = styled.label`
    display: flex;
    width:100%;
    height: 100%;
    justify-content:center;
    align-items:center;
    flex-direction: column;
`;

const BoxText = styled.h1`
    font-size: 3rem;
    font-weight: 900;
`;

const FileImg = styled.img`
    width: 13rem;
    height: 13rem;
    margin-bottom:2rem;
`;

