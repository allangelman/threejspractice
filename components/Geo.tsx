import { ReactElement, RefObject, Suspense, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointLight, Vector3, Raycaster } from "three";
import { LoadingSkeleton, Model } from "./Model";

interface point {
  elementRef: RefObject<HTMLDivElement>;
  position: Vector3;
}
interface GeometryProps {
  points: point[];
}
const raycaster = new Raycaster();
export const Geometry = ({ points }: GeometryProps): ReactElement => {
  const { scene, camera, gl } = useThree();
  const controls = new OrbitControls(camera, gl.domElement);
  const pointLightRef = useRef<PointLight>(null);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.5;
  controls.zoomSpeed = 0.1;
  scene.add(camera);
  if (pointLightRef.current) camera.add(pointLightRef.current);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useFrame(() => {
    controls.update();
    if (isLoaded) {
      for (const point of points) {
        const screenPosition = point.position.clone();
        screenPosition.project(camera);

        const pointDiv = point.elementRef.current;
        if (!pointDiv) continue;

        const translateX = screenPosition.x * 600 * 0.5;
        const translateY = -screenPosition.y * 600 * 0.5;

        pointDiv.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(1, 1)`;
        pointDiv.style.scale = `scale(1, 1)`;
        pointDiv.style.opacity = "100%";

        raycaster.setFromCamera(screenPosition, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        console.log(intersects, scene.children);
        if (intersects.length === 0) {
          continue;
        }

        const intersectionDistance = intersects[0].distance;
        const pointDistance = point.position.distanceTo(camera.position);

        if (intersectionDistance < pointDistance) {
          pointDiv.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(0.5, 0.5)`;
          pointDiv.style.scale = `scale(0.2, 0.2)`;
          pointDiv.style.opacity = "20%";
        } else {
          pointDiv.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(1, 1)`;
          pointDiv.style.scale = `scale(1, 1)`;
          pointDiv.style.opacity = "100%";
        }
      }
    }
  });

  return (
    <>
      <pointLight ref={pointLightRef} position={[-5, 4, 10]} />

      <Suspense fallback={<LoadingSkeleton />}>
        <Model setIsLoaded={setIsLoaded} />
      </Suspense>
    </>
  );
};
