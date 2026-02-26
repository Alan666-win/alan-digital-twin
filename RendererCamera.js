
// 引入 Three.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.123.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.123.0/examples/jsm/controls/OrbitControls.js';

// ==============================
// 1️⃣ 相机（⚠️ 不再使用固定 width / height）
// ==============================

const camera = new THREE.PerspectiveCamera(
  30,
  1,          // ⚠️ 占位，真实比例由 resize 决定
  1,
  3000
);

camera.position.set(290, 142, 180);
camera.lookAt(0, 0, 0);

// ==============================
// 2️⃣ 渲染器
// ==============================

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setClearColor(0x005577, 1);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setPixelRatio(window.devicePixelRatio);

// ⚠️ 不在这里 setSize，交给 resizeRenderer

// ==============================
// 3️⃣ OrbitControls
// ==============================

const controls = new OrbitControls(camera, renderer.domElement);

// —— 阻尼（高级感）
controls.enableDamping = true;
controls.dampingFactor = 0.08;

// —— 操作许可
controls.enableRotate = true;
controls.enableZoom = true;
controls.enablePan = true;

// —— 缩放限制
controls.minDistance = 200;
controls.maxDistance = 700;

// —— 仰俯角限制
controls.maxPolarAngle = Math.PI * 0.48;
controls.minPolarAngle = Math.PI * 0.15;

// —— 平移 & 手感
controls.screenSpacePanning = false;
controls.panSpeed = 0.3;
controls.rotateSpeed = 0.2;
controls.zoomSpeed = 0.8;






export { renderer, camera, controls };
