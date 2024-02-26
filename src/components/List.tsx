import styled from "styled-components";
import { useState } from "react";

import testLogo from "../img/free-icon-plus-sign-3114793.png";

interface ListProps{
    no: number,
    title: string,
    content: string,
    num: number,
    setNum: React.Dispatch<React.SetStateAction<number>>,
    chapter: number,
    setChapter: React.Dispatch<React.SetStateAction<number>>,
    setMachine: React.Dispatch<React.SetStateAction<string>>
}

function List({no,title,content, num, setNum, chapter, setChapter ,setMachine}:ListProps){
    return (
        <ListItemBox onDoubleClick={()=>{
                if(chapter === num){
                    setChapter(num+1);
                }
                setNum(num+1);
                setMachine(title);
            }}
        >
            <ItemImgBox>
                <img src={testLogo} style={{width:"2.8rem", height:"2.8rem"}}/>
            </ItemImgBox>
            <ItemTextBox>
                <p>{no===0?null:`${no}.`}{title}</p>
                {content != "no" ? <p>{content}</p> : null}
            </ItemTextBox>
        </ListItemBox>
    );
}

export default List;

const ListItemBox = styled.div`
    width:95%;
    height: 6rem;
    margin-top:5px;
    display:flex;
    flex-direction: row;

    &:hover{
        border: 3px solid #90d0f0;
        background-color: rgba(150,180, 180, .5);
    }
`;

const ItemImgBox = styled.div`
    height: 100%;
    width:20%;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const ItemTextBox = styled.div`
    height: 100%;
    width:80%;
    display:flex;
    flex-direction: column;
    font-size: 1.4rem;
    justify-content:space-around;
`;