import styled from "styled-components";
import { useState, useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, ThreeEvent, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, CatmullRomLine,Loader, OrthographicCamera, Cone, TransformControls, useHelper, Plane } from "@react-three/drei";
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

interface cameraProps {
    cameraRef: React.MutableRefObject<THREE.OrthographicCamera>
}

function Camera({cameraRef}:cameraProps){

    // useHelper(cameraRef, THREE.CameraHelper);
    // useFrame((state, delta)=>{
    //     console.log(state);
    // });
    // console.log(cameraRef.current);
    return(
        <OrthographicCamera
            ref={cameraRef}
            makeDefault               
            zoom={2}
            top={1000}
            bottom={-1000}
            left={1000}
            right={-1000}
            near={-60}
            far={2000}
        />
    );
}

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
                <PartList isPartOpen={partOpen}/>
                <ViewList cameraRef={cameraRef}/>
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
                                <mesh position={[0,0,0]} geometry={jigGeometry} visible={jigVisible} >
                                    <meshStandardMaterial color={"#ffffff"} opacity={0} side={THREE.DoubleSide}/>
                                </mesh>
                            :null}
                            {geometry.map((geo, idx)=>(<LoadMesh geometry={geo} setHoverd={setHovered} state={state} setState={setState} color={color} cp={cp} setCp={setCp} cpArr={cpArr} visible={visible} setVisible={setVisible}/>))}
                            <mesh position={[19.5,-18.47,0]}>
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
                            </mesh>
                            <mesh position={[-20,18.47,0]}>
                                <boxGeometry args={[14,18,12]}/>
                                <meshStandardMaterial transparent={true} opacity={0.5} color="#2196f3" side={THREE.DoubleSide}/>
                            </mesh>
                            {/* <AxesHelper posioin={new THREE.Vector3(19.5,-27.47,0)} visible={false} size={5}/> */}
                        </group>
                        <Camera cameraRef={cameraRef}/>
                        {/* <Environment preset="forest" background/>*/}
                        
                        {/* {isDrop && geometry && (
                            <LoadMesh geometry={geometry} state={state} setState={setState} color={color} cp={cp} setCp={setCp} cpArr={cpArr}/>
                        )} */}

                        <AxesHelper posioin={new THREE.Vector3(100,-50,0)} visible={true} size={20}/>

                        {/* <AxesHelper posioin={new THREE.Vector3(19.5,-27.47,0)} visible={false} size={5}/> */}
                        <OrbitControls enableDamping dampingFactor={0.3} rotateSpeed={0.8} panSpeed={0.5} enablePan={!visible} enableRotate={!visible} mouseButtons={{RIGHT: THREE.MOUSE.ROTATE, MIDDLE:THREE.MOUSE.PAN}}/>
                        {target && visible &&<TransformControls object={target} position={[0,0,0]} mode={hovered ? "translate" : "rotate"} size={hovered ? 0.2 : 0.4} onClick={(e)=>{e.stopPropagation();}} onPointerDown={(e)=>{e.stopPropagation();}}/>}
                    </Canvas>
                    {/* <Canvas style={{width:20, height:20, position:"absolute"}}>
                        <AxesHelper posioin={new THREE.Vector3(100,-50,0)} visible={true} size={20}/>
                    </Canvas> */}
                    <Loader/>
                    <PointContainer>
                        {`x=${point[0]} y=${point[1]} z=${point[2]}`}
                    </PointContainer>
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
                    {/* <ColorBtn onClick={()=>{setColorState(!colorState);}}>
                        <img src={colorlogo} style={{width:"4rem", height:"4rem"}} alt="Change Color" title="Change Color"/>
                    </ColorBtn> */}
                    {colorState ? 
                    <ColorContainer>
                        <CirclePicker
                            onChange={(c)=>{
                                if(color.length <= cpArr.length){
                                    setColor(pre=>[...pre, c.hex]);
                                }
                                else{
                                    color[color.length-1] = c.hex;
                                }
                                console.log(c.hex);
                            }}
                        />
                    </ColorContainer>
                    : null}
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

const useStore = create((set:any)=>({target: null, setTarget: (target : any)=>set({target}) }))

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
}

