import styled from "styled-components";
import * as THREE from "three";
import gsap from "gsap";

interface ViewListProps{
    cameraRef: React.MutableRefObject<THREE.OrthographicCamera>,
}

function ViewList({cameraRef}: ViewListProps){
    return (
        <ViewListContainer>
            <ViewBtn onClick={(e)=>{
                e.stopPropagation();
                gsap.to(cameraRef.current.position,{
                    duration:1,
                    x:0,
                    y:0,
                    z:40,
                    ease:"linear"
                });
                // cameraRef.current.position.set(0,0,-40);
                cameraRef.current.lookAt(new THREE.Vector3(0,0,0));
            }}>
                1
            </ViewBtn>
            <ViewBtn onClick={(e)=>{
                e.stopPropagation();
                gsap.to(cameraRef.current.position,{
                    duration:1,
                    x:0,
                    y:0,
                    z:-40,
                    ease:"linear"
                });
                // cameraRef.current.position.set(0,0,40);
                
                cameraRef.current.lookAt(new THREE.Vector3(0,0,0));
            }}>
                2
            </ViewBtn >
            <ViewBtn onClick={(e)=>{
                e.stopPropagation();
                gsap.to(cameraRef.current.position,{
                    duration:1,
                    x:40,
                    y:0,
                    z:0,
                    ease:"linear"
                });
                // cameraRef.current.position.set(40,0,0);
                cameraRef.current.lookAt(new THREE.Vector3(0,0,0));
            }}>
                3
            </ViewBtn>
            <ViewBtn onClick={(e)=>{
                e.stopPropagation();
                gsap.to(cameraRef.current.position,{
                    duration:1,
                    x:-40,
                    y:0,
                    z:0,
                    ease:"linear"
                });
                // cameraRef.current.position.set(-40,0,0);
                cameraRef.current.lookAt(new THREE.Vector3(0,0,0));
            }}>
                4
            </ViewBtn>
            <ViewBtn onClick={(e)=>{
                e.stopPropagation();
                gsap.to(cameraRef.current.position,{
                    duration:1,
                    x:0,
                    y:40,
                    z:0,
                    ease:"linear"
                });
                // cameraRef.current.position.set(0,40,0);
                cameraRef.current.lookAt(new THREE.Vector3(0,0,0));
            }}>
                5
            </ViewBtn>
            <ViewBtn onClick={(e)=>{
                e.stopPropagation();
                gsap.to(cameraRef.current.position,{
                    duration:1,
                    x:0,
                    y:-40,
                    z:0,
                    ease:"linear"
                });
                // cameraRef.current.position.set(0,-40,0);
                cameraRef.current.lookAt(new THREE.Vector3(0,0,0));
            }}>
                6
            </ViewBtn>
        </ViewListContainer>
    );
}

export default ViewList;

const ViewListContainer = styled.div`
    width: 6rem;
    height:50%;
    border: 1px solid;
    position: absolute;
    right:2rem;
    top:30rem;
    z-index: 10;
    display: flex;
    flex-direction: column;
`;

const ViewBtn = styled.div`
    width:100%;
    height:10%;
    display:flex;
    justify-content: center;
    align-items:center;
`;