








// import { activeTarget } from '../features/raycastInfo/choose.js';
// import { showTrendPanel } from '../features/trendPanel/trendPanel.js';
// import { openStatisticsPanel } from '../features/statisticsPanel/statisticsPanel.js';

// import {
//   setRole,
//   getCurrentRole,
//   hasPermission
// } from '../data/permission.js';

// let trendBtn = null;
// let roleBtn = null;
// let roleMenu = null;

// export function initRightControl() {

//   const root = document.getElementById('right-control');
//   if (!root) return;

//   root.innerHTML = '';

//   // ===== 角色按钮 =====
//   roleBtn = createBtn('角色管理', 'role-btn');
//   root.appendChild(roleBtn);

//   roleBtn.onclick = (e) => {
//   e.stopPropagation();
//   showRoleMenu(roleBtn);
// };

//   // ===== 报警运营 =====
//   if (hasPermission('viewStatistics')) {
//     const statsBtn = createBtn('报警运营', 'stats-btn');
//     root.appendChild(statsBtn);

//     statsBtn.onclick = () => {
//       openStatisticsPanel();
//     };
//   }

//   // ===== 趋势分析 =====
//   if (hasPermission('viewTrend')) {
//     trendBtn = createBtn('趋势分析', 'trend-btn');
//     root.appendChild(trendBtn);

//     trendBtn.onclick = () => {
//       if (!activeTarget) return;
//       showTrendPanel();
//     };
//   }

//   // ===== 报警历史 =====
//   if (hasPermission('viewHistory')) {
//     const historyBtn = createBtn('报警历史', 'history-btn');
//     root.appendChild(historyBtn);

//     historyBtn.onclick = () => {
//       import('../features/alertHistory/alertHistory.js')
//         .then(module => {
//           module.showAlertHistory();
//         });
//     };
//   }

//   // ===== 清除报警（仅 admin）=====
//   if (hasPermission('clearAlert')) {
//     const clearBtn = createBtn('清除报警', 'clear-btn');
//     root.appendChild(clearBtn);

//     clearBtn.onclick = () => {
//       if (!confirm('确认清除所有报警？')) return;

//       import('../data/statusStore.js').then(({ statusMap }) => {
//         import('../data/alertStore.js').then(({ closeAlertRecord }) => {
//           Object.keys(statusMap).forEach(key => {
//             if (statusMap[key] === 'warning' || statusMap[key] === 'danger') {
//               closeAlertRecord(key, getCurrentRole());
//             }
//           });
//         });
//       });
//     };
//   }
// }

// // ==============================
// // 工具函数
// // ==============================

// function createBtn(text, className) {
//   const btn = document.createElement('div');
//   btn.className = `control-btn ${className}`;
//   btn.innerText = text;
//   return btn;
// }


// function createRoleMenu() {

//   // 如果已存在，直接返回
//   if (roleMenu) return;

//   roleMenu = document.createElement('div');
//   roleMenu.className = 'role-menu';

//   const roles = [
//     { key: 'admin', label: '管理员' },
//     { key: 'operator', label: '操作员' },
//     { key: 'viewer', label: '访客' }
//   ];

//   roles.forEach(r => {

//     const item = document.createElement('div');
//     item.className = 'role-menu-item';
//     item.innerText = r.label;

//     if (r.key === getCurrentRole()) {
//       item.classList.add('active');
//     }

//     item.onclick = () => {
//       setRole(r.key);
//       hideRoleMenu();
//     };

//     roleMenu.appendChild(item);
//   });

//   document.body.appendChild(roleMenu);
// }



// function showRoleMenu(buttonEl) {

//   createRoleMenu();

//   const rect = buttonEl.getBoundingClientRect();

//   roleMenu.style.position = 'absolute';
//   roleMenu.style.top = rect.top + 'px';
//   roleMenu.style.left = (rect.left - 140) + 'px'; // 左侧偏移
//   roleMenu.style.display = 'block';

//   setTimeout(() => {
//     document.addEventListener('click', handleOutsideClick);
//   }, 0);
// }

// function hideRoleMenu() {
//   if (roleMenu) {
//     roleMenu.style.display = 'none';
//   }
//   document.removeEventListener('click', handleOutsideClick);
// }

// function handleOutsideClick(e) {
//   if (!roleMenu.contains(e.target) && !roleBtn.contains(e.target)) {
//     hideRoleMenu();
//   }
// }

// // ==============================
// // 监听角色变化 → 重新渲染
// // ==============================

// window.addEventListener('role-change', () => {
//   initRightControl();
// });














