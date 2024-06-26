import { useState } from "react";
import styled from "styled-components";
import Addlogo from "../img/free-icon-play-button-arrowhead-27223.png";
import Stoplogo from "../img/free-icon-stop-button-7513168.png";
import DelLogo from "../img/free-icon-x-657059.png";
import { MeshData } from "./MeshData";

interface geoProps{
    pos: String,
    w: number,
    h: number,
    d: number,
    position: [number, number, number],
    data: MeshData
};

interface ConnectorsProps{
    width: number,
    height : number,
    angle : number,
    rotation : number,
    distance: number,
    cutting : number,
    type: String,
    setWidth: React.Dispatch<React.SetStateAction<number>>,
    setHeight: React.Dispatch<React.SetStateAction<number>>,
    setAngle: React.Dispatch<React.SetStateAction<number>>,
    setRotation: React.Dispatch<React.SetStateAction<number>>,
    setDistance: React.Dispatch<React.SetStateAction<number>>,
    setCutting: React.Dispatch<React.SetStateAction<number>>,
    setType: React.Dispatch<React.SetStateAction<String>>,
    setConnStart: React.Dispatch<React.SetStateAction<boolean>>,
    setPosObj: React.Dispatch<React.SetStateAction<Array<geoProps>>>,
    posObj:geoProps[],
    idx:number
}

