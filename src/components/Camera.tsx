import { useHelper, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

interface cameraProps {
    cameraRef: React.MutableRefObject<THREE.OrthographicCamera>
}

function Camera({cameraRef}:cameraProps){
    // useHelper(cameraRef, THREE.DirectionalLightHelper);
    // const camera = OrthographicCamera;
    
    
    return(
        <OrthographicCamera
            ref={cameraRef}              
            zoom={6}
            makeDefault
        >
        </OrthographicCamera>
    );
}

export default Camera;