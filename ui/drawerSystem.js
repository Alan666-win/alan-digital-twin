// let drawer = null
// let currentContent = null

// import { setInteractionLock } from '../features/raycastInfo/choose.js';

// function closeDrawer() {
//   drawer.classList.remove('open');

//   setInteractionLock(false);   // 👈 解锁
// }

// // export function initDrawerSystem() {
// //   if (drawer) return

// //   drawer = document.createElement('div')
// //   drawer.className = 'app-drawer'

// //   drawer.innerHTML = `
// //     <div class="drawer-header">
// //       <div class="drawer-title"></div>
// //       <div class="drawer-close">✕</div>
// //     </div>
// //     <div class="drawer-body"></div>
// //   `

// //   document.body.appendChild(drawer)

// //   drawer.querySelector('.drawer-close').onclick = closeDrawer
// // }


// export function initDrawerSystem() {
//   if (drawer) return

//   drawer = document.createElement('div')
//   drawer.className = 'app-drawer'

//   drawer.innerHTML = `
//     <div class="drawer-header">
//       <div class="drawer-title"></div>
//       <div class="drawer-close">✕</div>
//     </div>
//     <div class="drawer-body"></div>
//   `

//   const root = document.getElementById('drawer-root')
//   if (root) {
//     root.appendChild(drawer)
//   } else {
//     document.body.appendChild(drawer)
//   }

//   drawer.querySelector('.drawer-close').onclick = closeDrawer
// }

// export function openDrawer({ title, content }) {
//   if (!drawer) initDrawerSystem()

//   const titleEl = drawer.querySelector('.drawer-title')
//   const bodyEl = drawer.querySelector('.drawer-body')

//   titleEl.innerText = title

//   // 清空旧内容
//   bodyEl.innerHTML = ''
//   bodyEl.appendChild(content)

//   drawer.classList.add('open')
// }

// export function closeDrawer() {
//   if (!drawer) return
//   drawer.classList.remove('open')
// }





// import { setInteractionLock } from '../features/raycastInfo/choose.js';

// let drawer = null;

// // ==============================
// // 初始化抽屉
// // ==============================
// export function initDrawerSystem() {
//   if (drawer) return;

//   drawer = document.createElement('div');
//   drawer.className = 'app-drawer';

//   drawer.innerHTML = `
//     <div class="drawer-header">
//       <div class="drawer-title"></div>
//       <div class="drawer-close">✕</div>
//     </div>
//     <div class="drawer-body"></div>
//   `;

//   const root = document.getElementById('drawer-root');
//   if (root) {
//     root.appendChild(drawer);
//   } else {
//     document.body.appendChild(drawer);
//   }

//   drawer.querySelector('.drawer-close').onclick = closeDrawer;
// }

// // ==============================
// // 打开抽屉
// // ==============================
// export function openDrawer({ title, content }) {
//   if (!drawer) initDrawerSystem();

//   const titleEl = drawer.querySelector('.drawer-title');
//   const bodyEl = drawer.querySelector('.drawer-body');

//   titleEl.innerText = title;

//   bodyEl.innerHTML = '';
//   bodyEl.appendChild(content);

//   drawer.classList.add('open');

//   // 🔒 打开时锁定交互
//   setInteractionLock(true);
// }

// // ==============================
// // 关闭抽屉
// // ==============================
// export function closeDrawer() {
//   if (!drawer) return;

//   drawer.classList.remove('open');

//   // 🔓 关闭时恢复交互
//   setInteractionLock(false);
// }



import { setInteractionLock } from '../features/raycastInfo/choose.js';

let drawer = null;

// ==============================
// 初始化抽屉
// ==============================
export function initDrawerSystem() {
  if (drawer) return;

  drawer = document.createElement('div');
  drawer.className = 'app-drawer';

  drawer.innerHTML = `
    <div class="drawer-header">
      <div class="drawer-title"></div>
      <div class="drawer-close">✕</div>
    </div>
    <div class="drawer-body"></div>
  `;

  const root = document.getElementById('drawer-root');
  if (root) {
    root.appendChild(drawer);
  } else {
    document.body.appendChild(drawer);
  }

  drawer.querySelector('.drawer-close').onclick = closeDrawer;
}

// ==============================
// 打开抽屉
// ==============================
export function openDrawer({ title, content, drawerClass }) {
  if (!drawer) initDrawerSystem();

  const titleEl = drawer.querySelector('.drawer-title');
  const bodyEl = drawer.querySelector('.drawer-body');

  // ⭐ 每次打开前先清理旧 class
  drawer.className = 'app-drawer';

  // ⭐ 如果传入自定义 class，则添加
  if (drawerClass) {
    drawer.classList.add(drawerClass);
  }

  titleEl.innerText = title;

  bodyEl.innerHTML = '';
  bodyEl.appendChild(content);

  drawer.classList.add('open');

  // 🔒 打开时锁定交互
  setInteractionLock(true);
}

// ==============================
// 关闭抽屉
// ==============================
export function closeDrawer() {
  if (!drawer) return;

  drawer.classList.remove('open');

  // 🔓 关闭时恢复交互
  setInteractionLock(false);
}