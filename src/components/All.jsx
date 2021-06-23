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
    ExecuteCodeAction, SceneLoader, AssetsManager, SceneOptimizer, Mesh,
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
import "@babylonjs/loaders/OBJ";

var tex1, tex2, tex3, tex4, tex41, tex42, tex421, tex5, tex6, tex7, tex8;

var up = 0;
var isRefresh = false;
var dome;
var arrow;
var backArrow;

var up42 = 0;
var arrow42;
var backArrow42;
var camera;

var actionArrow = () => {
}
var actionBackArrow = () => {
}
var actionArrow42 = () => {
}
var actionBackArrow42 = () => {
}


const onSceneReady = (scene) => {
    // This creates and positions a free camera (non-mesh)
    camera = new ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 2, 5, Vector3.Zero(), scene);

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    camera.inputs.attached.mousewheel.detachControl(canvas);

    tex1 = new Texture("https://i.ibb.co/nDpTXXr/1.jpg", scene, false, false);
    tex2 = new Texture("https://i.ibb.co/51wTh2g/2.jpg", scene, false, false);
    tex3 = new Texture("https://i.ibb.co/g4fDwfb/3.jpg", scene, false, false);

    tex4 = new Texture("https://i.ibb.co/nkJQtfP/4.jpg", scene, false, false);
    tex41 = new Texture("https://i.ibb.co/vsVgYKv/4-1.jpg", scene, false, false);
    tex42 = new Texture("https://i.ibb.co/q72NVhb/4-2.jpg", scene, false, false);
    tex421 = new Texture("https://i.ibb.co/6X87W3z/4-2-1.jpg", scene, false, false);
    tex5 = new Texture("https://i.ibb.co/jRs6bq9/5.jpg", scene, false, false);
    tex6 = new Texture("https://i.ibb.co/tb5yPD7/6.jpg", scene, false, false);
    tex7 = new Texture("https://i.ibb.co/4KnpXk0/7.jpg", scene, false, false);
    tex8 = new Texture("https://i.ibb.co/RYG50Zp/8.jpg", scene, false, false);

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


    var assetsManager = new AssetsManager(scene);
    var meshTask = assetsManager.addMeshTask("skull task", "", "./", "arrow.obj");

    meshTask.onSuccess = function (task) {
        arrow = Mesh.MergeMeshes([task.loadedMeshes[0], task.loadedMeshes[1]])
        //task.loadedMeshes[0].scaling = new Vector3(100, 100, 100);
        //house.scaling = new Vector3(3,3,3);
        arrow.scaling = new Vector3(100, 100, 100);
        arrow.position = new Vector3(0, -100, 250);
        arrow.rotation = new Vector3(-Math.PI / 4, 0, 0);

        backArrow = arrow.createInstance("backarrow");
        arrow42 = arrow.createInstance("arrow42");
        arrow42.scaling = new Vector3(0, 0, 0);

        backArrow42 = arrow.createInstance("backarrow42");
        backArrow42.scaling = new Vector3(0, 0, 0);
        isRefresh = true;
    }


    assetsManager.load();

    scene.onPointerDown = function (evt, pickInfo) {
        if (pickInfo.pickedMesh === arrow) {
            actionArrow();
            isRefresh = true;
        } else if (pickInfo.pickedMesh === backArrow) {
            actionBackArrow();
            isRefresh = true;
        } else if (pickInfo.pickedMesh === arrow42) {
            actionArrow42();
            isRefresh = true;
        } else if (pickInfo.pickedMesh === backArrow42) {
            actionBackArrow42()
            isRefresh = true;
        }
    }


    SceneOptimizer.OptimizeAsync(scene);

};

/**
 * Will run on every frame render.
 */
