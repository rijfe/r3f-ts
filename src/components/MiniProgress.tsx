import { useEffect, useState } from "react";
import styled from "styled-components";

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
        <MiniProgressContainer style={{height: `${number*6}rem`}}>
            {props.arr.map((ele,idx)=>{
                if(ele.mini){
                    return(
                        <MiniProgressBox
                            onClick={()=>{
                                props.setName(ele.name);
                                let newArr =[...props.arr];
                                newArr[idx].mini = false;
                                props.setArr(newArr);
                                props.setOpen(true);
                            }}
                        >
                            test
                        </MiniProgressBox>
                    );
                }
            })}
        </MiniProgressContainer>
    );
}

export default MiniProgress;

const MiniProgressContainer = styled.div`
    width: 35rem;
    position:absolute;
    bottom:0;
    right: 13vw;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    z-index:65;
`;

const MiniProgressBox = styled.div`
    width: 100%;
    height: 5rem;
    background: #aaffaa;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
`;