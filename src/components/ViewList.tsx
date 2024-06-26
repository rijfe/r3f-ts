import styled from "styled-components";
import * as THREE from "three";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html} from "@react-three/drei";

interface ViewListProps{
    cameraRef: React.MutableRefObject<THREE.OrthographicCamera>,
    controlRef: any,
    lightRef: React.MutableRefObject<THREE.DirectionalLight>,
    lightRef2: React.MutableRefObject<THREE.DirectionalLight>,
    htmlRef: React.MutableRefObject<THREE.Group>,
    jigRef:React.MutableRefObject<THREE.Group>,
    state: boolean
}

function ViewList({cameraRef, controlRef, lightRef, lightRef2, htmlRef, jigRef, state}: ViewListProps){
    const [curView, setCurView] = useState<number>(1);
    
    const {camera, viewport} = useThree();
    
    useFrame(()=>{
        if(controlRef.current) controlRef.current.update();
        
        if(lightRef.current && lightRef2.current){
            lightRef.current.position.lerp(camera.position, 0.1);
            lightRef2.current.position.lerp(camera.position, 0.1);
        }
        
        htmlRef.current.position.lerp(camera.position,0.3);
        htmlRef.current.updateMatrix();
    });

    useEffect(()=>{
    
    },[state]);
 
    return (
        <group ref={htmlRef} >
            <Html
                as="div"
                className="viewlist"
                style={{zIndex:10}}
                fullscreen
                onClick={(e)=>{e.stopPropagation(); console.log("click");}}       
            >

                <ViewListContainer>
                    <ViewBtn onClick={(e)=>{
                        e.stopPropagation();
                        let tl = gsap.timeline();
                        tl.clear();
                        if(curView !== 1){
                            if(curView === 2){
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:40,
                                    y:0,
                                    z:0,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:0,
                                    z:40,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                            }
                            else{
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:0,
                                    z:40,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                            }
                        }
                        else{
                            if(camera.position.x !== 0 || camera.position.y !== 0 || camera.position.z !== 40){
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:0,
                                    z:40,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                            }
                        }
                        setCurView(1);
                        
                    }}>
                        1
                    </ViewBtn>
                    <ViewBtn onClick={(e)=>{
                        e.stopPropagation();
                        let tl = gsap.timeline();
                        tl.clear();
                        if(curView !== 2){
                            if(curView === 1){
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:-40,
                                    y:0,
                                    z:0,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:0,
                                    z:-40,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                            }
                            else{
                                if(curView === 5){
                                    tl.to(camera.position,{
                                        duration:0.3,
                                        x:0,
                                        y:0,
                                        z:40,
                                        ease:"linear",
                                        onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                    });
                                    tl.to(camera.position,{
                                        duration:0.4,
                                        x:-40,
                                        y:0,
                                        z:0,
                                        ease:"linear",
                                        onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                    });
                                    tl.to(camera.position,{
                                        duration:0.3,
                                        x:0,
                                        y:0,
                                        z:-40,
                                        ease:"linear",
                                        onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                    });
                                }
                                else if(curView === 6){
                                    tl.to(camera.position,{
                                        duration:0.3,
                                        x:0,
                                        y:0,
                                        z:40,
                                        ease:"linear",
                                        onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                    });
                                    tl.to(camera.position,{
                                        duration:0.4,
                                        x:-40,
                                        y:0,
                                        z:0,
                                        ease:"linear",
                                        onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                    });
                                    tl.to(camera.position,{
                                        duration:0.3,
                                        x:0,
                                        y:0,
                                        z:-40,
                                        ease:"linear",
                                        onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                    });
                                }
                                else{
                                    tl.to(camera.position,{
                                        duration:0.5,
                                        x:0,
                                        y:0,
                                        z:-40,
                                        ease:"linear",
                                        onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                    });
                                }
                                
                            }
                        }
                        else{
                            if(camera.position.x !== 0 || camera.position.y !== 0 || camera.position.z !== -40){
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:0,
                                    z:-40,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                            }
                        }
                        setCurView(2);
                    }}>
                        2
                    </ViewBtn >
                    <ViewBtn onClick={(e)=>{
                        e.stopPropagation();
                        let tl = gsap.timeline();
                        tl.clear();
                        if(curView !== 3){
                            if(curView === 4){
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:0,
                                    z:-40,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                                tl.to(camera.rotation,{
                                    duration:0.3,
                                    x:0,
                                    y:0,
                                    z:0
                                });
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:40,
                                    y:0,
                                    z:0,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                            }
                            else{
                                if(curView === 5 || curView === 6){
                                    tl.to(camera.position,{
                                        duration:0.5,
                                        x:0,
                                        y:0,
                                        z:40,
                                        ease:"linear",
                                        onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                    });
                                    tl.to(camera.position,{
                                        duration:0.5,
                                        x:40,
                                        y:0,
                                        z:0,
                                        ease:"linear",
                                        onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                    });
                                }
                                else{
                                    tl.to(camera.position,{
                                        duration:0.5,
                                        x:40,
                                        y:0,
                                        z:0,
                                        ease:"linear",
                                        onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                    });
                                }
                                
                            }
                        }
                        else{
                            if(camera.position.x !== 40 || camera.position.y !== 0 || camera.position.z !== 0){
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:40,
                                    y:0,
                                    z:0,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                            }
                        }
                        setCurView(3);
                        // camera.position.set(40,0,0);
                        
                    }}>
                        3
                    </ViewBtn>
                    <ViewBtn onClick={(e)=>{
                        e.stopPropagation();
                        let tl = gsap.timeline();
                        if(curView !== 4){
                            if(curView === 3){
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:0,
                                    z:40,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:-40,
                                    y:0,
                                    z:0,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                            }
                            else{
                                if(curView === 5 || curView === 6){
                                    tl.to(camera.position,{
                                        duration:0.5,
                                        x:0,
                                        y:0,
                                        z:40,
                                        ease:"linear",
                                        onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                    });
                                    tl.to(camera.position,{
                                        duration:0.5,
                                        x:-40,
                                        y:0,
                                        z:0,
                                        ease:"linear",
                                        onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                    });
                                }
                                else{
                                    tl.to(camera.position,{
                                        duration:0.5,
                                        x:-40,
                                        y:0,
                                        z:0,
                                        ease:"linear",
                                        onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                    });
                                }
                            }
                        }
                        else{
                            if(camera.position.x !== -40 || camera.position.y !== 0 || camera.position.z !== 0){
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:-40,
                                    y:0,
                                    z:0,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                            }
                        }
                        setCurView(4);
                        // camera.position.set(-40,0,0);
                        // camera.lookAt(new THREE.Vector3(0,0,0));
                    }}>
                        4
                    </ViewBtn>
                    <ViewBtn onClick={(e)=>{
                        e.stopPropagation();
                        let tl = gsap.timeline();
                        if(curView !== 5){
                            if(curView === 2){
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:-40,
                                    y:0,
                                    z:0,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:0,
                                    z:40,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:40,
                                    z:0,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                            }
                            else{
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:0,
                                    z:40,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:40,
                                    z:0,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                            }
                        }
                        else{
                            if(camera.position.x !== 0 || camera.position.y !== 40 || camera.position.z !== 0){
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:40,
                                    z:0,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                            }
                        }
                        setCurView(5);
                        
                        
                    }}>
                        5
                    </ViewBtn>
                    <ViewBtn onClick={(e)=>{
                        e.stopPropagation();
                        let tl = gsap.timeline();
                        if(curView !== 6){
                            if(curView === 2){
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:-40,
                                    y:0,
                                    z:0,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:0,
                                    z:40,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:-40,
                                    z:0,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                            }
                            else{
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:0,
                                    z:40,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:-40,
                                    z:0,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                            }
                        }
                        else{
                            if(camera.position.x !== 0 || camera.position.y !== -40 || camera.position.z !== 0){
                                tl.to(camera.position,{
                                    duration:0.5,
                                    x:0,
                                    y:-40,
                                    z:0,
                                    ease:"linear",
                                    onUpdate: () => { 
                                        camera.lookAt(0, 0, 0) // Look to a target during the animation
                                    }, 
                                });
                            }
                        }
                        setCurView(6);
                        
                    }}>
                        6
                    </ViewBtn>
                    <ViewBtn
                        onClick={()=>{
                            controlRef.current.reset();
                            lightRef.current.position.lerp(new THREE.Vector3(10,0,40),0.1);
                            lightRef2.current.position.lerp(new THREE.Vector3(-10,0,40),0.1);
                        }}
                    >
                        7
                    </ViewBtn>
                    <ViewBtn
                        onClick={()=>{
                            gsap.to(camera, {
                                zoom: 8,
                                duration: 0.7,
                                onUpdate: () => {
                                  camera.updateProjectionMatrix();
                                },
                              });
                        }}
                    >
                        8
                    </ViewBtn>
                </ViewListContainer>
            </Html>
            
        </group>
        
        
    );
}

export default ViewList;

const ViewListContainer = styled.div`
    width: 6rem;
    height:100%;
    border: 1px solid;
    position: absolute;
    right:0;
    top:0;
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