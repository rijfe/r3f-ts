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
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

function DetailList({isOpen, setGeo,setIsDrop, setJig, setIsOpen}:DetailListProps){
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
                content: "Milling",
                jig: "150-지그 1.stl"
            },
            {
                no :1,
                title : "(5X500)_Master_O-type_Disk",
                content: "Milling",
                jig: "150-지그 1.stl"
            },
            {
                no :2,
                title : "(5X500)_Ceramic_Glass",
                content: "Grinding",
                jig: "150-지그 1.stl"
            },
            {
                no :3,
                title : "(5X500)_Premill_Fixture_T_Jig",
                content: "Premilled",
                jig: "150-지그 1.stl"
            },
            {
                no :4,
                title : "(5X500)_AT_Premill_Fixture_T_Jig",
                content: "Premilled",
                jig: "150-지그 1.stl"
            }
        ],
        "Arum5x150":[
            {
                no :1,
                title : "(5X150)_Master_Disk",
                content: "Milling",
                jig: "150-지그 1.stl"
            },
        ],
        "Arum5x200":[
            {
                no :1,
                title : "(5X200)_Master_Disk",
                content: "Milling",
                jig: "150-지그 1.stl"
            },
            {
                no :2,
                title : "(5X200)_Premill",
                content: "Premilled",
                jig: "150-지그 1.stl"
            },
            {
                no :3,
                title : "(5X200)_AT_Premill",
                content: "Premilled",
                jig: "150-지그 1.stl"
            },
            {
                no :4,
                title : "(5X200)_Ceramic_Glass",
                content: "Grinding",
                jig: "150-지그 1.stl"
            },
        ],
        "Arum5x300":[
            {
                no :1,
                title : "(5X300)_Master_Disk",
                content: "Milling",
                jig: "300_O_TYPE.stl",
                pos: 1
            },
            {
                no :2,
                title : "(5X300)_Ceramic_Glass",
                content: "Grinding",
                jig: "300_CG_TYPE.stl",
                pos: 6
            },
        ],
        "Arum5x300Pro":[
            {
                no :1,
                title : "(5X300_Pro)_Master_Disk",
                content: "Milling",
                jig: "300Pro_B_AXIS_C_TYPE.stl"
            },
            {
                no :2,
                title : "(5X300_Pro)_Ceramic_Glass",
                content: "Grinding",
                jig: "300Pro_B_AXIS_CG_TYPE.stl"
            },
        ],
        "Arum5x400":[
            {
                no :1,
                title : "(5X400)_Master_Disk",
                content: "Milling",
                jig: "400-지그 1.stl"
            },
            {
                no :2,
                title : "(5X400)_Ceramic_Glass",
                content: "Grinding",
                jig: "400-지그 2.stl"
            },
            {
                no :3,
                title : "(5X400)_Premill",
                content: "Premilled",
                jig: "400-지그 3.stl"
            },
            {
                no :4,
                title : "(5X400)_AT_Premill",
                content: "Premilled",
                jig: "400-지그 4.stl"
            },
        ],
        "Arum5x450":[
            {
                no :1,
                title : "(5X450)_Master_Disk",
                content: "Milling",
                jig: "5X450_DISK.stl"
            },
            {
                no :2,
                title : "(5X450)_Premill",
                content: "Premilled",
                jig: "5X450_premill.stl"
            },
            {
                no :3,
                title : "(5X450)_AT_Premill",
                content: "Premilled",
                jig: "5X450_AT_Premill_AUX.stl"
            },
            {
                no :4,
                title : "(5X450)_AT_Premill_Cuff",
                content: "Premilled",
                jig: "150-지그 1.stl"
            },
            {
                no :5,
                title : "(5X450)_AT_Premill_OCC",
                content: "Premilled",
                jig: "5X450_Premill_OCC.stl",
                pos:8
            },
            {
                no :6,
                title : "(5X450)_Ceramic_Glass",
                content: "Grinding",
                jig: "5X450_CG.stl"
            },
        ],
        "Arum5x500L":[
            {
                no :1,
                title : "(5X500L)_Master_C-type_C2",
                content: "Milling",
                jig: "150-지그 1.stl"
            },
            {
                no :2,
                title : "(5X500L)_Master_O-type_Disk",
                content: "Milling",
                jig: "150-지그 1.stl"
            },
            {
                no :3,
                title : "(5X500L)_Master_O-type(G11)",
                content: "Milling",
                jig: "150-지그 1.stl"
            },
            {
                no :4,
                title : "(5X500L)_Master_O-type(G111)",
                content: "Milling",
                jig: "150-지그 1.stl"
            },
            {
                no :5,
                title : "(5X500L)_Premill_Fixture_T_Jig(G500)",
                content: "Premilled",
                jig: "150-지그 1.stl"
            },
            {
                no :6,
                title : "(5X500L)_AT_Premill_Fixture_T_Jig(G500)",
                content: "Premilled",
                jig: "150-지그 1.stl"
            },
            {
                no :7,
                title : "(5X500L)_Ceramic_Glass",
                content: "Grinding",
                jig: "150-지그 1.stl"
            },
        ],
        "Arum5x500_V2":[
            {
                no :1,
                title : "(5X500_V2)_Master_C-type",
                content: "Milling",
                jig: "150-지그 1.stl"
            },
            {
                no :2,
                title : "(5X500_V2)_Master_O-type",
                content: "Milling",
                jig: "150-지그 1.stl"
            },
            {
                no :3,
                title : "(5X500_V2)_Premill_6P",
                content: "Premilled",
                jig: "150-지그 1.stl"
            },
            {
                no :4,
                title : "(5X500_V2)_AT_Premill_6P",
                content: "Premilled",
                jig: "150-지그 1.stl"
            },
            {
                no :7,
                title : "(5X500_V2)_Ceramic_Glass",
                content: "Grinding",
                jig: "150-지그 1.stl"
            },
        ],
    }

    const ListHandler = ()=>{
        if(num === 1){
            return(
                <>
                    {machineData.map((ele,idx)=>(
                        <List key={idx} idx={idx} no={0} title={ele} chapter={chapter} jig="" setIsOpen={setIsOpen} setJig={setJig} content="no" num={num} setNum={setNum} setMachine={setMachine} setChapter={setChapter} setGeo={setGeo} setIsDrop={setIsDrop} posN={0}/>
                    ))}
                </>
            )
        }
        else if(num === 2){
            return (
                <>
                    {machineJigData[machine].map((ele : any, idx:number)=>(
                        <List key={idx} idx={idx} no={ele.no} title={ele.title} jig={ele.jig} chapter={chapter} setIsOpen={setIsOpen} setJig={setJig} content={ele.content} num={num} setNum={setNum} setMachine={setMachine} setChapter={setChapter} setGeo={setGeo} setIsDrop={setIsDrop} posN={ele.pos}/>
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
                <ListOverflow>
                    <ListHandler/>
                </ListOverflow>
                
                {/* <Blank/> */}
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
    z-index:50;
    &.detail{
        left: 8rem;
        transition: 0.5s ease;
        z-index:50;
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
    overflow-y:auto;
`;

const ListOverflow = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y:auto;
`;

const Blank = styled.div`
    width: 100%;
    height:15%;
`
