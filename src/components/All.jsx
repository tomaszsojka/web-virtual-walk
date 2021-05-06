import React from "react";
import {
  ArcRotateCamera,
  Vector3,
  Color3,
  PhotoDome,
  Texture,
  TransformNode,
  CylinderBuilder,
  StandardMaterial,
  ActionManager,
  ExecuteCodeAction,
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory

var tex1, tex2, tex3;

var up = 0;
var isRefresh = false;
var dome;
var arrow;
var backArrow;
var camera;

const createArrow=(scene, callback) =>{
  const thickness=10;
  var arrow = new TransformNode("arrow", scene);
  var cylinder = CylinderBuilder.CreateCylinder("cylinder", { diameterTop: 0, height: 0.075, diameterBottom: 0.0375 * (1 + (thickness - 1) / 4), tessellation: 96 }, scene);
  var line = CylinderBuilder.CreateCylinder("cylinder", { diameterTop: 0.005 * thickness, height: 0.275, diameterBottom: 0.005 * thickness, tessellation: 96 }, scene);

  const arrowMat = new StandardMaterial('arrowMat', scene);
  arrowMat.emissiveColor = new Color3.Black(); 
  arrowMat.diffuseColor = new Color3(0, 255, 0)

const arrowHeadMat = new StandardMaterial('arrowHeadMat', scene);
  arrowHeadMat.emissiveColor = new Color3.Green(); 
  arrowHeadMat.diffuseColor = new Color3(0, 255, 0)


    cylinder.actionManager = new ActionManager(scene);
    // register 'pickCylinder' as the handler function for cylinder picking action.
    cylinder.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickTrigger, callback)
    );

    line.actionManager = new ActionManager(scene);
    // register 'pickCylinder' as the handler function for cylinder picking action.
    line.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickTrigger, callback)
    );
  // Position arrow pointing in its drag axis
  cylinder.parent = arrow;
  cylinder.material = arrowHeadMat;
  cylinder.rotation.x = Math.PI / 2;
  cylinder.position.z += 0.3;

  line.parent = arrow;
  line.material = arrowMat;
  line.position.z += 0.275 / 2;
  line.rotation.x = Math.PI / 2;

  return arrow;
}

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  camera = new ArcRotateCamera("camera1", -Math.PI / 2,  Math.PI / 2, 5, Vector3.Zero(), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
  camera.inputs.attached.mousewheel.detachControl(canvas);

  tex1 = new Texture("./output1.jpg", scene, false, false);
  tex2 = new Texture("./output2.jpg", scene, false, false);
  tex3 = new Texture("./output3.jpg", scene, false, false);

  dome = new PhotoDome(
      "testdome",
      "",
      {
          resolution: 32,
          size: 1000
      },
      scene
  );
  dome.photoTexture = tex1;

  arrow=createArrow(scene, () => { 
    up++;
    isRefresh = true;
  });
  arrow.scaling = new Vector3(100, 100, 100);
  arrow.position = new Vector3(0, -100, 260);
  arrow.rotation = new Vector3(-Math.PI / 4, 0, 0);

  backArrow=createArrow(scene, () => { 
    up--;
    isRefresh = true;
  });
  backArrow.scaling = new Vector3(0, 0, 0);
};

/**
 * Will run on every frame render.
 */
const onRender = (scene) => {
  if(isRefresh) {
    console.log(camera.getTarget());
    isRefresh = false;
    if(!up) {
      camera.setTarget(Vector3.Zero());
      arrow.scaling = new Vector3(100, 100, 100);
      arrow.position = new Vector3(0, -100, 260);
      arrow.rotation = new Vector3(-Math.PI / 4, 0, 0);
      backArrow.scaling = new Vector3(0, 0, 0);
      dome.photoTexture = tex1;
    } else if (up === 1) {
      camera.setTarget(new Vector3(-90, -30, 0));
      arrow.scaling = new Vector3(100, 100, 100);
      arrow.position = new Vector3(-250, -200, -100);
      arrow.rotation = new Vector3(-Math.PI / 4, Math.PI / -2, 0);
      backArrow.scaling = new Vector3(100, 100, 100);
      backArrow.position = new Vector3(-200, -300, 100);
      backArrow.rotation = new Vector3(Math.PI / 4, Math.PI / -2, 0);
      dome.photoTexture = tex2;
    } else if (up === 2) {
      camera.setTarget(new Vector3(0, 0, 0));
      arrow.scaling = new Vector3(0, 0, 0);
      dome.photoTexture = tex3;
    }
  }
};

export default () => (
  <div>
    <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" style={{width: "100%", height: "100%"}} />
  </div>
);