import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

interface ProgressProps{
    name: String,
    percent: number,
    mini: boolean,
}

interface MiniProps{
    setArr: React.Dispatch<React.SetStateAction<Array<ProgressProps>>>,
    arr: Array<ProgressProps>,
    setName: React.Dispatch<React.SetStateAction<String>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    open: boolean
}

function MiniProgress(props:MiniProps){
    const [number, setNumber] = useState<number>(0);

    useEffect(()=>{
        let n = 0;
        props.arr.map((ele)=>{
            if(ele.mini){
                n++;
            }
        });
        setNumber(n);
    },[props.arr]);

    return(
        <MiniProgressContainer className={props.open ? "open":"close"} style={{height: `${number*6}rem`}}>
            {props.arr.map((ele,idx)=>{
                if(ele.mini){
                    return(
                        <MiniProgressBox
                            key={idx}
                            onClick={()=>{
                                props.setName(ele.name);
                                // let newArr =[...props.arr];
                                // newArr[idx].mini = false;
                                // props.setArr(newArr);
                                props.setOpen(true);
                            }}
                        >
                            <ProgressTextCotainer>
                               {ele.name}
                            </ProgressTextCotainer>
                            <ProgressBarCotainer>
                                <ProgressBox>
                                    <ProgressBar style={{width:`${ele.percent}%`}}/>
                                </ProgressBox>
                            </ProgressBarCotainer>
                            <ProgressTextCotainer>
                                {ele.percent}%
                            </ProgressTextCotainer>
                        </MiniProgressBox>
                    );
                }
            })}
        </MiniProgressContainer>
    );
}

export default MiniProgress;

const OpenAnimation = keyframes`
    0%{
        bottom: -40%;
    }
    100%{
        bottom: 0;
    }
`;

const CloseAnimation = keyframes`
    0%{
        bottom: 0;
    }
    100%{
        bottom: -40%;
    }
`;

const MiniProgressContainer = styled.div`
    width: 35rem;
    position:fixed;
    bottom:0;
    right: 13vw;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    align-items:center;
    z-index:65;
    cursor: move;
    &.open{
        animation: ${CloseAnimation} 0.5s ease-out;
        bottom:-40%;
    }
    &.close{
        animation: ${OpenAnimation} 0.5s ease-in;
        bottom:0;
    }
`;

const MiniProgressBox = styled.div`
    width: 95%;
    height: 5rem;
    background: #99ff99;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
`;

const ProgressTextCotainer = styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    justify-content:center;
    align-items: center;
    font-size: 2rem;
`;

const ProgressBarCotainer = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    justify-content:center;
    align-items: center;

`;

const ProgressBox = styled.div`
    width:90%;
    height:60%;
    border: solid 2px;
    border-radius: 8px;
    background:#ffffff;
`;

const ProgressBar = styled.div`
    height:101%;
    border-radius: 6px 8px 8px 6px;
    background:#3388ff;
`;