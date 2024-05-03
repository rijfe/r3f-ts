import styled from "styled-components";

import Curves from "./Curves";
import Connectors from "./Connectors";
import Directions from "./Directions";

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
    setWidth: React.Dispatch<React.SetStateAction<number>>,
    setHeight: React.Dispatch<React.SetStateAction<number>>,
    setAngle: React.Dispatch<React.SetStateAction<number>>,
    setRotation: React.Dispatch<React.SetStateAction<number>>,
    setDistance: React.Dispatch<React.SetStateAction<number>>,
    setCutting: React.Dispatch<React.SetStateAction<number>>,
    setType: React.Dispatch<React.SetStateAction<String>>,
    num: number,
    setNum: React.Dispatch<React.SetStateAction<number>>,
    setConnStart: React.Dispatch<React.SetStateAction<boolean>>,
}

function SettingBox({isSettingOpen, type, setConnStart,setType, boffset, setBoffset, width, height, angle, distance, cutting,rotation, setAngle, setDistance, setCutting, setHeight, setRotation, setWidth, num, setNum} : SettingProps){
    return (
        <Container className={isSettingOpen ? "setting" : ""}>

            <PosContainer></PosContainer>
            <BlankContainer/>
            <FileContainer></FileContainer>
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