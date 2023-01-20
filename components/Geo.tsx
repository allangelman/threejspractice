import {
  Dispatch,
  ReactElement,
  RefObject,
  SetStateAction,
  Suspense,
  useRef,
  useState,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointLight, Vector3, Vector2, Raycaster } from "three";
import { LoadingSkeleton, Model } from "./Model";

interface point {
  elementRef: RefObject<HTMLDivElement>;
  position: Vector3;
}
interface GeometryProps {
  points: point[];
  setPoints: Dispatch<SetStateAction<Vector3[]>>;
  currentPoints: Vector3[];
}
const pointer = new Vector2();
const raycaster = new Raycaster();

export const Geometry = ({
  points,
  setPoints,
  currentPoints,
}: GeometryProps): ReactElement => {
  const { scene, camera, gl } = useThree();
  const controls = new OrbitControls(camera, gl.domElement);
  const pointLightRef = useRef<PointLight>(null);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.005;
  controls.zoomSpeed = 0.005;
  scene.add(camera);
  if (pointLightRef.current) camera.add(pointLightRef.current);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [currentPointerPosition, setCurrentPointerPosition] =
    useState<Vector3>();

  function onPointerMove(event: { clientX: number; clientY: number }) {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function onPointerDown(event: { clientX: number; clientY: number }) {
    if (currentPointerPosition) {
      // console.log(currentPointerPosition);
      // console.log(
      //   new Vector3(
      //     currentPointerPosition.x * 600 * 0.25,
      //     -currentPointerPosition.y * 600 * 0.25,
      //     currentPointerPosition.z
      //   )
      // );
      setPoints([
        ...currentPoints,
        new Vector3(
          currentPointerPosition.x * 600 * 0.2,
          -currentPointerPosition.y * 600 * 0.2,
          currentPointerPosition.z
        ),
      ]);
    }
  }

  window.addEventListener("pointermove", onPointerMove, false);

  // window.addEventListener("mousedown", onPointerDown, false);

  useFrame(() => {
    controls.update();

    const screenPosition = new Vector3(pointer.x, pointer.y, 0);
    raycaster.setFromCamera(screenPosition, camera);
    const instersections = raycaster.intersectObjects(scene.children);
    if (instersections.length > 0) {
      setCurrentPointerPosition(instersections[0].point);
    }

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
        const intersections = raycaster.intersectObjects(scene.children, true);
        if (intersections.length === 0) {
          continue;
        }

        const intersectionDistance = intersections[0].distance;
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
