import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import gsap from "gsap/gsap-core";
import { ZeroStencilOp } from "three";

const scene = new THREE.Scene();

const gui = new dat.GUI();

const raycaster = new THREE.Raycaster();

//texture

const textureLoader = new THREE.TextureLoader();

const axesHelpers = new THREE.AxesHelper(1);
scene.add(axesHelpers);

const geometry = new THREE.PlaneBufferGeometry(1, 1.3);
const material = new THREE.MeshBasicMaterial({ map: textureLoader.load("/dist/assets/eurotherm.jpg") });
const material2 = new THREE.MeshBasicMaterial({ map: textureLoader.load("/dist/assets/5.jpg") });
const material3 = new THREE.MeshBasicMaterial({ map: textureLoader.load("/dist/assets/2.jpg") });
const img = new THREE.Mesh(geometry, material);
const img2 = new THREE.Mesh(geometry, material2);
const img3 = new THREE.Mesh(geometry, material3);
img.position.x = Math.random() * 1.2 + 0.5;
img2.position.x = Math.random() * 1.2 + 0.5;
img3.position.x = Math.random() * 1.2 + 0.5;

const pointGeometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });

const vertices = [];
const pointMaterial = new THREE.MeshBasicMaterial({ color: 0x050505 });

const test2 = {
	nom: "SEC02C",
	reference: [
		4.84e-7, 8.48e-7, 0.00000126, 0.00000186, 0.00000329, 0.00000805, 0.0000122, 0.0000195, 0.0000367, 0.0000696, 0.0000929, 0.000138, 0.000232, 0.000631, 0.000841, 0.00137,
		0.00248, 0.00726,
	],
	appareil: [
		2.55e-7, 5e-7, 7.65e-7, 0.00000117, 0.00000209, 0.00000528, 0.00000795, 0.0000144, 0.0000275, 0.0000528, 0.00007, 0.000105, 0.000183, 0.000523, 0.00065, 0.00102, 0.00173,
		0.00463,
	],
	ecart: [-47, -41, -39, -37, -37, -34, -35, -26, -25, -24, -25, -24, -21, -17, -23, -26, -30, -36],
	incertitudePlus: [-8, -6, -10, -11, -9, -11, -14, -15, -17.4, -18, -15.5, -18.3, -7, 3, -16.3, -20.7, -25.8, -31.7],
	incertitudeMoins: [-86, -76, -68, -63, -65, -57, -56, -37, -32.6, -30, -34.5, -29.7, -35, -37, -29.7, -31.3, -34.2, -40.3],
	incertitude: [39, 35, 29, 26, 28, 23, 21, 11, 7.6, 6, 9.5, 5.7, 14, 20, 6.7, 5.3, 4.2, 4.3],
	dateEtalonnage: "10/08/2016",
	numeroCertificat: "FR163207709",
	domaine: "VIDE",
};
const test = {
	nom: "SEC02C",
	reference: [
		3.47e-7, 3.79e-7, 6.65e-7, 0.0000011, 0.00000145, 0.00000241, 0.00000518, 0.00000781, 0.0000149, 0.0000275, 0.0000681, 0.0000975, 0.000133, 0.000263, 0.000668, 0.000842,
		0.00127, 0.0027, 0.00497,
	],
	appareil: [
		2.1e-7, 2.48e-7, 4.83e-7, 8.45e-7, 0.00000115, 0.00000198, 0.00000428, 0.00000645, 0.0000113, 0.0000215, 0.000053, 0.0000755, 0.000103, 0.000204, 0.000535, 0.000685,
		0.000995, 0.00198, 0.00345,
	],
	ecart: [-39, -35, -27, -23, -21, -18, -17, -17, -24, -22, -22, -23, -23, -22, -20, -19, -22, -27, -31],
	incertitudePlus: [3, 2, -1, -4, -4, -3, 0, -4, -12, -15.3, -16.3, -18.1, -17, -15.8, -15.1, -12, -17.3, -17, -11],
	incertitudeMoins: [-81, -72, -53, -42, -38, -33, -34, -30, -36, -28.7, -27.7, -27.9, -29, -28.2, -24.9, -26, -26.7, -37, -51],
	incertitude: [42, 37, 26, 19, 17, 15, 17, 13, 12, 6.7, 5.7, 4.9, 6, 6.2, 4.9, 7, 4.7, 10, 20],
	dateEtalonnage: "02/09/2015",
	numeroCertificat: "FR153604218",
	domaine: "VIDE",
};
const points1 =[]
const points2 =[]
const points3 =[]
const points4 =[]
const points5 =[]
const points6 =[]
console.log(test.reference.length)
console.log(test2.reference.length)
for (let i = 0; i < test.reference.length-1; i++) {
	const xP = Math.log10(test.reference[i]) + 6;
	const yP = test.ecart[i] / 100;
	const zP = 0;
	
	const xP2 = Math.log10(test2.reference[i]) + 6;
	const yP2 = test2.ecart[i] / 100;
	const zP2 = 0.3;
	const yimP = test.incertitudeMoins[i] / 100;
	const yimP2 = test2.incertitudeMoins[i] / 100;
	const yipP = test.incertitudePlus[i] / 100;
	const yipP2 = test2.incertitudePlus[i] / 100;
	
	
	const point = new THREE.Mesh(pointGeometry, pointMaterial);
	const pointim = new THREE.Mesh(pointGeometry, pointMaterial);
	const pointip = new THREE.Mesh(pointGeometry, pointMaterial);
	const pointim2 = new THREE.Mesh(pointGeometry, pointMaterial);
	const point2 = new THREE.Mesh(pointGeometry, pointMaterial);
	const pointip2 = new THREE.Mesh(pointGeometry, pointMaterial);
	
	point.position.set(xP, yP, zP);
	pointim.position.set(xP, yimP, zP);
	pointip.position.set(xP, yipP, zP);
	
	point2.position.set(xP2, yP2, zP2);
	pointim2.position.set(xP2, yimP2, zP2);
	pointip2.position.set(xP2, yipP2, zP2);
	
	
	
	points1.push(new THREE.Vector3(Math.log10(test.reference[i]) + 6, test.ecart[i] / 100, zP));
	points2.push(new THREE.Vector3(Math.log10(test2.reference[i]) + 6, test2.ecart[i] / 100, zP2));
	points3.push(new THREE.Vector3(Math.log10(test.reference[i]) + 6, test.incertitudeMoins[i] / 100, zP));
	points4.push(new THREE.Vector3(Math.log10(test2.reference[i]) + 6, test2.incertitudeMoins[i] / 100, zP2));
	points5.push(new THREE.Vector3(Math.log10(test.reference[i]) + 6, test.incertitudePlus[i] / 100, zP));
	points6.push(new THREE.Vector3(Math.log10(test2.reference[i]) + 6, test2.incertitudePlus[i] / 100, zP2));
	const lineGeometry1 = new THREE.BufferGeometry().setFromPoints(points1);
	const lineGeometry2 = new THREE.BufferGeometry().setFromPoints(points2);
	const lineGeometry3 = new THREE.BufferGeometry().setFromPoints(points3);
	const lineGeometry4 = new THREE.BufferGeometry().setFromPoints(points4);
	const lineGeometry5 = new THREE.BufferGeometry().setFromPoints(points5);
	const lineGeometry6 = new THREE.BufferGeometry().setFromPoints(points6);
	const line1 = new THREE.Line(lineGeometry1, lineMaterial);
	const line2 = new THREE.Line(lineGeometry2, lineMaterial);
	const line3 = new THREE.Line(lineGeometry3, lineMaterial);
	const line4 = new THREE.Line(lineGeometry4, lineMaterial);
	const line5 = new THREE.Line(lineGeometry5, lineMaterial);
	const line6 = new THREE.Line(lineGeometry6, lineMaterial);
	scene.add(line1);
	scene.add(line2);
	scene.add(line3);
	scene.add(line4);
	scene.add(line5);
	scene.add(line6);

	scene.add(point);
	scene.add(point2);
	scene.add(pointim);
	scene.add(pointim2);
	scene.add(pointim);
	scene.add(pointip2);
}

