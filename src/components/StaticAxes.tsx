import { Cone, Hud, Line, OrthographicCamera, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

function StaticAxes({renderPriority=1, matrix = new THREE.Matrix4()}){
    const mesh = useRef<THREE.Mesh>(null!);
    const {camera, viewport} = useThree();
    
    useFrame(()=>{
        matrix.copy(camera.matrix).invert();
        mesh.current.quaternion.setFromRotationMatrix(matrix);
        if (mesh.current) {
            
            mesh.current.position.set(viewport.width, -viewport.height, 0); 
          }
    });

    return(
        <Hud renderPriority={renderPriority}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <OrthographicCamera 
                makeDefault 
                position={[0, 0, 10]} 
                zoom={2}
                near={-50}
            />
            <Axes ref={mesh} position={[viewport.width,-viewport.height,0]}/>
        </Hud>
    );
}

const Axes = forwardRef(({position}:any,fref)=>{
    const ref = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => (ref.current.rotation.x += delta))
    useImperativeHandle(fref, () => ref.current, [])

    return(
        <mesh
            ref={ref}
            position={position}
        >
            <Line
                points={[new THREE.Vector3(0,0,0),new THREE.Vector3(30,0,0)]}
                color={"#ff0000"}
                lineWidth={3}
                side={THREE.DoubleSide}
            />
            <Cone
                args={[3,6]}
                position={[32,0,0]}
                rotation-z ={-Math.PI/2}
            >
                <meshStandardMaterial color={"#ff0000"} side={THREE.DoubleSide}/>
            </Cone>
            <Line
                points={[new THREE.Vector3(0,0,0),new THREE.Vector3(0,30,0)]}
                color={"#009a00"}
                lineWidth={3}
                side={THREE.DoubleSide}
            />
            <Cone
                args={[3,6]}
                position={[0,32,0]}
            >
                <meshStandardMaterial color={"#009a00"} side={THREE.DoubleSide}/>
            </Cone>
            <Line
                points={[new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,30)]}
                color={"#0000ff"}
                lineWidth={3}
                side={THREE.DoubleSide}
            />
            <Cone
                args={[3,6]}
                position={[0,0,32]}
                rotation-x={Math.PI/2}
            >
                <meshStandardMaterial color={"#0000ff"} side={THREE.DoubleSide}/>
            </Cone>

            <Text color="#9a0000" position={[40, 0, 0]} scale={8}>
                X
            </Text>
            <Text color="#009a00" position={[0, 40, 0]} scale={8} >
                Y
            </Text>
            <Text color="#00009a" position={[-8, 0, 40]} scale={8} >
                Z
            </Text>
        </mesh>
    );
});

export default StaticAxes;