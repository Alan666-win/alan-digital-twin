




// data/warehouseJudge.js
// ==============================
// 工业级指标统一判断引擎（单一判断源）
// ==============================

// ==============================
// 统一阈值中心
// ==============================
export const THRESHOLDS = {
  temperature: {
    warning: 35,
    danger: 40
  },
  humidity: {
    warning: 65,
    danger: 70
  },
  fillRatio: {
    warning: 0.90,
    danger: 0.95
  }
};

// ==============================
// 通用等级判断函数
// ==============================
export function getLevelByValue(value, warningThreshold, dangerThreshold) {
  if (value >= dangerThreshold) return 'danger';
  if (value >= warningThreshold) return 'warning';
  return 'normal';
}

// ==============================
// 最高等级判断
// ==============================
function getHighestLevel(levels) {
  if (levels.includes('danger')) return 'danger';
  if (levels.includes('warning')) return 'warning';
  return 'normal';
}

// ==============================
// 仓级评估入口
// ==============================
export function evaluateWarehouse(data) {

  const {
    warehouseId,
    warehouseName,
    temperature,
    humidity,
    grainHeight,
    warehouseHeight,
    inventory,
    time
  } = data;

  const fillRatio = grainHeight / warehouseHeight;

  const temperatureLevel = getLevelByValue(
    temperature,
    THRESHOLDS.temperature.warning,
    THRESHOLDS.temperature.danger
  );

  const humidityLevel = getLevelByValue(
    humidity,
    THRESHOLDS.humidity.warning,
    THRESHOLDS.humidity.danger
  );

  const fillRatioLevel = getLevelByValue(
    fillRatio,
    THRESHOLDS.fillRatio.warning,
    THRESHOLDS.fillRatio.danger
  );

  const status = getHighestLevel([
    temperatureLevel,
    humidityLevel,
    fillRatioLevel
  ]);

  let suggestion = '';

  if (status === 'danger') {
    suggestion = '存在严重异常指标，请立即排查并采取干预措施';
  }

  if (status === 'warning') {
    suggestion = '指标接近阈值，建议加强监测';
  }

  return {
    warehouseId,
    warehouseName,
    status,

    temperature,
    humidity,
    grainHeight,
    warehouseHeight,
    inventory,
    fillRatio,

    indicators: {
      temperature: {
        value: temperature,
        level: temperatureLevel
      },
      humidity: {
        value: humidity,
        level: humidityLevel
      },
      fillRatio: {
        value: fillRatio,
        level: fillRatioLevel
      }
    },

    suggestion,
    time
  };
}