import { activeTarget } from '../features/raycastInfo/choose.js';
import { showTrendPanel } from '../features/trendPanel/trendPanel.js';
import { openStatisticsPanel } from '../features/statisticsPanel/statisticsPanel.js';

import {
  setRole,
  getCurrentRole,
  hasPermission
} from '../data/permission.js';

let trendBtn = null;
let roleBtn = null;
let roleMenu = null;

export function initRightControl() {

  const root = document.getElementById('right-control');
  if (!root) return;

  root.innerHTML = '';

  // ===== 角色按钮 =====
  roleBtn = createBtn('角色管理', 'role-btn');
  root.appendChild(roleBtn);

  roleBtn.onclick = (e) => {
  e.stopPropagation();
  showRoleMenu(roleBtn);
};

  // ===== 报警运营 =====
  if (hasPermission('viewStatistics')) {
    const statsBtn = createBtn('报警运营', 'stats-btn');
    root.appendChild(statsBtn);

    statsBtn.onclick = () => {
      openStatisticsPanel();
    };
  }

  // ===== 趋势分析 =====
  if (hasPermission('viewTrend')) {
    trendBtn = createBtn('趋势分析', 'trend-btn');
    root.appendChild(trendBtn);

    trendBtn.onclick = () => {
      if (!activeTarget) return;
      showTrendPanel();
    };
  }

  // ===== 报警历史 =====
  if (hasPermission('viewHistory')) {
    const historyBtn = createBtn('报警历史', 'history-btn');
    root.appendChild(historyBtn);

    historyBtn.onclick = () => {
      import('../features/alertHistory/alertHistory.js')
        .then(module => {
          module.showAlertHistory();
        });
    };
  }

  // ===== 清除报警（仅 admin）=====
  if (hasPermission('clearAlert')) {
    const clearBtn = createBtn('清除报警', 'clear-btn');
    root.appendChild(clearBtn);

    clearBtn.onclick = () => {
      if (!confirm('确认清除所有报警？')) return;

      import('../data/statusStore.js').then(({ statusMap }) => {
        import('../data/alertStore.js').then(({ closeAlertRecord }) => {
          Object.keys(statusMap).forEach(key => {
            if (statusMap[key] === 'warning' || statusMap[key] === 'danger') {
              closeAlertRecord(key, getCurrentRole());
            }
          });
        });
      });
    };
  }
}

// ==============================
// 工具函数
// ==============================

function createBtn(text, className) {
  const btn = document.createElement('div');
  btn.className = `control-btn ${className}`;
  btn.innerText = text;
  return btn;
}


function createRoleMenu() {

  if (roleMenu) return;

  roleMenu = document.createElement('div');
  roleMenu.className = 'role-menu';

  const roles = [
    { key: 'admin', label: '管理员' },
    { key: 'operator', label: '操作员' },
    { key: 'viewer', label: '访客' }
  ];

  roles.forEach(r => {

    const item = document.createElement('div');
    item.className = 'role-menu-item';
    item.innerText = r.label;

    if (r.key === getCurrentRole()) {
      item.classList.add('active');
    }

    item.onclick = () => {
      setRole(r.key);

      roleMenu.querySelectorAll('.role-menu-item')
    .forEach(i => i.classList.remove('active'));

  item.classList.add('active');
      hideRoleMenu();
    };

    roleMenu.appendChild(item);
  });

  document.body.appendChild(roleMenu);
}

function showRoleMenu(buttonEl) {

  createRoleMenu();

  const rect = buttonEl.getBoundingClientRect();

  roleMenu.style.position = 'fixed';
  roleMenu.style.top = rect.top + 'px';

  // 关键：用 right 定位
  roleMenu.style.right = (window.innerWidth - rect.left + 10) + 'px';

  roleMenu.style.display = 'block';

  roleMenu.classList.add('open');

  setTimeout(() => {
    document.addEventListener('click', handleOutsideClick);
  }, 0);
}


function hideRoleMenu() {
  if (roleMenu) {
    roleMenu.classList.remove('open');
    setTimeout(() => {
      roleMenu.style.display = 'none';
    }, 200);
  }
  document.removeEventListener('click', handleOutsideClick);
}





function handleOutsideClick(e) {
  if (!roleMenu.contains(e.target) && !roleBtn.contains(e.target)) {
    hideRoleMenu();
  }
}

// ==============================
// 监听角色变化 → 重新渲染
// ==============================

window.addEventListener('role-change', () => {
  initRightControl();
});






















