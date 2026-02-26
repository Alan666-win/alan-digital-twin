


// // features/statusSummary/statusSummary.js

// import { statusMap } from '../../data/statusStore.js';
// import { hasPermission, getCurrentRole } from '../../data/permission.js';
// import { closeAlertRecord } from '../../data/alertStore.js';

// let lastDangerCount = 0;
// let summaryEl = null;



// // ==============================
// // 统计仓库状态数量
// // ==============================
// function countStatus() {
//   let normal = 0;
//   let warning = 0;
//   let danger = 0;

//   Object.values(statusMap).forEach(status => {
//     if (status === 'normal') normal++;
//     else if (status === 'warning') warning++;
//     else if (status === 'danger') danger++;
//   });

//   return { normal, warning, danger };
// }


// // ==============================
// // 创建 DOM
// // ==============================
// function createSummaryDOM() {

//   // const rightRoot = document.getElementById('right-control');
//   // const statusRoot = document.getElementById('status-root');

//   const statusRoot = document.getElementById('status-root');

// if (statusRoot) {
//   statusRoot.appendChild(el);
// }
//   if (!rightRoot) return;

//   const el = document.createElement('div');
//   el.id = 'status-summary';

//   el.innerHTML = `
//     <span class="item normal">
//       <i class="dot"></i><b class="num">0</b>
//     </span>
//     <span class="item warning">
//       <i class="dot"></i><b class="num">0</b>
//     </span>
//     <span class="item danger">
//       <i class="dot"></i><b class="num">0</b>
//     </span>
//   `;

  

//   // ⭐ 插入到 right-control 顶部
//   // rightRoot.prepend(el);

//   // statusRoot.appendChild(el);

//   summaryEl = el;

//   bindClearEvent();
// }


// // ==============================
// // 清除报警事件
// // ==============================
// function bindClearEvent() {

//   // clearBtn.addEventListener('click', () => {

//   //   if (!hasPermission('clearAlert')) {
//   //     alert('当前角色无清除报警权限');
//   //     return;
//   //   }

//   //   const role = getCurrentRole();

//   //   Object.keys(statusMap).forEach(key => {
//   //     if (statusMap[key] === 'warning' || statusMap[key] === 'danger') {
//   //       closeAlertRecord(key, role);
//   //     }
//   //   });

//   //   alert('报警记录已关闭');
//   // });
// }


// // ==============================
// // 更新 UI
// // ==============================
// function updateSummary() {

//   if (!summaryEl) return;

//   const { normal, warning, danger } = countStatus();

//   summaryEl.querySelector('.normal .num').textContent = normal;
//   summaryEl.querySelector('.warning .num').textContent = warning;
//   summaryEl.querySelector('.danger .num').textContent = danger;

//   // danger 0 → 1 闪烁提示
//   if (lastDangerCount === 0 && danger > 0) {
//     summaryEl.classList.add('danger-alert');
//     setTimeout(() => {
//       summaryEl.classList.remove('danger-alert');
//     }, 1200);
//   }

//   lastDangerCount = danger;

  
// }


// // ==============================
// // 清除按钮显示逻辑
// // ==============================



// // ==============================
// // 监听角色变化
// // ==============================
// window.addEventListener('role-change', () => {
//   updateSummary();
// });


// // ==============================
// // 初始化
// // ==============================
// export function initStatusSummary() {
//   createSummaryDOM();
//   updateSummary();

//   // 每秒刷新一次
//   setInterval(updateSummary, 1000);
// }




// features/statusSummary/statusSummary.js

import { statusMap } from '../../data/statusStore.js';

let lastDangerCount = 0;
let summaryEl = null;
let timer = null;


// ==============================
// 统计仓库状态数量
// ==============================
function countStatus() {
  let normal = 0;
  let warning = 0;
  let danger = 0;

  Object.values(statusMap).forEach(status => {
    if (status === 'normal') normal++;
    else if (status === 'warning') warning++;
    else if (status === 'danger') danger++;
  });

  return { normal, warning, danger };
}


// ==============================
// 创建 DOM
// ==============================
function createSummaryDOM() {

  const statusRoot = document.getElementById('status-root');
  if (!statusRoot) return;

  // 防止重复创建
  if (document.getElementById('status-summary')) return;

  const el = document.createElement('div');
  el.id = 'status-summary';

  el.innerHTML = `
    <span class="item normal">
      <i class="dot"></i><b class="num">0</b>
    </span>
    <span class="item warning">
      <i class="dot"></i><b class="num">0</b>
    </span>
    <span class="item danger">
      <i class="dot"></i><b class="num">0</b>
    </span>
  `;

  statusRoot.appendChild(el);

  summaryEl = el;
}


// ==============================
// 更新 UI
// ==============================
function updateSummary() {

  if (!summaryEl) return;

  const { normal, warning, danger } = countStatus();

  summaryEl.querySelector('.normal .num').textContent = normal;
  summaryEl.querySelector('.warning .num').textContent = warning;
  summaryEl.querySelector('.danger .num').textContent = danger;

  // danger 0 → 1 闪烁提示
  if (lastDangerCount === 0 && danger > 0) {
    summaryEl.classList.add('danger-alert');
    setTimeout(() => {
      summaryEl.classList.remove('danger-alert');
    }, 1200);
  }

  lastDangerCount = danger;
}


// ==============================
// 初始化
// ==============================
export function initStatusSummary() {

  createSummaryDOM();
  updateSummary();

  // 防止重复 setInterval
  if (timer) clearInterval(timer);

  timer = setInterval(updateSummary, 1000);
}

