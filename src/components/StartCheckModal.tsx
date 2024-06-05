import styled from "styled-components";
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

interface StartCheckModalProps{
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setArr: React.Dispatch<React.SetStateAction<Array<ProgressProps>>>,
    arr: Array<ProgressProps>,
    posArr: Array<posProps>,
    setPosArr: React.Dispatch<React.SetStateAction<posProps[]>>,
    posName: String,
    setPModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

function StartCheckModal(props : StartCheckModalProps){
    return(
        <ModalContainer>
            <ModalTitleContainer>
                CHECK
            </ModalTitleContainer>
            <ModalBodyContainer>
                <FileInfoContainer>
                    <FileInfoBox>
                        <p style={{fontSize:"2rem"}}>P2</p>
                        <p style={{fontSize:"2rem"}}>veneer1</p>
                        <p style={{fontSize:"2rem"}}>A7_lithium_dicilicate_veneer_(3+2X)_single</p>
                    </FileInfoBox>
                </FileInfoContainer>
                <ButtonContainer>
                    <Button
                        onClick={()=>{
                            let idx = props.posArr.findIndex(item => item.pos === props.posName);
                            if(props.arr.findIndex(item => item.name === props.posName) === -1){
                                let data : ProgressProps = {
                                    name : props.posName,
                                    percent: Math.floor(Math.random()*(100-1)+1),
                                    mini: false
                                };
                                props.setArr(pre => [...pre,data]);
                                props.setPModalOpen(true);
                                let newArr = [...props.posArr];
                                newArr[idx].data.caculating=true;
                                props.setPosArr(newArr);
                            }
                            else{
                                if(!props.arr[props.arr.findIndex(item => item.name === props.posName)].mini) props.setPModalOpen(true);
                                let newArr = [...props.posArr];
                                newArr[idx].data.caculating=true;
                                props.setPosArr(newArr);
                            }
                            props.setModalOpen(false);
                        }}
                    >
                        Start
                    </Button>
                    <Button
                        onClick={()=>{
                            props.setModalOpen(false);
                        }}
                    >
                        Cancle
                    </Button>
                </ButtonContainer>
            </ModalBodyContainer>
        </ModalContainer>
    );
}

export default StartCheckModal;

const ModalContainer = styled.div`
    display:flex;
    width: 60rem;
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
    border-bottom: solid 2px black;
    display:flex;
    flex-direction:row;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    color: #ffffff;
    font-weight: bold;
`;

const ModalBodyContainer = styled.div`
    width: 100%;
    height: 85%;
    background: #d9d9d9;
`;

const FileInfoContainer = styled.div`
    width:100%;
    height: 80%;
    display: flex;
    justify-content:center;
    align-items:center;
`;

const FileInfoBox = styled.div`
    width:90%;
    height: 15%;
    display:flex;
    flex-direction:row;
    justify-content: space-around;
    align-items: center;
`;

const ButtonContainer = styled.div`
    width:100%;
    height: 20%;
    display: flex;
    justify-content:end;
    align-items:center;
`;

const Button = styled.div`
    width: 15%;
    height: 80%;
    display:flex;
    justify-content:center;
    align-items:center;
    border: solid 2px black;
    border-radius: 6px;
    background: #ffffff;
    font-size:2rem;
    font-weight: bold;
    margin-right: 2rem;
    margin-bottom: 0.5rem;
`;