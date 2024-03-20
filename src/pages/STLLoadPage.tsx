import styled from "styled-components";
import { useState, useRef,useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, ThreeEvent, useThree, useFrame,useLoader } from "@react-three/fiber";
import { OrbitControls, CatmullRomLine,Loader, OrthographicCamera, Cone, TransformControls,} from "@react-three/drei";
import { BufferGeometry } from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from "three";
import { pointState, getPointState } from "../store/pointState";
import { useRecoilState, useRecoilValue } from "recoil";
import { CirclePicker} from 'react-color';
import { useControls } from "leva";
import create from 'zustand';

import logo from "../img/free-icon-file-and-folder-8291136.png";
import colorlogo from "../img/free-icon-color-palette-2561365.png";
import plusLogo from "../img/free-icon-plus-sign-3114793.png";
import checkLogo from "../img/free-icon-check-mark-66936.png";
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

const useStore = create((set:any)=>({target: null, setTarget: (target : any)=>set({target}) }));
const test = useLoader.preload(STLLoader, ["/models/5X500L V2-CAD BLOCK JIG_형상추가.stl"]);
function STLLoadPage(){
    const groupRef = useRef<THREE.Group>(null!);
    const ref = useRef(null!);
    const cameraRef = useRef<THREE.OrthographicCamera>(null!);
    const controlRef = useRef(null!);

    const [isEnter, setIsEnter] = useState<boolean>(false);
    const [isDrop, setIsDrop] = useState<boolean>(false);
    const [state, setState] = useState<boolean>(false);
    const [colorState, setColorState] = useState<boolean>(false);
    const [color, setColor] = useState<Array<string>>([]);
    const [cp, setCp] = useState<THREE.Vector3Tuple[]>([]);

    const [open, setOpen] = useState<boolean>(false);
    const [partOpen, setPartOpen] = useState<boolean>(false);
    const [settingOpen, setSettingOpen] = useState<boolean>(false);

    const [visible, setVisible] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);
    const [jigVisible, setJigVisible] = useState<boolean>(true);

    const [cpArr, setCpArr] = useState<Array<any>>([]);
    
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
    const camera = new THREE.OrthographicCamera(1000, 1000,1000,1000,0.1,2000);
    useEffect(()=>{
        camera.zoom = 8;
        // console.log(target);
        camera.left = 1000;
        camera.right = 1000;
        camera.top = 1000;
        camera.bottom = 1000;
        camera.updateProjectionMatrix();
        console.log(target);
    },[geometry, jigGeometry, open, partOpen]);
    return(
        <Container>
            <HeadContainer>
            </HeadContainer>

            <Bodycontainer >
                <ListItem setIsSetOpen={setSettingOpen} isSetOpen={settingOpen} handleUpload={handleUpload} setIsOpen={setOpen} setIsPartOpen={setPartOpen} isOpen={open} isPartOpen={partOpen}/>
                <DetailList isOpen={open} setGeo={setJigGeometry} setJig={setJigOpen} setIsDrop={setIsDrop} setIsOpen={setOpen}/>
                <PartList isPartOpen={partOpen} lineNum={2}/>
                <SettingBox isSettingOpen={settingOpen}/>
                
    
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
                            onDrop={handleDrop}
                            onCreated={(state)=>{
                                console.log(state);
                            }}
                        >   
                                <Suspense fallback={null}>
                                    {jigOpen ? <Camera cameraRef={cameraRef}/> : null}
                                </Suspense>
                                <OrbitControls ref={controlRef} enableDamping dampingFactor={0.3} rotateSpeed={0.8} panSpeed={0.5}  mouseButtons={{RIGHT: THREE.MOUSE.ROTATE, MIDDLE:THREE.MOUSE.PAN}}/>
                                {jigGeometry ?<ViewList cameraRef={cameraRef} controlRef={controlRef}/>:null}

                                
                                <directionalLight intensity={0.6} position={[0,1,0]}/>
                                <directionalLight intensity={0.6} position={[0,-1,0]}/>
                                <directionalLight intensity={0.6} position={[1,0,0]}/>
                                <directionalLight intensity={0.6} position={[-1,0,0]}/>
                                <directionalLight intensity={0.6} position={[0,0,1]}/>
                                <directionalLight intensity={0.6} position={[0,0,-1]}/>
                                
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
                                    <mesh position={[-8,7.4,0]} scale={0.4}>
                                        <boxGeometry args={[14,18,12]}/>
                                        <meshStandardMaterial transparent={true} opacity={0.3} color="#2156f8" side={THREE.DoubleSide}/>
                                        {geometry.length > 0 ? geometry.map((geo, idx)=>(<LoadMesh isSettingOpen={settingOpen} setSetting={setSettingOpen} geometry={geo} setHoverd={setHovered} state={state} setState={setState} color={color} cp={cp} setCp={setCp} cpArr={cpArr} visible={visible} setVisible={setVisible} useStore={useStore}/>)) : null}
                                    </mesh>
                                    
                                </group>
                            <AxesHelper posioin={new THREE.Vector3(40,-30,0)} visible={true} size={10}/>
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

