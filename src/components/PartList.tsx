import styled from "styled-components";
import ListCard from "./ListCard";
import { useState } from "react";
import { MeshData } from "./MeshData";

interface posProps{
    pos: String,
    w: number,
    h: number,
    d: number,
    position: [number, number, number],
    data: MeshData,
};

interface PartListProps {
    isPartOpen : boolean,
    lineNum: number,
    posArr: posProps[],
    setPosArr: React.Dispatch<React.SetStateAction<posProps[]>>,
    setStaPosName: React.Dispatch<string>,
}

function PartList({isPartOpen, lineNum, setPosArr, posArr,setStaPosName} : PartListProps){
    const [posName, setPosName] = useState<String>("");

    const dumyData = [
        {
            title: "Dumy1",
            material: "Dumy_Block",
            w: 15.0,
            h: 18.0,
            d: 15.0,
            visible: false
        },
        {
            title: "Dumy2",
            material: "Dumy_Block",
            w: 19.4,
            h: 39.0,
            d: 15.4,
            visible: false
        },
        {
            title: "Dumy3",
            material: "Dumy_Block",
            w: 15.2,
            h: 40.0,
            d: 15.2,
            visible: false
        },
        {
            title: "Dumy4",
            material: "Dumy_Block",
            w: 12.0,
            h: 15.0,
            d: 10.0,
            visible: false
        },
        {
            title: "Dumy5",
            material: "Dumy_Block",
            w: 15.4,
            h: 32.0,
            d: 15.0,
            visible: false
        },
        {
            title: "Dumy6",
            material: "Dumy_Block",
            w: 14.0,
            h: 18.0,
            d: 12.0,
            visible: false
        },
        {
            title: "Dumy7",
            material: "Dumy_Block",
            w: 10.0,
            h: 15.0,
            d: 8.0,
            visible: false
        },
        {
            title: "Dumy8",
            material: "Dumy_Block",
            w: 15.9,
            h: 18.0,
            d: 17.3,
            visible: false
        },
        {
            title: "Dumy9",
            material: "Dumy_Block",
            w: 10.0,
            h: 15.0,
            d: 8.0,
            visible: false
        },
        {
            title: "Dumy10",
            material: "Dumy_Block",
            w: 10.0,
            h: 15.0,
            d: 8.0,
            visible: false
        },
        {
            title: "Dumy11",
            material: "Dumy_Block",
            w: 10.0,
            h: 15.0,
            d: 8.0,
            visible: false
        },
        {
            title: "Dumy12",
            material: "Dumy_Block",
            w: 10.0,
            h: 15.0,
            d: 8.0,
            visible: false
        },
        {
            title: "Dumy13",
            material: "Dumy_Block",
            w: 10.0,
            h: 15.0,
            d: 8.0,
            visible: false
        },
        {
            title: "Dumy14",
            material: "Dumy_Block",
            w: 10.0,
            h: 15.0,
            d: 8.0,
            visible: false
        },
        {
            title: "Dumy15",
            material: "Dumy_Block",
            w: 10.0,
            h: 15.0,
            d: 8.0,
            visible: false
        },
        {
            title: "Dumy15",
            material: "Dumy_Block",
            w: 10.0,
            h: 15.0,
            d: 8.0,
            visible: true
        },
        {
            title: "Dumy15",
            material: "Dumy_Block",
            w: 10.0,
            h: 15.0,
            d: 8.0,
            visible: true
        },
    ];
    return (
        <PartListContainer className = {isPartOpen ? "part":""}>
            <PartContainer
                style={{height:`${lineNum*4.5}%`}}
            >
                <PartBox style={{height:`${100/lineNum}%`}}>
                    <Part onClick={(e)=>{setPosName("pos1"); setStaPosName("pos1");}}><PartDeco className={posName === "pos1" ? "pos":""}>pos1</PartDeco></Part>
                    <Part onClick={(e)=>{setPosName("pos2"); setStaPosName("pos2");}}><PartDeco className={posName === "pos2" ? "pos":""}>pos2</PartDeco></Part>
                    <Part onClick={(e)=>{setPosName("pos3"); setStaPosName("pos3");}}><PartDeco className={posName === "pos3" ? "pos":""}>pos3</PartDeco></Part>
                    <Part onClick={(e)=>{setPosName("pos4"); setStaPosName("pos4");}}><PartDeco className={posName === "pos4" ? "pos":""}>pos4</PartDeco></Part>
                    <Part onClick={(e)=>{setPosName("pos5"); setStaPosName("pos5");}}><PartDeco className={posName === "pos5" ? "pos":""}>pos5</PartDeco></Part>
                </PartBox>
                <PartBox style={{height:`${100/lineNum}%`}}>
                    <Part onClick={(e)=>{setPosName("pos6"); setStaPosName("pos6");}}><PartDeco className={posName === "pos6" ? "pos":""}>pos6</PartDeco></Part>
                </PartBox>
            </PartContainer>
            <BlankContainer></BlankContainer>
            <ListContainer>
                <BlankContainer/>
                <ListOverflow>
                    {dumyData.map((ele, idx)=>(
                        <ListCard posArr={posArr} posName={posName} setPosArr={setPosArr} key={idx} title={ele.title} material={ele.material} w={ele.w} h={ele.h} d={ele.d} visible={ele.visible}/>
                    ))}
                    <BlankContainer/>
                </ListOverflow>
                
                {/* <ListCard title={"title"} material={"material"} w={1} h={1} d={1}/> */}
            </ListContainer>
        </PartListContainer>
    );
}

export default PartList;

const PartListContainer = styled.div`
    width: 35rem;
    height: 100%;
    position: fixed;
    left: -50%;
    transition: 0.5s ease;
    z-index:50;
    &.part{
        left: 8rem;
        transition: 0.5s ease;
        z-index:50;
    }
`

const PartContainer = styled.div`
    width:100%;
    background: #D8D8D8;
    display: flex;
    flex-direction: column;
`;

const BlankContainer = styled.div`
    width:100%;
    height: 1%;
`;

const ListContainer = styled.div`
    width:100%;
    background: #D8D8D8;
    height:90%;
    overflow-y: auto;
`;

const ListOverflow = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y:auto;
`;

const PartBox = styled.div`
    width:100%;
    display:flex;
    flex-direction: row;
`;

const Part = styled.div`
    width:20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:1.5rem;
`;

const PartDeco = styled.div`
    width:85%;
    height: 85%;
    background: #a7a7a7;
    display: flex;
    justify-content: center;
    align-items: center;
    &.pos{
        border: 0.2rem solid #ff0000;
    }
    &:hover{
        border-bottom: 0.2rem solid #ff0000;
    }
`; 