

// data/alertStore.js

// ==============================
// 订阅机制（事件驱动）
// ==============================
const listeners = [];

export function subscribeAlertChange(fn) {
  listeners.push(fn);
}

function notifyAlertChange() {
  listeners.forEach(fn => fn());
}

let alertId = 1;

// ==============================
// 报警记录数组
// ==============================
export const alertRecords = [];


// ==============================
// 时间格式化
// ==============================
function formatTime(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
}

function calculateDuration(start, end) {
  return Math.floor((end - start) / 1000);
}


// ==============================
// 创建报警
// ==============================
export function createAlertRecord(warehouseId, level) {

  const existing = alertRecords.find(
    r => r.warehouseId === warehouseId &&
    (r.status === 'open' || r.status === 'acknowledged')
  );

  // 已存在未关闭报警
  if (existing) {

    // 等级升级
    if (level === 'danger' && existing.level !== 'danger') {
      existing.level = 'danger';
    }

    return;
  }

  const now = new Date();

  alertRecords.push({
    id: alertId++,
    warehouseId,
    level,

    startTimeRaw: now.getTime(),
    startTime: formatTime(now),

    acknowledgedTimeRaw: null,
    acknowledgedTime: null,
    responseDuration: null, // 响应时间（秒）

    endTimeRaw: null,
    endTime: null,
    duration: null, // 总持续时间（秒）

    handledBy: null,

    status: 'open' // open | acknowledged | closed
  });

  notifyAlertChange();

}




// ==============================
// 人工确认
// ==============================
export function acknowledgeAlertRecord(warehouseId, role) {

  const record = alertRecords.find(
    r => r.warehouseId === warehouseId && r.status === 'open'
  );

  if (!record) return;

  const now = new Date();

  record.status = 'acknowledged';
  record.acknowledgedTimeRaw = now.getTime();
  record.acknowledgedTime = formatTime(now);

  record.responseDuration = calculateDuration(
    record.startTimeRaw,
    record.acknowledgedTimeRaw
  );

  record.handledBy = role;
  notifyAlertChange();
  notifyAlertChange();
}


// ==============================
// 关闭报警
// ==============================
export function closeAlertRecord(warehouseId, role = 'system') {

  const record = alertRecords.find(
    r => r.warehouseId === warehouseId &&
    (r.status === 'open' || r.status === 'acknowledged')
  );

  if (!record) return;

  const now = new Date();

  record.status = 'closed';

  record.endTimeRaw = now.getTime();
  record.endTime = formatTime(now);

  record.duration = calculateDuration(
    record.startTimeRaw,
    record.endTimeRaw
  );

  // 如果从 open 直接关闭（自动恢复）
  if (!record.acknowledgedTimeRaw) {
    record.responseDuration = record.duration;
  }

  record.handledBy = role;

  notifyAlertChange();

}



// ==============================
// 未关闭数量
// ==============================
export function getOpenAlertCount() {
  return alertRecords.filter(
    r => r.status === 'open' || r.status === 'acknowledged'
  ).length;
}
