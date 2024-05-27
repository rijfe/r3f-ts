import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState, forwardRef } from "react";
import * as THREE from 'three';

interface BoxProps {
    position?: [number, number, number];
    num: number;
    setNum: React.Dispatch<React.SetStateAction<number>>;
    state: boolean;
}

const Box = forwardRef<HTMLDivElement, BoxProps>(({ position, num, setNum, state }, ref) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const { gl } = useThree();

    const [hovered, setHovered] = useState<boolean>(false);

    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta;
        meshRef.current.rotation.x -= delta;
        meshRef.current.rotation.z += delta;
    });

    useEffect(() => {
        
    }, [state, gl, ref]);

    return (
        <mesh
            position={position}
            ref={meshRef}
            scale={num}
            onClick={() => setNum(num + 0.5)}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
            onPointerOut={() => setHovered(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    );
});

export default Box;