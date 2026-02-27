



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

