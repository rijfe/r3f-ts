import styled from "styled-components";
import { useState, useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BufferGeometry } from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from "three";

function STLLoadPage(){
    const meshRef = useRef<THREE.Mesh>(null!);

    const [isEnter, setIsEnter] = useState<boolean>(false);
    const [isDrop, setIsDrop] = useState<boolean>(false);

    const [geometry, setGeometry] = useState<BufferGeometry>();

    const navigate = useNavigate();

    const handleDrop = (event : React.DragEvent) =>{
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        console.log(file);

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
    // const {camera} = useThree();
    // const boundingBox = new Box3().setFromObject(meshRef.current);
    // const center = boundingBox.getCenter(new Vector3());

    // camera.position.copy(center);
    // camera.position.z += boundingBox.getSize(new Vector3()).length(); 
    // camera.position.y += boundingBox.getSize(new Vector3()).length();
    // camera.lookAt(center);
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
                        // navigate("/load");
                    }}
                >
                    Next
                </PageMoveBtn>
            </HeadContainer>

            <Bodycontainer>
                {isDrop ? 
                <Canvas camera={{position:[0,0,20]}}
                    onDragEnter={(event)=>{
                        event.preventDefault();
                    }}
                    onDragLeave={(event)=>{
                        event.preventDefault();
                    }}
                    onDragOver={(event)=>{
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
                    <OrbitControls/>
                    <LoadMesh geometry={geometry}/>
                </Canvas>
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
                    <BoxText>클릭 혹은 파일 드롭하세요.</BoxText>
                </FileUploadBox>}
            </Bodycontainer>
            
        </Container>
    );
}

const LoadMesh = ({ geometry } : any) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const { camera, raycaster } = useThree();

    useEffect(() => {
        if (!geometry || !meshRef.current) return;

        const boundingBox = new THREE.Box3().setFromObject(meshRef.current);
        const center = boundingBox.getCenter(new THREE.Vector3());

        camera.position.copy(center);
        camera.position.z += boundingBox.getSize(new THREE.Vector3()).length(); 
        camera.position.y += boundingBox.getSize(new THREE.Vector3()).length();
        camera.lookAt(center);
    }, [geometry]);

    const handleMeshClick = (event: ThreeEvent<MouseEvent>) => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1; // 올바른 y 좌표 계산

        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

        const intersects = raycaster.intersectObject(meshRef.current);
        if (intersects.length > 0) console.log(intersects[0].point);
    };

    return( 
        <mesh geometry={geometry} ref={meshRef}onClick={handleMeshClick}>
            <meshStandardMaterial/>
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