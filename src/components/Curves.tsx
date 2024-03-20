import styled from "styled-components";

function Curves(){
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
                    <DetailSettingBox>This More Detail</DetailSettingBox>
                </SetDetailContainer>
            </CurveSetContainer>
            <BlankContainer></BlankContainer>
            <OffsetContainer>
                <OffsetDetailContainer>
                    <OffsetTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>BoundaryOffset</h2>
                    </OffsetTitleBox>
                    <OffsetSettingBox>
                        <OffsetInput/>
                    </OffsetSettingBox>
                </OffsetDetailContainer>
                <OffsetDetailContainer>
                    <OffsetTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>BoundaryAngle</h2>
                    </OffsetTitleBox>
                    <OffsetSettingBox>
                        <OffsetInput/>
                    </OffsetSettingBox>
                </OffsetDetailContainer>
                <OffsetDetailContainer>
                    <OffsetTitleBox>
                        <h2 style={{fontWeight:500, fontSize:"1.5rem"}}>NCCavityOffset</h2>
                    </OffsetTitleBox>
                    <OffsetSettingBox>
                        <OffsetInput/>
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
 `;