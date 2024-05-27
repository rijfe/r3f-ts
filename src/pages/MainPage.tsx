import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";

import Box from "../components/Box";
import HeadContainer from "../components/HeadContainer";
import { useRecoilValue } from "recoil";
import { getUserInfo } from "../store/UserInfo";
import { Html, Hud, OrbitControls, View } from "@react-three/drei";
import { BufferGeometry, MeshStandardMaterial } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import AxesHelper from "../components/AxesHelper";
import StaticAxes from "../components/StaticAxes";

function MainPage() {
    const navigate = useNavigate();
    const userId = useRecoilValue(getUserInfo);
    const [num, setNum] = useState<number>(1);
    const [num2, setNum2] = useState<number>(1);
    const [geometry, setGeometry] = useState<BufferGeometry>();

    const [state, setState] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        if (userId === "") {
            window.alert("login 해주세요.");
            navigate(-1);
        }
    }, [navigate, userId]);

    useEffect(() => {
        const loader = new STLLoader();
        loader.load(`/models/150-지그 1.stl`, async geo=>{
            setGeometry(geo);
        });
    }, []);

    return (
        <MainPageContainer ref={ref}>
            <HeadContainer>
                <PageMoveBtn
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    Back
                </PageMoveBtn>

                <ResetBtn onClick={() => {
                    setNum(1);
                    setNum2(1);
                }}>
                    RESET
                </ResetBtn>

                <PageMoveBtn
                    onClick={() => {
                        navigate("/falling");
                    }}
                >
                    Next
                </PageMoveBtn>
            </HeadContainer>
          
            <Canvas >
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <Box ref={ref} state={state} position={[-1.2, 0, 0]} num={num} setNum={setNum} />
                <Box ref={ref} state={state} position={[1.2, 0, 0]} num={num2} setNum={setNum2} />
                             
                <OrbitControls/>
            </Canvas>
        </MainPageContainer>
    );
}

export default MainPage;

const MainPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const PageMoveBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 5rem;
    border: 1px solid;
    font-size: 2rem;

    &:hover {
        border-color: red;
        font-weight: 900;
    }
`;

const ResetBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 5rem;
    border: 1px solid;
    font-size: 1.5rem;

    &:hover {
        font-weight: 900;
        border-color: skyblue;
        border-width: 1rem;
    }
`;