import styled from "styled-components";

interface CurvesProps{
    boffset: number,
    setBoffset: React.Dispatch<React.SetStateAction<number>>,
}

function Curves({boffset, setBoffset}:CurvesProps){
    return(
        <CurvesContainer>
            <TitleContainer>
                 <TitleBox>
                    <h2 style={{fontWeight:900, fontSize:"1.5rem"}}>Curves</h2>
                </TitleBox>
            </TitleContainer>
            <CurveSetContainer>
                <SetDetailContainer>
                    <DetailTitleBox><h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Tooth Num</h2></DetailTitleBox>
                    <DetailSettingBox>This More Detail</DetailSettingBox>
                </SetDetailContainer>
                <SetDetailContainer>
                    <DetailTitleBox><h2 style={{fontWeight:500, fontSize:"1.5rem"}}>Curve Type</h2></DetailTitleBox>
                    <DetailSettingBox>
                        <select name="curve">
                            <option style={{textAlignLast: "center"}} defaultValue="Margin">Margin</option>
                            <option style={{textAlignLast: "center"}} defaultValue="InlayOutlayMargin">InlayOutlayMargin</option>
                            <option style={{textAlignLast: "center"}} defaultValue="Emergence">Emergence</option>
                            <option style={{textAlignLast: "center"}} defaultValue="ToothArea">ToothArea</option>
                            <option style={{textAlignLast: "center"}} defaultValue="CustomArea">CustomArea</option>
                        </select>
                    </DetailSettingBox>
                </SetDetailContainer>
            </CurveSetContainer>
            <BlankContainer>
                <SetDetailContainer>
                    <DetailTitleBox></DetailTitleBox>
                    <DetailSettingBox>
                        <input type="radio" id="check-Manual" name="check" defaultValue="Manual"/>
                        <label htmlFor="check-Manual">Manual</label> 
                        <input type="radio" id="check-auto" checked name="check" defaultValue="Auto"/>
                        <label htmlFor="check-auto">Auto</label>
                    </DetailSettingBox>
                </SetDetailContainer>
            </BlankContainer>
            <BlankContainer/>
            <OffsetContainer>
                <OffsetDetailContainer>
                    <OffsetTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>BoundaryOffset</h2>
                    </OffsetTitleBox>
                    <OffsetSettingBox>
                        <OffsetInput 
                            onChange={(e)=>{
                                setBoffset(Number(e.target.value));
                                e.preventDefault();
                            }}
                            type="number" value={boffset}
                        />
                    </OffsetSettingBox>
                </OffsetDetailContainer>
                <OffsetDetailContainer>
                    <OffsetTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>BoundaryAngle</h2>
                    </OffsetTitleBox>
                    <OffsetSettingBox>
                        <OffsetInput type="number" value={0.0}/>
                    </OffsetSettingBox>
                </OffsetDetailContainer>
                <OffsetDetailContainer>
                    <OffsetTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>NCCavityOffset</h2>
                    </OffsetTitleBox>
                    <OffsetSettingBox>
                        <OffsetInput type="number" value={0.00}/>
                    </OffsetSettingBox>
                </OffsetDetailContainer>
            </OffsetContainer>
        </CurvesContainer>
    );
}

export default Curves;

const CurvesContainer = styled.div`
    width:100%;
    height: 100%;
    display:flex;
    align-items:center;
    flex-direction:column;
`;

const BlankContainer = styled.div`
    width:100%;
    height: 3%;
    display:flex;
    align-items:center;
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

 const CurveSetContainer = styled.div`
    width:100%;
    height:10%;
    display:flex;
    align-items:center;
    flex-direction:column;
 `;

 const SetDetailContainer = styled.div`
    width: 95%;
    height: 50%;
    display:flex;
    flex-direction:row;
 `;

 const DetailTitleBox = styled.div`
    width:40%;
    height:100%;
    display:flex;
    align-items:center;
 `;

 const DetailSettingBox = styled.div`
    width:60%;
    height:100%;
    display:flex;
    align-items:center;
 `;

 const OffsetContainer = styled.div`
    width:100%;
    height:15%;
    display:flex;
    align-items:center;
    flex-direction:column;
 `;
 const OffsetDetailContainer = styled.div`
    width: 95%;
    height: 33%;
    display:flex;
    flex-direction:row;
 `;

 const OffsetTitleBox = styled.div`
    width:40%;
    height:100%;
    display:flex;
    align-items:center;
 `;

 const OffsetSettingBox = styled.div`
    width:60%;
    height:100%;
    display:flex;
    align-items:center;
 `;

 const OffsetInput = styled.input`
    width: 70%;
    border-top:none;
    border-left:none;
    border-right:none;
    border-bottom:1px solid;
    background-color:#D8D8D8;
    text-align:center;
 `;