import { ReactElement, Suspense, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointLight } from "three";
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

  useFrame((state, delta, xrFrame) => {
    controls.update();
  });

  return (
    <>
      <pointLight ref={pointLightRef} position={[-5, 4, 10]} />

      <Suspense fallback={<Loading />}>
        <Model selectedMaterial={selectedMaterial} />
      </Suspense>
    </>
  );
};
