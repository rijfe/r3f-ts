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
        // const newS = new THREE.Scene();
        // console.log(ref);

        // if (ref && (ref as React.MutableRefObject<HTMLDivElement>).current) {
        //     const content = (ref as React.MutableRefObject<HTMLDivElement>).current;
        //     const element = document.createElement('div');
        //     element.className = 'list-item';

        //     const sceneElement = document.createElement('div');
        //     element.appendChild(sceneElement);
        //     const descriptionElement = document.createElement('div');
        //     descriptionElement.innerText = 'Test';
        //     element.appendChild(descriptionElement);
        //     newS.userData.element = sceneElement;
        //     content.appendChild(element);

        //     const geometries = [
        //         new THREE.BoxGeometry(1, 1, 1),
        //         new THREE.SphereGeometry(0.5, 12, 8),
        //         new THREE.DodecahedronGeometry(0.5),
        //         new THREE.CylinderGeometry(0.5, 0.5, 1, 12)
        //     ];

        //     const geometry = geometries[Math.floor(geometries.length * Math.random())];

        //     const material = new THREE.MeshStandardMaterial({
        //         color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
        //         roughness: 0.5,
        //         metalness: 0,
        //         flatShading: true
        //     });

        //     newS.add(new THREE.Mesh(geometry, material));
        //     newS.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444, 3));

        //     const light = new THREE.DirectionalLight(0xffffff, 1.5);
        //     light.position.set(1, 1, 1);
        //     newS.add(light);
        //     const ele = newS.userData.element;

        //     // get its position relative to the page's viewport
        //     const rect = ele.getBoundingClientRect();

        //     // check if it's offscreen. If so skip it
        //     if ( rect.bottom < 0 || rect.top > gl.domElement.clientHeight ||
        //             rect.right < 0 || rect.left > gl.domElement.clientWidth ) {

        //         return; // it's off screen

        //     }

        //     // set the viewport
        //     const width = rect.right - rect.left;
        //     const height = rect.bottom - rect.top;
        //     const left = rect.left;
        //     const bottom = gl.domElement.clientHeight - rect.bottom;

        //     gl.setViewport( left, bottom, width, height );
        //     gl.setScissor( left, bottom, width, height );

        //     gl.render(newS, new THREE.OrthographicCamera(-100,100,-100,100,0.1,-100));
        // }
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