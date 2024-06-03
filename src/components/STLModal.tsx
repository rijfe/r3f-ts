import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import styled from "styled-components";
import *  as THREE from "three";
import StaticAxes from "./StaticAxes";
import { useRef } from "react";

interface ModalProps{
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    geometry: any,
}

function STLModal(props : ModalProps){
    const lightRef = useRef<THREE.DirectionalLight>(null!);
    return(
        <ModalContainer>
            <BtnContainer>
                <p style={{fontSize:"2rem", marginLeft:10}}>STL Viewer</p>
                <Button
                    onClick={()=>{
                        props.setModalOpen(false);
                    }}
                >
                    <p style={{fontSize:"2rem",}}>X</p>
                </Button>
            </BtnContainer>
            <InfoContainer>
                <PartTypeContainer>
                    <PartDetailContainer>
                        <PartSettingBox>
                                <select name="Part" style={{ marginLeft:10, width: "80%"}}>
                                <option style={{textAlignLast: "center"}} defaultValue="Crown">Crown</option>
                                <option style={{textAlignLast: "center"}} defaultValue="Coping">Coping</option>
                                <option style={{textAlignLast: "center"}} defaultValue="CrownBridge">CrownBridge</option>
                                <option style={{textAlignLast: "center"}} defaultValue="CopingBridge">CopingBridge</option>
                                <option style={{textAlignLast: "center"}} defaultValue="InlayOnlay">InlayOnlay</option>
                                <option style={{textAlignLast: "center"}} defaultValue="ScrpCrown">ScrpCrown</option>
                                <option style={{textAlignLast: "center"}} defaultValue="Veneer">Veneer</option>
                            </select>
                        </PartSettingBox>
                        <PartInfoContainer>
                            <p style={{fontSize:"1.4rem"}}>W:{10.55}</p>
                            <p style={{fontSize:"1.4rem"}}>H:{10.55}</p>
                            <p style={{fontSize:"1.4rem"}}>D:{10.55}</p>
                        </PartInfoContainer>
                    </PartDetailContainer>
                </PartTypeContainer>
                <PartTypeContainer>
                    <PartDetailContainer>
                        <PartSettingBox>
                                <select name="Blank" style={{ marginLeft:10, width: "80%"}}>
                                <option style={{textAlignLast: "center"}} defaultValue="Blank1">Blank1</option>
                                <option style={{textAlignLast: "center"}} defaultValue="Blank2">Blank2</option>
                                <option style={{textAlignLast: "center"}} defaultValue="Blank3">Blank3</option>
                                <option style={{textAlignLast: "center"}} defaultValue="Blank4">Blank4</option>
                                <option style={{textAlignLast: "center"}} defaultValue="Blank5">Blank5</option>
                                <option style={{textAlignLast: "center"}} defaultValue="Blank6">Blank6</option>
                                <option style={{textAlignLast: "center"}} defaultValue="Blank7">Blank7</option>
                            </select>
                        </PartSettingBox>
                        <PartInfoContainer>
                            <p style={{fontSize:"1.4rem"}}>W:</p>
                            <OffsetInput/>
                            <p style={{fontSize:"1.4rem"}}>H:</p>
                            <OffsetInput/>
                            <p style={{fontSize:"1.4rem"}}>D:</p>
                            <OffsetInput/>
                        </PartInfoContainer>
                    </PartDetailContainer>
                </PartTypeContainer>
                <PartTypeContainer>
                    <PartDetailContainer>
                        <PartSettingBox>
                                <select 
                                    name="Pos" style={{ marginLeft:10, width: "80%"}}
                                    onChange={(e)=>{
                                        console.log(e.target.value);
                                    }}
                                >
                                    <option style={{textAlignLast: "center"}} defaultValue="pos1">pos1</option>
                                    <option style={{textAlignLast: "center"}} defaultValue="pos2">pos2</option>
                                    <option style={{textAlignLast: "center"}} defaultValue="pos3">pos3</option>
                                    <option style={{textAlignLast: "center"}} defaultValue="pos4">pos4</option>
                                    <option style={{textAlignLast: "center"}} defaultValue="pos5">pos5</option>
                                    <option style={{textAlignLast: "center"}} defaultValue="pos6">pos6</option>
                                </select>
                        </PartSettingBox>
                    </PartDetailContainer>
                </PartTypeContainer>
                <MeshContainer>
                    <Canvas
                        orthographic
                        camera={{
                            left:-800,
                            right: 800,
                            top:800,
                            bottom: 800,
                            zoom:8,
                            near:-800,
                            far:200,
                        }}
                    >
                        <directionalLight ref={lightRef}/>
                        <Geometry geo={props.geometry} lightRef={lightRef}/>
                        <StaticAxes/>
                        <OrbitControls dampingFactor={0.3} rotateSpeed={0.8} panSpeed={0.8} maxZoom={50} minZoom={6} mouseButtons={{RIGHT: THREE.MOUSE.ROTATE, MIDDLE:THREE.MOUSE.PAN}}/>
                    </Canvas>
                </MeshContainer>
                <MeshInfoContainer>
                    <MeshInfoTitleContainer>
                        <p style={{marginLeft:10, fontSize:"1.4rem", fontWeight:"bold"}}>정보파일 포함 여부</p>
                    </MeshInfoTitleContainer>
                    <CheckBoxContainer>
                        <label
                            style={{display:"flex", alignItems:"center", fontSize:"1.4rem", marginLeft:10}}
                        >
                            <input
                                type="checkbox"
                            />
                            Margin
                        </label>
                        <label
                            style={{display:"flex", alignItems:"center", fontSize:"1.4rem", marginLeft:10}}
                        >
                            <input
                                type="checkbox"
                            />
                            Direction
                        </label>
                    </CheckBoxContainer>
                    <MessageContainer>
                        <p style={{marginLeft:10, fontSize:"1.4rem", fontWeight:"bold"}}>이대로 진행하시겠습니까?</p>
                    </MessageContainer>
                </MeshInfoContainer>
            </InfoContainer>
        </ModalContainer>
    );
}