const LoadMesh = ({ geometry, state, setState, color, cp, setCp, cpArr, visible, setVisible, setHoverd} : loadMesh) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const mateRef = useRef<THREE.MeshStandardMaterial>(null!);
    const coneRef1 = useRef<THREE.Mesh>(null!);
    const coneRef2 = useRef<THREE.Mesh>(null!);
    const coneRef3 = useRef<THREE.Mesh>(null!);
    const coneRef4 = useRef<THREE.Mesh>(null!);

    const { camera, raycaster, scene } = useThree();
    const [point, setPoint] = useRecoilState(pointState);
    const [pEnter, setPEnter] = useState<boolean>(false);
    const [curPoint, setCurPoint] = useState<THREE.Vector3>();
    const [focus, setFocus] = useState<boolean>(false);
    const [width, setWidth] = useState<Array<number>>([]);
    const [height, setHeight] = useState<Array<number>>([]);
    const [centerZ, setCenterZ] = useState<number>(0);
    const setting = useStore((state)=>state.setTarget);
    // const { target, setTarget } = useStore()

    useEffect(() => {
        if (!geometry || !meshRef.current) return;

        const boundingBox = new THREE.Box3().setFromObject(meshRef.current);
        const center = boundingBox.getCenter(new THREE.Vector3());

        // camera.position.copy(center);
        // console.log(center);
        // camera.position.x += boundingBox.getSize(new THREE.Vector3()).length(); 
        // camera.position.z += boundingBox.getSize(new THREE.Vector3()).length(); 
        // camera.position.y += boundingBox.getSize(new THREE.Vector3()).length();
        // camera.lookAt(center);
        setCp([]);
        setWidth([boundingBox.max.x, boundingBox.min.x]);
        setHeight([boundingBox.max.y, boundingBox.min.y]);
        setCenterZ(center.z);
        setFocus(false);
    }, []);

    const handleMeshClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();

        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
        const intersects : any = raycaster.intersectObject(meshRef.current,false);
        if (intersects.length > 0){
            // console.log(intersects[0].point.toArray());
            let arr = intersects[0].point.toArray();
            arr.map((ele:number,idx:number)=>{
                arr[idx] = Math.round(ele*10)/10;
            })
            setPoint(arr);
            setCp(pre=>[...pre, arr]);
            setCurPoint(arr);
        }
    };

    // useEffect(()=>{
    //     if(!state)saveLine();
    //     console.log(cpArr);
    // },[state])
    //const vector3Array: THREE.Vector3[] = cp.map(tuple => new THREE.Vector3().fromArray(tuple));

    return( 
            <mesh 
                geometry={geometry} 
                ref={meshRef} 
                // onClick={state ? handleMeshClick : ()=>{}}
                onDoubleClick={(event)=>{
                    event.stopPropagation();
                    setting(event.object);
                    setVisible(!visible);
                    setFocus(!focus);
                }}
                onPointerOver={()=>{
                    if(focus){
                        setHoverd(true);
                    }
                    
                }}
                onPointerOut={()=>{
                    if(focus){
                        setHoverd(false);
                    }
                }}
                // onClick={(e)=>{
                //     e.stopPropagation();
                //     if(focus){
                //         setFocus(!focus);
                //     }  
                // }}
            >
                <meshStandardMaterial ref={mateRef} color={focus ? "#fcf000" : "#ffffff"}/>
                <Plane args={[14,12]} rotation-x={Math.PI/2} position={[0,7,0]}>
                    <meshStandardMaterial attach="material" transparent opacity={0.4} color={"black"} side={THREE.DoubleSide}/>
                </Plane>
                {/* <Outlines thickness={0.01}/> */}
                {state ? (cp.length > 0 ? <CatmullRomLine
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
                </mesh>:null}
                {/* {cp.map((point, index) => (
                    <points key={index} position={[point[0], point[1], point[2]]}>
                        <sphereGeometry args={[4, 16, 16]} />
                        <meshStandardMaterial color="red" />
                    </points>
                ))} */}
                {/* {focus ? 
            <>
                <Cone
                    ref={coneRef1}
                    args={[1, 2, 8]}
                    position={[width[0] + 5, (height[0]+height[1])/2, centerZ]}
                    rotation-z={-Math.PI / 2}
                    onClick={(event)=>{
                        meshRef.current.position.x += 1;
                        event.object.position.x += 1;
                        coneRef2.current.position.x += 1;
                        coneRef3.current.position.x += 1;
                        coneRef4.current.position.x += 1;
                        setWidth([event.object.position.x-5, coneRef2.current.position.x+5]);
                    }}
                >
                    <meshStandardMaterial color={"#ff0000"} />
                </Cone>
                <Cone
                    ref={coneRef2}
                    args={[1, 2, 8]}
                    position={[width[1] - 5, (height[0]+height[1])/2, centerZ]}
                    rotation-z={Math.PI / 2}
                    onClick={(event)=>{
                        meshRef.current.position.x -= 1;
                        event.object.position.x -= 1;
                        coneRef1.current.position.x -= 1;
                        coneRef3.current.position.x -= 1;
                        coneRef4.current.position.x -= 1;
                        setWidth([coneRef1.current.position.x-5, event.object.position.x+5]);
                    }}
                >
                        <meshStandardMaterial color={"#ff0000"} />
                </Cone>
                <Cone
                    ref={coneRef3}
                    args={[1, 2, 8]}
                    position={[(width[0]+width[1])/2, height[0]+5, centerZ]}
                    rotation-y={Math.PI / 2}
                    onClick={(event)=>{
                        meshRef.current.position.y += 1;
                        event.object.position.y += 1;
                        coneRef1.current.position.y += 1;
                        coneRef2.current.position.y += 1;
                        coneRef4.current.position.y += 1;
                        setHeight([event.object.position.y-5, coneRef4.current.position.y+5]);
                    }}
                >
                        <meshStandardMaterial color={"#ff0000"} />
                </Cone>
                <Cone
                    ref={coneRef4}
                    args={[1, 2, 8]}
                    position={[(width[0]+width[1])/2, height[1]-5, centerZ]}
                    rotation-z={-Math.PI}
                    onClick={(event)=>{
                        meshRef.current.position.y-= 1;
                        event.object.position.y -= 1;
                        coneRef1.current.position.y -= 1;
                        coneRef2.current.position.y -= 1;
                        coneRef3.current.position.y -= 1;
                        setHeight([coneRef3.current.position.y-5, event.object.position.y+5]);
                    }}
                >
                        <meshStandardMaterial color={"#ff0000"} />
                </Cone>
            </>
            : null} */}
            </mesh>
            
    );
};

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

const ColorBtn = styled.div`
    position:absolute;
    display:flex;
    justify-content:center;
    align-items:center;
    width: 5rem;
    height: 5rem;
    left:2rem;
    top:8rem;
    font-size:1.5rem;

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

const ColorContainer = styled.div`
    position: absolute;
    left:2rem;
    top:14rem;
`;