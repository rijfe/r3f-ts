import { useEffect, useState } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { ChromePicker } from "react-color";

import Plane from "../components/Plane";
import Cube from "../components/Cube";

function FallingCubePage(){
    const navigate = useNavigate();
    const [ready, setReady] = useState<boolean>(false);
    const [state, setState] = useState<number>(1);

    useEffect(()=>{
        const timeout = setTimeout(()=> setReady(true), 1000);
        return () => clearTimeout(timeout);
    },[state]);

    return(
        <FallingCubePageContainer>
            <HeadContainer>
                <PageMoveBtn
                    onClick={()=>{
                        navigate("/main");
                    }}
                >
                    Back
                </PageMoveBtn>
                <RestartBtn onClick={()=>{
                    setState(state+1);
                    setReady(false);
                }}>
                    ReStart
                </RestartBtn>
                <PageMoveBtn
                    onClick={()=>{
                        navigate("/load");
                    }}
                >
                    Next
                </PageMoveBtn>
            </HeadContainer>
            <Canvas dpr={[1,2]} shadows camera={{position:[-5,5,5], fov: 50}}>
                <ambientLight />
                <spotLight position={[10,10,10]} angle={0.25} penumbra={1} decay={0} intensity={Math.PI} castShadow/>
                <Physics>
                    <Plane/>
                    {ready && <Cube position={[0, 5, 0]} />}
                    {ready && <Cube position={[0.45, 7, -0.25]} />}
                    {ready && <Cube position={[-0.45, 9, 0.25]} />}
                    {ready && <Cube position={[-0.45, 10, 0.25]} />}
                </Physics>
                <OrbitControls/>
            </Canvas>
        </FallingCubePageContainer>
    );
}

export default FallingCubePage;

const FallingCubePageContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

const HeadContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const PageMoveBtn = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 5rem;
    border: 1px solid;
    font-size:2rem;

    &:hover{
        border-color:red;
        font-weight: 900;
    }
`;

const RestartBtn = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 5rem;
    border: 1px solid;
    font-size:2rem;
`;