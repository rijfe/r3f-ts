import styled from "styled-components";

import Curves from "./Curves";
import Connectors from "./Connectors";
import Directions from "./Directions";
import { useState } from "react";

import plusLogo from "../img/free-icon-plus-sign-3114793.png";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { BufferGeometry } from "three";
import { MeshData } from "./MeshData";
interface geoProps{
    pos: String,
    w: number,
    h: number,
    d: number,
    position: [number, number, number],
    data: MeshData
};
interface SettingProps {
    isSettingOpen : boolean,
    boffset: number,
    setBoffset: React.Dispatch<React.SetStateAction<number>>,
    width: number,
    height : number,
    angle : number,
    rotation : number,
    distance: number,
    cutting : number,
    type: String,
    pos: String,
    setPosObj: React.Dispatch<React.SetStateAction<Array<geoProps>>>,
    posObj:geoProps[],
    setWidth: React.Dispatch<React.SetStateAction<number>>,
    setHeight: React.Dispatch<React.SetStateAction<number>>,
    setAngle: React.Dispatch<React.SetStateAction<number>>,
    setRotation: React.Dispatch<React.SetStateAction<number>>,
    setDistance: React.Dispatch<React.SetStateAction<number>>,
    setCutting: React.Dispatch<React.SetStateAction<number>>,
    setType: React.Dispatch<React.SetStateAction<String>>,
    setPos: React.Dispatch<React.SetStateAction<String>>,
    num: number,
    setNum: React.Dispatch<React.SetStateAction<number>>,
    setConnStart: React.Dispatch<React.SetStateAction<boolean>>,
    
}

function SettingBox({isSettingOpen, type,posObj, setPosObj, pos,setPos, setConnStart,setType, boffset, setBoffset, width, height, angle, distance, cutting,rotation, setAngle, setDistance, setCutting, setHeight, setRotation, setWidth, num, setNum} : SettingProps){


    const handleUpload = ({ target }:any) => {
        const file = target.files[0]
        console.log(target.files);
        loading(file);
    };

    const loading = (file:File) =>{
        const loader = new STLLoader();
        console.log(file);
        if(file){
            if(!file.name.includes("stl")){
                window.alert("잘못된 파일 형식입니다.");
            }
            else{
                let idx = posObj.findIndex(item=>item.pos===pos);
                if(idx != -1){
                    let newArr = [...posObj];
                    
                    loader.load(URL.createObjectURL(file), geo=>{
                        newArr[idx].data.file = geo;
                        newArr[idx].data.fileName = file.name;
                        setPosObj(newArr);
                    });
                }
                
            }
        }
        
    };

    const PosFileInfo = () =>{
        let idx = posObj.findIndex(item=>item.pos===pos);
        
        return idx === -1 ? null : (
            <PosFileInfoContainer>
                <PosFileImgContainer>
                    img
                </PosFileImgContainer>
                <PosFileNameContainer>
                    <h1 style={{fontSize:"1.3rem", overflow:"hidden", fontWeight:"bold"}}>{posObj[idx].data.FileName}</h1>
                </PosFileNameContainer>
            </PosFileInfoContainer>
        );
    };

    return (
        <Container className={isSettingOpen ? "setting" : ""}>

            <PosContainer>
                <PosBox style={{height:`${100/2}%`}}>
                    <Pos onClick={(e)=>{setPos("pos1");}}><PosDeco className={pos === "pos1" ? "pos" : ""}>pos1</PosDeco></Pos>
                    <Pos onClick={(e)=>{setPos("pos2");}}><PosDeco className={pos === "pos2" ? "pos" : ""}>pos2</PosDeco></Pos>
                    <Pos onClick={(e)=>{setPos("pos3");}}><PosDeco className={pos === "pos3" ? "pos" : ""}>pos3</PosDeco></Pos>
                    <Pos onClick={(e)=>{setPos("pos4");}}><PosDeco className={pos === "pos4" ? "pos" : ""}>pos4</PosDeco></Pos>
                    <Pos onClick={(e)=>{setPos("pos5");}}><PosDeco className={pos === "pos5" ? "pos" : ""}>pos5</PosDeco></Pos>
                </PosBox>
                <PosBox style={{height:`${100/2}%`}}>
                    <Pos onClick={(e)=>{setPos("pos6");}}><PosDeco className={pos === "pos6" ? "pos" : ""}>pos6</PosDeco></Pos>
                </PosBox>
            </PosContainer>
            <BlankContainer/>
            <FileContainer>
                <FileInfo>
                    <BlankContainer/>
                    <BlankContainer/>
                    <BlankContainer/>
                    <PosFileInfo/>
                </FileInfo>
                <BtnContainer>
                    <img 
                        src={plusLogo}
                        style={{width:"3rem", height:"3rem"}}
                        onClick={()=>{
                            document.getElementById("files")?.click();
                        }}
                    />
                    <FileInput type="file" id="files" onChange={handleUpload}/>
                </BtnContainer>
                
            </FileContainer>
            <BlankContainer/>
            <SettingPartContainer>
                <PartBox onClick={()=>{setNum(1);}}>1</PartBox>
                <PartBox onClick={()=>{setNum(2);}}>2</PartBox>
                <PartBox onClick={()=>{setNum(3);}}>3</PartBox>
                <PartBox onClick={()=>{setNum(4);}}>4</PartBox>
                <PartBox onClick={()=>{setNum(5);}}>5</PartBox>
            </SettingPartContainer>
            <BlankContainer/>
            <SettingDetailContainer>
                {num === 1 ? <Curves boffset={boffset} setBoffset={setBoffset}/> : null}
                {num === 2 ? <Directions/> : null}
                {num === 5 ? <Connectors setConnStart={setConnStart} type={type} setType={setType} width={width} height={height} rotation={rotation} angle={angle} distance={distance} cutting={cutting} setAngle={setAngle} setCutting={setCutting} setDistance={setDistance} setHeight={setHeight} setRotation={setRotation} setWidth={setWidth}/> : null}
            </SettingDetailContainer>
        </Container>
    );
}

