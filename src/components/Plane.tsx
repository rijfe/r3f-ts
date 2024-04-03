import { usePlane } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";

function Plane(props: any){
    const [ref] : any = usePlane(()=>({rotation:[-Math.PI/2,0,0], ...props}));

    // useFrame(()=>{
    //     ref.current.position.x = 0;
    //     ref.current.position.z = 0; 
    // });

    return(
        <mesh receiveShadow ref={ref}>
            <planeGeometry args={[1000,1000]}/>
            <meshStandardMaterial color="#f0f0f0"/>
        </mesh>
    );
}

export default Plane;