// for (let i = 0; i < test.reference.length; i++) {
// // 	const xP =THREE.MathUtils.randFloatSpread(2)
// // const yP =THREE.MathUtils.randFloatSpread(2)
// // const zP =THREE.MathUtils.randFloatSpread(2)
// // vertices.push(xP,yP,zP)
// const xP = Math.log10(test.reference[i])+6
// const yP = test.incertitudePlus[i]/100;
// const zP=0
// // const xP = i/1000
// // const yP = i*i/1000000;
// // const zP=0

// const point = new THREE.Mesh(pointGeometry,pointMaterial)
// point.position.x=xP
// point.position.y=yP
// point.position.z=zP
// console.log(point.position)
// scene.add(point)
// }

// const points = [];
// const points2 = [];
// const points3 = [];
// for (let i = 0; i < test.reference.length; i++) {}

// for (let i = 0; i < test.reference.length; i++) {
// 	points2.push(new THREE.Vector3(Math.log10(test.reference[i]) + 6, test.incertitudeMoins[i] / 100, 0));
// }

// const lineGeometry2 = new THREE.BufferGeometry().setFromPoints(points2);

// for (let i = 0; i < test.reference.length; i++) {
// 	points3.push(new THREE.Vector3(Math.log10(test.reference[i]) + 6, test.incertitudePlus[i] / 100, 0));
// }

// const lineGeometry3 = new THREE.BufferGeometry().setFromPoints(points3);
// const line3 = new THREE.Line(lineGeometry3, lineMaterial);
// scene.add(line3);
// pointGeometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3))

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

const renderer = new THREE.WebGLRenderer({alpha:true});
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(2, 1.5, 2);
// camera.lookAt(2,0,0)
// camera.up.add(0,0,1)
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(2, 0, 0);
console.log(controls);
scene.add(camera);
// gui.add(camera.position, "x");

// renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

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
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

let rotationX = 0;

const tick = () => {
	// cube.rotation.x +=0.1
	console.log(position)
	camera.rotation.set(rotationX,0,0)
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
	}
	for (const object of objs) {
		if (!intersects.find((intersect) => intersect.object === object)) {
			gsap.to(object.scale, { x: 1, y: 1 });
			gsap.to(object.rotation, { y: 0 });
			gsap.to(object.position, { z: 0 });
		}
	}

	camera.position.y = position;
	renderer.render(scene, camera);
	controls.update();
	requestAnimationFrame(tick);
};

tick();
// document.getElementById("x").innerHTML = "x = " + cube.position.x;
// document.getElementById("y").innerHTML = "y = " + cube.position.y;
// document.getElementById("z").innerHTML = "z = " + cube.position.z;
