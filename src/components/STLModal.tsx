import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import styled from "styled-components";
import *  as THREE from "three";
import StaticAxes from "./StaticAxes";
import { useEffect, useRef, useState } from "react";
import { MeshData } from "./MeshData";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

interface geoProps{
    pos: String,
    w: number,
    h: number,
    d: number,
    position: [number, number, number],
    data: MeshData,
};

interface ModalProps{
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setDragState: React.Dispatch<React.SetStateAction<boolean>>,
    setDumyVisible: React.Dispatch<React.SetStateAction<string>>,
    dumyVisible: string,
    geometry: any,
    setPosObj: React.Dispatch<React.SetStateAction<Array<geoProps>>>,
    posObj:geoProps[],
}

function STLModal(props : ModalProps){
    const lightRef = useRef<THREE.DirectionalLight>(null!);
    const selectRef = useRef<HTMLSelectElement>(null!);

    const [posName,setPosName] = useState<string>(props.dumyVisible);
    const [wd, setW] = useState<number>(15);
    const [hd, setH] = useState<number>(18);
    const [dd, setD] = useState<number>(15);

    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);
    const [z, setZ] = useState<number>(0);

    const [marginCheck, setMarginCheck] = useState<string>("false");
    const [directionCheck, setDirectionCheck] = useState<string>("false");

    useEffect(()=>{
        selectRef.current.value = props.dumyVisible;
    },[props.dumyVisible]);

    useEffect(()=>{
        const box = new THREE.Box3().setFromBufferAttribute(props.geometry.attributes.position);
        setX(Number(box.max.x.toFixed(2)) - Number(box.min.x.toFixed(2)));
        setY(Number(box.max.y.toFixed(2)) - Number(box.min.y.toFixed(2)));
        setZ(Number(box.max.z.toFixed(2)) - Number(box.min.z.toFixed(2)));
    },[props.geometry])

    const handleUpload = ({ target }:any) => {
        const file = target.files[0]
        loading(file);
    };

    const loading = (file:File) =>{
        const loader = new STLLoader();
        console.log(file);
        // if(file){
        //     if(!file.name.includes("stl")){
        //         window.alert("잘못된 파일 형식입니다.");
        //     }
        //     else{
        //         loader.load(URL.createObjectURL(file), geo=>{
        //             setGeometry(geo);
        //         });
        //         setIsDrop(true);
        //     }
        // }
    
    };

    return(
        <ModalContainer>
            <BtnContainer>
                <p style={{fontSize:"2rem", marginLeft:10}}>STL Viewer</p>
                <CloseButton
                    onClick={()=>{
                        props.setModalOpen(false);
                    }}
                >
                    <p style={{fontSize:"2rem", cursor:"default"}}>X</p>
                </CloseButton>
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
                            <p style={{fontSize:"1.4rem"}}>W:{x}</p>
                            <p style={{fontSize:"1.4rem"}}>H:{y}</p>
                            <p style={{fontSize:"1.4rem"}}>D:{z}</p>
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
                            <OffsetInput 
                                onChange={(e)=>{
                                    setW(Number(e.target.value));
                                }}
                                value={wd}
                            />
                            <p style={{fontSize:"1.4rem"}}>H:</p>
                            <OffsetInput 
                                onChange={(e)=>{
                                    setH(Number(e.target.value));
                                }}
                                value={hd}
                            />
                            <p style={{fontSize:"1.4rem"}}>D:</p>
                            <OffsetInput 
                                onChange={(e)=>{
                                    setD(Number(e.target.value));
                                }}
                                value={dd}
                            />
                        </PartInfoContainer>
                    </PartDetailContainer>
                </PartTypeContainer>
                <PartTypeContainer>
                    <PartDetailContainer>
                        <PartSettingBox>
                                <select 
                                    ref={selectRef}
                                    name="Pos" 
                                    style={{ marginLeft:10, width: "80%"}}
                                    onChange={(e)=>{
                                        setPosName(e.target.value);
                                        props.setDumyVisible(e.target.value);
                                    }}
                                >
                                    {props.posObj.findIndex(item => item.pos === "pos1") === -1 ? <option style={{textAlignLast: "center"}} value="pos1">pos1</option>: null}
                                    {props.posObj.findIndex(item => item.pos === "pos2") === -1 ? <option style={{textAlignLast: "center"}} value="pos2">pos2</option> : null}
                                    {props.posObj.findIndex(item => item.pos === "pos3") === -1 ? <option style={{textAlignLast: "center"}} value="pos3">pos3</option>: null}
                                    {props.posObj.findIndex(item => item.pos === "pos4") === -1 ? <option style={{textAlignLast: "center"}} value="pos4">pos4</option>: null}
                                    {props.posObj.findIndex(item => item.pos === "pos5") === -1 ? <option style={{textAlignLast: "center"}} value="pos5">pos5</option>: null}
                                    {props.posObj.findIndex(item => item.pos === "pos6") === -1 ? <option style={{textAlignLast: "center"}} value="pos6">pos6</option>: null}
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
                                onChange={(e)=>{console.log(e.target)}}
                                
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
                    <ButtonContainer>
                        <Button
                            onClick={()=>{
                                props.setModalOpen(false);
                                let pArr : [number, number, number] = [0,0,0];
                                let idx = props.posObj.findIndex(item => item.pos === posName);
                                

                                if(idx === -1){
                                    
                                    if(posName === "pos6"){
                                        pArr = [8,(11-hd*0.4/2),0];
                                    }
                                    if(posName === "pos1"){
                                        pArr = [8,-(11-hd*0.4/2),0];
                                    }
                                    if(posName === "pos2"){
                                        pArr = [0,-(11-hd*0.4/2),0];
                                    }
                                    if(posName === "pos3"){
                                        pArr = [-8,-(11-hd*0.4/2),0];
                                    }
                                    if(posName === "pos4"){
                                        pArr = [-8,(11-hd*0.4/2),0];
                                    }
                                    if(posName === "pos5"){
                                        pArr = [0,(11-hd*0.4/2),0];
                                    }
                                    let mesh = new MeshData(false, false, false, 2, 4, 4,0,0,50,5,5,'',props.geometry,"","Ellipse", false, [0,0,0]);
                                    let data:geoProps= {
                                        pos: posName,
                                        w: wd,
                                        h: hd,
                                        d: dd,
                                        position: pArr,
                                        data: mesh
                                    };
                                    props.setPosObj(prev=>[...prev, data]);
                                    props.setDragState(false);
                                }        
                            }}
                        >
                            Ok
                        </Button>
                        <Button
                            onClick={()=>{
                                document.getElementById("files")?.click();
                            }}
                        >
                            ADD
                            <FileInput type="file" id="files" onChange={handleUpload} accept=".stl, .xml, .pts, .constructionInfo" multiple/>
                        </Button>
                        <Button
                            onClick={()=>{
                                props.setModalOpen(false);
                            }}
                        >
                            Cancle
                        </Button>
                    </ButtonContainer>
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

const CloseButton = styled.div`
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

const ButtonContainer = styled.div`
    width: 100%;
    height: 35%;
    display:flex;
    align-items:center;
    justify-content:space-around;
`;

const Button = styled.div`
    height: 80%;
    width: 20%;
    border-radius: 8px;
    border: solid 1px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size: 1.4rem;
    font-weight:bold;
`;

const FileInput = styled.input`
    display:none;
`;