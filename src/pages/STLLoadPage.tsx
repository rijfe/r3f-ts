import styled from "styled-components";
import { useState, useRef,useEffect, RefObject } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, ThreeEvent, useThree, useFrame,useLoader } from "@react-three/fiber";
import { OrbitControls, CatmullRomLine,Loader, OrthographicCamera, Box, TransformControls, Plane, useHelper, Cylinder, Html} from "@react-three/drei";
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

const useStore = create((set:any)=>({target: null, setTarget: (target : any)=>set({target}) }));
const test = useLoader.preload(STLLoader, ["/models/5X500L V2-CAD BLOCK JIG_형상추가.stl"]);
function STLLoadPage(){
    const groupRef = useRef<THREE.Group>(null!);
    const htmlRef = useRef<THREE.Group>(null!);
    const ref = useRef(null!);
    const cameraRef = useRef<THREE.OrthographicCamera>(null!);
    const controlRef = useRef(null!);
    const lightHelper1 = useRef<THREE.DirectionalLight>(null!);
    const lightHelper2 = useRef<THREE.DirectionalLight>(null!);
    const boxRef = useRef(null!);
    const boxRef2 = useRef(null!);

    const [isEnter, setIsEnter] = useState<boolean>(false);
    const [isDrop, setIsDrop] = useState<boolean>(false);
    const [state, setState] = useState<number>(0);

    const [settingNum, setSettingNum] = useState<number>(1);

    const [offset, setOffset] = useState<number>(5.0);
    const [offset5, setOffset5] = useState<number>(5.0);
    const [planeY, setPlaneY] = useState<number>(5.0);
    const [planeY5, setPlaneY5] = useState<number>(5.0);
    const [conWid, setConWid] = useState<number>(2.0);
    const [conHei, setConHei] = useState<number>(4.0);
    const [conAngle, setConAngle] = useState<number>(4.0);
    const [conRota, setConRota] = useState<number>(0.0);
    const [conDis, setConDis] = useState<number>(0.0);
    const [conCut, setConCut] = useState<number>(50.0);
    const [conWid5, setConWid5] = useState<number>(2.0);
    const [conHei5, setConHei5] = useState<number>(4.0);
    const [conAngle5, setConAngle5] = useState<number>(4.0);
    const [conRota5, setConRota5] = useState<number>(0.0);
    const [conDis5, setConDis5] = useState<number>(0.0);
    const [conCut5, setConCut5] = useState<number>(50.0);

    const [open, setOpen] = useState<boolean>(false);
    const [partOpen, setPartOpen] = useState<boolean>(false);
    const [settingOpen, setSettingOpen] = useState<boolean>(false);
    const [connectOn, setConnectOn] = useState<boolean>(false);
    const [showConnect, setShowConnect] = useState<boolean>(false);
    const [connStart, setConnStart] = useState<boolean>(false);

    const [connectOn5, setConnectOn5] = useState<boolean>(false);
    const [showConnect5, setShowConnect5] = useState<boolean>(false);
    const [connStart5, setConnStart5] = useState<boolean>(false);

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
        file: BufferGeometry
    };

    const [test, setTest] = useState<Array<geoProps>>([]);

    interface posProps{
        pos: String,
        w: number,
        h: number,
        d: number,
        position: [number, number, number]
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

    useEffect(()=>{
        console.log(test);
    },[test]);

    useEffect(()=>{

        setGeometry([]);
    },[]);
    return(
        <Container>
            <HeadContainer>
            </HeadContainer>

            <Bodycontainer >
                <ListItem setIsSetOpen={setSettingOpen} isSetOpen={settingOpen} handleUpload={handleUpload} setIsOpen={setOpen} setIsPartOpen={setPartOpen} isOpen={open} isPartOpen={partOpen}/>
                <DetailList isOpen={open} setGeo={setJigGeometry} setJig={setJigOpen} setIsDrop={setIsDrop} setIsOpen={setOpen}/>
                <PartList posArr={posArr} setPosArr={setPosArr} isPartOpen={partOpen} lineNum={2}/>
                <SettingBox pos={posName} setPos={setPosName} setPosObj={setTest} setConnStart={conPos === "pos4" ? setConnStart : setConnStart5} num={settingNum} setNum={setSettingNum} type={conPos === "pos4"? type: type5} setType={conPos === "pos4"? setType : setType5} isSettingOpen={settingOpen} boffset={conPos === "pos4"? offset : offset5} setBoffset={conPos === "pos4"? setOffset : setOffset5} width={conPos === "pos4"? conWid : conWid5} setWidth={conPos === "pos4"? setConWid : setConWid5} height={conPos === "pos4"? conHei : conHei5} setHeight={conPos === "pos4"? setConHei : setConHei5} angle={conPos === "pos4"? conAngle : conAngle5} setAngle={conPos === "pos4"? setConAngle : setConAngle5} rotation={conPos === "pos4"? conRota : conRota5} setRotation={conPos === "pos4"? setConRota : setConRota5} distance={conPos === "pos4"? conDis : conDis5} setDistance={conPos === "pos4"?setConDis : setConDis5} cutting={conPos === "pos4"? conCut : conCut5} setCutting={conPos === "pos4"? setConCut : setConCut5}/>
    
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
                            {jigGeometry ?<ViewList jigRef={groupRef} htmlRef={htmlRef} lightRef2={lightHelper2} lightRef={lightHelper1} cameraRef={cameraRef} controlRef={controlRef}/>:null}

                            <directionalLight ref={lightHelper1} intensity={0.7} position={[10,0,40]} rotation-y={-Math.PI/4}/>
                            <directionalLight ref={lightHelper2} intensity={0.7} position={[-10,0,40]} rotation-y={Math.PI/4}/>
                  
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
                                {/* <mesh ref={boxRef} scale={0.4}>
                                    <Cylinder 
                                        args={[48,48,16,128]}
                                        rotation-x={Math.PI/2}
                                    
                                    >
                                        <meshStandardMaterial transparent={true} opacity={0.3} color="#2156f8" side={THREE.DoubleSide}/>
                                    </Cylinder>
                                    {geometry.length > 0 ? geometry.map((geo, idx)=>(<LoadMesh position={state} showConnect={showConnect} boxRef={boxRef} connecStart={connStart} setConnecOn={setConnectOn} setConnecStart={setConnStart} setOffset={setPlaneY} setNum={setSettingNum} type={type}  connectOn={connectOn} offset={offset} isSettingOpen={settingOpen}  setSetting={setSettingOpen} geometry={geo} setHoverd={setHovered}  setCp={setCp}  visible={visible} setVisible={setVisible} useStore={useStore} width={conWid} height={conHei} angle={conAngle} rotation={conRota} distance={conDis} cutting={conCut}/>)) : null}
                                </mesh> */}
                                
                                <mesh 
                                    ref={boxRef}
                                    position={[-8,7.4,0]} 
                                    scale={0.4}
                                    onPointerOver={()=>{
                                        setShowConnect(true);
                                    }}
                                    onPointerOut={()=>{
                                        setShowConnect(false);
                                    }}
                                    onClick={()=>{
                                        setConPos("pos4");
                                        if(connStart){
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
                                    <boxGeometry args={[15,18,15]}/>
                                    <meshStandardMaterial transparent={true}side={THREE.DoubleSide} opacity={0.3} color="#2156f8" />
                                    
                                    {test.length > 0 ? test.map((ele)=>{
                                        if(ele["pos"] === "pos4"){
                                            return(<LoadMesh position={state} showConnect={showConnect} boxRef={boxRef} connecStart={connStart} setConnecOn={setConnectOn} setConnecStart={setConnStart} setOffset={setPlaneY5} setNum={setSettingNum} type={type}  connectOn={connectOn} offset={offset} isSettingOpen={settingOpen}  setSetting={setSettingOpen} geometry={ele["file"]} setHoverd={setHovered} visible={visible} setVisible={setVisible} useStore={useStore} width={conWid} height={conHei} angle={conAngle} rotation={conRota} distance={conDis} cutting={conCut}/>);
                                        }
                                        
                                    }) :null}
                                   {test.length > 0 ? 
                                   test.map((ele)=>{
                                        if(ele["pos"] === "pos4"){
                                            return(
                                                <mesh ref={planeRef}>
                                                    <Box args={[15,0.1,15]} rotation-y={-Math.PI/2} position={[0,planeY5,0]}>
                                                        <meshStandardMaterial transparent side={THREE.DoubleSide}  opacity={0.6} color="#aaaaaa"  />
                                                    </Box>
                                                </mesh>
                                            );
                                        }
                                    
                                    }) 
                                   : null}
                                   <AxesHelper position={new THREE.Vector3(0,8.9,0)} visible={false} size={3}/>
                                </mesh>

                                <mesh 
                                    ref={boxRef2}
                                    position={[0,7.4,0]} 
                                    scale={0.4}
                                    onPointerOver={()=>{
                                        setShowConnect5(true);
                                    }}
                                    onPointerOut={()=>{
                                        setShowConnect5(false);
                                    }}
                                    onClick={()=>{
                                        setConPos("pos5")
                                        if(connStart5){
                                            setConnectOn5(true);
                                            setShowConnect5(false);
                                            setConnStart5(false);
                                        }
                                        
                                    }}
                                    onPointerMove={(e)=>{
                                        if(connStart && geometry.length > 0){
                                            
                                            setState(e.clientX / window.innerWidth *2 -1);
                                        }
                                    }}
                                >
                                    <boxGeometry args={[15,18,15]}/>
                                    <meshStandardMaterial transparent={true} opacity={0.3} color="#2156f8" side={THREE.DoubleSide}/>
                                    {test.length > 0 ? test.map((ele)=>{
                                        if(ele["pos"] === "pos5"){
                                            return(<LoadMesh position={state} showConnect={showConnect5} boxRef={boxRef2} connecStart={connStart5} setConnecOn={setConnectOn5} setConnecStart={setConnStart5} setOffset={setPlaneY} setNum={setSettingNum} type={type5}  connectOn={connectOn5} offset={offset5} isSettingOpen={settingOpen}  setSetting={setSettingOpen} geometry={ele["file"]} setHoverd={setHovered} visible={visible} setVisible={setVisible} useStore={useStore} width={conWid5} height={conHei5} angle={conAngle5} rotation={conRota5} distance={conDis5} cutting={conCut5}/>);
                                        }
                                        
                                    }) :null}
                                   {test.length > 0 ? 
                                    test.map((ele)=>{
                                        if(ele["pos"] === "pos5"){
                                            return(
                                                <mesh ref={planeRef}>
                                                    <Plane args={[15,15]} rotation-x={Math.PI/2} position={[0,planeY,0]}>
                                                        <meshStandardMaterial transparent side={THREE.DoubleSide} opacity={0.6} color="#aaaaaa"  />
                                                    </Plane>
                                                </mesh>
                                            );
                                        }
                                    
                                    }) 
                                   : null}
                                   <AxesHelper position={new THREE.Vector3(0,8.9,0)} visible={false} size={3}/>
                                </mesh>
                                {posArr.length > 0 ?
                                    posArr.map((ele)=>{
                                        return(
                                            <mesh 
                                                position={ele.position} 
                                                scale={0.4}
                                            >
                                                <boxGeometry args={[ele.w,ele.h,ele.d]}/>
                                                <meshStandardMaterial transparent={true} opacity={0.3} color="#2156f8" side={THREE.DoubleSide}/>
                                            
                                            {ele.pos === "pos6" ? <AxesHelper position={new THREE.Vector3(0,8.9,0)} visible={false} size={3}/> : <AxesHelper position={new THREE.Vector3(0,-8.9,0)} visible={false} size={3}/>}
                                            </mesh>
                                        );
                                    })
                                :null}
                            </group>
                        
                            <AxesHelper position={new THREE.Vector3(40,-30,0)} visible={true} size={15}/>
                            <OrbitControls ref={controlRef} dampingFactor={0.3} rotateSpeed={0.8} panSpeed={0.8}  mouseButtons={{RIGHT: THREE.MOUSE.ROTATE, MIDDLE:THREE.MOUSE.PAN}}/>
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

