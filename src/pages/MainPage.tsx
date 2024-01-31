import styled from "styled-components";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";

import Box from "../components/Box";

function MainPage(){
    const navigate = useNavigate();

    const [num, setNum] = useState<number>(1);
    const [num2, setNum2] = useState<number>(1);

    return(
        <MainPageContainer>
            <Canvas>
                <ambientLight intensity={Math.PI / 2}/>
                <spotLight position={[10,10,10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>
                <Box position={[-1.2, 0, 0]} num={num} setNum={setNum}/>
                <Box position={[1.2, 0, 0]} num={num2} setNum={setNum2}/>
            </Canvas>

            <PageMoveBtn
                onClick={()=>{
                    navigate("/falling")
                }}
            >
                ➡️
            </PageMoveBtn>

            <ResetBtn onClick={()=>{
                setNum(1);
                setNum2(1);
            }}>
                RESET
            </ResetBtn>
        </MainPageContainer>
    );
}

export default MainPage;

const MainPageContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const PageMoveBtn = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 5rem;
    border: 1px solid;
`


const ResetBtn = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 5rem;
    border: 1px solid;
`