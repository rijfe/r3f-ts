import { useHelper, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

interface cameraProps {
    cameraRef: React.MutableRefObject<THREE.OrthographicCamera>
}

function Camera({cameraRef}:cameraProps){
    useHelper(cameraRef, THREE.CameraHelper);
    // useFrame((state, delta)=>{
    //     console.log(state);
    // });
    // console.log(cameraRef.current);
    return(
        <OrthographicCamera
            ref={cameraRef}
            makeDefault               
            zoom={8}
            top={1000}
            bottom={-1000}
            left={1000}
            right={-1000}
            near={-30}
            far={2000}
            position={[0,0,-10]}
        />
    );
}

export default Camera;