import styled from "styled-components";

interface ProgressModalProps{
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    percent: number
}

function ProgressModal(props:ProgressModalProps){
    return(
        <ModalContainer>
            <ModalTitleContainer>
                <ModalBtnContainer/>
                <ModalTitle>
                    Calculating toolpath
                </ModalTitle>
                <ModalBtnContainer>
                    <Button
                        onClick={()=>{
                            props.setModalOpen(false);
                        }}
                    >
                        ㅡ
                    </Button>
                </ModalBtnContainer>
            </ModalTitleContainer>
            <ModalBodyContainer>
                <ProgressContainer>
                    <ProgressBox>
                        <ProgressBar style={props.percent < 100 ? {width:`${props.percent}%`, borderRight:"solid 3px"} : {width:`${props.percent}%`, borderRadius:"6px 6px 6px 6px"}}/>
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
                    <CancleButton>
                        Cancle
                    </CancleButton>
                </ButtonContainer>
            </ModalBodyContainer>
        </ModalContainer>
    );
}

export default ProgressModal;

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