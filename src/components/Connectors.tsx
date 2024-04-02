import { useState } from "react";
import styled from "styled-components";

function Connectors(){
    const [type, setType] = useState<String>("");

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
                        <ValueInput type="number" />
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
                    <select style={{width:"70%"}} name="connector" onChange={(e)=>{setType(e.target.value);}}>
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
                    <input type="radio" id="check-Manual" checked name="check" value="Manual"/>
                    <label htmlFor="check-Manual">Manual</label> 
                    <input type="radio" id="check-auto" name="check" value="Auto"/>
                    <label htmlFor="check-auto">Auto</label>
                </TypeSelectContainer>
            </BlankContainer>
            <BlankContainer/>
            <DetailSettingContainer>
                {type === "Circle" ? <CircleType/> :<><DetailSettingBox>
                    <DetailTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Width</h2>
                    </DetailTitleBox>
                    <DetailValueBox>
                        <ValueInput type="number"/>
                    </DetailValueBox>
                </DetailSettingBox>
                <DetailSettingBox>
                    <DetailTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Height</h2>
                    </DetailTitleBox>
                    <DetailValueBox>
                        <ValueInput type="number"/>
                    </DetailValueBox>
                </DetailSettingBox>
                <DetailSettingBox>
                    <DetailTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Slope Angle</h2>
                    </DetailTitleBox>
                    <DetailValueBox>
                        <ValueInput type="number"/>
                    </DetailValueBox>
                </DetailSettingBox>
                <DetailSettingBox>
                    <DetailTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Rotation</h2>
                    </DetailTitleBox>
                    <DetailValueBox>
                        <ValueInput type="number"/>
                    </DetailValueBox>
                </DetailSettingBox>
                <DetailSettingBox>
                    <DetailTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Distance(mm)</h2>
                    </DetailTitleBox>
                    <DetailValueBox>
                        <ValueInput type="number"/>
                    </DetailValueBox>
                </DetailSettingBox>
                <DetailSettingBox>
                    <DetailTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Cutting(%)</h2>
                    </DetailTitleBox>
                    <DetailValueBox>
                        <ValueInput type="number"/>
                    </DetailValueBox>
                </DetailSettingBox></>}
            </DetailSettingContainer>
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
`;

const BlankContainer = styled.div`
    width:100%;
    height: 3%;
    display: flex;
    flex-direction: row;
`;

const TitleContainer = styled.div`
    width: 100%;
    height: 8%;
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
    height:15%;
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