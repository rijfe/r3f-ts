import styled from "styled-components";
import * as THREE from "three";
import gsap from "gsap";
import { useState } from "react";

interface ViewListProps{
    cameraRef: React.MutableRefObject<THREE.OrthographicCamera>,
}

function ViewList({cameraRef}: ViewListProps){
    const [curView, setCurView] = useState<number>(1);
    return (
        <ViewListContainer>
            <ViewBtn onClick={(e)=>{
                e.stopPropagation();
                let tl = gsap.timeline();
                if(curView !== 1){
                    if(curView === 2){
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:40,
                            y:0,
                            z:0,
                            ease:"linear"
                        });
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:0,
                            y:0,
                            z:40,
                            ease:"linear"
                        });
                    }
                    else{
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:0,
                            y:0,
                            z:40,
                            ease:"linear"
                        });
                    }
                }
                setCurView(1);
                cameraRef.current.lookAt(new THREE.Vector3(0,0,0));
            }}>
                1
            </ViewBtn>
            <ViewBtn onClick={(e)=>{
                e.stopPropagation();
                let tl = gsap.timeline();
                if(curView !== 2){
                    if(curView === 1){
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:-40,
                            y:0,
                            z:0,
                            ease:"linear"
                        });
                        // cameraRef.current.lookAt(new THREE.Vector3(0,0,0));
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:0,
                            y:0,
                            z:-40,
                            ease:"linear"
                        });
                    }
                    else{
                        if(curView === 5){
                            tl.to(cameraRef.current.position,{
                                duration:0.3,
                                x:0,
                                y:0,
                                z:40,
                                ease:"linear"
                            });
                            tl.to(cameraRef.current.position,{
                                duration:0.4,
                                x:-40,
                                y:0,
                                z:0,
                                ease:"linear"
                            });
                            tl.to(cameraRef.current.position,{
                                duration:0.3,
                                x:0,
                                y:0,
                                z:-40,
                                ease:"linear"
                            });
                        }
                        else if(curView === 6){
                            tl.to(cameraRef.current.position,{
                                duration:0.3,
                                x:0,
                                y:0,
                                z:40,
                                ease:"linear"
                            });
                            tl.to(cameraRef.current.position,{
                                duration:0.4,
                                x:-40,
                                y:0,
                                z:0,
                                ease:"linear"
                            });
                            tl.to(cameraRef.current.position,{
                                duration:0.3,
                                x:0,
                                y:0,
                                z:-40,
                                ease:"linear"
                            });
                        }
                        else{
                            tl.to(cameraRef.current.position,{
                                duration:0.5,
                                x:0,
                                y:0,
                                z:-40,
                                ease:"linear"
                            });
                        }
                        
                    }
                }
                setCurView(2);
                cameraRef.current.lookAt(new THREE.Vector3(0,0,0));
            }}>
                2
            </ViewBtn >
            <ViewBtn onClick={(e)=>{
                e.stopPropagation();
                let tl = gsap.timeline();
                if(curView !== 3){
                    if(curView === 4){
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:0,
                            y:0,
                            z:-40,
                            ease:"linear"
                        });
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:40,
                            y:0,
                            z:0,
                            ease:"linear"
                        });
                    }
                    else{
                        if(curView === 5 || curView === 6){
                            tl.to(cameraRef.current.position,{
                                duration:0.5,
                                x:0,
                                y:0,
                                z:40,
                                ease:"linear"
                            });
                            tl.to(cameraRef.current.position,{
                                duration:0.5,
                                x:40,
                                y:0,
                                z:0,
                                ease:"linear"
                            });
                        }
                        else{
                            tl.to(cameraRef.current.position,{
                                duration:0.5,
                                x:40,
                                y:0,
                                z:0,
                                ease:"linear"
                            });
                        }
                        
                    }
                }
                setCurView(3);
                // cameraRef.current.position.set(40,0,0);
                cameraRef.current.lookAt(new THREE.Vector3(0,0,0));
            }}>
                3
            </ViewBtn>
            <ViewBtn onClick={(e)=>{
                e.stopPropagation();
                let tl = gsap.timeline();
                if(curView !== 4){
                    if(curView === 3){
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:0,
                            y:0,
                            z:40,
                            ease:"linear"
                        });
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:-40,
                            y:0,
                            z:0,
                            ease:"linear"
                        });
                    }
                    else{
                        if(curView === 5 || curView === 6){
                            tl.to(cameraRef.current.position,{
                                duration:0.5,
                                x:0,
                                y:0,
                                z:40,
                                ease:"linear"
                            });
                            tl.to(cameraRef.current.position,{
                                duration:0.5,
                                x:-40,
                                y:0,
                                z:0,
                                ease:"linear"
                            });
                        }
                        else{
                            tl.to(cameraRef.current.position,{
                                duration:0.5,
                                x:-40,
                                y:0,
                                z:0,
                                ease:"linear"
                            });
                        }
                    }
                }
                setCurView(4);
                // cameraRef.current.position.set(-40,0,0);
                // cameraRef.current.lookAt(new THREE.Vector3(0,0,0));
            }}>
                4
            </ViewBtn>
            <ViewBtn onClick={(e)=>{
                e.stopPropagation();
                let tl = gsap.timeline();
                if(curView !== 5){
                    if(curView === 2){
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:-40,
                            y:0,
                            z:0,
                            ease:"linear"
                        });
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:0,
                            y:0,
                            z:40,
                            ease:"linear"
                        });
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:0,
                            y:40,
                            z:0,
                            ease:"linear"
                        });
                    }
                    else{
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:0,
                            y:0,
                            z:40,
                            ease:"linear"
                        });
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:0,
                            y:40,
                            z:0,
                            ease:"linear"
                        });
                    }
                }
                setCurView(5);
                
                cameraRef.current.lookAt(new THREE.Vector3(0,0,0));
            }}>
                5
            </ViewBtn>
            <ViewBtn onClick={(e)=>{
                e.stopPropagation();
                let tl = gsap.timeline();
                if(curView !== 6){
                    if(curView === 2){
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:-40,
                            y:0,
                            z:0,
                            ease:"linear"
                        });
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:0,
                            y:0,
                            z:40,
                            ease:"linear"
                        });
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:0,
                            y:-40,
                            z:0,
                            ease:"linear"
                        });
                    }
                    else{
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:0,
                            y:0,
                            z:40,
                            ease:"linear"
                        });
                        tl.to(cameraRef.current.position,{
                            duration:0.5,
                            x:0,
                            y:-40,
                            z:0,
                            ease:"linear"
                        });
                    }
                }

                setCurView(6);
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