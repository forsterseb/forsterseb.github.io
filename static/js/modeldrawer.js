import * as THREE from './vendors/three.module.min.js';
import {OrbitControls} from './vendors/OrbitControls.min.js';
import { GLTFLoader } from './vendors/GLTFLoader.min.js';

let mixer;
const clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer();
let container = document.getElementById('greetingModel');
renderer.setSize( container.offsetWidth, container.offsetHeight );
container.appendChild( renderer.domElement );

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xedfffc );
const camera = new THREE.PerspectiveCamera( 70, /*window.innerWidth / window.innerHeight*/container.offsetWidth/container.offsetHeight, 0.1, 1000 );
camera.position.set(0,1.7,1);


const controls = new OrbitControls( camera, renderer.domElement );
controls.target = new THREE.Vector3(0,1.5,0);
controls.update();
const loader = new GLTFLoader();
loader.load( '/static/models/model_anim.glb', function ( gltf ) {
    let model = gltf.scene;
    scene.add( model );
    
    const animations = gltf.animations;
    mixer = new THREE.AnimationMixer( model );
    mixer.clipAction( gltf.animations[ 0 ] ).play();
    animate();
    container.classList.remove("loader");
}, undefined, function ( error ) {
    console.error( error );
} );
var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

function animate() {
    requestAnimationFrame( animate );
    const delta = clock.getDelta();
    mixer.update(delta);
    resizeCanvasToDisplaySize();
    renderer.render( scene, camera );
}

function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    if (canvas.width !== width ||canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      renderer.setSize(width, height, true);
      camera.aspect = width / height;
      //console.log(camera.aspect);
      camera.updateProjectionMatrix();
  
      // set render target sizes here
    }
  }