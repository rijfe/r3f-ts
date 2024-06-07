import styled from "styled-components";

import Curves from "./Curves";
import Connectors from "./Connectors";
import Directions from "./Directions";
import { useEffect, useState } from "react";

import plusLogo from "../img/free-icon-plus-sign-3114793.png";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { BufferGeometry } from "three";
import { MeshData } from "./MeshData";
import { useRecoilValue } from "recoil";
import { getPosNum } from "../store/PosNum";
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
    let idx = posObj.findIndex(item=>item.pos===pos);
    const pn = useRecoilValue(getPosNum);
    const [arr, setArr] = useState<Array<string>>([]);
    const [ready, setReady] = useState<boolean>(false);
    
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

    useEffect(()=>{
        idx = posObj.findIndex(item=>item.pos===pos);
    },[pos]);

    const PosFileInfo = () =>{
        const [typeOpen, setTypeOpen] = useState<boolean>(false);
        const [selectOpen, setSelectOpen] = useState<boolean>(false);

        return idx === -1 ? null : posObj[idx].data.fileName != ""? (
            <PosFileInfoContainer
                onClick={(e)=>{
                    e.preventDefault();
                    setTypeOpen(false);
                    setSelectOpen(false);
                }}
                onContextMenu={(e)=>{
                    e.preventDefault();
                    setTypeOpen(true);
                }}
            >
                <PosFileImgContainer>
                    img
                </PosFileImgContainer>
                <PosFileNameContainer>
                    <h1 style={{fontSize:"1.3rem", overflow:"hidden", fontWeight:"bold"}}>{posObj[idx].data.FileName}</h1>
                </PosFileNameContainer>
                {typeOpen ? <FileTypeSelecContainer>
                    <TypeContainer>
                        <p style={{fontSize:"2rem", marginLeft:4}}>{posObj[idx].data.pos}</p>
                    </TypeContainer>
                    <DownButtonContainer
                         onClick={(e)=>{
                            e.stopPropagation();
                            setSelectOpen(!selectOpen);
                        }}
                    >
                        ▼
                    </DownButtonContainer>
                    {selectOpen ? <SelectDataContainer>
                        <ListOverflow>
                            <Datacontainer
                                onClick={(e)=>{
                                    let newArr = [...posObj];
                                    newArr[idx].data.pos = "Crown";
                                    
                                    setPosObj(newArr);
                                }} 
                            >
                                Crown
                            </Datacontainer >
                            <Datacontainer onClick={(e)=>{
                                    let newArr = [...posObj];
                                    newArr[idx].data.pos = "Coping";
                                    
                                    setPosObj(newArr);
                                }} >Coping</Datacontainer>
                            <Datacontainer>CrownBridge</Datacontainer>
                            <Datacontainer>CopingBridge</Datacontainer>
                            <Datacontainer>InlayOnlay</Datacontainer>
                            <Datacontainer>ScrpCrown</Datacontainer>
                            <Datacontainer>Veneer</Datacontainer>
                        </ListOverflow>
                        
                    </SelectDataContainer>:null}
                </FileTypeSelecContainer>:null}
            </PosFileInfoContainer>
        ):null;
    };

    const MakePart = () =>{
        for(let i=1; i<=pn; i++){
            if(!arr.includes(`pos${i}`)) setArr(pre => [...pre, `pos${i}`]);    
        }
        setReady(true);
    }

    useEffect(()=>{
        setArr([]);
        
    },[pn])
    useEffect(()=>{
        MakePart();
    },[isSettingOpen])

    return (
        <Container className={isSettingOpen ? "setting" : ""}>

            <PosContainer
                style={{height:`${(10/pn >= 2 ? 1:2) *4}%`}}
            >
                <PosBox style={{height:`${100/(10/pn >= 2 ? 1:2)}%`}}>
                    {ready ? arr.map((ele,idx)=>{
                        return (idx<5 ? <Pos 
                        key={idx} 
                        onClick={(e)=>{setPos(ele);}}
                        
                        >
                            <PosDeco 
                                className={pos === ele ? "pos" : ""}
                                style={posObj.findIndex(item => item.pos === ele)!= -1 ? {background:"#a7a7a7"}:{}}
                            >
                                {ele}
                            </PosDeco>
                        </Pos>:null);
                    }) : null}
                    
                </PosBox>
               {10/pn < 2 ?  <PosBox style={{height:`${100/2}%`}}>
                    {ready ? arr.map((ele,idx)=>{
                        return (idx>=5 ? <Pos key={idx} onClick={(e)=>{setPos(ele);}}><PosDeco style={posObj.findIndex(item => item.pos === ele)!= -1 ? {background:"#a7a7a7"}:{}} className={pos === ele ? "pos" : ""}>{ele}</PosDeco></Pos>:null);
                    }) : null}
                </PosBox>:null}
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
                            if(idx === -1) alert("소재를 먼저 선택해주세요.");
                            else {
                                document.getElementById("files")?.click();
                                
                            }
                        }}
                    />
                    <FileInput type="file" id="files" onChange={handleUpload} accept=".stl, .xml, .pts, .constructionInfo" multiple/>
                    <FileDelete
                        onClick={()=>{
                            if(idx != -1){
                               if(window.confirm("정말 삭제하시겠습니까?")){
                                    let newArr = [...posObj];
                                    newArr[idx].data.file = null;
                                    newArr[idx].data.fileName = '';
                                    newArr[idx].data.connectOn = false;
                                    newArr[idx].data.dirState = false;
                                    newArr[idx].data.dirPoint = [0,0,0];
                                    setPosObj(newArr);
                                } 
                            }
                            
                            
                        }}
                        style={idx != -1 ? posObj[idx].data.file != null ? {opacity:1}:{opacity:0.3}:{opacity:0.3}}
                    >
                        <FileDeleteIcon/>
                    </FileDelete>
                    <FileInput type="file" id="files" onChange={handleUpload} accept=".stl, .xml, .pts, .constructionInfo" multiple/>
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
            <SettingDetailContainer
                style={{height:`${10/pn >= 2 ? 50:50}%`}}
            >
                {num === 1 ? <Curves idx={idx} posObj={posObj} setPosObj={setPosObj} boffset={posObj.length > 0 && idx != -1?posObj[idx].data.offset:boffset} setBoffset={setBoffset}/> : null}
                {num === 2 ? <Directions/> : null}
                {num === 5 ? <Connectors idx={idx} posObj={posObj} setPosObj={setPosObj} setConnStart={setConnStart} type={type} setType={setType} width={width} height={height} rotation={rotation} angle={angle} distance={distance} cutting={cutting} setAngle={setAngle} setCutting={setCutting} setDistance={setDistance} setHeight={setHeight} setRotation={setRotation} setWidth={setWidth}/> : null}
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
        cursor:pointer;
    }
