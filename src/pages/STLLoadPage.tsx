import styled from "styled-components";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BufferGeometry } from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { Mesh, Box3, Vector3} from "three";


function STLLoadPage(){
    const meshRef = useRef<Mesh>(null!);

    const [isEnter, setIsEnter] = useState<boolean>(false);
    const [isDrop, setIsDrop] = useState<boolean>(false);

    const [fileInfo, setFileInfo] = useState<string>("");
    const [geometry, setGeometry] = useState<BufferGeometry>();

    const navigate = useNavigate();

    const handleDrop = (event : React.DragEvent) =>{
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        console.log(file);
        setFileInfo(URL.createObjectURL(file));
        loading(file);
    }

    const handleUpload = ({ target }:any) => {
        const file = target.files[0];
        console.log(file); // 코드 추가
        loading(file);
    };

    const loading = (file:File) =>{
        const loader = new STLLoader();
        loader.load(URL.createObjectURL(file), geo=>{
            setGeometry(geo);
        });
        setIsDrop(true);
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
                <Canvas camera={{position:[0,0,20]}}>
                    <directionalLight intensity={0.8} position={[0,1,0]}/>
                    <directionalLight intensity={0.8} position={[0,-1,0]}/>
                    <mesh geometry={geometry} ref={meshRef}>
                        <meshStandardMaterial/>
                    </mesh>
                    <OrbitControls/>
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