const onRender = (scene) => {
    if (isRefresh) {
        //console.log(camera.getTarget());
        isRefresh = false;
        console.log("UP:  " + up)
        if (!up) {
            actionArrow = () => up = 1;
            actionBackArrow = () => up = 0;
            arrow.scaling = new Vector3(100, 100, 100);

            arrow.rotation = new Vector3(1.4, -1.4, 0);
            arrow.position = new Vector3(0, -100, 250);

            // arrow.position = new Vector3(0, -100, 260);
            // arrow.rotation = new Vector3(-Math.PI / 4, 0, 0);
            backArrow.scaling = new Vector3(0, 0, 0);
            dome.photoTexture = tex1;
        } else if (up === 1) {
            actionArrow = () => up = 2;
            actionBackArrow = () => up = 0;
            arrow.scaling = new Vector3(100, 100, 100);
            backArrow.scaling = new Vector3(100, 100, 100);

            backArrow.position = new Vector3(-110, -110, -300);
            backArrow.rotation = new Vector3(-1.7, 2.1, 0);

            arrow.position = new Vector3(250, -100, 0);
            arrow.rotation = new Vector3(-Math.PI / 2, Math.PI / 4, (Math.PI / 3) - (2.0)); // 0 ;/2;0

            dome.photoTexture = tex2;
        } else if (up === 2) {
            actionArrow = () => {
                up = 3;
                up42 = 0
            };
            actionBackArrow = () => up = 1;
            arrow.scaling = new Vector3(100, 100, 100);
            backArrow.scaling = new Vector3(100, 100, 100);

            backArrow.position = new Vector3(-250, -100, 0);
            backArrow.rotation = new Vector3(1.6, 2.4, -0.7);
            // camera.setTarget(new Vector3(0, 0, 0));
            arrow.rotation = new Vector3(1.6, 0, 0);
            arrow.position = new Vector3(250, -100, 0);

            arrow42.scaling = new Vector3(0, 0, 0);
            dome.photoTexture = tex3;
        } else if (up === 3) {
            actionArrow = () => up = 4;
            actionBackArrow = () => up = 2;
            arrow.scaling = new Vector3(100, 100, 100);
            backArrow.scaling = new Vector3(100, 100, 100);

            backArrow.position = new Vector3(200, -160, -140);
            backArrow.rotation = new Vector3(-4.7, 0.5, 0);
            if (!up42) {
                actionArrow42 = () => up42 = 1;
                backArrow42.scaling = new Vector3(0, 0, 0);

                arrow.position = new Vector3(0, -100, 250);
                arrow.rotation = new Vector3(1.6, -1.4, 0);

                arrow42.scaling = new Vector3(100, 100, 100);
                arrow42.position = new Vector3(-340, -190, 10);
                arrow42.rotation = new Vector3(-1.6, 3.2, 0);
                dome.photoTexture = tex4;
            } else if (up42 === 1) {
                actionArrow42 = () => up42 = 2;
                actionBackArrow42 = () => up42 = 0;
                arrow.scaling = new Vector3(0, 0, 0);
                backArrow.scaling = new Vector3(0, 0, 0);

                arrow42.scaling = new Vector3(100, 100, 100);
                arrow42.position = new Vector3(-20, -240, 260);
                arrow42.rotation = new Vector3(1.6, -1.7, -0.1);
                backArrow42.scaling = new Vector3(100, 100, 100);
                backArrow42.position = new Vector3(90, -210, 100);
                backArrow42.rotation = new Vector3(-1.3, 0, 0);


                dome.photoTexture = tex42;
            } else if (up42 === 2) {
                actionArrow42 = () => {up = 5; up42  = 0;}
                actionBackArrow42 = () => up42 = 1;


                arrow42.scaling = new Vector3(100, 100, 100);
                arrow42.position = new Vector3(250, -250, 0);
                arrow42.rotation = new Vector3(-1.6, 0, 0);

                backArrow42.scaling = new Vector3(100, 100, 100);
                backArrow42.position = new Vector3(-310, -250, 0);
                backArrow42.rotation = new Vector3(-1.5, 0, 3.1);

                arrow.scaling = new Vector3(0, 0, 0);
                backArrow.scaling = new Vector3(0, 0, 0);
                dome.photoTexture = tex421;
            }
        } else if (up === 4) {
            backArrow42.scaling = new Vector3(0,0,0);
            arrow42.scaling = new Vector3(0, 0, 0);

            actionArrow = () => up = 5;
            actionBackArrow = () => up = 3;
            arrow.scaling = new Vector3(100, 100, 100);
            backArrow.scaling = new Vector3(100, 100, 100);

            backArrow.position = new Vector3(300, -130, 220);
            backArrow.rotation = new Vector3(1.6, -0.6, 0);
            arrow.position = new Vector3(180, -100, -200);
            arrow.rotation = new Vector3(1.6, 0.8, 0);
            dome.photoTexture = tex41;
        } else if (up === 5) {
            actionArrow = () => up = 6;
            actionBackArrow = () => up = 4;
            actionBackArrow42 = () => {
                up = 3;
                up42 = 2;
            }
            arrow42.scaling = new Vector3(0, 0, 0);

            backArrow42.scaling = new Vector3(100,100,100);
            backArrow42.position = new Vector3(-80, -260, -180);
            backArrow42.rotation = new Vector3(-1.5, 1.6, 0);


            arrow.scaling = new Vector3(100, 100, 100);
            backArrow.scaling = new Vector3(100, 100, 100);


            arrow.position = new Vector3(0, -100, 250);
            arrow.rotation = new Vector3(-5.5, -0.7, 13.4);
            backArrow.position = new Vector3(250, -210, -70);
            backArrow.rotation = new Vector3(-1.5, 0.6, 0);
            // camera.setTarget(new Vector3(0, 0, 0));
            dome.photoTexture = tex5;
        } else if (up === 6) {
            backArrow42.scaling = new Vector3(0,0,0);
            arrow42.scaling = new Vector3(0, 0, 0);

            actionArrow = () => up = 7;
            actionBackArrow = () => up = 5;

            arrow.scaling = new Vector3(100, 100, 100);
            backArrow.scaling = new Vector3(100, 100, 100);

            backArrow.position = new Vector3(-240, -280, 70);
            backArrow.rotation = new Vector3(-3.5, 3.1, 0.4);

            arrow.position = new Vector3(-250, -100, -120);
            arrow.rotation = new Vector3(3.5, 3.4, -0.5);
            dome.photoTexture = tex6;
        } else if (up === 7) {
            actionArrow = () => up = 8;
            actionBackArrow = () => up = 6;
            arrow.scaling = new Vector3(100, 100, 100);
            backArrow.scaling = new Vector3(100, 100, 100);

            arrow.rotation = new Vector3(-1.6, 3.2, 0)
            arrow.position = new Vector3(-250, -200, 0);

            backArrow.position = new Vector3(230, -320, -130);
            backArrow.rotation = new Vector3(-3.4, 0.2, 0.4);

            // camera.setTarget(new Vector3(0, 0, 0));
            dome.photoTexture = tex7;
        } else if (up === 8) {
            actionArrow = () => up = 8;
            actionBackArrow = () => up = 7;
            backArrow.scaling = new Vector3(100, 100, 100);
            backArrow.position = new Vector3(70, -290, -280);
            backArrow.rotation = new Vector3(1.5, 1.3, 0);

            arrow.scaling = new Vector3(0, 0, 0);
            dome.photoTexture = tex8;
        }
    }
};

export default () => (
    <div>
        <SceneComponent /*antialias*/ onSceneReady={onSceneReady} onRender={onRender} id="my-canvas"
                                      style={{width: "100%", height: "100%"}}/>
    </div>
);
