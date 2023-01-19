import { ReactElement, Suspense, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DoubleSide, Euler, PointLight, Vector3 } from "three";
import { Loading, Model } from "./Model";

interface GeometryProps {
  selectedMaterial: string;
}
export const Geometry = ({ selectedMaterial }: GeometryProps): ReactElement => {
  const { scene, camera, gl } = useThree();
  const controls = new OrbitControls(camera, gl.domElement);
  const pointLightRef = useRef<PointLight>(null);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.5;
  controls.zoomSpeed = 0.1;
  scene.add(camera);
  if (pointLightRef.current) camera.add(pointLightRef.current);
  const [boxPosition, setBoxPosition] = useState<{
    x: number;
    y: number;
    z: number;
  }>({
    x: 0,
    y: 0,
    z: 0,
  });

  useFrame((state, delta, xrFrame) => {
    // setBoxPosition({
    //   ...boxPosition,
    //   x: Math.cos(state.clock.getElapsedTime()),
    //   y: Math.sin(state.clock.getElapsedTime()),
    // });
    controls.update();
  });

  return (
    <>
      <pointLight ref={pointLightRef} position={[-5, 4, 10]} />
      {/* <mesh
        position={[0, 0, 0]}
        scale={[10, 10, 10]}
        rotation={new Euler(-Math.PI / 2, 0)}
      >
        <planeGeometry />
        <meshStandardMaterial color="hotpink" side={DoubleSide} />
      </mesh> */}
      <Suspense fallback={<Loading />}>
        <Model selectedMaterial={selectedMaterial} />
      </Suspense>
    </>
  );
};
