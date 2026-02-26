






import messageData from '../messageData.js';
import { evaluateWarehouse } from './warehouseJudge.js';
import { createAlertRecord, closeAlertRecord } from './alertStore.js';


// ==============================
// 仓级状态（只存 level）
// ==============================
export const statusMap = {};


// ==============================
// 仓级完整评估结果（给面板用）
// ==============================
export const statusDetailMap = {};


// ==============================
// 内部方法：更新单个仓库状态
// ==============================
function updateWarehouseStatus(data) {

  const result = evaluateWarehouse({
    warehouseId: data.warehouseId,
    warehouseName: data.warehouseName,
    temperature: data.temperature,
    humidity: data.humidity,
    grainHeight: data.grainHeight,
    warehouseHeight: data.warehouseHeight,
    inventory: data.inventory,
    time: data.time
  });

  const warehouseId = data.warehouseId;
  const newStatus = result.status;
  const oldStatus = statusMap[warehouseId];

  statusMap[warehouseId] = newStatus;
  statusDetailMap[warehouseId] = result;

  // ⭐ 生命周期逻辑
  handleAlertLifecycle(warehouseId, oldStatus, newStatus);
}


// ==============================
// 报警生命周期处理核心
// ==============================
function handleAlertLifecycle(warehouseId, oldStatus, newStatus) {

  // ① 从 normal 进入异常 → 创建报警
  if (
    oldStatus === 'normal' &&
    (newStatus === 'warning' || newStatus === 'danger')
  ) {
    createAlertRecord(warehouseId, newStatus);
  }

  // ② 异常等级升级（warning → danger）
  if (
    oldStatus === 'warning' &&
    newStatus === 'danger'
  ) {
    createAlertRecord(warehouseId, newStatus);
  }

  // ③ 从异常恢复 normal → 自动关闭报警
  if (
    (oldStatus === 'warning' || oldStatus === 'danger') &&
    newStatus === 'normal'
  ) {
    closeAlertRecord(warehouseId);
  }

}


// ==============================
// 初始化函数（只执行一次）
// ==============================
function initStatusStore() {

  Object.values(messageData).forEach(data => {
    updateWarehouseStatus(data);
  });

}


// ==============================
// 对外暴露：手动刷新某仓状态（以后接实时数据用）
// ==============================
export function refreshWarehouse(data) {
  updateWarehouseStatus(data);
}


// ==============================
// 执行初始化
// ==============================
initStatusStore();


// ==============================
// 重新评估所有仓库（供 sensorEngine 调用）
// ==============================
export function reevaluateAllWarehouses() {

  Object.values(messageData).forEach(data => {

    const warehouseId = data.warehouseId;
    const oldStatus = statusMap[warehouseId];

    const result = evaluateWarehouse({
      warehouseId: data.warehouseId,
      warehouseName: data.warehouseName,
      temperature: data.temperature,
      humidity: data.humidity,
      grainHeight: data.grainHeight,
      warehouseHeight: data.warehouseHeight,
      inventory: data.inventory,
      time: data.time
    });

    const newStatus = result.status;

    if (oldStatus !== newStatus) {

      statusMap[warehouseId] = newStatus;
      statusDetailMap[warehouseId] = result;

      

      // ⭐ 生命周期处理
      handleAlertLifecycle(warehouseId, oldStatus, newStatus);
    }

  });

}

