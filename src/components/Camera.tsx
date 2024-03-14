import { useHelper, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

interface cameraProps {
    cameraRef: React.MutableRefObject<THREE.OrthographicCamera>
}

function Camera({cameraRef}:cameraProps){
    useHelper(cameraRef, THREE.CameraHelper);
    
    return(
        <OrthographicCamera
            ref={cameraRef}              
            zoom={6}
            top={1000}
            bottom={-1000}
            left={1000}
            right={-1000}
            near={0.1}
            far={2000}
            position={[0,0,0]}
            makeDefault
        />
    );
}

export default Camera;