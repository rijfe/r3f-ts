import styled from "styled-components";
import checkLogo from "../img/free-icon-checkmark-8968523.png"

interface ChapterBoxProps{
    chapter : number,
    num: number,
    setNum:  React.Dispatch<React.SetStateAction<number>>,
}

function ChapterBox({chapter, num, setNum} : ChapterBoxProps){
    return (
        <Container>
            <Chapter 
                onClick={()=>{
                    setNum(1);
                }}
                style={{color:num === 1?"red":"black"}}
            >
                1
                {chapter >= 1 ? <img src={checkLogo} style={{position:"absolute", width:"3rem", height:"3rem"}}/> : null}
            </Chapter>
            <Chapter
                onClick={()=>{
                    setNum(2);
                }}
                style={{color:num === 2?"red":"black"}}
            >
                2
                {chapter >= 2 ? <img src={checkLogo} style={{position:"absolute", width:"3rem", height:"3rem"}}/> : null}
            </Chapter>
            <Chapter aria-disabled>
                3
            </Chapter>
            <Chapter>
                4
            </Chapter>
        </Container>
    );
}

export default ChapterBox;

const Container = styled.div`
    height: 90%;
    width: 70%;
    display:flex;
    align-items:center;
    margin-left:1rem;
    justify-content:space-around;
`;

const Chapter = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height: 100%;
    width:20%;
    font-size:3rem;
    border-radius:4px;

    &:hover{
        background-color:#B0B0B0;
    }
`;