// // data/userStore.js

// // 当前用户状态
// export const userState = {
//   role: 'viewer'  // admin | operator | viewer
// };

// // 权限映射表
// const permissionMap = {
//   admin: [
//     'viewTrend',
//     'resetAlarm',
//     'editThreshold'
//   ],
//   operator: [
//     'viewTrend'
//   ],
//   viewer: []
// };

// // 权限检查函数
// export function hasPermission(action) {
//   const role = userState.role;
//   return permissionMap[role]?.includes(action);
// }






// data/userStore.js



// const savedRole = localStorage.getItem('role');

// export const userState = {
//   role: savedRole || 'admin'
// };

// const permissionMap = {
//   admin: [
//     'viewTrend',
//     'resetAlarm',
//     'editThreshold'
//   ],
//   operator: [
//     'viewTrend'
//   ],
//   viewer: []
// };

// export function hasPermission(action) {
//   return permissionMap[userState.role]?.includes(action);
// }

// export function setRole(role) {
//   userState.role = role;
//   localStorage.setItem('role', role);
// }





// data/userStore.js
// ==============================
// 用户状态存储（仅负责角色持久化）
// ==============================

// 从本地读取角色
const savedRole = localStorage.getItem('role');

// 用户状态
export const userState = {
  role: savedRole || 'admin'
};


// ==============================
// 获取当前角色
// ==============================
export function getUserRole() {
  return userState.role;
}


// ==============================
// 设置角色（仅存储，不做权限判断）
// ==============================
export function setUserRole(role) {
  userState.role = role;
  localStorage.setItem('role', role);
}
