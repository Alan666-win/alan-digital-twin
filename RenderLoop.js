
// RenderLoop.js
// ==============================
// 渲染循环 + 呼吸色系统（最终工业版）
// ==============================

// import { scene } from './scene/index.js';
// import { renderer, camera, controls } from './RendererCamera.js';
// import { labelRenderer } from './messageTag.js';

// import { granaryArr } from './scene/model.js';
// import { statusMap } from './data/statusStore.js';

// import * as THREE from '../../../three.js-r123/build/three.module.js';
// import { updateAlertLabels } from './features/alertLabel/alertLabel.js';
// import { activeTarget } from './features/raycastInfo/choose.js';

// const app = document.getElementById('app');

// // ==============================
// // resize
// // ==============================
// function resizeAll() {
//   const w = app.clientWidth;
//   const h = app.clientHeight;

//   camera.aspect = w / h;
//   camera.updateProjectionMatrix();

//   renderer.setSize(w, h);
//   renderer.setPixelRatio(window.devicePixelRatio);

//   labelRenderer.setSize(w, h);
// }

// window.addEventListener('resize', resizeAll);
// document.addEventListener('fullscreenchange', resizeAll);
// resizeAll();

// // ==============================
// // 唯一时间源
// // ==============================
// let time = 0;

// // ==============================
// // 渲染循环
// // ==============================
// function render() {

//   time += 0.03;

//   granaryArr.forEach(mesh => {

//     const { warehouseId, baseColor } = mesh.userData;
//     const status = statusMap?.[warehouseId] ?? 'normal';

//     // ⭐ 确保每个仓独立材质
//     if (!mesh.userData.__materialCloned) {
//       mesh.material = mesh.material.clone();
//       mesh.userData.__materialCloned = true;
//     }

//     // ==========================
//     // 🖤 点击选中优先
//     // ==========================
//     if (activeTarget === mesh) {
//       mesh.material.color.setHex(0x000000);
//       return;
//     }

//     // ==========================
//     // 🟢 normal
//     // ==========================
//     if (status === 'normal') {
//       mesh.material.color.copy(baseColor);
//       return;
//     }

//     // ==========================
//     // 🟠 warning 呼吸
//     // ==========================
//     if (status === 'warning') {

//       const pulse = (Math.sin(time * 1.2) + 1) / 2;
//       const strength = 1 + pulse * 0.35; // 0.45 ~ 0.80

//       mesh.material.color
//         .copy(baseColor)
//         .lerp(new THREE.Color(0xff6600), strength);

//       return;
//     }

//     // ==========================
//     // 🔴 danger 呼吸
//     // ==========================
//     if (status === 'danger') {

//       const pulse = (Math.sin(time * 3.5) + 1) / 2;
//       const strength = 0.6 + pulse * 0.4; // 0.55 ~ 0.95

//       mesh.material.color
//         .copy(baseColor)
//         .lerp(new THREE.Color(0xff0000), strength);

//       return;
//     }

//   });

//   controls.update();

//   // 标签系统
//   updateAlertLabels(scene);

//   renderer.render(scene, camera);
//   labelRenderer.render(scene, camera);

//   requestAnimationFrame(render);
// }

// render();

// export { renderer };






import { scene } from './scene/index.js';
import { renderer, camera, controls } from './RendererCamera.js';
import { labelRenderer } from './messageTag.js';

import { granaryArr } from './scene/model.js';
import { statusMap } from './data/statusStore.js';

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.123.0/build/three.module.js';
import { updateAlertLabels } from './features/alertLabel/alertLabel.js';
import { activeTarget } from './features/raycastInfo/choose.js';

const app = document.getElementById('app');


// ==============================
// resize
// ==============================
function resizeAll() {
  const w = app.clientWidth;
  const h = app.clientHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
  renderer.setPixelRatio(window.devicePixelRatio);

  labelRenderer.setSize(w, h);
}

window.addEventListener('resize', resizeAll);
document.addEventListener('fullscreenchange', resizeAll);
resizeAll();


// ==============================
// 唯一时间源
// ==============================
let time = 0;

function render() {

  time += 0.03;

  granaryArr.forEach(mesh => {

    const { warehouseId, originalColor } = mesh.userData;
    const status = statusMap?.[warehouseId] ?? 'normal';

    // 确保每个仓独立材质
    if (!mesh.userData.__materialCloned) {
      mesh.material = mesh.material.clone();
      mesh.userData.__materialCloned = true;
    }

    // 选中优先
    if (activeTarget === mesh) {
      mesh.material.color.setHex(0x000000);
      return;
    }

    // ==========================
    // 🟢 normal
    // ==========================
    if (status === 'normal') {
      mesh.material.color.copy(originalColor);
      return;
    }

    // ==========================
    // 🟠 warning 呼吸（真正回原色）
    // ==========================
//     if (status === 'warning') {

  

//   const pulse = (Math.sin(time * 1.5) + 1) / 2;
// const strength = Math.pow(pulse, 1.3);



//   mesh.material.color
//     .copy(originalColor)
//     .lerp(new THREE.Color(0xff5500), strength);

//   return;
// }


if (status === 'warning') {

  const pulse = (Math.sin(time * 2.0) + 1) / 2;

  // 强制最小强度 0.4
  const strength = 0.8 + pulse * 0.8;

  mesh.material.color
    .copy(originalColor)
    .lerp(new THREE.Color(0xff6600), strength);

  return;
}

    // ==========================
    // 🔴 danger 呼吸（强烈版）
    // ==========================
    if (status === 'danger') {

      const pulse = (Math.sin(time * 4.5) + 1) / 2;  // 更急促
      const strength = pulse;  // 0~1

      mesh.material.color
        .copy(originalColor)
        .lerp(new THREE.Color(0xff0000), strength);

      return;
    }

  });

  controls.update();

  // 更新标签
  updateAlertLabels(scene);

  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
    forceInfoPanelOnTop();
  

  requestAnimationFrame(render);
}

render();



function forceInfoPanelOnTop() {
  const root = labelRenderer?.domElement;
  if (!root) return;

  // 1) infoPanel 强制最高
  const panels = root.querySelectorAll('.info-panel');
  panels.forEach(el => {
    el.style.zIndex = '999999';       // 🔥 永远最大
    el.style.pointerEvents = 'none';  // 不挡拾取（你本来就要）
  });

  // 2) 风险牌子固定较低（可选，但建议加）
  const risks = root.querySelectorAll('.risk-anchor');
  risks.forEach(el => {
    // 避免误伤：如果以后你把 risk-anchor 放进面板里，这里不会降它
    if (el.closest('.info-panel')) return;
    el.style.zIndex = '1000';
  });
}






export { renderer };










