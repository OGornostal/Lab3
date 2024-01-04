import * as THREE from './Lib/three.module.min.js';
import { ARButton } from './Lib/webxr/ARButton.js';

// Перш за все, налаштовуємо базові сутності: сцену, камеру та рендерер
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// Створюємо AR кнопку
document.body.appendChild(ARButton.createButton(renderer));

renderer.xr.addEventListener('sessionstart',function() {
 camera.position.set(0,3, 10); // Встановити початкову позицію камери
 camera.lookAt(scene.position);
camera.rotation.y= -Math.PI/ 2;
});


// Додавання освітлення
const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(light);

// Циліндр і похила площина
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const cylinderMaterial = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('assets/images/perlin-512.png') });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
scene.add(cylinder);

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('assets/images/disturb.jpg') });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 4;
scene.add(plane);

// Анімація: для стрибка у реальній реалізації це має бути більш складний механізм
function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);
}

animate();



camera.position.set(0, 1, 15);