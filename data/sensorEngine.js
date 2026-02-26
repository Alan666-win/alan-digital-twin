// data/sensorEngine.js
// ==============================
// 传感器波动引擎
// ==============================

import messageData from '../messageData.js';
import { reevaluateAllWarehouses } from './statusStore.js';

let timer = null;

// 限制范围函数
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// 模拟单仓数据波动
function simulateWarehouse(data) {

  // 温度波动 ±1℃
  data.temperature += (Math.random() - 0.5) * 2;
  data.temperature = clamp(data.temperature, 15, 45);

  // 湿度波动 ±2%
  data.humidity += (Math.random() - 0.5) * 4;
  data.humidity = clamp(data.humidity, 30, 90);

  // 粮高微波动 ±0.2m
  data.grainHeight += (Math.random() - 0.5) * 0.4;
  data.grainHeight = clamp(data.grainHeight, 5, data.warehouseHeight);
}

// 启动传感器模拟
export function startSensorEngine(interval = 10000) {

  if (timer) return;

  timer = setInterval(() => {

    Object.values(messageData).forEach(data => {
      simulateWarehouse(data);
    });

     reevaluateAllWarehouses();

  

  }, interval);
}

// 停止模拟
export function stopSensorEngine() {
  clearInterval(timer);
  timer = null;
}