function Connectors(props : ConnectorsProps){
    const [checkedValue, setCheckedValue] = useState<String>("Manual");
    const [checked, setChecked] = useState<String>("Manual");

    const CircleType = () => {
        return(
        <><DetailSettingBox>
                <DetailTitleBox>
                    <h2 style={{ fontWeight: 500, fontSize: "1.5rem" }}>Diameter</h2>
                </DetailTitleBox>
                <DetailValueBox>
                    <ValueInput type="number" />
                </DetailValueBox>
            </DetailSettingBox><DetailSettingBox>
                    <DetailTitleBox>
                        <h2 style={{ fontWeight: 500, fontSize: "1.5rem" }}>Slope Angle</h2>
                    </DetailTitleBox>
                    <DetailValueBox>
                        <ValueInput 
                            type="number"
                        />
                    </DetailValueBox>
                </DetailSettingBox><DetailSettingBox>
                    <DetailTitleBox>
                        <h2 style={{ fontWeight: 500, fontSize: "1.5rem" }}>Rotation</h2>
                    </DetailTitleBox>
                    <DetailValueBox>
                        <ValueInput type="number" />
                    </DetailValueBox>
                </DetailSettingBox><DetailSettingBox>
                    <DetailTitleBox>
                        <h2 style={{ fontWeight: 500, fontSize: "1.5rem" }}>Distance(mm)</h2>
                    </DetailTitleBox>
                    <DetailValueBox>
                        <ValueInput type="number" />
                    </DetailValueBox>
                </DetailSettingBox><DetailSettingBox>
                    <DetailTitleBox>
                        <h2 style={{ fontWeight: 500, fontSize: "1.5rem" }}>Cutting(%)</h2>
                    </DetailTitleBox>
                    <DetailValueBox>
                        <ValueInput type="number" />
                    </DetailValueBox>
                </DetailSettingBox></>
        );
    }

    return(
        <ConnectorsContainer>
            <TitleContainer>
                <TitleBox>
                    <h2 style={{fontWeight:900, fontSize:"1.5rem"}}>Connectors</h2>
                </TitleBox>
            </TitleContainer>
            <TypeContainer>
                <TypeTextContainer>
                    <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Type</h2>
                </TypeTextContainer>
                <TypeSelectContainer>
                    <select style={{width:"70%"}} name="connector" 
                        onChange={(e)=>{
                            if(!props.posObj[props.idx].data.caculating){
                                let newArr = [...props.posObj];
                                newArr[props.idx].data.type = e.target.value;
                                props.setPosObj(newArr);
                                props.setType(e.target.value);
                            }
                            
                        }}
                    >
                        <option value="Ellipse">Ellipse</option>
                        <option value="Rectangle">Rectangle</option>
                        <option value="Circle">Circle</option>
                    </select>
                </TypeSelectContainer>
            </TypeContainer>
            <BlankContainer>
                <TypeTextContainer>
                </TypeTextContainer>
                <TypeSelectContainer>
                    <input type="radio" id="check-Manual" defaultChecked={checked === "Manual"} name="check" defaultValue="Manual" onChange={(e)=>{setChecked(e.target.value); setCheckedValue(e.target.value);}}/>
                    <label htmlFor="check-Manual">Manual</label> 
                    <input type="radio" id="check-auto" name="check" defaultChecked={checked === "Auto"} defaultValue="Auto" onChange={(e)=>{setChecked(e.target.value); setCheckedValue(e.target.value);}}/>
                    <label htmlFor="check-auto">Auto</label>
                </TypeSelectContainer>
            </BlankContainer>
            <BlankContainer/>
            <DetailSettingContainer>
                {props.type === "Circle" ? <CircleType/> :<><DetailSettingBox>
                    <DetailTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Width</h2>
                    </DetailTitleBox>
                    <DetailValueBox>
                        <ValueInput 
                            type="number"
                            onChange={(e)=>{
                                if(!props.posObj[props.idx].data.caculating){
                                    let newArr = [...props.posObj];
                                    newArr[props.idx].data.conWid =Number(e.target.value);
                                    props.setPosObj(newArr);
                                    props.setWidth(Number(e.target.value));
                                }
                                
                            }}
                            value={props.posObj.length < 1 ? 2 :props.posObj[props.idx].data.conWid}
                        />
                    </DetailValueBox>
                </DetailSettingBox>
                <DetailSettingBox>
                    <DetailTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Height</h2>
                    </DetailTitleBox>
                    <DetailValueBox>
                        <ValueInput 
                            type="number"
                            onChange={(e)=>{
                                if(!props.posObj[props.idx].data.caculating){
                                    let newArr = [...props.posObj];
                                    newArr[props.idx].data.conHei =Number(e.target.value);
                                    props.setPosObj(newArr);
                                    props.setHeight(Number(e.target.value));
                                }
                                
                            }}
                            value={props.posObj.length < 1 ? 4 :props.posObj[props.idx].data.conHei}
                        />
                    </DetailValueBox>
                </DetailSettingBox>
                <DetailSettingBox>
                    <DetailTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Slope Angle</h2>
                    </DetailTitleBox>
                    <DetailValueBox>
                        <ValueInput 
                            type="number"
                            onChange={(e)=>{
                                if(!props.posObj[props.idx].data.caculating){
                                    let newArr = [...props.posObj];
                                    newArr[props.idx].data.conAngle =Number(e.target.value);
                                    props.setPosObj(newArr);
                                    props.setAngle(Number(e.target.value));
                                }
                            
                            }}
                            value={props.posObj.length < 1 ? 4 :props.posObj[props.idx].data.conAngle}
                        />
                    </DetailValueBox>
                </DetailSettingBox>
                <DetailSettingBox>
                    <DetailTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Rotation</h2>
                    </DetailTitleBox>
                    <DetailValueBox>
                        <ValueInput 
                            type="number"
                            onChange={(e)=>{
                                if(!props.posObj[props.idx].data.caculating){
                                    let newArr = [...props.posObj];
                                    newArr[props.idx].data.conRotation =Number(e.target.value);
                                    props.setPosObj(newArr);
                                    props.setRotation(Number(e.target.value));
                                }
                                
                            }}
                            value={props.posObj.length < 1 ? 0 :props.posObj[props.idx].data.conRotation}
                        />
                    </DetailValueBox>
                </DetailSettingBox>
                <DetailSettingBox>
                    <DetailTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Distance(mm)</h2>
                    </DetailTitleBox>
                    <DetailValueBox>
                        <ValueInput 
                            type="number"
                            onChange={(e)=>{
                                if(!props.posObj[props.idx].data.caculating){
                                    let newArr = [...props.posObj];
                                    newArr[props.idx].data.conDis =Number(e.target.value);
                                    props.setPosObj(newArr);
                                    props.setDistance(Number(e.target.value));
                                }
                                
                            }}
                            value={props.posObj.length < 1 ? 0 :props.posObj[props.idx].data.conDis}
                        />
                    </DetailValueBox>
                </DetailSettingBox>
                <DetailSettingBox>
                    <DetailTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Cutting(%)</h2>
                    </DetailTitleBox>
                    <DetailValueBox>
                        <ValueInput 
                            type="number"
                            onChange={(e)=>{
                                if(!props.posObj[props.idx].data.caculating){
                                    let newArr = [...props.posObj];
                                    newArr[props.idx].data.conCut =Number(e.target.value);
                                    props.setPosObj(newArr);
                                    props.setCutting(Number(e.target.value));
                                }
                                
                            }}
                            value={props.posObj.length < 1 ? 50 :props.posObj[props.idx].data.conCut}
                        />
                    </DetailValueBox>
                </DetailSettingBox>
                {checkedValue === "Auto" ? 
                    <><DetailSettingBox>
                        <DetailTitleBox>
                            <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Min Distance</h2>
                        </DetailTitleBox>
                        <DetailValueBox>
                            <ValueInput 
                                type="number"
                                // onChange={(e)=>{
                                //     props.setDistance(Number(e.target.value))
                                // }}
                                // value={props.distance}
                            />
                        </DetailValueBox>
                    </DetailSettingBox>
                    <DetailSettingBox>
                        <DetailTitleBox>
                            <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Max Distance</h2>
                        </DetailTitleBox>
                        <DetailValueBox>
                            <ValueInput 
                                type="number"
                                // onChange={(e)=>{
                                //     props.setDistance(Number(e.target.value))
                                // }}
                                // value={props.distance}
                            />
                        </DetailValueBox>
                    </DetailSettingBox></>
                : null}
                </>}
            </DetailSettingContainer>
            <BtnContainer>
                <BtnBox>
                    <BtnArea>
                        <img
                            src={Addlogo} 
                            style={{width: "2rem", height:"2rem"}}
                            onClick={()=>{
                                
                                if(props.posObj[props.idx].data.file == null && props.posObj[props.idx].data.caculating) return;
                                let newArr = [...props.posObj];

                                newArr[props.idx].data.conStart = true;
                                props.setPosObj(newArr);
                                props.setConnStart(true);
                            }}
                        />
                        <img 
                            onClick={()=>{
                                let newArr = [...props.posObj];

                                newArr[props.idx].data.conStart = false;
                                props.setPosObj(newArr);
                                props.setConnStart(false);
                            }}
                            src={Stoplogo} 
                            style={{width: "3rem", height:"3rem"}}
                        />
                        <img
                        onClick={()=>{
                            let newArr = [...props.posObj];

                            newArr[props.idx].data.connectOn = false;
                            props.setPosObj(newArr);
                            
                        }} 
                            src={DelLogo} 
                            style={{width: "2rem", height:"2rem"}}
                        />
                    </BtnArea>
                </BtnBox>
            </BtnContainer>
        </ConnectorsContainer>
    );
}

