import styled from "styled-components";
import { useState, useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { OrbitControls, Outlines, CatmullRomLine,Loader, Environment } from "@react-three/drei";
import { BufferGeometry } from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from "three";
import { pointState, getPointState } from "../store/pointState";
import { useRecoilState, useRecoilValue } from "recoil";
import { Leva, useControls } from "leva";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function STLLoadPage(){
    const meshRef = useRef<THREE.Mesh>(null!);

    const [isEnter, setIsEnter] = useState<boolean>(false);
    const [isDrop, setIsDrop] = useState<boolean>(false);
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
                {`x=${point[0]} y=${point[1]} z=${point[2]}`}
                <PageMoveBtn
                    onClick={()=>{
                        //navigate("/baseball");
                    }}
                >
                    Next
                </PageMoveBtn>
            </HeadContainer>

            <Bodycontainer>
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
                        <LoadMesh geometry={geometry}/>
                        <axesHelper scale={20}/>
                        <OrbitControls/>
                    </Canvas>
                    <Loader/>
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

const LoadMesh = ({ geometry } : any) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const mateRef = useRef<THREE.MeshStandardMaterial>(null!);
    const { camera, raycaster, scene } = useThree();
    const [point, setPoint] = useRecoilState(pointState);
    const [cp, setCp] = useState<THREE.Vector3Tuple[]>([]);

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
    }, [geometry]);

    const handleMeshClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        let gapX = event.clientX - event.offsetX;
        let gapY = event.clientY - event.offsetY;

        console.log(event.screenX, event.screenY);

        const x = ((event.clientX-gapX) / window.innerWidth) * 2 - 1;
        const y = -((event.clientY-gapY) / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

        const intersects : any = raycaster.intersectObject(meshRef.current);
        if (intersects.length > 0){
            console.log(intersects[0].point.toArray());
            let arr = intersects[0].point.toArray();
            setPoint(arr);
            setCp(pre=>[...pre, arr]);
        }
    };
    //const vector3Array: THREE.Vector3[] = cp.map(tuple => new THREE.Vector3().fromArray(tuple));
    return( 

        <mesh 
            geometry={geometry} 
            ref={meshRef} 
            onClick={handleMeshClick} 
        >
            <meshStandardMaterial ref={mateRef}/>
            <Outlines thickness={0.01}/>
            {cp.length > 3 ?<CatmullRomLine
                points={cp}
                color="red"
                lineWidth={3}
            />:null}
            {/* {cp.map((point, index) => (
                <points key={index} position={[point[0], point[1], point[2]]}>
                    <sphereGeometry args={[4, 16, 16]} />
                    <meshStandardMaterial color="red" />
                </points>
            ))} */}
            {/* <CurveLine points={vector3Array}/> */}
        </mesh> 

        
    );
};

// function CurveLine({ points }: { points: THREE.Vector3[] }) {
//     if (points.length < 2) return null;

//     const curve = new THREE.CatmullRomCurve3(points);
//     const tubeGeometry:any = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial( {
//         color: 0x0000ff,
//         opacity: 0.35
//     } ));
    
//     return (
//         <mesh geometry={tubeGeometry}>
//             <meshPhongMaterial color="red" />
//         </mesh>
//     );
// }

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
`;

const PageMoveBtn = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 5rem;
    border: 1px solid;
    font-size:2rem;

    &:hover{
        border-color:red;
        font-weight: 900;
    }
`;

const Bodycontainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex:1;
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