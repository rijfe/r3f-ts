import styled from "styled-components";
import { useState, useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, ThreeEvent, useThree, useFrame,useLoader } from "@react-three/fiber";
import { OrbitControls, CatmullRomLine,Loader, OrthographicCamera, Cone, TransformControls, useHelper, Plane, Detailed } from "@react-three/drei";
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

const useStore = create((set:any)=>({target: null, setTarget: (target : any)=>set({target}) }));
const test = useLoader.preload(STLLoader, ["/models/5X500L V2-CAD BLOCK JIG_형상추가.stl"]);
function STLLoadPage(){
    const groupRef = useRef<THREE.Group>(null!);
    const ref = useRef(null!);
    const cameraRef = useRef<THREE.OrthographicCamera>(null!);

    const [isEnter, setIsEnter] = useState<boolean>(false);
    const [isDrop, setIsDrop] = useState<boolean>(false);
    const [state, setState] = useState<boolean>(false);
    const [colorState, setColorState] = useState<boolean>(false);
    const [color, setColor] = useState<Array<string>>([]);
    const [cp, setCp] = useState<THREE.Vector3Tuple[]>([]);

    const [open, setOpen] = useState<boolean>(false);
    const [partOpen, setPartOpen] = useState<boolean>(false);

    const [visible, setVisible] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);
    const [jigVisible, setJigVisible] = useState<boolean>(true);

    const [cpArr, setCpArr] = useState<Array<any>>([]);
    
    const point = useRecoilValue(getPointState);
    

    const [geometry, setGeometry] = useState<Array<BufferGeometry>>([]);
    const [jigGeometry, setJigGeometry] = useState<BufferGeometry>(null!);
    const [jigOpen, setJigOpen] = useState<boolean>(false);

    const navigate = useNavigate();

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
    console.log(test);
    const { target, setTarget } = useStore();
    // const { mode } = useControls({ mode: { value: "translate", options: ["translate", "rotate", "scale"] } });
    // const mode = "rotate";
    const saveLine = () => {
        setCpArr(pre => [...pre, cp]);
        console.log(cpArr);
        setCp([]);
    };
    useEffect(()=>{
        setCpArr([]);
        setCp([]);
    },[geometry, jigGeometry]);
    return(
        <Container>
            <HeadContainer>
            </HeadContainer>

            <Bodycontainer >
                <ListItem handleUpload={handleUpload} setIsOpen={setOpen} setIsPartOpen={setPartOpen} isOpen={open} isPartOpen={partOpen}/>
                <DetailList isOpen={open} setGeo={setJigGeometry} setJig={setJigOpen} setIsDrop={setIsDrop}/>
                <PartList isPartOpen={partOpen} lineNum={1}/>
                {jigGeometry ?<ViewList cameraRef={cameraRef}/>:null}
                {/* <LoadContainer>
                    <LoadMesh geometry={geometry} state={state} setState={setState} color={color} cp={cp} setCp={setCp} cpArr={cpArr}/>
                </LoadContainer> */}
                {isDrop ? 
                <>
                    <Canvas
                        // camera={{
                        //     position:[0,0,200]
                        // }}
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
                    >  
                        <directionalLight intensity={0.6} position={[0,1,0]}/>
                        <directionalLight intensity={0.6} position={[0,-1,0]}/>
                        <directionalLight intensity={0.6} position={[1,0,0]}/>
                        <directionalLight intensity={0.6} position={[-1,0,0]}/>
                        <directionalLight intensity={0.6} position={[0,0,1]}/>
                        <directionalLight intensity={0.6} position={[0,0,-1]}/>
                        <group ref={groupRef}>
                            {jigOpen ?
                                <mesh position={[0,0,0]} geometry={jigGeometry} visible={jigVisible}  scale={0.3}>
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
                            <mesh position={[-6,5.5,0]} scale={0.3}>
                                <boxGeometry args={[14,18,12]}/>
                                <meshStandardMaterial transparent={true} opacity={0.5} color="#2196f3" side={THREE.DoubleSide}/>
                                {geometry.map((geo, idx)=>(<LoadMesh geometry={geo} setHoverd={setHovered} state={state} setState={setState} color={color} cp={cp} setCp={setCp} cpArr={cpArr} visible={visible} setVisible={setVisible} useStore={useStore}/>))}
                            </mesh>
                            {/* <AxesHelper posioin={new THREE.Vector3(19.5,-27.47,0)} visible={false} size={5}/> */}
                        </group>
                        <Camera cameraRef={cameraRef}/>

                        <AxesHelper posioin={new THREE.Vector3(40,-30,0)} visible={true} size={10}/>

                        {/* <AxesHelper posioin={new THREE.Vector3(19.5,-27.47,0)} visible={false} size={5}/> */}
                        <OrbitControls enableDamping dampingFactor={0.3} rotateSpeed={0.8} panSpeed={0.5}  mouseButtons={{RIGHT: THREE.MOUSE.ROTATE, MIDDLE:THREE.MOUSE.PAN}}/>
                        {target && visible &&<TransformControls object={target} position={[0,0,0]} mode={hovered ? "translate" : "rotate"} size={hovered ? 0.2 : 0.4} onClick={(e)=>{e.stopPropagation();}} onPointerDown={(e)=>{e.stopPropagation();}} scale={0.3}/>}
                    </Canvas>
                    <Loader/>
                    <LineBtn onClick={()=>{
                        // if(jigVisible){
                            
                        //     groupRef.current.rotation.x = Math.PI/4;
                        // }
                        // groupRef.current.rotation.x = Math.PI/2;
                        console.log(ref);
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

const LoadContainer = styled.div`
    flex: 1;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const PointContainer = styled.div`
    position: absolute;
    right:2rem;
    bottom:2rem;
    font-size:1.5rem;
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

const FileInput = styled.input`
    display:none;
`;
