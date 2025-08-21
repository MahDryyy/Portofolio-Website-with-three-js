import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

const container = document.querySelector(".ImagePersonal");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Kamera
const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(5, 0.5, 1);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth movement
controls.dampingFactor = 0.05;
controls.enableZoom = false; // Disable zooming in/out
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
scene.add(light);


// Spotlight biru dari atas kanan
const spotLightBlue = new THREE.SpotLight(0x0000ff, 10);
spotLightBlue.position.set(2,5 , 0); // sedikit ke kanan atas model
spotLightBlue.angle = Math.PI / 6;
spotLightBlue.penumbra = 0.5;
spotLightBlue.castShadow = true;
scene.add(spotLightBlue);

// Spotlight merah dari atas kiri
const spotLightRed = new THREE.SpotLight(0xff0000, 10);
spotLightRed.position.set(-2, 5, 0); // sedikit ke kiri atas model
spotLightRed.angle = Math.PI / 6;
spotLightRed.penumbra = 0.5;
spotLightRed.castShadow = true;
scene.add(spotLightRed);

// Variabel untuk animasi
let mixer;
let model;

// Loader GLB
const loader = new GLTFLoader();
loader.load(
  "model/MAHDI2.glb", 
  (gltf) => {
    model = gltf.scene;
    
    // Calculate the bounding box and center of the model
    const box = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    // Adjust the model position so it is centered on (0, 0, 0)
    model.position.sub(center);
    model.position.y = -2.5; 
    model.rotation.y = Math.PI / 3; 
    model.scale.set(2, 2, 2); 
    scene.add(model);

    // Setup animasi bawaan dari GLB

  },
  undefined,
  (error) => {
    console.error("Error loading GLB:", error);
  }
);


//tambah model di belakang

const loader2 = new GLTFLoader();
loader2.load(
  "model/background.glb", 
  (gltf) => {
    const model2 = gltf.scene;
    
    // Calculate the bounding box and center of the model

    model2.position.set(-5, -5 , 0); // X=2 (kanan), Y=-2.5 (sejajar), Z=-4 (belakang)
    model2.rotation.y = Math.PI / 3; 
    model2.scale.set(3, 3, 3); 
    scene.add(model2);
      if (gltf.animations && gltf.animations.length > 0) {
        console.log(`Found ${gltf.animations.length} animations:`, gltf.animations.map(anim => anim.name));
        
        mixer = new THREE.AnimationMixer(model2);
        mixer.timeScale = 0.3; // Set kecepatan animasi menjadi 0.3x
        const firstClip = gltf.animations[0];
        const action = mixer.clipAction(firstClip);
        action.play();
        console.log(`Playing animation: ${firstClip.name}`);
      } else {
        console.log("No animations found in GLB file");
      }
    },
    undefined,
    (error) => {
      console.error("Error loading GLB:", error);
    }
  );

// Resize
window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// Animasi
function animate() {
  requestAnimationFrame(animate);
  
  // Update mixer untuk animasi
  if (mixer) {
    mixer.update(0.016); // 60fps
  }
  
  // Update controls
  controls.update();
  
  renderer.render(scene, camera);
}
animate();

const initialPosition = camera.position.clone();
const initialTarget = controls.target.clone();

controls.addEventListener('end', () => {
  camera.position.copy(initialPosition);
  controls.target.copy(initialTarget);
  controls.update();
});
