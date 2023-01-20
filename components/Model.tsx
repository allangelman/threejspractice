import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useMemo,
} from "react";
import { useThree, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  Mesh,
  MeshMatcapMaterial,
  Object3D,
  PlaneGeometry,
  TextureLoader,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

interface GeometryProps {
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}
export const Model = ({ setIsLoaded }: GeometryProps): ReactElement => {
  const gltf = useGLTF("./threejspractice/glTF/totoro.glb");

  useEffect(() => {
    if (gltf) {
      setIsLoaded(true);
    }
  }, [gltf, setIsLoaded]);

  return (
    <primitive
      object={gltf.scene}
      scale={[0.1, 0.1, 0.1]}
      position={[0, -1.0, 0]}
    />
  );
};

export const LoadingSkeleton = (): ReactElement => {
  return (
    <mesh scale={[1.5, 2, 1]} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshStandardMaterial color="red" wireframe />
    </mesh>
  );
};
