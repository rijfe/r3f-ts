import styled from "styled-components";
import ListCard from "./ListCard";
import { useEffect, useState } from "react";
import { MeshData } from "./MeshData";
import { useRecoilValue } from "recoil";
import { getPosNum } from "../store/PosNum";

import Arrow from '../img/free-icon-direction-arrow-4939761.png';
import PartDetail from "./PartDetail";
import DropDown from "./DropDown";

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
    const [arr, setArr] = useState<Array<string>>([]);
    const [ready, setReady] = useState<boolean>(false);
    const [state, setState] = useState<number>(1);
    const [click, setClick] = useState<string>("Dumy1");
    const [open, setOpen] = useState<string>("");
    const [wd, setW] = useState<number>(15);
    const [hd, setH] = useState<number>(18);
    const [dd, setD] = useState<number>(15);
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

    ];
    const num = useRecoilValue(getPosNum);
    const MakePart = () =>{
        for(let i=1; i<=num; i++){
            if(!arr.includes(`pos${i}`)) setArr(pre => [...pre, `pos${i}`]);    
        }
        setReady(true);
    }
    useEffect(()=>{
        setArr([]);
        
    },[num])
    useEffect(()=>{
        MakePart();
    },[isPartOpen]);

    const DeleteCallback = (name:string) =>{
        let index = posArr.findIndex(item => item.pos === name);
        let newArr = [...posArr];
        newArr[index].w = 0;
        newArr[index].h = 0;
        newArr[index].d = 0;
        newArr[index].pos = "";
        newArr[index].data.file = null;
        newArr[index].data.fileName = '';
        newArr[index].data.connectOn = false;
        setPosArr(newArr);
    };

    return (
        <PartListContainer className = {isPartOpen ? "part":""}>
            <PartContainer
                style={{height:`${lineNum*4.5}%`}}
                onClick={()=>{
                        setOpen("");
                        
                    }}
            >
                <PartBox 
                    style={{height:`${100/lineNum}%`}}
                    
                >
                    {ready ? arr.map((ele,idx)=>{
                        
                        return (idx<5 ? <Part 
                            onClick={(e)=>{setPosName(ele); setStaPosName(ele);}}
                            onContextMenu={(e)=>{
                                e.preventDefault();
                                setPosName(ele); 
                                setStaPosName(ele);
                                
                                if(ele === open) setOpen("");
                                else setOpen(ele);
                            }}
                            
                            >
                                
                                <PartDeco 
                                    className={posName === ele ? "pos":""}
                                    style={posArr.findIndex(item => item.pos === ele)!= -1 ? {background:"#a7a7a7"}:{}}
                                >
                                    {open === ele ? <DropDown delete={async () => DeleteCallback(ele)}/>:null}
                                        {ele}
                                </PartDeco>
                                </Part>:null);
                    }) : null}                  
                </PartBox>
                {lineNum > 1 ?<PartBox style={{height:`${100/lineNum}%`}}>
                    {ready ? arr.map((ele,idx)=>{
                        return (idx>=5 ? <Part 
                            onClick={(e)=>{setPosName(ele); setStaPosName(ele); }}
                            onContextMenu={(e)=>{
                                e.preventDefault();
                                setPosName(ele); 
                                setStaPosName(ele);
                                
                                if(ele === open) setOpen("");
                                else setOpen(ele);
                            }}
                            >
                                <PartDeco style={posArr.findIndex(item => item.pos === ele)!= -1 ? {background:"#a7a7a7"}:{}} className={posName === ele ? "pos":""}>
                                    {open === ele ? <DropDown delete={async () => DeleteCallback(ele)}/>:null}
                                    {ele}
                                </PartDeco>
                            </Part>:null);
                    }) : null}  
                </PartBox> : null}
            </PartContainer>
            <BlankContainer></BlankContainer>
            <ListContainer style={lineNum > 1 ? state <= 1 ? {height:"79.5%", overflow: "auto"} :{height:"79.5%"} :state <= 1 ? {height:"84%", overflow: "auto"} :{height:"84%"}}>
                <BlankContainer/>
                {state <= 1 ?<ListOverflow>
                    {dumyData.map((ele, idx)=>(
                        <ListCard setD={setD} setH={setH} setW={setW} setClick={setClick} click={click} setState={setState} posArr={posArr} posName={posName} setPosArr={setPosArr} key={idx} title={ele.title} material={ele.material} w={ele.w} h={ele.h} d={ele.d} visible={ele.visible}/>
                    ))}
                    <BlankContainer/>
                </ListOverflow> 
                :<PartDetail/>
                }
                
                {/* <ListCard title={"title"} material={"material"} w={1} h={1} d={1}/> */}
            </ListContainer>
            <BlankContainer/>
            <Buttoncontainer>
                    <Button 
                        style={state <= 1 ? {opacity:0.5} : {opacity:1}}
                        onClick={()=>{
                            if(state > 1){
                                setState(1);
                            }
                        }}
                    >
                        <img 
                            src={Arrow} 
                            style={state <= 1 ?{width:"3rem", height:"3rem", transform:"rotate(180deg)", opacity:0.5} :{width:"3rem", height:"3rem", transform:"rotate(180deg)"}}
                        />
                    </Button>
                    <Button
                        onClick={()=>{
                            
                            if(state === 2){
                                let pArr : [number, number, number] = [0,0,0];
                                let idx = posArr.findIndex(item => item.pos === posName);
                                let newArr = [...posArr];

                                if(idx === -1){
                                    
                                    if(posName === "pos6"){
                                        pArr = [8,(11-hd*0.4/2),0];
                                    }
                                    if(posName === "pos1"){
                                        pArr = [8,-(11-hd*0.4/2),0];
                                    }
                                    if(posName === "pos2"){
                                        pArr = [0,-(11-hd*0.4/2),0];
                                    }
                                    if(posName === "pos3"){
                                        pArr = [-8,-(11-hd*0.4/2),0];
                                    }
                                    if(posName === "pos4"){
                                        pArr = [-8,(11-hd*0.4/2),0];
                                    }
                                    if(posName === "pos5"){
                                        pArr = [0,(11-hd*0.4/2),0];
                                    }
                                    let mesh = new MeshData(false, false, false, 2, 4, 4,0,0,50,5,5,'',null,"","Ellipse", false, [0,0,0]);
                                    let data:posProps= {
                                        pos: posName,
                                        w: wd,
                                        h: hd,
                                        d: dd,
                                        position: pArr,
                                        data: mesh
                                    };
                                    setPosArr(prev=>[...prev, data]);
                                    setState(1);
                                }        
                                else{
                                    newArr[idx].w = wd;
                                    newArr[idx].d = dd;
                                    newArr[idx].h = hd;

                                    if(posName === "pos6"){
                                        pArr = [8,(11-hd*0.4/2),0];
                                    }
                                    if(posName === "pos1"){
                                        pArr = [8,-(11-hd*0.4/2),0];
                                    }
                                    if(posName === "pos2"){
                                        pArr = [0,-(11-hd*0.4/2),0];
                                    }
                                    if(posName === "pos3"){
                                        pArr = [-8,-(11-hd*0.4/2),0];
                                    }
                                    if(posName === "pos4"){
                                        pArr = [-8,(11-hd*0.4/2),0];
                                    }
                                    if(posName === "pos5"){
                                        pArr = [0,(11-hd*0.4/2),0];
                                    }
                                    newArr[idx].position = pArr;
                                    setPosArr(newArr);
                                }
                            }
                            else{
                                setState(2);
                                
                            }
                        }}
                    >
                        <img src={Arrow} style={state > 1 ? {width:"2rem", height:"2rem",transform:"rotate(90deg)" } : {width:"3rem", height:"3rem" }}/>
                    </Button>
            </Buttoncontainer>
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
    height:79.5%;
    
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    &.pos{
        border-bottom: 0.2rem solid #ff0000;
    }
    &:hover{
        border-bottom: 0.2rem solid #ff0000;
    }
`; 

const Buttoncontainer = styled.div`
    width:100%;
    height:4%;
    display: flex;
    justify-content: space-between;
`;

const Button = styled.div`
    width:48%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #a7a7a7;
    border-radius: 0.4rem;
`;