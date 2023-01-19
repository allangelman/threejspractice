import Head from "next/head";
import { Canvas } from "@react-three/fiber";
import { Geometry } from "../components/Geo";
import { useState } from "react";
import { MatCapButton } from "../components/MatCapButton";

export default function Home() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>("default");
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/threejspractice/favicon.ico" />
      </Head>
      <div className="px-4 md:px-12 lg:mx-auto lg:max-w-[1184px] h-full">
        <div className="h-8"></div>
        <div className="flex flex-row space-x-3">
          <div className="w-[900px] h-[600px] my-auto bg-black">
            <Canvas camera={{ fov: 50, position: [0, 2, 5] }} className="">
              <Geometry selectedMaterial={selectedMaterial} />
            </Canvas>
          </div>
          <div className="flex flex-col space-y-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => {
              return (
                <MatCapButton
                  key={number}
                  name={`matcap${number}`}
                  onClick={() => setSelectedMaterial(`${number}.png`)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// import { useEffect, useRef } from "react";
// import {
//   BoxGeometry,
//   MeshBasicMaterial,
//   Mesh,
//   PerspectiveCamera,
//   WebGLRenderer,
//   Scene,
//   Clock,
// } from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// // Canvas
// // const canvas = document.querySelector("canvas.webgl");

// export default function Three() {
//   const canvas = useRef<HTMLCanvasElement | null>(null);
//   // const clock = new Clock().getElapsedTime();
//   // clock.getElapsedTime();
//   useEffect(() => {
//     if (!canvas.current) return;
//     console.log("render");
//     // you could put your three.js code in a function…
//     renderScene(canvas.current);
//     // …or in a class
//     // new Renderer(canvas.current);
//   }, []);

//   return <canvas ref={canvas} />;
// }

// function renderScene(canvas: HTMLCanvasElement) {
//   // Scene
//   const scene = new Scene();

//   /**
//    * Object
//    */
//   const geometry = new BoxGeometry(1, 2, 1);
//   const material = new MeshBasicMaterial({ color: 0xff0000 });
//   const mesh = new Mesh(geometry, material);
//   scene.add(mesh);

//   /**
//    * Sizes
//    */
//   const sizes = {
//     width: 800,
//     height: 600,
//   };

//   /**
//    * Camera
//    */
//   const camera = new PerspectiveCamera(75, sizes.width / sizes.height);
//   camera.position.z = 3;
//   scene.add(camera);

//   const controls = new OrbitControls(camera, canvas);
//   controls.enableDamping;
//   /**
//    * Renderer
//    */
//   const renderer = new WebGLRenderer({
//     canvas: canvas,
//   });
//   renderer.setSize(sizes.width, sizes.height);

//   const clock = new Clock();
//   const tick = () => {
//     const elapsedTime = clock.getElapsedTime();

//     // Update controls
//     controls.update();

//     // Render
//     renderer.render(scene, camera);

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick);
//   };

//   tick();
// }

// // class Renderer {
// //   constructor(canvas: HTMLCanvasElement) {}
// // }
