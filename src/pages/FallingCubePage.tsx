import { useEffect, useState } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

import Plane from "../components/Plane";
import Cube from "../components/Cube";

function FallingCubePage(){
    const [ready, setReady] = useState<boolean>(false);

    useEffect(()=>{
        const timeout = setTimeout(()=> setReady(true), 1000);
        return () => clearTimeout(timeout);
    },[]);

    return(
        <FallingCubePageContainer>
            <Canvas dpr={[1,2]} shadows camera={{position:[-5,5,5], fov: 50}}>
                <ambientLight />
                <spotLight angle={0.25} penumbra={0.5} position={[10, 10, 5]} castShadow/>
                <Physics>
                    <Plane/>
                    <Cube position={[0, 5, 0]} />
                    <Cube position={[0.45, 7, -0.25]} />
                    <Cube position={[-0.45, 9, 0.25]} />
                    {ready && <Cube position={[-0.45, 10, 0.25]} />}
                </Physics>
            </Canvas>
        </FallingCubePageContainer>
    );
}

export default FallingCubePage;

const FallingCubePageContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;