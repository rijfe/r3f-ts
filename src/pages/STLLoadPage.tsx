import styled from "styled-components";
import { useState, useRef,useEffect, RefObject } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, ThreeEvent, useThree, useFrame,useLoader } from "@react-three/fiber";
import { OrbitControls, CatmullRomLine,Loader, OrthographicCamera, Box, TransformControls, Plane, useHelper, Cylinder, Html, Billboard, ScreenSpace} from "@react-three/drei";
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
import { directionSet, getDirectionSet } from "../store/directionState";
import DirectionArrow from "../components/DirectionArrow";
import { MeshData } from "../components/MeshData";
import StaticAxes from "../components/StaticAxes";
import { getPosNum } from "../store/PosNum";

const useStore = create((set:any)=>({target: null, setTarget: (target : any)=>set({target}) }));
const test = useLoader.preload(STLLoader, ["/models/5X500L V2-CAD BLOCK JIG_형상추가.stl"]);
function STLLoadPage(){
    const groupRef = useRef<THREE.Group>(null!);
    const htmlRef = useRef<THREE.Group>(null!);
    const axesRef = useRef<THREE.Group>(null!);
    const ref = useRef(null!);
    const cameraRef = useRef<THREE.OrthographicCamera>(null!);
    const controlRef = useRef(null!);
    const lightHelper1 = useRef<THREE.DirectionalLight>(null!);
    const lightHelper2 = useRef<THREE.DirectionalLight>(null!);
    const boxRef = useRef<any>([]);
    const billRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null!);

    const [isEnter, setIsEnter] = useState<boolean>(false);
    const [isDrop, setIsDrop] = useState<boolean>(false);
    const [state, setState] = useState<number>(0);

    const [settingNum, setSettingNum] = useState<number>(1);

    const [offset, setOffset] = useState<number>(5.0);
    const [planeY, setPlaneY] = useState<number>(5.0);
    const [planeY5, setPlaneY5] = useState<number>(5.0);
    const [conWid, setConWid] = useState<number>(2.0);
    const [conHei, setConHei] = useState<number>(4.0);
    const [conAngle, setConAngle] = useState<number>(4.0);
    const [conRota, setConRota] = useState<number>(0.0);
    const [conDis, setConDis] = useState<number>(0.0);
    const [conCut, setConCut] = useState<number>(50.0);
    

    const [open, setOpen] = useState<boolean>(false);
    const [partOpen, setPartOpen] = useState<boolean>(false);
    const [settingOpen, setSettingOpen] = useState<boolean>(false);
    const [connectOn, setConnectOn] = useState<boolean>(false);
    const [showConnect, setShowConnect] = useState<boolean>(false);
    const [connStart, setConnStart] = useState<boolean>(false);
    const [lightMove, setLightMove] = useState<boolean>(false);

    const [visible, setVisible] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);
    const [jigVisible, setJigVisible] = useState<boolean>(true);
    const planeRef = useRef<THREE.Mesh>(null!);

    const [conPos, setConPos] = useState<string>("");

    const [type, setType] = useState<String>("Ellipse");
    const [type5, setType5] = useState<String>("Ellipse");

    const [geometry, setGeometry] = useState<Array<BufferGeometry>>([]);
    const [jigGeometry, setJigGeometry] = useState<BufferGeometry>(null!);
    const [jigOpen, setJigOpen] = useState<boolean>(false);

    const dirSet = useRecoilValue(getDirectionSet);
    const [dircetionS, setDirectionset] = useRecoilState(directionSet);
    // const [dircetionS5, setDirectionset5] = useRecoilState(directionSet);
    const [posName, setPosName] = useState<String>("");

    interface geoProps{
        pos: String,
        file: BufferGeometry,
        fileName: string,
    };

    const [test, setTest] = useState<Array<geoProps>>([]);

    interface posProps{
        pos: String,
        w: number,
        h: number,
        d: number,
        position: [number, number, number],
        data: MeshData
    };

    const [posArr, setPosArr] = useState<Array<posProps>>([]);

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

    const camera = new THREE.OrthographicCamera(-8000,8000,-8000,8000,-8000,2000);

    useEffect(()=>{

        setDirectionset(false);
    },[jigOpen]);

    // useEffect(()=>{
    //     console.log(test);
    // },[test]);

    useEffect(()=>{

        setGeometry([]);
    },[]);

    const num = useRecoilValue(getPosNum);

    return(
        <Container>
            <HeadContainer>
            </HeadContainer>

            <Bodycontainer >
                <ListItem setIsSetOpen={setSettingOpen} isSetOpen={settingOpen} handleUpload={handleUpload} setIsOpen={setOpen} setIsPartOpen={setPartOpen} isOpen={open} isPartOpen={partOpen}/>
                <DetailList isOpen={open} setGeo={setJigGeometry} setJig={setJigOpen} setIsDrop={setIsDrop} setIsOpen={setOpen}/>
                <PartList posArr={posArr} setPosArr={setPosArr} isPartOpen={partOpen} lineNum={10/num >= 2 ? 1 : 2} setStaPosName={setPosName}/>
                <SettingBox posObj={posArr} pos={posName} setPos={setPosName} setPosObj={setPosArr} setConnStart={setConnStart} num={settingNum} setNum={setSettingNum} type={type} setType={setType} isSettingOpen={settingOpen} boffset={offset} setBoffset={setOffset} width={conWid} setWidth={setConWid} height={conHei} setHeight={setConHei} angle={conAngle} setAngle={setConAngle} rotation={conRota} setRotation={setConRota} distance={conDis} setDistance={setConDis} cutting={conCut} setCutting={setConCut}/>
    
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
                            onContextMenu={(e)=>{
                                setLightMove(true);
                            }}
                            onMouseDown={(e)=>{
                                if(e.button === 1){
                                    setLightMove(false);
                                }
                            }}
                            onDrop={(e)=>{e.preventDefault(); handleDrop(e);}}
                            style={{zIndex:30}}
                            orthographic
                            camera={{
                                left:-8000,
                                right: 8000,
                                top:8000,
                                bottom: 8000,
                                zoom:5,
                                near:-8000,
                                far:2000,
                            }}
                        >     
                            {jigGeometry ?<ViewList state={lightMove} jigRef={groupRef} htmlRef={htmlRef} lightRef2={lightHelper2} lightRef={lightHelper1} cameraRef={cameraRef} controlRef={controlRef}/>:null}

                            <directionalLight ref={lightHelper1} intensity={0.8}  />
                            <directionalLight ref={lightHelper2} intensity={0.8}  />
                  
                            <group ref={groupRef}>
                                {jigOpen  ?
                                    <mesh 
                                        onClick={(e)=>{e.stopPropagation()}} 
                                        onDoubleClick={(e)=>{
                                            e.stopPropagation();
                                        }} 
                                        position={[0,0,0]} 
                                        geometry={jigGeometry} 
                                        visible={jigVisible}  
                                        scale={0.4}
                                    >
                                        <meshStandardMaterial color={"#ffffff"} opacity={0} side={THREE.DoubleSide} />
                                    </mesh>
                                :null}
                               
                                {posArr.length > 0 ?
                                    posArr.map((ele,idx)=>{
                                        return(
                                            <mesh 
                                                ref={elem=>(boxRef.current[Number(ele.pos.split("s")[1])] = elem)}
                                                position={ele.position} 
                                                scale={0.4}
                                                onPointerOver={()=>{
                                                    let newArr = [...posArr];
                                                    newArr[idx].data.showConnect=true;
                                                    setPosArr(newArr);
                                                    setShowConnect(true);
                                                }}
                                                onPointerOut={()=>{
                                                    let newArr = [...posArr];
                                                    newArr[idx].data.showConnect=false;
                                                    setPosArr(newArr);
                                                    setShowConnect(false);
                                                }}
                                                onClick={(e)=>{
                                                    // e.stopPropagation();
                                                    setPosName(ele.pos);
                                                    console.log("what");
                                                    if(ele.data.conStart){
                                                        let newArr = [...posArr];
                                                        newArr[idx].data.showConnect=false;
                                                        newArr[idx].data.connectOn = true;
                                                        newArr[idx].data.conStart = false;
                                                        setPosArr(newArr);
                                                        setConnectOn(true);
                                                        setShowConnect(false);
                                                        setConnStart(false);
                                                    }
                                                    
                                                }}
                                                onPointerMove={(e)=>{
                                                    if(connStart && geometry.length > 0){
                                                        
                                                        setState(e.clientX / window.innerWidth *2 -1);
                                                    }
                                                }}
                                            >
                                                <boxGeometry args={[ele.w,ele.h,ele.d]}/>
                                                <meshStandardMaterial transparent={true} opacity={0.3} color="#2156f8" side={THREE.DoubleSide}/>
                                                {ele.data.file != null ?<LoadMesh billRef={billRef} posName={posName} posArr={posArr} position={state} showConnect={ele.data.showConnect} boxRef={boxRef.current[Number(ele.pos.split("s")[1])]} setPosArr={setPosArr} idx={idx} connecStart={ele.data.conStart} setConnecOn={setConnectOn} setConnecStart={setConnStart} setOffset={setPlaneY5} setNum={setSettingNum} type={ele.data.type}  connectOn={ele.data.connectOn} offset={ele.data.offset} isSettingOpen={settingOpen}  setSetting={setSettingOpen} geometry={ele.data.file} setHoverd={setHovered} visible={visible} setVisible={setVisible} useStore={useStore} width={ele.data.conWid} height={ele.data.conHei} angle={ele.data.conAngle} rotation={ele.data.conRotation} distance={ele.data.conDis} cutting={ele.data.conCut}/> :null}
                                                {Number(ele.pos.split("s")[1]) >= 4 ? <AxesHelper axesRef={axesRef} position={new THREE.Vector3(0,8.9,0)} visible={false} size={3}/> : <AxesHelper axesRef={axesRef} position={new THREE.Vector3(0,-8.9,0)} visible={false} size={3}/>}
                                                <mesh ref={planeRef}>
                                                    <Plane args={[ele.w,ele.d]} rotation-x={Math.PI/2} position={ele.position[1]< 0 ? [0,-ele.data.planeY,0] :[0,ele.data.planeY,0]}>
                                                        <meshStandardMaterial transparent side={THREE.DoubleSide} opacity={0.6} color="#aaaaaa"  />
                                                    </Plane>
                                                </mesh>
                                            </mesh>
                                        );
                                    })
                                :null}
                            </group>
                            {jigOpen ? <StaticAxes/> : null}
                            
                            <OrbitControls ref={controlRef} dampingFactor={0.3} rotateSpeed={0.8} panSpeed={0.8} minZoom={5} mouseButtons={{RIGHT: THREE.MOUSE.ROTATE, MIDDLE:THREE.MOUSE.PAN}}/>
                            {target && visible &&
                                <TransformControls 
                                    object={target}
                                    position={[0,2,0]} 
                                    mode={hovered ? "translate" : "rotate"} 
                                    size={hovered ? 0.2 : 0.4}
                                    onClick={(e)=>{e.stopPropagation();}} 
                                    onPointerDown={(e)=>{e.stopPropagation();}} 
                                    scale={0.4}
                                    
                                />
                            }
                            
                        </Canvas>
                    <Loader/>
                    {/* <LineBtn onClick={()=>{
                        setJigVisible(!jigVisible);
                    }}>
                        {jigVisible ? <img src={inVisibleLogo} style={{width:"4rem", height:"4rem"}} alt="Save Line" title="Save Line"/> : <img src={visibleLogo} style={{width:"4rem", height:"4rem"}} alt="Add Line" title="Add Line"/>}
                    </LineBtn> */}
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
    height:95%;
    width:100vw;
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