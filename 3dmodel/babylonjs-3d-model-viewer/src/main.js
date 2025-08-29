const canvas = document.getElementById("renderCanvas"); 
const engine = new BABYLON.Engine(canvas, true); 

const createScene = function () { 
    const scene = new BABYLON.Scene(engine); 
    const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene); 
    camera.attachControl(canvas, true); 

    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene); 

    BABYLON.SceneLoader.ImportMesh("", "path/to/your/model/", "modelFile.babylon", scene, function (newMeshes) { 
        scene.createDefaultCameraOrLight(true, true, true); 
    }); 

    return scene; 
}; 

const scene = createScene(); 

engine.runRenderLoop(function () { 
    scene.render(); 
}); 

window.addEventListener("resize", function () { 
    engine.resize(); 
});