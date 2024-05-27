import styled from "styled-components";
import { MeshData } from "./MeshData";
import { BufferGeometry } from "three";
import { useRef, useState } from "react";

interface posProps{
    pos: String,
    w: number,
    h: number,
    d: number,
    position: [number, number, number],
    data: MeshData,
};

interface ListCardProps{
    title: string,
    material: string,
    w: number,
    h: number,
    d: number,
    visible: boolean,
    posName:String,
    posArr: posProps[],
    click:string,
    setPosArr: React.Dispatch<React.SetStateAction<posProps[]>>,
    setState: React.Dispatch<React.SetStateAction<number>>,
    setClick: React.Dispatch<React.SetStateAction<string>>,
    setW: React.Dispatch<React.SetStateAction<number>>,
    setH: React.Dispatch<React.SetStateAction<number>>,
    setD: React.Dispatch<React.SetStateAction<number>>,
}

function ListCard(props:ListCardProps){
    let ref = useRef();
    
    return (
        props.visible ? 
            <ListBox></ListBox> 
        :
        <ListBox
            onClick={()=>{
                props.setH(props.h);
                props.setW(props.w);
                props.setD(props.d);
                props.setClick(props.title);
            }}
            onDoubleClick={()=>{
                props.setState(2);
                // let pArr : [number, number, number] = [0,0,0];
                // let idx = props.posArr.findIndex(item => item.pos === props.posName);
                // let newArr = [...props.posArr];

                // if(idx === -1){
                //     if(props.posName === "pos6"){
                //         pArr = [8,7.4,0];
                //     }
                //     if(props.posName === "pos1"){
                //         pArr = [8,-7.4,0];
                //     }
                //     if(props.posName === "pos2"){
                //         pArr = [0,-7.4,0];
                //     }
                //     if(props.posName === "pos3"){
                //         pArr = [-8,-7.4,0];
                //     }
                //     if(props.posName === "pos4"){
                //         pArr = [-8,7.4,0];
                //     }
                //     if(props.posName === "pos5"){
                //         pArr = [0,7.4,0];
                //     }
                //     let mesh = new MeshData(false, false, false, 2, 4, 4,0,0,50,5,5,'',null,"","Ellipse", false, [0,0,0]);
                //     let data:posProps = {
                //         pos: props.posName,
                //         w: props.w,
                //         h: props.h,
                //         d: props.d,
                //         position: pArr,
                //         data: mesh
                //     };
                //     props.setPosArr(prev=>[...prev, data]);
                // }        
                // else{
                //     newArr[idx].w = props.w;
                //     newArr[idx].d = props.d;
                //     newArr[idx].h = props.h;

                //     props.setPosArr(newArr);
                // }
            }}
            className={props.click === props.title ? "click" : ""}
        >
            <ListTitle className={props.click === props.title ? "click" : ""}>
                <p style={{fontSize:"2rem", fontWeight:500, marginLeft:4, color:"white"}}>{props.title}</p>
            </ListTitle>
            <ListDetail>
                <ListImg>img</ListImg>
                <ListInfo>
                    <Info>{props.material}</Info>
                    <Info>{`W : ${props.w}, H : ${props.h}, D : ${props.d}`}</Info>
                </ListInfo>
            </ListDetail>
        </ListBox>
    );
}

export default ListCard;

const ListBox = styled.div`
    width: 90%;
    height: 10rem;
    margin-bottom:2rem;
    display:fixed;
    &.click{
       border:solid 2px #ff0000;
    }
`;

const ListTitle = styled.div`
    width: 100%;
    height: 33%;
    background: #a7a7a7;
    display:flex;
    align-items: center;
    &.click{
        background: #ff0000;
    }
`;

const ListDetail = styled.div`
    width: 100%;
    height: 67%;
    background: #f8f8f8;
    display:flex;
    flex-direction: row;
`;

const ListImg = styled.div`
    width: 20%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
`;

const ListInfo = styled.div`
    width: 80%;
    height:100%;
    display:flex;
    flex-direction: column;
`;

const Info = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    font-size:1.5rem;
`;
