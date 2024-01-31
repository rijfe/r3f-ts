import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";

import Box from "../components/Box";

function MainPage(){
    const navigate = useNavigate();
    return(
        <MainPageContainer>
            <Canvas>
                <ambientLight intensity={Math.PI / 2}/>
                <spotLight position={[10,10,10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>
                <Box position={[-1.2, 0, 0]}/>
                <Box position={[1.2, 0, 0]} />
            </Canvas>

            <PageMoveBtn
                onClick={()=>{
                    navigate("/falling")
                }}
            >
                ➡️
            </PageMoveBtn>
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