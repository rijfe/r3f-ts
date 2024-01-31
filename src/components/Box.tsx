import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from 'three'

interface BoxProps{
    position?: [number, number, number];
    num: number;
    setNum: React.Dispatch<React.SetStateAction<number>>;
}

function Box(props:BoxProps){
    const ref = useRef<Mesh>(null!)

    const [hoverd, setHovered] = useState<boolean>(false);
    const [clicked, setClicked] = useState<boolean>(false);

    useFrame((state, delta)=>(ref.current.rotation.x += delta));

    return(
        <mesh
            position={props.position}
            ref={ref}
            scale={props.num}
            onClick={(e)=>{props.setNum(props.num+0.5);}}
            onPointerOver={(e)=>(e.stopPropagation(), setHovered(true))}
            onPointerOut={(e)=>{setHovered(false);}}
        >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={hoverd ? 'hotpink' : 'orange'}/>
        </mesh>
    );
}

export default Box;