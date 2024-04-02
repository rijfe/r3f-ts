import { useHelper, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

interface cameraProps {
    cameraRef: React.MutableRefObject<THREE.OrthographicCamera>
}

function Camera({cameraRef}:cameraProps){
    // useHelper(cameraRef, THREE.CameraHelper);
    // const camera = OrthographicCamera;
    
    
    return(
        <OrthographicCamera
            ref={cameraRef}              
            zoom={6}
            makeDefault
            onUpdate={(c)=>{
                c.updateProjectionMatrix();
            }}
        >
        </OrthographicCamera>
    );
}

export default Camera;