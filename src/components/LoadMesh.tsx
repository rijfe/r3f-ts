import { useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRecoilState } from "recoil";
import { CatmullRomLine } from "@react-three/drei";
import create from 'zustand';

interface loadMesh{
    geometry: any,
    state : boolean,
    setState :  React.Dispatch<React.SetStateAction<boolean>>,
    color: Array<string>,
    cp: THREE.Vector3Tuple[],
    setCp : React.Dispatch<React.SetStateAction<THREE.Vector3Tuple[]>>,
    cpArr : Array<any>,
    visible : boolean,
    setVisible :  React.Dispatch<React.SetStateAction<boolean>>,
    setHoverd :  React.Dispatch<React.SetStateAction<boolean>>,
    useStore: any
}

function LoadMesh({ geometry, state, setState, color, cp, setCp, cpArr, visible, setVisible, setHoverd, useStore} : loadMesh){
    const meshRef = useRef<THREE.Mesh>(null!);
    const mateRef = useRef<THREE.MeshStandardMaterial>(null!);
    const coneRef1 = useRef<THREE.Mesh>(null!);
    const coneRef2 = useRef<THREE.Mesh>(null!);
    const coneRef3 = useRef<THREE.Mesh>(null!);
    const coneRef4 = useRef<THREE.Mesh>(null!);

    const { camera, raycaster, scene } = useThree();
    // const [point, setPoint] = useRecoilState(pointState);
    const [pEnter, setPEnter] = useState<boolean>(false);
    const [curPoint, setCurPoint] = useState<THREE.Vector3>();
    const [focus, setFocus] = useState<boolean>(false);
    const [width, setWidth] = useState<Array<number>>([]);
    const [height, setHeight] = useState<Array<number>>([]);
    const [centerZ, setCenterZ] = useState<number>(0);
    const setting = useStore((state:any)=>state.setTarget);
    // const { target, setTarget } = useStore()
    // useFrame(()=>{
    //     console.log(meshRef.current);
    // });

    useEffect(() => {
        if (!geometry || !meshRef.current) return;

        const boundingBox = new THREE.Box3().setFromObject(meshRef.current);
        const center = boundingBox.getCenter(new THREE.Vector3());

        // camera.position.copy(center);
        // console.log(center);
        // camera.position.x += boundingBox.getSize(new THREE.Vector3()).length(); 
        // camera.position.z += boundingBox.getSize(new THREE.Vector3()).length(); 
        // camera.position.y += boundingBox.getSize(new THREE.Vector3()).length();
        // camera.lookAt(center);
        setCp([]);
        setWidth([boundingBox.max.x, boundingBox.min.x]);
        setHeight([boundingBox.max.y, boundingBox.min.y]);
        setCenterZ(center.z);
        setFocus(false);
    }, []);

    // const handleMeshClick = (event: ThreeEvent<MouseEvent>) => {
    //     event.stopPropagation();

    //     const x = (event.clientX / window.innerWidth) * 2 - 1;
    //     const y = -(event.clientY / window.innerHeight) * 2 + 1;
    //     raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
    //     const intersects : any = raycaster.intersectObject(meshRef.current,false);
    //     if (intersects.length > 0){
    //         // console.log(intersects[0].point.toArray());
    //         let arr = intersects[0].point.toArray();
    //         arr.map((ele:number,idx:number)=>{
    //             arr[idx] = Math.round(ele*10)/10;
    //         })
    //         setPoint(arr);
    //         setCp(pre=>[...pre, arr]);
    //         setCurPoint(arr);
    //     }
    // };

    // useEffect(()=>{
    //     if(!state)saveLine();
    //     console.log(cpArr);
    // },[state])
    //const vector3Array: THREE.Vector3[] = cp.map(tuple => new THREE.Vector3().fromArray(tuple));

    return( 
            <mesh 
                geometry={geometry} 
                ref={meshRef} 
                // onClick={state ? handleMeshClick : ()=>{}}
                onDoubleClick={(event)=>{
                    event.stopPropagation();
                    setting(event.object);
                    setVisible(!visible);
                    setFocus(!focus);
                }}
                onPointerOver={()=>{
                    if(focus){
                        setHoverd(true);
                    }
                    
                }}
                onPointerOut={()=>{
                    if(focus){
                        setHoverd(false);
                    }
                }}
                
                // onClick={(e)=>{
                //     e.stopPropagation();
                //     if(focus){
                //         setFocus(!focus);
                //     }  
                // }}
            >
                <meshStandardMaterial ref={mateRef} color={focus ? "#fcf000" : "#ffffff"} side={THREE.DoubleSide}/>
                {/* <Outlines thickness={0.01}/> */}
                {state ? (cp.length > 0 ? <CatmullRomLine
                    points={cp}
                    color="red"
                    lineWidth={5}
                    closed={true}
                />:null):cpArr.length > 0 ? cpArr?.map((points:any, idx:number)=>(
                    points.length > 0 ? <CatmullRomLine
                        points={points}
                        color={`${color[idx]}`}
                        lineWidth={5}
                        closed={true}
                    />: null
                )) :null}
            {pEnter ? <mesh position={curPoint}>
                    <sphereGeometry args={[0.2]}/>
                    <meshStandardMaterial color="red"/>
                </mesh>:null}
                {/* {cp.map((point, index) => (
                    <points key={index} position={[point[0], point[1], point[2]]}>
                        <sphereGeometry args={[4, 16, 16]} />
                        <meshStandardMaterial color="red" />
                    </points>
                ))} */}
                {/* {focus ? 
            <>
                <Cone
                    ref={coneRef1}
                    args={[1, 2, 8]}
                    position={[width[0] + 5, (height[0]+height[1])/2, centerZ]}
                    rotation-z={-Math.PI / 2}
                    onClick={(event)=>{
                        meshRef.current.position.x += 1;
                        event.object.position.x += 1;
                        coneRef2.current.position.x += 1;
                        coneRef3.current.position.x += 1;
                        coneRef4.current.position.x += 1;
                        setWidth([event.object.position.x-5, coneRef2.current.position.x+5]);
                    }}
                >
                    <meshStandardMaterial color={"#ff0000"} />
                </Cone>
                <Cone
                    ref={coneRef2}
                    args={[1, 2, 8]}
                    position={[width[1] - 5, (height[0]+height[1])/2, centerZ]}
                    rotation-z={Math.PI / 2}
                    onClick={(event)=>{
                        meshRef.current.position.x -= 1;
                        event.object.position.x -= 1;
                        coneRef1.current.position.x -= 1;
                        coneRef3.current.position.x -= 1;
                        coneRef4.current.position.x -= 1;
                        setWidth([coneRef1.current.position.x-5, event.object.position.x+5]);
                    }}
                >
                        <meshStandardMaterial color={"#ff0000"} />
                </Cone>
                <Cone
                    ref={coneRef3}
                    args={[1, 2, 8]}
                    position={[(width[0]+width[1])/2, height[0]+5, centerZ]}
                    rotation-y={Math.PI / 2}
                    onClick={(event)=>{
                        meshRef.current.position.y += 1;
                        event.object.position.y += 1;
                        coneRef1.current.position.y += 1;
                        coneRef2.current.position.y += 1;
                        coneRef4.current.position.y += 1;
                        setHeight([event.object.position.y-5, coneRef4.current.position.y+5]);
                    }}
                >
                        <meshStandardMaterial color={"#ff0000"} />
                </Cone>
                <Cone
                    ref={coneRef4}
                    args={[1, 2, 8]}
                    position={[(width[0]+width[1])/2, height[1]-5, centerZ]}
                    rotation-z={-Math.PI}
                    onClick={(event)=>{
                        meshRef.current.position.y-= 1;
                        event.object.position.y -= 1;
                        coneRef1.current.position.y -= 1;
                        coneRef2.current.position.y -= 1;
                        coneRef3.current.position.y -= 1;
                        setHeight([coneRef3.current.position.y-5, event.object.position.y+5]);
                    }}
                >
                        <meshStandardMaterial color={"#ff0000"} />
                </Cone>
            </>
            : null} */}
            </mesh>
            
    );
}

export default LoadMesh;