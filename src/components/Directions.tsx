import styled from "styled-components";
import plusLogo from "../img/free-icon-plus-sign-3114793.png";
import { useRecoilState } from "recoil";
import { directionState } from "../store/directionState";

function Directions(){
    const [dircetion, setDirection] = useRecoilState(directionState);
    return (
        <DirectionsContainer>
            <TitleContainer>
                <TitleBox>
                    <h2 style={{fontWeight:900, fontSize:"1.5rem"}}>Direction</h2>
                </TitleBox>
            </TitleContainer>
            <BlankContainer/>
            <BtnContainer>
                <BtnBox>
                    <img 
                        src={plusLogo}
                        style={{width: "5rem", height:"5rem"}}
                        onClick={()=>{
                            setDirection("yes");
                        }}
                    />
                </BtnBox>
            </BtnContainer>
        </DirectionsContainer>
    );
}

export default Directions;

const DirectionsContainer = styled.div`
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

const BtnContainer = styled.div`    
    width:100%;
    height:82%;
    display:flex;
    align-items: end;
`;

const BtnBox = styled.div`
    width: 100%;
    height:10%;
    display:flex;
    flex-direction:row;
`;