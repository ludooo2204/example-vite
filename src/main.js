import { Camera, Scene, WebGLRenderer } from "three";

const scence =new Scene()
const camera = new Camera()
const renderer= new WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)