export default SettingBox;

const Container = styled.div`
    height: 100%;
    width: 35rem;
    position: fixed;
    left: -50%;
    transition: 0.5s ease;
    z-index:50;
    &.setting{
        left: 8rem;
        transition: 0.5s ease;
        z-index:50;
    }
`

const PosContainer = styled.div`
    width:  100%;
    height: 8%;
    background: #D8D8D8;
`;

const FileContainer = styled.div`
    width:  100%;
    height:30%;
    background: #D8D8D8;
`;

const SettingPartContainer = styled.div`
    width:100%;
    height: 5%;
    background: #D8D8D8;
    display: flex;
    flex-dircetion: row;
`;

const PartBox = styled.div`
    width: 15%;
    height: 98%;
    margin-left: 1rem;
    display: flex;
    justify-content: center;
    align-items:center;
    &:hover{
        background-color:#8D8D8D;
    }
`;

const BlankContainer = styled.div`
    width:100%;
    height: 1%;
`;

const SettingDetailContainer = styled.div`
    width:100%;
    height: 50%;
    background: #D8D8D8;
`;

const PosBox = styled.div`
    width:100%;
    display:flex;
    flex-direction: row;
`;

const Pos = styled.div`
    width:20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:1.5rem;
`;

const PosDeco = styled.div`
    width:85%;
    height: 85%;
    background: #a7a7a7;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        border-bottom: 0.2rem solid #ff0000;
    }
    &.pos{
        border: 0.2rem solid #ff0000;
    }
`; 

const FileInfo = styled.div`
    width:100%;
    height: 80%;
    display:flex;
    flex-direction:column;
    align-items:center;
`;

const BtnContainer = styled.div`
    width:100%;
    height: 20%;
    display:flex;
    flex-direction: row;
    justify-content: end;
    align-items: end;    
`;

const FileInput = styled.input`
    display:none;
`;

const PosFileInfoContainer = styled.div`
    width: 95%;
    height: 20%;
    border: 0.2rem solid #ff0000;
    display:flex;
    flex-direction:row;
`;

const PosFileImgContainer = styled.div`
    width:20%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items: center;
`;

const PosFileNameContainer = styled.div`
    width:80%;
    height:100%;
    display:flex;
    justify-content:start;
    align-items: center;
`;