const Geometry = ({geo, lightRef}:any) =>{
    const {camera} = useThree();
    useFrame(()=>{
        if(lightRef.current){
            lightRef.current.position.lerp(camera.position, 0.1);
        }
    });
    
    return(
        <mesh geometry={geo}>
            <meshStandardMaterial />
        </mesh>
    );
}

export default STLModal;

const ModalContainer = styled.div`
    width: 30rem;
    height: 40rem;
    border: solid 1px black;
    display:flex;
    position: absolute;
    top: 12rem;
    right: 10rem;
    z-index: 65;
    flex-direction: column;
    background: #ffffff
`;

const BtnContainer = styled.div`
    width:100%;
    height:10%;
    background: #a7a7a7;
    display:flex;
    justify-content: space-between;
    align-items:center;
`;

const Button = styled.div`
    height: 100%;
    width: 10%;
    display: flex;
    justify-content: center;
    align-items:center;
`; 

const InfoContainer = styled.div`
    height:90%;
    width:100%;
`;

const PartTypeContainer = styled.div`
    width: 100%;
    height: 8%;
    
`;

const PartDetailContainer = styled.div`
    height: 70%;
    width: 100%;
    display:flex;
    flex-direction: row;
    
`;
const PartSettingBox = styled.div`
    width:40%;
    height:100%;
    display:flex;
    align-items:center;
`;

const PartInfoContainer = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

const OffsetInput = styled.input`
    width: 20%;
    border-top:none;
    border-left:none;
    border-right:none;
    border-bottom:1px solid;
    background-color:#ffffff;
    text-align:center;
 `;

 const MeshContainer = styled.div`
    width: 100%;
    height: 45%;
 `;

 const MeshInfoContainer = styled.div`
    width: 100%;
    height: 31%;
`;

const MeshInfoTitleContainer = styled.div`
    width: 100%;
    height: 20%;
    display:flex;
    align-items: center;
`;

const CheckBoxContainer = styled.div`
    width: 100%;
    height: 20%;
    display:flex;
    align-items: center;
`;

const MessageContainer = styled.div`
    width: 100%;
    height: 25%;
    display:flex;
    align-items: center;
`;