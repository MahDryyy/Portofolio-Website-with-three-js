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
controls.screenSpacePanning = false;
controls.minDistance = 3;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI;

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0xffffff,10);
scene.add(ambientLight);

// Variabel untuk animasi
let mixer;
let model;

// Loader GLB
const loader = new GLTFLoader();
loader.load(
  "model/code.glb", 
  (gltf) => {
    model = gltf.scene;
    model.position.set(0, -1, 0);
    model.scale.set(0.5, 0.5, 0.5); 
    scene.add(model);

    // Setup animasi bawaan dari GLB
    if (gltf.animations && gltf.animations.length > 0) {
      console.log(`Found ${gltf.animations.length} animations:`, gltf.animations.map(anim => anim.name));
      
      mixer = new THREE.AnimationMixer(model);
      
      // Set kecepatan animasi menjadi 0.3x (lebih lambat)
      mixer.timeScale = 0.3;
      
      // Hanya play animasi pertama saja
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