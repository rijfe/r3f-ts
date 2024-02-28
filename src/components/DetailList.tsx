import styled from "styled-components";
import { useEffect, useState } from "react";
import ChapterBox from "./ChapterBox";
import List from "./List";
import { BufferGeometry } from "three";

interface DetailListProps {
    isOpen: boolean,
    setGeo: React.Dispatch<React.SetStateAction<BufferGeometry<THREE.NormalBufferAttributes>>>,
    setIsDrop: React.Dispatch<React.SetStateAction<boolean>>,
    setJig: React.Dispatch<React.SetStateAction<boolean>>,
}

function DetailList({isOpen, setGeo,setIsDrop, setJig}:DetailListProps){
    const [chapter, setChapter] = useState<number>(1);
    const [num, setNum] = useState<number>(1);
    const [machine, setMachine] = useState<string>("");

    const machineData = [
        "Arum5x150",
        "Arum5x200",
        "Arum5x300",
        "Arum5x300Pro",
        "Arum5x400",
        "Arum5x450",
        "Arum5x500",
        "Arum5x500L",
        "Arum5x500_V2",
    ];

    useEffect(()=>{
        setChapter(1);
        setNum(1);
        setMachine("");
    },[isOpen]);

    const machineJigData : any = {
        "Arum5x500":[
            {
                no :1,
                title : "(5X500)_Master_C-type_C2",
                content: "Milling"
            },
            {
                no :1,
                title : "(5X500)_Master_O-type_Disk",
                content: "Milling"
            },
            {
                no :2,
                title : "(5X500)_Ceramic_Glass",
                content: "Grinding"
            },
            {
                no :3,
                title : "(5X500)_Premill_Fixture_T_Jig",
                content: "Premilled"
            },
            {
                no :4,
                title : "(5X500)_AT_Premill_Fixture_T_Jig",
                content: "Premilled"
            }
        ],
        "Arum5x150":[
            {
                no :1,
                title : "(5X150)_Master_Disk",
                content: "Milling"
            },
        ],
        "Arum5x200":[
            {
                no :1,
                title : "(5X200)_Master_Disk",
                content: "Milling"
            },
            {
                no :2,
                title : "(5X200)_Premill",
                content: "Premilled"
            },
            {
                no :3,
                title : "(5X200)_AT_Premill",
                content: "Premilled"
            },
            {
                no :4,
                title : "(5X200)_Ceramic_Glass",
                content: "Grinding"
            },
        ],
        "Arum5x300":[
            {
                no :1,
                title : "(5X300)_Master_Disk",
                content: "Milling"
            },
            {
                no :2,
                title : "(5X300)_Ceramic_Glass",
                content: "Grinding"
            },
        ],
        "Arum5x300Pro":[
            {
                no :1,
                title : "(5X300_Pro)_Master_Disk",
                content: "Milling"
            },
            {
                no :2,
                title : "(5X300_Pro)_Ceramic_Glass",
                content: "Grinding"
            },
        ],
        "Arum5x400":[
            {
                no :1,
                title : "(5X400)_Master_Disk",
                content: "Milling"
            },
            {
                no :2,
                title : "(5X400)_Ceramic_Glass",
                content: "Grinding"
            },
            {
                no :3,
                title : "(5X400)_Premill",
                content: "Premilled"
            },
            {
                no :4,
                title : "(5X400)_AT_Premill",
                content: "Premilled"
            },
        ],
        "Arum5x450":[
            {
                no :1,
                title : "(5X450)_Master_Disk",
                content: "Milling"
            },
            {
                no :2,
                title : "(5X450)_Premill",
                content: "Premilled"
            },
            {
                no :3,
                title : "(5X450)_AT_Premill",
                content: "Premilled"
            },
            {
                no :4,
                title : "(5X450)_AT_Premill_Cuff",
                content: "Premilled"
            },
            {
                no :5,
                title : "(5X450)_AT_Premill_OCC",
                content: "Premilled"
            },
            {
                no :6,
                title : "(5X450)_Ceramic_Glass",
                content: "Grinding"
            },
        ],
        "Arum5x500L":[
            {
                no :1,
                title : "(5X500L)_Master_C-type_C2",
                content: "Milling"
            },
            {
                no :2,
                title : "(5X500L)_Master_O-type_Disk",
                content: "Milling"
            },
            {
                no :3,
                title : "(5X500L)_Master_O-type(G11)",
                content: "Milling"
            },
            {
                no :4,
                title : "(5X500L)_Master_O-type(G111)",
                content: "Milling"
            },
            {
                no :5,
                title : "(5X500L)_Premill_Fixture_T_Jig(G500)",
                content: "Premilled"
            },
            {
                no :6,
                title : "(5X500L)_AT_Premill_Fixture_T_Jig(G500)",
                content: "Premilled"
            },
            {
                no :7,
                title : "(5X500L)_Ceramic_Glass",
                content: "Grinding"
            },
        ],
        "Arum5x500_V2":[
            {
                no :1,
                title : "(5X500_V2)_Master_C-type",
                content: "Milling"
            },
            {
                no :2,
                title : "(5X500_V2)_Master_O-type",
                content: "Milling"
            },
            {
                no :3,
                title : "(5X500_V2)_Premill_6P",
                content: "Premilled"
            },
            {
                no :4,
                title : "(5X500_V2)_AT_Premill_6P",
                content: "Premilled"
            },
            {
                no :7,
                title : "(5X500_V2)_Ceramic_Glass",
                content: "Grinding"
            },
        ],
    }

    const ListHandler = ()=>{
        if(num === 1){
            return(
                <>
                    {machineData.map((ele,idx)=>(
                        <List key={idx} no={0} title={ele} chapter={chapter} setJig={setJig} content="no" num={num} setNum={setNum} setMachine={setMachine} setChapter={setChapter} setGeo={setGeo} setIsDrop={setIsDrop}/>
                    ))}
                </>
            )
        }
        else if(num === 2){
            return (
                <>
                    {machineJigData[machine].map((ele : any, idx:number)=>(
                        <List key={idx} no={ele.no} title={ele.title} chapter={chapter} setJig={setJig} content={ele.content} num={num} setNum={setNum} setMachine={setMachine} setChapter={setChapter} setGeo={setGeo} setIsDrop={setIsDrop}/>
                    ))}
                </>
                
            );
        }
        else{
            return null;
        }
    };

    return (
        <DetailListContainer className={isOpen ? "detail" : ""}>
            <ChapterContainer>
                <ChapterBox chapter={chapter} num={num} setNum={setNum}/>
            </ChapterContainer>
            <BlankContainer></BlankContainer>
            <ListContainer>
                <ListHandler/>
            </ListContainer>
        </DetailListContainer>
    );
}

export default DetailList;

const DetailListContainer = styled.div`
    width: 35rem;
    height:100%;
    position: fixed;
    left: -50%;
    transition: 0.5s ease;
    z-index:-1;
    &.detail{
        left: 8rem;
        transition: 0.5s ease;
        z-index:1;
    }
`;

const ChapterContainer  = styled.div`
    width:100%;
    height: 6%;
    background: #D8D8D8;
    display: flex;
    align-items:center;
`;

const BlankContainer = styled.div`
    width:100%;
    height: 1%;
`;

const ListContainer = styled.div`
    width:100%;
    height: 93%;
    background: #D8D8D8;
    display: flex;
    flex-direction: column;
    align-items:center;
`;