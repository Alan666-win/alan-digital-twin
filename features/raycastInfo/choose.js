



// import * as THREE from '../../../../../three.js-r123/build/three.module.js';
// import { camera, renderer } from '../../RendererCamera.js';
// import { scene } from '../../scene/index.js';

// import { createInfoPanel } from './infoPanel.js';
// import messageData from '../../messageData.js';

// let activePanel = null;
// let activeTarget = null;


// // ==============================
// // 清除选中
// // ==============================
// function clearSelection() {

//   if (activePanel) {
//     scene.remove(activePanel);
//     activePanel = null;
//   }

//   activeTarget = null;

//   window.dispatchEvent(new CustomEvent('warehouse-change', {
//     detail: null
//   }));
// }

// // ==============================
// // 找仓库根节点
// // ==============================
// function findGranaryRoot(object) {
//   let cur = object;
//   while (cur) {
//     if (cur.userData && cur.userData.warehouseId) return cur;
//     cur = cur.parent;
//   }
//   return null;
// }

// // ==============================
// // 主点击入口
// // ==============================
// function choose(event) {

//   const canvas = renderer.domElement;
//   const rect = canvas.getBoundingClientRect();

//   const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//   const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//   const raycaster = new THREE.Raycaster();
//   raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

//   const intersects = raycaster.intersectObjects(scene.children, true);

//   if (!intersects.length) {
//     clearSelection();
//     return;
//   }

//   const granaryMesh = findGranaryRoot(intersects[0].object);

//   if (!granaryMesh || !granaryMesh.userData.warehouseId) {
//     clearSelection();
//     return;
//   }

//   // 🔥 不再取消同仓
//   if (activeTarget === granaryMesh) {
//     return;
//   }

//   clearSelection();

//   activeTarget = granaryMesh;

//   const warehouseId = granaryMesh.userData.warehouseId;
//   const data = messageData[warehouseId];
//   if (!data) return;

//   window.dispatchEvent(new CustomEvent('warehouse-change', {
//     detail: warehouseId
//   }));

//   activePanel = createInfoPanel(data);
//   if (!activePanel) return;

//   const worldPos = new THREE.Vector3();
//   granaryMesh.getWorldPosition(worldPos);

//   const dir = new THREE.Vector3()
//     .subVectors(camera.position, worldPos)
//     .normalize();

//   activePanel.position.copy(worldPos);
//   activePanel.position.add(dir.multiplyScalar(8));
//   activePanel.position.y += 15;

//   scene.add(activePanel);
// }

// export { choose, activeTarget };













import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.123.0/build/three.module.js';
import { camera, renderer } from '../../RendererCamera.js';
import { scene } from '../../scene/index.js';

import { createInfoPanel } from './infoPanel.js';
import messageData from '../../messageData.js';

// 🔒 新增：引入趋势面板状态
// import { isTrendPanelOpen } from '../trendPanel/trendPanel.js';

let activePanel = null;
let activeTarget = null;

let interactionLocked = false;

export function setInteractionLock(state) {
  interactionLocked = state;
}


// ==============================
// 清除选中
// ==============================
function clearSelection() {

  if (activePanel) {
    scene.remove(activePanel);
    activePanel = null;
  }

  activeTarget = null;

  window.dispatchEvent(new CustomEvent('warehouse-change', {
    detail: null
  }));
}

// ==============================
// 找仓库根节点
// ==============================
function findGranaryRoot(object) {
  let cur = object;
  while (cur) {
    if (cur.userData && cur.userData.warehouseId) return cur;
    cur = cur.parent;
  }
  return null;
}

// ==============================
// 主点击入口
// ==============================
function choose(event) {

  // 🔒 趋势面板打开时禁止点击仓库
  // if (isTrendPanelOpen) {
  //   return;
  // }

  if (interactionLocked) return;

  const canvas = renderer.domElement;
  const rect = canvas.getBoundingClientRect();

  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  if (!intersects.length) {
    clearSelection();
    return;
  }

  const granaryMesh = findGranaryRoot(intersects[0].object);

  if (!granaryMesh || !granaryMesh.userData.warehouseId) {
    clearSelection();
    return;
  }

  // 🔥 不再取消同仓
  if (activeTarget === granaryMesh) {
    return;
  }

  clearSelection();

  activeTarget = granaryMesh;

  const warehouseId = granaryMesh.userData.warehouseId;
  const data = messageData[warehouseId];
  if (!data) return;

  window.dispatchEvent(new CustomEvent('warehouse-change', {
    detail: warehouseId
  }));

  activePanel = createInfoPanel(data);
  if (!activePanel) return;

  const worldPos = new THREE.Vector3();
  granaryMesh.getWorldPosition(worldPos);

  const dir = new THREE.Vector3()
    .subVectors(camera.position, worldPos)
    .normalize();

  activePanel.position.copy(worldPos);
  activePanel.position.add(dir.multiplyScalar(8));
  activePanel.position.y += 15;

  scene.add(activePanel);
}




// ==============================
// ⭐ 新增：排名点击聚焦功能
// ==============================
window.addEventListener('focus-warehouse', (e) => {

  const id = e.detail;

  let target = null;

  scene.traverse(obj => {
    if (obj.userData?.warehouseId === id) {
      target = obj;
    }
  });

  if (!target) return;

  clearSelection();

  activeTarget = target;

  // 飞镜头
  const box = new THREE.Box3().setFromObject(target);
  const center = box.getCenter(new THREE.Vector3());
  const targetPos = center.clone().add(new THREE.Vector3(80, 80, 80));

  const startPos = camera.position.clone();
  const duration = 800;
  const start = performance.now();

  function animate(now) {
    const t = Math.min((now - start) / duration, 1);

    camera.position.lerpVectors(startPos, targetPos, t);
    controls.target.lerp(center, t);
    controls.update();

    if (t < 1) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  const data = messageData[id];
  if (!data) return;

  window.dispatchEvent(new CustomEvent('warehouse-change', {
    detail: id
  }));

  activePanel = createInfoPanel(data);

  const worldPos = new THREE.Vector3();
  target.getWorldPosition(worldPos);

  activePanel.position.copy(worldPos);
  activePanel.position.y += 20;

  scene.add(activePanel);
});

export { choose, activeTarget };























