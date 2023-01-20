import { ReactElement, useEffect, useMemo } from "react";
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
  selectedMaterial: string;
}
export const Model = ({ selectedMaterial }: GeometryProps): ReactElement => {
  const gltf = useGLTF("./threejspractice/glTF/totoro.glb");

  const textureLoader = useMemo(() => new TextureLoader(), []);
  const { scene } = useThree();

  useEffect(() => {
    if (selectedMaterial === "default") return;
    const matcap = textureLoader.load(
      `./threejspractice/matcaps/${selectedMaterial}`
    );
    const material = new MeshMatcapMaterial({ matcap });
    traverseChildren(scene, material);
  }, [scene, selectedMaterial, textureLoader]);

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
    <mesh scale={[1, 3, 1]} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshStandardMaterial color="red" wireframe />
    </mesh>
  );
};

const traverseChildren = (
  node: Object3D,
  matcapMat: MeshMatcapMaterial
): void => {
  if (node instanceof Mesh && !(node.geometry instanceof PlaneGeometry)) {
    node.material = matcapMat;
    return;
  }
  for (const child of node.children || []) {
    traverseChildren(child, matcapMat);
  }
  return;
};