`;

const BlankContainer = styled.div`
    width:100%;
    height: 1%;
`;

const SettingDetailContainer = styled.div`
    width:100%;
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
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        border-bottom: 0.2rem solid #ff0000;
        cursor:pointer;
    }
    &.pos{
        border-bottom: 0.2rem solid #ff0000;
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
    position:relative;
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

const FileDelete = styled.div`
    width: 3rem;
    height:3rem;
    display:flex;
    justify-content:center;
`;

const FileDeleteIcon = styled.div`
    width: 90%;
    height:50%;
    border-bottom: solid 0.3rem black;
`;

const FileTypeSelecContainer = styled.div`
    width:70%;
    height: 100%;
    position:absolute;
    background: #ffffff;
    border:solid 1.5px;
    opacity: 0.9;
    bottom:-100%;
    display:flex;
    flex-dircetion: row;
    justify-content:space-between;
`;

const TypeContainer = styled.div`
    height: 100%;
    width:60%;
    display:flex;
    flex-dircetion: row;
    align-items: center;
    z-index:65;
`;

const DownButtonContainer = styled.div`
    height: 100%;
    width:20%;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size:1.5rem;
    &:hover{
        background: #dddddd;
    }
`;

const SelectDataContainer = styled.div`
    width: 100%;
    max-height:20rem;
    height:15rem;
    overflow-y:auto;
    position:absolute;
    background:#ffffff;
    top:100%;
    border: solid 1px;
    display:flex;
    flex-direction:column;
    align-items:center;
`;

const ListOverflow = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y:auto;
`;

const Datacontainer = styled.div`
    width:95%;
    height:3rem;
    display:flex;
    flex-direction:row;
    align-items:center;
    font-size: 1.5rem;
    margin-top:5px;
    &:hover{
        border: 3px solid #90d0f0;
        background-color: rgba(150,180, 180, .5);
    }
`;