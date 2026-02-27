


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
