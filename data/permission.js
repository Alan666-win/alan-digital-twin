// data/permission.js

// 当前角色（默认 viewer）
// let currentRole = 'viewer';

// // 角色权限映射表
// const rolePermissions = {
//   viewer: [
//     'viewTrend'
//   ],

//   operator: [
//     'viewTrend',
//     'clearAlert'
//   ],

//   admin: [
//     'viewTrend',
//     'clearAlert',
//     'editThreshold'
//   ]
// };


// // 设置角色
// // export function setRole(role) {
// //   currentRole = role;
// // }

// export function setRole(role) {
//   currentRole = role;

//   // 🔥 广播角色变化事件
//   window.dispatchEvent(
//     new CustomEvent('role-change', {
//       detail: { role }
//     })
//   );
// }


// // 获取当前角色
// export function getRole() {
//   return currentRole;
// }

// // 判断权限
// export function hasPermission(action) {
//   return PERMISSIONS[currentRole]?.includes(action);
// }



// let currentRole = 'viewer';

// const rolePermissions = {
//   viewer: [
//     'viewTrend'
//   ],

//   operator: [
//     'viewTrend',
//     'clearAlert'
//   ],

//   admin: [
//     'viewTrend',
//     'clearAlert',
//     'editThreshold'
//   ]
// };

// export function setRole(role) {
//   currentRole = role;

//   window.dispatchEvent(
//     new CustomEvent('role-change', {
//       detail: { role }
//     })
//   );
// }

// export function hasPermission(permissionCode) {
//   const permissions = rolePermissions[currentRole] || [];
//   return permissions.includes(permissionCode);
// }

// export function getCurrentRole() {
//   return currentRole;
// }


// // data/permission.js

// let currentRole = 'admin';

// const PERMISSIONS = {
//   admin: ['clearAlert'],
//   operator: [],
//   viewer: []
// };

// export function setRole(role) {
//   currentRole = role;

//   window.dispatchEvent(new Event('role-change'));
// }

// export function getCurrentRole() {
//   return currentRole;
// }

// export function hasPermission(permission) {
//   return PERMISSIONS[currentRole]?.includes(permission);
// }



// data/permission.js

// let currentRole = 'admin';

// const PERMISSIONS = {
//   admin: [
//     'viewTrend',
//     'clearAlert'
//   ],

//   operator: [
//     'viewTrend'
//   ],

//   viewer: [
//     'viewTrend'
//   ]
// };

// export function setRole(role) {
//   currentRole = role;

//   window.dispatchEvent(new Event('role-change'));
// }

// export function getCurrentRole() {
//   return currentRole;
// }

// export function hasPermission(permission) {
//   return PERMISSIONS[currentRole]?.includes(permission);
// }



// data/permission.js
// ==============================
// 权限系统（正式版）
// ==============================

// let currentRole = 'admin';


// // 权限矩阵
// const PERMISSIONS = {
//   admin: [
//     'viewTrend',
//     'clearAlert',
//     'acknowledgeAlert'
//   ],

//   operator: [
//     'viewTrend',
//     'acknowledgeAlert'
//   ],

//   viewer: []
// };



// // ==============================
// // 设置角色
// // ==============================
// export function setRole(role) {
//   currentRole = role;

//   // 通知全局 UI 更新
//   window.dispatchEvent(new Event('role-change'));
// }


// // ==============================
// // 获取当前角色
// // ==============================
// export function getCurrentRole() {
//   return currentRole;
// }


// // ==============================
// // 判断权限
// // ==============================
// export function hasPermission(permission) {
//   return PERMISSIONS[currentRole]?.includes(permission) || false;
// }




// data/permission.js
// ==============================
// 权限系统（统一版）
// ==============================

// import { getUserRole, setUserRole } from './userStore.js';


// // ==============================
// // 当前角色（从本地读取）
// // ==============================
// let currentRole = getUserRole();


// // ==============================
// // 权限矩阵
// // ==============================
// const PERMISSIONS = {
//   admin: [
//     'viewTrend',
//     'clearAlert',
//     'acknowledgeAlert'
//   ],

//   operator: [
//     'viewTrend',
//     'acknowledgeAlert'
//   ],

//   viewer: []
// };



// // ==============================
// // 设置角色（同步到本地）
// // ==============================
// export function setRole(role) {

//   currentRole = role;

//   // 同步到 userStore（本地存储）
//   setUserRole(role);

//   // 通知全局 UI 更新
//   window.dispatchEvent(new Event('role-change'));
// }



// // ==============================
// // 获取当前角色
// // ==============================
// export function getCurrentRole() {
//   return currentRole;
// }



// // ==============================
// // 判断权限
// // ==============================
// export function hasPermission(permission) {
//   return PERMISSIONS[currentRole]?.includes(permission) || false;
// }





import { getUserRole, setUserRole } from './userStore.js';

let currentRole = getUserRole();

const PERMISSIONS = {
  admin: [
    'viewTrend',
    'viewStatistics',
    'viewHistory',
    'clearAlert',
    'acknowledgeAlert'
  ],

  operator: [
    'viewTrend',
    'viewStatistics',
    'viewHistory',
    'acknowledgeAlert'
  ],

  viewer: [
      // 只允许看趋势
  ]
};

export function setRole(role) {
  currentRole = role;
  setUserRole(role);
  window.dispatchEvent(new Event('role-change'));
}

export function getCurrentRole() {
  return currentRole;
}

export function hasPermission(permission) {
  return PERMISSIONS[currentRole]?.includes(permission) || false;
}