export default Connectors;

const ConnectorsContainer = styled.div`
    width:100%;
    height: 100%;
    display:flex;
    align-items:center;
    flex-direction:column;
    overflow-y:auto;
`;

const BlankContainer = styled.div`
    width:100%;
    height: 3%;
    display: flex;
    flex-direction: row;
    align-items:center;
`;

const TitleContainer = styled.div`
    width: 100%;
    height: 15%;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const TitleBox = styled.div`
    width: 95%;
    height: 50%;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#8D8D8D;
    border-radius:2px;
`;

const TypeContainer = styled.div`
    width:95%;
    height: 5%;
    display: flex;
    flex-direction: row;
`;

const TypeTextContainer = styled.div`
    width: 40%;
    height: 100%;
    display:flex;
    align-items:center;
`;

const TypeSelectContainer = styled.div`
    width:60%;
    height: 100%;
    display:flex;
    align-items:center;
`;

const DetailSettingContainer = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    align-items:center;
    flex-direction:column;
`;

const DetailSettingBox = styled.div`
    width:95%;
    height:13%;
    display:flex;
    flex-direction: row;
    align-items:center;
`;

const DetailTitleBox = styled.div`
    width: 40%;
    height:100%;
    display:center;
    align-items: center;
`;

const DetailValueBox = styled.div`
    width: 60%;
    height:100%;
    display:center;
    align-items: center;
`;

const ValueInput = styled.input`
    width: 70%;
    border-top:none;
    border-left:none;
    border-right:none;
    border-bottom:1px solid;
    background-color:#D8D8D8;
    text-align:center;
 `;

 const BtnContainer = styled.div`
    width: 100%;
    height:24%;
    display:flex;
    align-items:end;
 `;

 const BtnBox = styled.div`
    width: 100%;
    height: 40%;
    display:flex;
    justify-content: end;
 `;

 const BtnArea = styled.div`
    height: 100%;
    width: 40%;
    display:flex;
    justify-content:space-around;
    align-items:center;
 `;