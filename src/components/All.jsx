import React from "react";
import {
  ArcRotateCamera,
  Vector3,
  PhotoDome,
  Texture,
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory

let box;

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  var camera = new ArcRotateCamera("camera1", -Math.PI / 2,  Math.PI / 2, 5, Vector3.Zero(), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
  camera.inputs.attached.mousewheel.detachControl(canvas);

  const tex1= "./output1.jpg";
  const tex2= "./output2.jpg";
  const tex3 = "./output3.jpg";

  var dome = new PhotoDome(
      "testdome",
      "",
      {
          resolution: 32,
          size: 1000
      },
      scene
  );
  dome.photoTexture = new Texture(tex1, scene, false, false);
};

/**
 * Will run on every frame render.
 */
const onRender = (scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

export default () => (
  <div>
    <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" style={{width: "100%", height: "100%"}} />
  </div>
);