import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import gsap from "gsap/gsap-core";

const scene = new THREE.Scene();

const gui = new dat.GUI();

const raycaster = new THREE.Raycaster();

//texture

const textureLoader = new THREE.TextureLoader();

const geometry = new THREE.PlaneBufferGeometry(1, 1.3);
const material = new THREE.MeshBasicMaterial({ map: textureLoader.load("/dist/assets/eurotherm.jpg") });
const material2 = new THREE.MeshBasicMaterial({ map: textureLoader.load("/dist/assets/5.jpg") });
const material3 = new THREE.MeshBasicMaterial({ map: textureLoader.load("/dist/assets/2.jpg") });
// console.log(material)
// const material2= new THREE.MeshBasicMaterial({color:0x8f1e1e})
// const geometry2= new THREE.BoxBufferGeometry(.2, .2, .1)

const img = new THREE.Mesh(geometry, material);
const img2 = new THREE.Mesh(geometry, material2);
const img3 = new THREE.Mesh(geometry, material3);
// const box = new THREE.Mesh(geometry2,material2)
img.position.x = Math.random() * 1.2 + 0.5;
img2.position.x = Math.random() * 1.2 + 0.5;
img3.position.x = Math.random() * 1.2 + 0.5;
scene.add(img);
scene.add(img2);
scene.add(img3);

let objs = [];
scene.traverse((object) => {
	if (object.isMesh) {
		objs.push(object);
	}
});
img2.position.y = -2;
img3.position.y = -4;
// scene.add(box)

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// renderer.shadowMap.enabled=true
// renderer.shadowMap.type=PCFSoftShadowMap

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);
// camera.lookAt(scene.position)
gui.add(camera.position, "x");

const renderer = new THREE.WebGLRenderer({});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
});
const handleWheel = (e) => {
	// console.log(e.deltaY)
	console.log("position", position);
	console.log("camera position", camera.position.y);

	if (!(Math.round(camera.position.y) == 0 && e.deltaY < 0)) {
		y -= e.deltaY * 0.002;
	}
};
window.addEventListener("wheel", handleWheel);
let y = 0;
let position = 0;

const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;s
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});




let rotationX = 0;
// document.body.addEventListener("click", (event) => {
// 	console.log("toto");
// 	rotationX += -0.5;
// });




const tick = () => {
	// cube.rotation.x +=0.1
	// console.log(position)
	// camera.rotation.set(rotationX,0,0)
	gsap.to(camera.rotation, { x: rotationX });
	if (Math.round(position) <= 0) {
		// console.log("tata")
		position += y;
		y *= 0.9;
	} else {
		console.log("toto");
		y = 0;
		position = 0;
	}
	//raycaster
	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(objs);

	for (const intersect of intersects) {
		gsap.to(intersect.object.scale, { x: 1.9, y: 1.9 });
		gsap.to(intersect.object.rotation, { y: -0.4 });
		gsap.to(intersect.object.position, { z: -0.9 });
		// console.log(intersect)
	}
	// console.log(intersects)
	for (const object of objs) {
		if (!intersects.find((intersect) => intersect.object === object)) {
			gsap.to(object.scale, { x: 1, y: 1 });
			gsap.to(object.rotation, { y: 0 });
			gsap.to(object.position, { z: 0 });
		}
	}

	camera.position.y = position;
	// console.log(Math.round(camera.position.y))
	renderer.render(scene, camera);
	// controls.update();
	requestAnimationFrame(tick);
};

tick();
// document.getElementById("x").innerHTML = "x = " + cube.position.x;
// document.getElementById("y").innerHTML = "y = " + cube.position.y;
// document.getElementById("z").innerHTML = "z = " + cube.position.z;
