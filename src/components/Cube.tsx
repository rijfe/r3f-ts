import { useBox } from "@react-three/cannon"

function Cube(props:any) {
    const [ref]:any = useBox(() => ({ mass: 1, ...props }))
    return (
      <mesh castShadow ref={ref}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
    )
  }

  export default Cube;