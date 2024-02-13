import styled from "styled-components";
import { useState, useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { OrbitControls, Outlines, CatmullRomLine,Loader, Environment, Line } from "@react-three/drei";
import { BufferGeometry } from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from "three";
import { pointState, getPointState } from "../store/pointState";
import { useRecoilState, useRecoilValue } from "recoil";
import { Leva, useControls } from "leva";
import {ChromePicker} from 'react-color';

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function STLLoadPage(){
    const meshRef = useRef<THREE.Mesh>(null!);

    const [isEnter, setIsEnter] = useState<boolean>(false);
    const [isDrop, setIsDrop] = useState<boolean>(false);
    const [state, setState] = useState<boolean>(false);
    const [colorState, setColorState] = useState<boolean>(false);
    const [color, setColor] = useState<string>('red');
    const [cp, setCp] = useState<THREE.Vector3Tuple[]>([]);

    const [cpArr, setCpArr] = useState<Array<any>>([]);
    //const gltf = useLoader(GLTFLoader, "../img/baseball_01_4.gltf");

    // const {scale} = useControls({
    //     scale: {value:5, min:1, max:30, step:1}
    // });

    const point = useRecoilValue(getPointState);

    const [geometry, setGeometry] = useState<BufferGeometry>();

    const navigate = useNavigate();

    const handleDrop = (event : React.DragEvent) =>{
        event.preventDefault();
        const file = event.dataTransfer.files[0];

        loading(file);
    }

    const handleUpload = ({ target }:any) => {
        const file = target.files[0];
        console.log(file); // 코드 추가
        loading(file);
    };

    const loading = (file:File) =>{
        const loader = new STLLoader();
        if(!file.name.includes("stl")){
            window.alert("잘못된 파일 형식입니다.");
        }
        else{
            loader.load(URL.createObjectURL(file), geo=>{
                setGeometry(geo);
            });
            setIsDrop(true);
        }
        
    };

    const saveLine = () => {
        setCpArr(pre => [...pre, cp]);
        console.log(cpArr);
        setCp([]);
    };
    useEffect(()=>{
        setCpArr([]);
        setCp([]);
    },[geometry]);
    return(
        <Container>
            <HeadContainer>
                <PageMoveBtn
                    onClick={()=>{
                        navigate("/falling");
                    }}
                >
                    Back
                </PageMoveBtn>
                <PageMoveBtn
                    onClick={()=>{
                        //navigate("/baseball");
                    }}
                >
                    Next
                </PageMoveBtn>
            </HeadContainer>

            <Bodycontainer >
                {isDrop ? 
                <>
                    <Canvas
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
                        <directionalLight intensity={0.5} position={[0,1,0]}/>
                        <directionalLight intensity={0.5} position={[0,-1,0]}/>
                        <directionalLight intensity={0.5} position={[1,0,0]}/>
                        <directionalLight intensity={0.5} position={[-1,0,0]}/>
                        <directionalLight intensity={0.5} position={[0,0,1]}/>
                        <directionalLight intensity={0.5} position={[0,0,-1]}/>
                        {/* <Environment preset="forest" background/> */}
                        <LoadMesh geometry={geometry} state={state} setState={setState} color={color} cp={cp} setCp={setCp} cpArr={cpArr}/>
                        <axesHelper scale={20}/>
                        <OrbitControls/>
                    </Canvas>
                    <Loader/>
                    <PointContainer>
                        {`x=${point[0]} y=${point[1]} z=${point[2]}`}
                    </PointContainer>
                    <LineBtn onClick={()=>{
                        setState(!state);
                        if(!state){
                            saveLine();
                            console.log(cpArr);
                        }
                    }}>
                        {state ? "Done" : "+"}
                    </LineBtn>
                    <ColorBtn onClick={()=>{setColorState(!colorState);}}>
                        Color
                    </ColorBtn>
                    {colorState ? <ChromePicker styles={{
                        default: {
                            picker: {
                                position: "absolute",
                                left:'2rem',
                                top:'14rem',
                            },
                            hue: {
                                // 색상 선택기(Hue)의 스타일
                                height: "10px", // 색상 선택기의 높이를 설정합니다.
                            },
                            saturation: {
                                // 채도 선택기(Saturation)의 스타일
                                width: "100%", // 채도 선택기의 너비를 설정합니다.
                                height: "100px", // 채도 선택기의 높이를 설정합니다.
                            },
                        },
                        // 필요한 경우 다른 스타일도 설정할 수 있습니다.
                    }} onChange={(color)=>{setColor(color.hex);}}/> : null}
                </>
                :<FileUploadBox 
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
                    <FileInput type="file" onChange={handleUpload}/>
                    <BoxText>클릭 혹은 파일을 드롭하세요.</BoxText>
                </FileUploadBox>}
            </Bodycontainer>
            
        </Container>
    );
}

interface loadMesh{
    geometry: any,
    state : boolean,
    setState :  React.Dispatch<React.SetStateAction<boolean>>,
    color: string,
    cp: THREE.Vector3Tuple[],
    setCp : React.Dispatch<React.SetStateAction<THREE.Vector3Tuple[]>>,
    cpArr : Array<any>
}

const LoadMesh = ({ geometry, state, setState, color, cp, setCp, cpArr} : loadMesh) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const mateRef = useRef<THREE.MeshStandardMaterial>(null!);
    const { camera, raycaster, scene } = useThree();
    const [point, setPoint] = useRecoilState(pointState);
    const [pEnter, setPEnter] = useState<boolean>(false);
    const [curPoint, setCurPoint] = useState<THREE.Vector3>();

    useEffect(() => {
        if (!geometry || !meshRef.current) return;

        const boundingBox = new THREE.Box3().setFromObject(meshRef.current);
        const center = boundingBox.getCenter(new THREE.Vector3());

        camera.position.copy(center);
        camera.position.x += boundingBox.getSize(new THREE.Vector3()).length(); 
        camera.position.z += boundingBox.getSize(new THREE.Vector3()).length(); 
        camera.position.y += boundingBox.getSize(new THREE.Vector3()).length();
        camera.lookAt(center);
        setCp([]);
    }, []);

    const handleMeshClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        let gapX = event.clientX - event.offsetX;
        let gapY = event.clientY - event.offsetY;

        const x = ((event.clientX-gapX) / window.innerWidth) * 2 - 1;
        const y = -((event.clientY-gapY) / window.innerHeight) * 2 + 1;
        // const x = ((event.clientX) / window.innerWidth) * 2 - 1;
        // const y = -((event.clientY) / window.innerHeight) * 2 + 1;
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
            onClick={handleMeshClick}
            // onPointerEnter={(event)=>{
            //     setPEnter(true);
                
            //     event.stopPropagation();
            //     let gapX = event.clientX - event.offsetX;
            //     let gapY = event.clientY - event.offsetY;

            //     const x = ((event.clientX-gapX) / window.innerWidth) * 2 - 1;
            //     const y = -((event.clientY-gapY) / window.innerHeight) * 2 + 1;
            //     // const x = ((event.clientX) / window.innerWidth) * 2 - 1;
            //     // const y = -((event.clientY) / window.innerHeight) * 2 + 1;
            //     raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

            //     const intersects : any = raycaster.intersectObject(meshRef.current);
            //     if (intersects.length > 0){
            //         let arr = intersects[0].point.toArray();
            //         // console.log(arr);
            //         setCurPoint(arr);
            //     }
            // }}
            // onPointerOut={()=>{

            //     setPEnter(false);
            //     setCurPoint(new  THREE.Vector3());
            // }}
            // onPointerMove={(event)=>{
            //     event.stopPropagation();
            //     let gapX = event.clientX - event.offsetX;
            //     let gapY = event.clientY - event.offsetY;

            //     const x = ((event.clientX-gapX) / window.innerWidth) * 2 - 1;
            //     const y = -((event.clientY-gapY) / window.innerHeight) * 2 + 1;
            //     // const x = ((event.clientX) / window.innerWidth) * 2 - 1;
            //     // const y = -((event.clientY) / window.innerHeight) * 2 + 1;
            //     raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

            //     const intersects : any = raycaster.intersectObject(meshRef.current);
            //     if (intersects.length > 0){
            //         let arr = intersects[0].point.toArray();
            //         setCurPoint(arr);
            //     }
            // }}
        >
            <meshStandardMaterial ref={mateRef}/>
            <Outlines thickness={0.01}/>
            {state ? (cp.length > 3 ? <CatmullRomLine
                points={cp}
                color={`${color}`}
                lineWidth={5}
            />:null):cpArr.length > 0 ? cpArr?.map((points:any, idx:number)=>(
                points.length > 0  ? <CatmullRomLine
                    points={points}
                    color={`${color}`}
                    lineWidth={5}
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

const HeadContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid;
`;

const PageMoveBtn = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 5rem;
    font-size:2rem;

    &:hover{
        background-color:grey;
        font-weight: 900;
    }
`;

const Bodycontainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex:1;
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
    border:1px solid;
    border-radius: 12px;
    width: 10rem;
    height: 4rem;
    right:2rem;
    top:8rem;
    font-size:1.5rem;

    &:hover{
        background-color:grey;
        font-weight: 900;
    }
`;

const ColorBtn = styled.div`
    position:absolute;
    display:flex;
    justify-content:center;
    align-items:center;
    border:1px solid;
    border-radius: 12px;
    width: 10rem;
    height: 4rem;
    left:2rem;
    top:8rem;
    font-size:1.5rem;

    &:hover{
        background-color:grey;
        font-weight: 900;
    }
`;

const FileUploadBox = styled.label`
    display: flex;
    width:60rem;
    height: 40rem;
    border: 3px dashed;
    justify-content:center;
    align-items:center;
`;

const BoxText = styled.h1`
    font-size: 3rem;
    font-weight: 900;
`;

const FileInput = styled.input`
    display:none
`;