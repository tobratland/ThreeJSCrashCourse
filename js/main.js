let scene, camera, renderer, mesh;
let meshFloor;
let USE_WIREFRAME = false;

let crate, crateTexture, crateNormalMap, crateBumpMap;

let keyboard = {}; //creates a keyboard object

let player = { //player object
    height:1.8, // the height of the player
    speed: 0.2, //movementspeed of the player
    turnSpeed: Math.PI *0.01, //turnspeed of the player
};

function init(){
    scene = new THREE.Scene(); //the scene is the world
    camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000); //the camera is my eyes 

    mesh = new THREE.Mesh( //creates a new item
        new THREE.BoxGeometry(1,1,1), //width, height, depth
        new THREE.MeshPhongMaterial({color:0xff9999, wireframe:USE_WIREFRAME}) //sets material to a basic material. with color and wireframe as choices
    );
    mesh.position.y +=1; //moves the item along the Y axis
	mesh.receiveShadow = true; //lets the item receive shadows
	mesh.castShadow = true; //lets the item cast shadows
    scene.add(mesh); //adds the item created to the scene

    meshFloor = new THREE.Mesh( //creates floor 
        new THREE.PlaneGeometry(20,20 ,10,10), // width, height, widthSegments, heightsegments
        new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
    );
    meshFloor.rotation.x -= Math.PI / 2; //rotates the floor so it actually is on the floor
    meshFloor.receiveShadow = true; //allows the floor to receive shadows
    scene.add(meshFloor); //adds the floor to the scene

    ambientLight = new THREE.AmbientLight(0xffffff, 0.2); //creates ambient light 
    scene.add(ambientLight); //adds the created ambient light to the scene

    light = new THREE.PointLight(0xffffff, 0.8, 18, 0); //creates a new lightsource with (color, intensity, distance, decay)
    light.position.set(-3, 6, -3) //sets the position for the lightsource
    light.castShadow = true; //allows the light to cast shadows
    light.shadow.camera.near = 0.1; //closest distance for shadows to appear
    light.shadow.camera.far = 25; //furthest distance for shadows to appear
    scene.add(light); //adds the light item to the scene

    
    let textureLoader = new THREE.TextureLoader(); //sets textureloader
    crateTexture = textureLoader.load("../textures/crate/crate2_diffuse.png") // loads the texture for the crate
    crateBumpMap = textureLoader.load("../textures/crate/crate2_bump.png") //loads the bumpmap for the crate
    crateNormalMap = textureLoader.load("../textures/crate/crate2_normal.png") //loads the normal map

    crate = new THREE.Mesh( //creates a new box
        new THREE.BoxGeometry(3,3,3), //defines the width, height and depth of the box
        new THREE.MeshPhongMaterial({ //defines material
            color: 0xffffff, //defines color
            map: crateTexture, // defines texture
            bumpMap: crateBumpMap, //defines the bumpmap for the crate
            normalMap: crateNormalMap, //defines the normalMap for the crate
        }) 
    );
    scene.add(crate) //adds the crate to the scene.
    crate.position.set(2.5, 3/2, 2.5); //Positions the crate in the scene. 
    crate.receiveShadow = true;
    crate.castShadow = true;
    camera.position.set(0,player.height,-5); //sets the cameraposition
    camera.lookAt(new THREE.Vector3(0,player.height,0)); //sets the direction the camera is pointed
    
    renderer = new THREE.WebGLRenderer(); //the renderer shows the scene as seen by the camera
    renderer.setSize(1200, 720); // the size of the canvas element in the browser
   
    renderer.shadowMap.enabled = true; //gives the scene shadows
    renderer.shadowMap.type = THREE.BasicShadowMap; //selects type of shadows to give the scene.

    document.body.appendChild(renderer.domElement); // adds the entire thing to the dom 

    animate(); 
}

function animate(){
    requestAnimationFrame(animate);

    mesh.rotation.x +=0.01;
    mesh.rotation.y +=0.02;
    crate.rotation.y += 0.01;

    if(keyboard[87]) {  //W key, Forward movement
        camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
    }

    if(keyboard[83]) {  //S key, backwards movement
        camera.position.x += Math.sin(camera.rotation.y) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
    
    }

    if(keyboard[65]) {  //A key, right movement
        camera.position.x -= Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
        camera.position.z -= -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
    }

    if(keyboard[68]) {  //D key, left movement
        camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
    }

    if(keyboard[37]){   //left arrow key, look left
        camera.rotation.y -= player.turnSpeed;
    }
    if(keyboard[39]){   //right arrow key, look right
        camera.rotation.y += player.turnSpeed;
    }


    renderer.render(scene,camera)
}

function keyDown(event) { 
    keyboard[event.keyCode] = true;
}
function keyUp(event) {
    keyboard[event.keyCode] = false;
}

window.addEventListener("keydown", keyDown); //lets the page listen for the event
window.addEventListener("keyup", keyUp); //lets the page listen for the event

window.onload = init;