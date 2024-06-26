import { useEffect, useState } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";

import Plane from "../components/Plane";
import Cube from "../components/Cube";
import HeadContainer from "../components/HeadContainer";

function FallingCubePage(){

    const [ready, setReady] = useState<boolean>(false);
    const [state, setState] = useState<number>(1);

    useEffect(()=>{
        const timeout = setTimeout(()=> setReady(true), 1000);
        return () => clearTimeout(timeout);
    },[state]);

    return(
        <FallingCubePageContainer>
            <HeadContainer>
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

const RestartBtn = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 5rem;
    border: 1px solid;
    font-size:2rem;
`;