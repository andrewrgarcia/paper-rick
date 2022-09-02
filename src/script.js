// paper-rick
// Andrew Garcia 2022
// webpack infrastructure: Bruno Simon [ three.js journey course: https://threejs-journey.com/ ]
// papercraft templates: cubeecraft https://www.cubeecraft.com/
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 250,
    height: 250
}

// Cursor
const cursor = {
    x: 0,
    y: 0
}

function RandomUniform(min, max) {
    return Math.random() * (max - min) + min;
}


const loader = new THREE.TextureLoader();

const materials = [
    new THREE.MeshBasicMaterial({ map: loader.load('https://i.imgur.com/2vsftQS.png') }), // front
    new THREE.MeshBasicMaterial({ map: loader.load('https://i.imgur.com/Qwx30uH.png') }), // back
    new THREE.MeshBasicMaterial({ map: loader.load('https://i.imgur.com/dNiIVXx.png') }), // top
    new THREE.MeshBasicMaterial({ map: loader.load('https://i.imgur.com/KGUlIEP.png') }), // bottom
    new THREE.MeshBasicMaterial({ map: loader.load('https://i.imgur.com/0buBH1c.png') }), // side 1
    new THREE.MeshBasicMaterial({ map: loader.load('https://i.imgur.com/ntw3Sft.png') }), // side 2
];


// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff);

// Object
const geom = new THREE.BoxBufferGeometry(2.125, 1.5, 2.125);
const mesh = new THREE.Mesh(geom, materials);
scene.add(mesh)

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
    console.log(cursor.x, cursor.y)
})

const dirLight1 = new THREE.DirectionalLight(0xffffff);
dirLight1.position.set(1, 1, 1);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0xb987fa);
dirLight2.position.set(1, - 1, - 1);
scene.add(dirLight2);

const ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 1.5
camera.position.y = 1.5
camera.position.z = 1.5
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor(0xffffff)


// Animate
const clock = new THREE.Clock()

const animate = () => {
    const elapsedTime = clock.getElapsedTime()

    controls.update()
    mesh.rotation.y +=0.05;

    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)

}

animate()