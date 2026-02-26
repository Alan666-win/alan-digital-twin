
// // main.js
// // ==============================
// // 项目入口（最终稳定版）
// // ==============================

// // 启动核心模块
// import './RendererCamera.js';
// import './RenderLoop.js';
// import './scene/index.js';
// import './features/raycastInfo/raycastEntry.js';
// import './features/statusSummary/statusSummary.js';

// import { initTrendPanel } from './features/trendPanel/trendPanel.js';
// import { setRole } from './data/permission.js';



// // 拿到 renderer
// import { renderer } from './RendererCamera.js';


// import { setRole, userState } from './data/userStore.js';

// const select = document.getElementById('roleSelect');

// if (select) {
//   select.value = userState.role;

//   select.addEventListener('change', (e) => {
//     const role = e.target.value;
//   setRole(role);

//   console.log('当前角色:', role);// 刷新模拟重新登录
//   });
// }


// // ==============================
// // 挂载 WebGL Canvas
// // ==============================
// const app = document.getElementById('app');

// if (app && renderer) {
//   app.appendChild(renderer.domElement);
// }

// initTrendPanel();



// // main.js
// // ==============================
// // 项目入口（权限系统稳定版）
// // ==============================

// // 启动核心模块
// import './RendererCamera.js';
// import './RenderLoop.js';
// import './scene/index.js';
// import './features/raycastInfo/raycastEntry.js';
// // import './features/statusSummary/statusSummary.js';

// import { initTrendPanel } from './features/trendPanel/trendPanel.js';
// import { setRole } from './data/permission.js';
// // import { showAlertHistory } from './features/alertHistory/alertHistory.js';
// import { startSensorEngine } from './data/sensorEngine.js';

// import { analyzeAlerts } from './data/alertAnalytics.js';
// import { initStatisticsPanel } from './features/statisticsPanel/statisticsPanel.js';

// import { initRightControl } from './ui/rightControl.js'
// import './features/alertHistory/alertHistory.js';

// import { initStatusSummary } from './features/statusSummary/statusSummary.js';

// initRightControl();

// initStatusSummary();


// setTimeout(() => {
  
// }, 10000);




// // 拿到 renderer
// import { renderer } from './RendererCamera.js';




// // ==============================
// // 角色切换控制
// // ==============================
// const select = document.getElementById('roleSelect');

// if (select) {

//   select.addEventListener('change', (e) => {
//     const role = e.target.value;

//     setRole(role);

//     console.log('当前角色:', role);

//     // 🔥 可选：刷新页面模拟重新登录
//     // location.reload();
//   });
// }


// // ==============================
// // 挂载 WebGL Canvas
// // ==============================
// const app = document.getElementById('app');

// if (app && renderer) {
//   app.appendChild(renderer.domElement);
// }




// window.addEventListener('DOMContentLoaded', () => {
//   const tip = document.getElementById('screen-tip');
//   if (!tip) return;

//   tip.classList.add('show');

//   setTimeout(() => {
//     tip.classList.remove('show');
//   }, 3000);
// });






// // 初始化趋势面板

// initTrendPanel();
// initStatisticsPanel();




// startSensorEngine(3000);



// main.js
// ==============================
// 项目入口（权限系统稳定版 + 工业级全屏控制）
// ==============================

// 启动核心模块
import './RendererCamera.js';
import './RenderLoop.js';
import './scene/index.js';
import './features/raycastInfo/raycastEntry.js';

import { initTrendPanel } from './features/trendPanel/trendPanel.js';
import { setRole } from './data/permission.js';
import { startSensorEngine } from './data/sensorEngine.js';
import { analyzeAlerts } from './data/alertAnalytics.js';
import { initStatisticsPanel } from './features/statisticsPanel/statisticsPanel.js';
import { initRightControl } from './ui/rightControl.js';
import './features/alertHistory/alertHistory.js';
import { initStatusSummary } from './features/statusSummary/statusSummary.js';

// ==============================
// 初始化 UI 系统
// ==============================

initRightControl();
initStatusSummary();

// ==============================
// 拿到 renderer
// ==============================

import { renderer } from './RendererCamera.js';

// ==============================
// 挂载 WebGL Canvas
// ==============================

const app = document.getElementById('app');

if (app && renderer) {
  app.appendChild(renderer.domElement);
}

// ==============================
// 角色切换控制
// ==============================

const select = document.getElementById('roleSelect');

if (select) {
  select.addEventListener('change', (e) => {
    const role = e.target.value;
    setRole(role);
    console.log('当前角色:', role);
  });
}


// function enterFullscreen() {
//   if (!document.fullscreenElement) {
//     app.requestFullscreen().catch(err => {
//       console.warn('无法进入全屏:', err);
//     });
//   }
// }

// function exitFullscreen() {
//   if (document.fullscreenElement) {
//     document.exitFullscreen();
//   }
// }

// function toggleFullscreen() {
//   if (!document.fullscreenElement) {
//     enterFullscreen();
//   } else {
//     exitFullscreen();
//   }
// }

// // 键盘监听
// document.addEventListener('keydown', (e) => {

//   // F 键切换
//   if (e.key === 'f' || e.key === 'F') {
//     e.preventDefault();
//     toggleFullscreen();
//   }

//   // ESC 退出
//   if (e.key === 'Escape' && document.fullscreenElement) {
//     exitFullscreen();
//   }

// });



// ==============================
// ⭐ 工业级全屏控制系统（修复版）
// ==============================

function enterFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.warn('无法进入全屏:', err);
    });
  }
}

function exitFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    enterFullscreen();
  } else {
    exitFullscreen();
  }
}

// 键盘监听
document.addEventListener('keydown', (e) => {

  // F 键切换
  if (e.key === 'f' || e.key === 'F') {
    e.preventDefault();
    toggleFullscreen();
  }

  // ESC 退出
  if (e.key === 'Escape' && document.fullscreenElement) {
    exitFullscreen();
  }

});

// ==============================
// ⭐ 全屏提示控制
// ==============================

function showScreenTip() {
  const tip = document.getElementById('screen-tip');
  if (!tip) return;

  tip.classList.add('show');

  setTimeout(() => {
    tip.classList.remove('show');
  }, 3000);
}

// 页面首次加载提示
window.addEventListener('DOMContentLoaded', () => {
  showScreenTip();
});

// 进入 / 退出全屏时提示
document.addEventListener('fullscreenchange', () => {
  showScreenTip();
});

// ==============================
// 初始化业务模块
// ==============================

initTrendPanel();
initStatisticsPanel();
startSensorEngine(3000);


