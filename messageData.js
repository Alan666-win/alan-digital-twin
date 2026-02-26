
// messageData.js
// ==============================
// 唯一静态数据源（Single Source of Truth）
// ==============================

function nowTime() {
  const d = new Date();
  return d.toLocaleString();
}

export default {

  /* ===================== 立筒仓区 Z_A ===================== */
  L_01: {
    warehouseId: 'L_01',
    warehouseName: '立筒仓 L_01',
    zoneId: 'Z_A',

    temperature: 35.3,
    humidity: 66,

    grainHeight: 25.0,
    warehouseHeight: 36,

    inventory: 6700,

    grainName: '红豆',
    grainType: 'red_bean',

    time: nowTime()
  },

  L_02: {
    warehouseId: 'L_02',
    warehouseName: '立筒仓 L_02',
    zoneId: 'Z_A',
    temperature: 35.7,
    humidity: 68,
    grainHeight: 29.6,
    warehouseHeight: 36,
    inventory: 6100,
    grainName: '红豆',
    grainType: 'red_bean',
    time: nowTime()
  },

  L_03: {
    warehouseId: 'L_03',
    warehouseName: '立筒仓 L_03',
    zoneId: 'Z_A',
    temperature: 32.8,
    humidity: 60,
    grainHeight: 24.3,
    warehouseHeight: 36,
    inventory: 6420,
    grainName: '红豆',
    grainType: 'red_bean',
    time: nowTime()
  },

  L_04: {
    warehouseId: 'L_04',
    warehouseName: '立筒仓 L_04',
    zoneId: 'Z_A',
    temperature: 34.9,
    humidity: 64,
    grainHeight: 33.8,
    warehouseHeight: 36,
    inventory: 5480,
    grainName: '红豆',
    grainType: 'red_bean',
    time: nowTime()
  },

  L_05: {
    warehouseId: 'L_05',
    warehouseName: '立筒仓 L_05',
    zoneId: 'Z_A',
    temperature: 33.8,
    humidity: 62,
    grainHeight: 29.9,
    warehouseHeight: 36,
    inventory: 4100,
    grainName: '红豆',
    grainType: 'red_bean',
    time: nowTime()
  },

  L_06: {
    warehouseId: 'L_06',
    warehouseName: '立筒仓 L_06',
    zoneId: 'Z_A',
    temperature: 33.2,
    humidity: 58,
    grainHeight: 23.7,
    warehouseHeight: 36,
    inventory: 4820,
    grainName: '红豆',
    grainType: 'red_bean',
    time: nowTime()
  },

  /* ===================== 浅圆仓区 Z_B ===================== */

  Q_01: {
    warehouseId: 'Q_01',
    warehouseName: '浅圆仓 Q_01',
    zoneId: 'Z_B',
    temperature: 34.3,
    humidity: 58,
    grainHeight: 10.0,
    warehouseHeight: 20,
    inventory: 6559,
    grainName: '绿豆',
    grainType: 'mung_bean',
    time: nowTime()
  },

  Q_02: {
    warehouseId: 'Q_02',
    warehouseName: '浅圆仓 Q_02',
    zoneId: 'Z_B',
    temperature: 34.6,
    humidity: 55,
    grainHeight: 13.7,
    warehouseHeight: 20,
    inventory: 6520,
    grainName: '绿豆',
    grainType: 'mung_bean',
    time: nowTime()
  },

  Q_03: {
    warehouseId: 'Q_03',
    warehouseName: '浅圆仓 Q_03',
    zoneId: 'Z_B',
    temperature: 33.0,
    humidity: 60,
    grainHeight: 12.6,
    warehouseHeight: 20,
    inventory: 6280,
    grainName: '绿豆',
    grainType: 'mung_bean',
    time: nowTime()
  },

  Q_04: {
    warehouseId: 'Q_04',
    warehouseName: '浅圆仓 Q_04',
    zoneId: 'Z_B',
    temperature: 33.8,
    humidity: 52,
    grainHeight: 9.4,
    warehouseHeight: 20,
    inventory: 7720,
    grainName: '绿豆',
    grainType: 'mung_bean',
    time: nowTime()
  },

  Q_05: {
    warehouseId: 'Q_05',
    warehouseName: '浅圆仓 Q_05',
    zoneId: 'Z_B',
    temperature: 32.6,
    humidity: 64,
    grainHeight: 17.0,
    warehouseHeight: 20,
    inventory: 7440,
    grainName: '绿豆',
    grainType: 'mung_bean',
    time: nowTime()
  },

  Q_06: {
    warehouseId: 'Q_06',
    warehouseName: '浅圆仓 Q_06',
    zoneId: 'Z_B',
    temperature: 33.2,
    humidity: 59,
    grainHeight: 18.9,
    warehouseHeight: 20,
    inventory: 5160,
    grainName: '绿豆',
    grainType: 'mung_bean',
    time: nowTime()
  },

  Q_07: {
    warehouseId: 'Q_07',
    warehouseName: '浅圆仓 Q_07',
    zoneId: 'Z_B',
    temperature: 36.0,
    humidity: 61,
    grainHeight: 13.1,
    warehouseHeight: 20,
    inventory: 4000,
    grainName: '绿豆',
    grainType: 'mung_bean',
    time: nowTime()
  },

  Q_08: {
    warehouseId: 'Q_08',
    warehouseName: '浅圆仓 Q_08',
    zoneId: 'Z_B',
    temperature: 35.0,
    humidity: 48,
    grainHeight: 16.8,
    warehouseHeight: 20,
    inventory: 5200,
    grainName: '绿豆',
    grainType: 'mung_bean',
    time: nowTime()
  },

  Q_09: {
    warehouseId: 'Q_09',
    warehouseName: '浅圆仓 Q_09',
    zoneId: 'Z_B',
    temperature: 32.6,
    humidity: 65,
    grainHeight: 19.6,
    warehouseHeight: 20,
    inventory: 6759,
    grainName: '绿豆',
    grainType: 'mung_bean',
    time: nowTime()
  },

  Q_10: {
    warehouseId: 'Q_10',
    warehouseName: '浅圆仓 Q_10',
    zoneId: 'Z_B',
    temperature: 35.1,
    humidity: 57,
    grainHeight: 15.3,
    warehouseHeight: 20,
    inventory: 5360,
    grainName: '绿豆',
    grainType: 'mung_bean',
    time: nowTime()
  },

  Q_11: {
    warehouseId: 'Q_11',
    warehouseName: '浅圆仓 Q_11',
    zoneId: 'Z_B',
    temperature: 35.6,
    humidity: 68,
    grainHeight: 10.7,
    warehouseHeight: 20,
    inventory: 7359,
    grainName: '绿豆',
    grainType: 'mung_bean',
    time: nowTime()
  },

  Q_12: {
    warehouseId: 'Q_12',
    warehouseName: '浅圆仓 Q_12',
    zoneId: 'Z_B',
    temperature: 34.0,
    humidity: 54,
    grainHeight: 14.3,
    warehouseHeight: 20,
    inventory: 4440,
    grainName: '绿豆',
    grainType: 'mung_bean',
    time: nowTime()
  },

  /* ===================== 平房仓区 Z_C ===================== */

  P_01: {
    warehouseId: 'P_01',
    warehouseName: '平房仓 P_01',
    zoneId: 'Z_C',
    temperature: 35.5,
    humidity: 56,
    grainHeight: 5.8,
    warehouseHeight: 8,
    inventory: 6700,
    grainName: '黄豆',
    grainType: 'soybean',
    time: nowTime()
  },

  P_02: {
    warehouseId: 'P_02',
    warehouseName: '平房仓 P_02',
    zoneId: 'Z_C',
    temperature: 35.2,
    humidity: 54,
    grainHeight: 5.3,
    warehouseHeight: 8,
    inventory: 6500,
    grainName: '黄豆',
    grainType: 'soybean',
    time: nowTime()
  },

  P_03: {
    warehouseId: 'P_03',
    warehouseName: '平房仓 P_03',
    zoneId: 'Z_C',
    temperature: 33.2,
    humidity: 50,
    grainHeight: 4.8,
    warehouseHeight: 8,
    inventory: 4100,
    grainName: '黄豆',
    grainType: 'soybean',
    time: nowTime()
  },

  P_04: {
    warehouseId: 'P_04',
    warehouseName: '平房仓 P_04',
    zoneId: 'Z_C',
    temperature: 33.2,
    humidity: 49,
    grainHeight: 4.7,
    warehouseHeight: 8,
    inventory: 3200,
    grainName: '黄豆',
    grainType: 'soybean',
    time: nowTime()
  },

  P_05: {
    warehouseId: 'P_05',
    warehouseName: '平房仓 P_05',
    zoneId: 'Z_C',
    temperature: 34.8,
    humidity: 52,
    grainHeight: 3.8,
    warehouseHeight: 8,
    inventory: 3300,
    grainName: '黄豆',
    grainType: 'soybean',
    time: nowTime()
  },

  P_06: {
    warehouseId: 'P_06',
    warehouseName: '平房仓 P_06',
    zoneId: 'Z_C',
    temperature: 33.8,
    humidity: 55,
    grainHeight: 5.7,
    warehouseHeight: 8,
    inventory: 3200,
    grainName: '黄豆',
    grainType: 'soybean',
    time: nowTime()
  }
};

