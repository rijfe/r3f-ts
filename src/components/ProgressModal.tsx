import styled, { keyframes } from "styled-components";
import { MeshData } from "./MeshData";

interface ProgressProps{
    name: String,
    percent: number,
    mini: boolean
}

interface posProps{
    pos: String,
    w: number,
    h: number,
    d: number,
    position: [number, number, number],
    data: MeshData,
};


interface ProgressModalProps{
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setMiniOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setArr: React.Dispatch<React.SetStateAction<Array<ProgressProps>>>,
    arr: Array<ProgressProps>,
    percent: number,
    name: String,
    open: boolean,
    posArr: Array<posProps>,
    setPosArr: React.Dispatch<React.SetStateAction<posProps[]>>,
}

function ProgressModal(props:ProgressModalProps){
    return(
        <ModalContainer className={props.open ? "open" :"close"}>
            <ModalTitleContainer>
                <ModalBtnContainer/>
                <ModalTitle>
                    Calculating toolpath
                </ModalTitle>
                <ModalBtnContainer>
                    <Button
                        onClick={()=>{
                            props.setModalOpen(false);
                            let idx = props.arr.findIndex(item => item.name === props.name);
                            let newArr = [...props.arr];
                            newArr[idx].mini = true;
                            props.setArr(newArr);
                        }}
                    >
                        ㅡ
                    </Button>
                </ModalBtnContainer>
            </ModalTitleContainer>
            <ModalBodyContainer>
                <ProgressContainer>
                    <ProgressBox>
                        <ProgressBar style={props.percent < 100 ? {width:`${props.percent}%`} : {width:`${props.percent}%`, borderRadius:"6px 6px 6px 6px"}}/>
                    </ProgressBox>
                    <ProgressTextBox>
                            {props.percent}%
                    </ProgressTextBox>
                </ProgressContainer>
                <TaskContainer>
                        <TaskTextConainer>
                            ▼Subtasks
                        </TaskTextConainer>
                </TaskContainer>
                <ButtonContainer>
                    <CancleButton
                        onClick={()=>{
                            props.setModalOpen(false);
                            // let idx = props.arr.findIndex(item => item.name === props.name);
                            // let newArr = [...props.arr];
                            // newArr[idx].mini = false;
                            props.setArr([]);

                            let index = props.posArr.findIndex(item => item.pos === props.name);
                            let newPos = [...props.posArr];
                            newPos[index].data.caculating = false;
                            props.setPosArr(newPos);
                        }}
                    >
                        Cancle
                    </CancleButton>
                </ButtonContainer>
            </ModalBodyContainer>
        </ModalContainer>
    );
}

export default ProgressModal;

const OpenAnimation = keyframes`
    0%{
        transform: scale(0);
    }
    50%{
        transform: scale(0.5);
    }
    100%{
        transform: scale(1);
    }
`;

const CloseAnimation = keyframes`
    0%{
        transform: scale(1);
    }
    50%{
        transform: scale(0.5);
    }
    100%{
        transform: scale(0);
    }
`;

const ModalContainer = styled.div`
    display:flex;
    width: 50rem;
    height: 30rem;
    position: absolute;
    border:solid 2px;
    top: 20vh;
    left: 40vw;
    z-index:65;
    flex-direction:column;
    &.open{
        animation: ${OpenAnimation} 0.5s ease-in;
        transform: scale(1);
    }
    &.close{
        animation: ${CloseAnimation} 0.5s ease-in;
        transform: scale(0);
    }
`;

const ModalTitleContainer = styled.div`
    width: 100%;
    height: 15%;
    background: #979797;
    border-bottom: solid 2px;
    display:flex;
    flex-direction:row;
`;

const ModalBtnContainer = styled.div`
    width: 30%;
    height: 100%;
    display:flex;
    justify-content: end;
    font-size: 3rem;
    color:#ffffff;
    font-weight: bold;
`;

const Button = styled.div`
    heigth: 100%;
    width: 30%;
    display:flex;
    align-items:center;
    justify-content:center;
`;

const ModalTitle = styled.div`
    width: 40%;
    height: 100%;
    display:flex;
    align-items:center;
    justify-content: center;
    font-size: 1.8rem;
    color:#ffffff;
    font-weight: bold;
`;

const ModalBodyContainer = styled.div`
    width: 100%;
    height: 85%;
    background: #d9d9d9;
`;

const ProgressContainer = styled.div`
    width: 100%;
    height:25%;
    display:flex;
    align-items:center;
    justify-content: center;
    position:relative;
`;

const ProgressBox = styled.div`
    width:90%;
    height:60%;
    border: solid 2px;
    border-radius: 8px;
    background:#ffffff;
`;
const ProgressTextBox = styled.div`
    width:90%;
    height:60%;
    display:flex;
    align-items:center;
    justify-content: center;
    position:absolute;
    font-size: 2rem;
    font-weight: bold;
`;
const ProgressBar = styled.div`
    height:100%;
    border-radius: 6px 8px 8px 6px;
    background:#3388ff;
`;

const TaskContainer = styled.div`
    width: 100%;
    height:55%;
    display:flex;
    align-items:center;
    justify-content: center;
`;

const TaskTextConainer = styled.div`
    width: 90%;
    height: 100%;
    display:flex;
    flex-direction:colum;
    font-size:1.5rem;
`;

const ButtonContainer = styled.div`
    width: 100%;
    height:20%;
    display:flex;
    align-items:center;
    justify-content: end;
`;

const CancleButton = styled.div`
    width: 20%;
    height: 70%;
    border: solid 2px;
    display: flex;
    align-items:center;
    justify-content: center;
    background:#ffffff;
    margin-right: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 8px;
`;