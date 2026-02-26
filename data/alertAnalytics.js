// // data/alertAnalytics.js

// import { alertRecords } from './alertStore.js';

// // ==============================
// // 统计分析核心函数
// // ==============================
// export function analyzeAlerts() {

//   if (!alertRecords.length) {
//     return {
//       totalCount: 0,
//       openCount: 0,
//       acknowledgedCount: 0,
//       closedCount: 0,
//       dangerDuration: 0,
//       warningDuration: 0,
//       avgResponseTime: 0,
//       maxDuration: 0
//     };
//   }

//   let totalCount = alertRecords.length;
//   let openCount = 0;
//   let acknowledgedCount = 0;
//   let closedCount = 0;

//   let totalResponseTime = 0;
//   let responseCount = 0;

//   let dangerDuration = 0;
//   let warningDuration = 0;

//   let maxDuration = 0;

//   alertRecords.forEach(record => {

//     // 状态统计
//     if (record.status === 'open') openCount++;
//     if (record.status === 'acknowledged') acknowledgedCount++;
//     if (record.status === 'closed') closedCount++;

//     // 响应时间统计
//     if (record.responseDuration !== null) {
//       totalResponseTime += record.responseDuration;
//       responseCount++;
//     }

//     // 持续时间统计
//     if (record.duration !== null) {

//       if (record.level === 'danger') {
//         dangerDuration += record.duration;
//       }

//       if (record.level === 'warning') {
//         warningDuration += record.duration;
//       }

//       if (record.duration > maxDuration) {
//         maxDuration = record.duration;
//       }
//     }

//   });

//   const avgResponseTime =
//     responseCount > 0
//       ? Math.floor(totalResponseTime / responseCount)
//       : 0;

//   return {
//     totalCount,
//     openCount,
//     acknowledgedCount,
//     closedCount,
//     dangerDuration,
//     warningDuration,
//     avgResponseTime,
//     maxDuration
//   };

// }










// import { alertRecords } from './alertStore.js';

// export function analyzeAlerts(range = 'all') {

//   const now = Date.now();
//   let startLimit = 0;

//   if (range === '24h') {
//     startLimit = now - 24 * 60 * 60 * 1000;
//   }

//   if (range === '7d') {
//     startLimit = now - 7 * 24 * 60 * 60 * 1000;
//   }

//   if (range === '30d') {
//     startLimit = now - 30 * 24 * 60 * 60 * 1000;
//   }

//   // 时间过滤
//   const records = range === 'all'
//     ? alertRecords
//     : alertRecords.filter(r => r.startTimeRaw >= startLimit);

//   if (!records.length) {
//     return emptyResult();
//   }

//   let totalCount = records.length;
//   let openCount = 0;
//   let acknowledgedCount = 0;
//   let closedCount = 0;

//   let totalResponseTime = 0;
//   let responseCount = 0;

//   let dangerDuration = 0;
//   let warningDuration = 0;

//   let maxDuration = 0;
//   let longestDanger = 0;

//   let dangerCount = 0;
//   let warningCount = 0;

//   records.forEach(record => {

//     if (record.status === 'open') openCount++;
//     if (record.status === 'acknowledged') acknowledgedCount++;
//     if (record.status === 'closed') closedCount++;

//     if (record.responseDuration !== null) {
//       totalResponseTime += record.responseDuration;
//       responseCount++;
//     }

//     if (record.duration !== null) {

//       if (record.level === 'danger') {
//         dangerDuration += record.duration;
//         dangerCount++;
//         if (record.duration > longestDanger) {
//           longestDanger = record.duration;
//         }
//       }

//       if (record.level === 'warning') {
//         warningDuration += record.duration;
//         warningCount++;
//       }

//       if (record.duration > maxDuration) {
//         maxDuration = record.duration;
//       }
//     }

//   });

//   const avgResponseTime =
//     responseCount > 0
//       ? Math.floor(totalResponseTime / responseCount)
//       : 0;

//   const totalDuration = dangerDuration + warningDuration;

//   const highRiskDurationRatio =
//     totalDuration > 0
//       ? Math.round((dangerDuration / totalDuration) * 100)
//       : 0;

//   const highRiskCountRatio =
//     totalCount > 0
//       ? Math.round((dangerCount / totalCount) * 100)
//       : 0;

//   return {
//     totalCount,
//     openCount,
//     acknowledgedCount,
//     closedCount,

//     dangerDuration,
//     warningDuration,

//     avgResponseTime,
//     maxDuration,
//     longestDanger,

//     highRiskDurationRatio,
//     highRiskCountRatio
//   };
// }


// function emptyResult() {
//   return {
//     totalCount: 0,
//     openCount: 0,
//     acknowledgedCount: 0,
//     closedCount: 0,

//     dangerDuration: 0,
//     warningDuration: 0,

//     avgResponseTime: 0,
//     maxDuration: 0,
//     longestDanger: 0,

//     highRiskDurationRatio: 0,
//     highRiskCountRatio: 0
//   };
// }



// import { alertRecords } from './alertStore.js';



// export function analyzeAlerts(range = 'all') {

//   const now = Date.now();
//   let startLimit = 0;

//   if (range === '24h') {
//     startLimit = now - 24 * 60 * 60 * 1000;
//   }

//   if (range === '7d') {
//     startLimit = now - 7 * 24 * 60 * 60 * 1000;
//   }

//   if (range === '30d') {
//     startLimit = now - 30 * 24 * 60 * 60 * 1000;
//   }

//   // 时间过滤
//   const records = range === 'all'
//     ? alertRecords
//     : alertRecords.filter(r => r.startTimeRaw >= startLimit);

//   if (!records.length) {
//     return emptyResult();
//   }

//   let totalCount = records.length;
//   let openCount = 0;
//   let acknowledgedCount = 0;
//   let closedCount = 0;

//   let totalResponseTime = 0;
//   let responseCount = 0;

//   let dangerDuration = 0;
//   let warningDuration = 0;

//   let maxDuration = 0;
//   let longestDanger = 0;

//   let dangerCount = 0;
//   let warningCount = 0;

//   records.forEach(record => {

//     if (record.status === 'open') openCount++;
//     if (record.status === 'acknowledged') acknowledgedCount++;
//     if (record.status === 'closed') closedCount++;

//     if (record.responseDuration !== null) {
//       totalResponseTime += record.responseDuration;
//       responseCount++;
//     }

//     if (record.duration !== null) {

//       if (record.level === 'danger') {
//         dangerDuration += record.duration;
//         dangerCount++;
//         if (record.duration > longestDanger) {
//           longestDanger = record.duration;
//         }
//       }

//       if (record.level === 'warning') {
//         warningDuration += record.duration;
//         warningCount++;
//       }

//       if (record.duration > maxDuration) {
//         maxDuration = record.duration;
//       }
//     }

//   });

//   const avgResponseTime =
//     responseCount > 0
//       ? Math.floor(totalResponseTime / responseCount)
//       : 0;

//   const totalDuration = dangerDuration + warningDuration;

//   const highRiskDurationRatio =
//     totalDuration > 0
//       ? Math.round((dangerDuration / totalDuration) * 100)
//       : 0;

//   const highRiskCountRatio =
//     totalCount > 0
//       ? Math.round((dangerCount / totalCount) * 100)
//       : 0;

//   /* ====== 新增：预警占比 ====== */
//   const warningCountRatio =
//     totalCount > 0
//       ? Math.round((warningCount / totalCount) * 100)
//       : 0;

//   /* ====== 新增：正常占比 ====== */
//   const normalCountRatio =
//     totalCount > 0
//       ? Math.max(0, 100 - highRiskCountRatio - warningCountRatio)
//       : 0;

//   return {
//     totalCount,
//     openCount,
//     acknowledgedCount,
//     closedCount,

//     dangerDuration,
//     warningDuration,

//     avgResponseTime,
//     maxDuration,
//     longestDanger,

//     highRiskDurationRatio,
//     highRiskCountRatio,

//     // 新增
//     warningCountRatio,
//     normalCountRatio
//   };
// }


// function emptyResult() {
//   return {
//     totalCount: 0,
//     openCount: 0,
//     acknowledgedCount: 0,
//     closedCount: 0,

//     dangerDuration: 0,
//     warningDuration: 0,

//     avgResponseTime: 0,
//     maxDuration: 0,
//     longestDanger: 0,

//     highRiskDurationRatio: 0,
//     highRiskCountRatio: 0,

//     warningCountRatio: 0,
//     normalCountRatio: 0
//   };
// }



// import { alertRecords } from './alertStore.js';

// export function analyzeAlerts(range = 'all') {

//   const now = Date.now();
//   let startLimit = 0;

//   if (range === '24h') {
//     startLimit = now - 24 * 60 * 60 * 1000;
//   }

//   if (range === '7d') {
//     startLimit = now - 7 * 24 * 60 * 60 * 1000;
//   }

//   if (range === '30d') {
//     startLimit = now - 30 * 24 * 60 * 60 * 1000;
//   }

//   const records = range === 'all'
//     ? alertRecords
//     : alertRecords.filter(r => r.startTimeRaw >= startLimit);

//   if (!records.length) {
//     return emptyResult();
//   }

//   let totalCount = records.length;
//   let openCount = 0;
//   let acknowledgedCount = 0;
//   let closedCount = 0;

//   let totalResponseTime = 0;
//   let responseCount = 0;

//   let dangerDuration = 0;
//   let warningDuration = 0;

//   let maxDuration = 0;
//   let longestDanger = 0;

//   let dangerCount = 0;
//   let warningCount = 0;

//   records.forEach(record => {

//     if (record.status === 'open') openCount++;
//     if (record.status === 'acknowledged') acknowledgedCount++;
//     if (record.status === 'closed') closedCount++;

//     if (record.responseDuration !== null) {
//       totalResponseTime += record.responseDuration;
//       responseCount++;
//     }

//     if (record.duration !== null) {

//       if (record.level === 'danger') {
//         dangerDuration += record.duration;
//         dangerCount++;
//         if (record.duration > longestDanger) {
//           longestDanger = record.duration;
//         }
//       }

//       if (record.level === 'warning') {
//         warningDuration += record.duration;
//         warningCount++;
//       }

//       if (record.duration > maxDuration) {
//         maxDuration = record.duration;
//       }
//     }

//   });

//   const avgResponseTime =
//     responseCount > 0
//       ? Math.floor(totalResponseTime / responseCount)
//       : 0;

//   const totalDuration = dangerDuration + warningDuration;

//   /* =========================
//      数量结构比例
//   ========================== */

//   const highRiskCountRatio =
//     totalCount > 0
//       ? Math.round((dangerCount / totalCount) * 100)
//       : 0;

//   const warningCountRatio =
//     totalCount > 0
//       ? Math.round((warningCount / totalCount) * 100)
//       : 0;

//   const normalCountRatio =
//     totalCount > 0
//       ? Math.max(0, 100 - highRiskCountRatio - warningCountRatio)
//       : 0;

//   /* =========================
//      时长结构比例（新增）
//   ========================== */

//   const dangerDurationRatio =
//     totalDuration > 0
//       ? Math.round((dangerDuration / totalDuration) * 100)
//       : 0;

//   const warningDurationRatio =
//     totalDuration > 0
//       ? Math.round((warningDuration / totalDuration) * 100)
//       : 0;

//   const normalDurationRatio =
//     totalDuration > 0
//       ? Math.max(0, 100 - dangerDurationRatio - warningDurationRatio)
//       : 0;

//   return {
//     totalCount,
//     openCount,
//     acknowledgedCount,
//     closedCount,

//     dangerDuration,
//     warningDuration,

//     avgResponseTime,
//     maxDuration,
//     longestDanger,

//     /* 原有 */
//     highRiskCountRatio,

//     /* 数量结构 */
//     warningCountRatio,
//     normalCountRatio,

//     /* 时长结构 */
//     dangerDurationRatio,
//     warningDurationRatio,
//     normalDurationRatio
//   };
// }


// function emptyResult() {
//   return {
//     totalCount: 0,
//     openCount: 0,
//     acknowledgedCount: 0,
//     closedCount: 0,

//     dangerDuration: 0,
//     warningDuration: 0,

//     avgResponseTime: 0,
//     maxDuration: 0,
//     longestDanger: 0,

//     highRiskCountRatio: 0,
//     warningCountRatio: 0,
//     normalCountRatio: 0,

//     dangerDurationRatio: 0,
//     warningDurationRatio: 0,
//     normalDurationRatio: 0
//   };
// }





// import { alertRecords } from './alertStore.js';

// export function analyzeAlerts(range = 'all') {

//   const now = Date.now();
//   const durationMap = {
//     '24h': 24 * 60 * 60 * 1000,
//     '7d': 7 * 24 * 60 * 60 * 1000,
//     '30d': 30 * 24 * 60 * 60 * 1000
//   };

//   const duration = durationMap[range] || 0;

//   // =========================
//   // 当前周期
//   // =========================
//   const currentStart = duration ? now - duration : 0;

//   const currentRecords = range === 'all'
//     ? alertRecords
//     : alertRecords.filter(r => r.startTimeRaw >= currentStart);

//   const currentStats = calculateStats(currentRecords);

//   // =========================
//   // 上一周期
//   // =========================
//   let previousStats = emptyResult();

//   if (duration) {
//     const previousStart = now - duration * 2;

//     const previousRecords = alertRecords.filter(r =>
//       r.startTimeRaw >= previousStart &&
//       r.startTimeRaw < currentStart
//     );

//     previousStats = calculateStats(previousRecords);
//   }

//   // =========================
//   // 变化率
//   // =========================
//   const changes = {
//     totalCountChange: calcChange(currentStats.totalCount, previousStats.totalCount),
//     dangerDurationChange: calcChange(currentStats.dangerDuration, previousStats.dangerDuration),
//     avgResponseChange: calcChange(currentStats.avgResponseTime, previousStats.avgResponseTime)
//   };

//   return {
//     ...currentStats,
//     changes
//   };
// }


// // ==========================================
// // 核心统计逻辑（抽离出来复用）
// // ==========================================

// function calculateStats(records) {

//   if (!records.length) return emptyResult();

//   let totalCount = records.length;
//   let openCount = 0;
//   let acknowledgedCount = 0;
//   let closedCount = 0;

//   let totalResponseTime = 0;
//   let responseCount = 0;

//   let dangerDuration = 0;
//   let warningDuration = 0;

//   let maxDuration = 0;
//   let longestDanger = 0;

//   let dangerCount = 0;
//   let warningCount = 0;

//   records.forEach(record => {

//     if (record.status === 'open') openCount++;
//     if (record.status === 'acknowledged') acknowledgedCount++;
//     if (record.status === 'closed') closedCount++;

//     if (record.responseDuration !== null) {
//       totalResponseTime += record.responseDuration;
//       responseCount++;
//     }

//     if (record.duration !== null) {

//       if (record.level === 'danger') {
//         dangerDuration += record.duration;
//         dangerCount++;
//         if (record.duration > longestDanger) {
//           longestDanger = record.duration;
//         }
//       }

//       if (record.level === 'warning') {
//         warningDuration += record.duration;
//         warningCount++;
//       }

//       if (record.duration > maxDuration) {
//         maxDuration = record.duration;
//       }
//     }

//   });

//   const avgResponseTime =
//     responseCount > 0
//       ? Math.floor(totalResponseTime / responseCount)
//       : 0;

//   const totalDuration = dangerDuration + warningDuration;

//   const highRiskCountRatio =
//     totalCount > 0
//       ? Math.round((dangerCount / totalCount) * 100)
//       : 0;

//   const warningCountRatio =
//     totalCount > 0
//       ? Math.round((warningCount / totalCount) * 100)
//       : 0;

//   const normalCountRatio =
//     totalCount > 0
//       ? Math.max(0, 100 - highRiskCountRatio - warningCountRatio)
//       : 0;

//   const dangerDurationRatio =
//     totalDuration > 0
//       ? Math.round((dangerDuration / totalDuration) * 100)
//       : 0;

//   const warningDurationRatio =
//     totalDuration > 0
//       ? Math.round((warningDuration / totalDuration) * 100)
//       : 0;

//   const normalDurationRatio =
//     totalDuration > 0
//       ? Math.max(0, 100 - dangerDurationRatio - warningDurationRatio)
//       : 0;

//   return {
//     totalCount,
//     openCount,
//     acknowledgedCount,
//     closedCount,

//     dangerDuration,
//     warningDuration,

//     avgResponseTime,
//     maxDuration,
//     longestDanger,

//     highRiskCountRatio,
//     warningCountRatio,
//     normalCountRatio,

//     dangerDurationRatio,
//     warningDurationRatio,
//     normalDurationRatio
//   };
// }


// // ==========================================
// // 变化率计算
// // ==========================================

// function calcChange(current, previous) {
//   if (!previous) return 0;
//   return Math.round(((current - previous) / previous) * 100);
// }


// function emptyResult() {
//   return {
//     totalCount: 0,
//     openCount: 0,
//     acknowledgedCount: 0,
//     closedCount: 0,

//     dangerDuration: 0,
//     warningDuration: 0,

//     avgResponseTime: 0,
//     maxDuration: 0,
//     longestDanger: 0,

//     highRiskCountRatio: 0,
//     warningCountRatio: 0,
//     normalCountRatio: 0,

//     dangerDurationRatio: 0,
//     warningDurationRatio: 0,
//     normalDurationRatio: 0
//   };
// }





// import { alertRecords } from './alertStore.js';

// export function analyzeAlerts(range = 'all') {

//   const now = Date.now();
//   let startLimit = 0;

//   if (range === '24h') {
//     startLimit = now - 24 * 60 * 60 * 1000;
//   }

//   if (range === '7d') {
//     startLimit = now - 7 * 24 * 60 * 60 * 1000;
//   }

//   if (range === '30d') {
//     startLimit = now - 30 * 24 * 60 * 60 * 1000;
//   }

//   const records = range === 'all'
//     ? alertRecords
//     : alertRecords.filter(r => r.startTimeRaw >= startLimit);

//   /* =============================
//      原始统计
//   ============================== */

//   let totalCount = records.length;
//   let openCount = 0;
//   let acknowledgedCount = 0;
//   let closedCount = 0;

//   let totalResponseTime = 0;
//   let responseCount = 0;

//   let dangerDuration = 0;
//   let warningDuration = 0;

//   let maxDuration = 0;
//   let longestDanger = 0;

//   let dangerCount = 0;
//   let warningCount = 0;

//   records.forEach(record => {

//     if (record.status === 'open') openCount++;
//     if (record.status === 'acknowledged') acknowledgedCount++;
//     if (record.status === 'closed') closedCount++;

//     if (record.responseDuration !== null) {
//       totalResponseTime += record.responseDuration;
//       responseCount++;
//     }

//     if (record.duration !== null) {

//       if (record.level === 'danger') {
//         dangerDuration += record.duration;
//         dangerCount++;
//         if (record.duration > longestDanger) {
//           longestDanger = record.duration;
//         }
//       }

//       if (record.level === 'warning') {
//         warningDuration += record.duration;
//         warningCount++;
//       }

//       if (record.duration > maxDuration) {
//         maxDuration = record.duration;
//       }
//     }
//   });

//   const avgResponseTime =
//     responseCount > 0
//       ? Math.floor(totalResponseTime / responseCount)
//       : 0;

//   const totalDuration = dangerDuration + warningDuration;

//   const highRiskCountRatio =
//     totalCount > 0
//       ? Math.round((dangerCount / totalCount) * 100)
//       : 0;

//   const warningCountRatio =
//     totalCount > 0
//       ? Math.round((warningCount / totalCount) * 100)
//       : 0;

//   const normalCountRatio =
//     totalCount > 0
//       ? Math.max(0, 100 - highRiskCountRatio - warningCountRatio)
//       : 0;

//   const dangerDurationRatio =
//     totalDuration > 0
//       ? Math.round((dangerDuration / totalDuration) * 100)
//       : 0;

//   const warningDurationRatio =
//     totalDuration > 0
//       ? Math.round((warningDuration / totalDuration) * 100)
//       : 0;

//   const normalDurationRatio =
//     totalDuration > 0
//       ? Math.max(0, 100 - dangerDurationRatio - warningDurationRatio)
//       : 0;

//   /* =============================
//      🔥 趋势对比（新增）
//   ============================== */

//   const period = now - startLimit;
//   const prevStart = startLimit - period;

//   const prevRecords = alertRecords.filter(r =>
//     r.startTimeRaw >= prevStart &&
//     r.startTimeRaw < startLimit
//   );

//   const prevTotalCount = prevRecords.length;

//   let prevDangerDuration = 0;
//   let prevResponseTime = 0;
//   let prevResponseCount = 0;

//   prevRecords.forEach(record => {

//     if (record.responseDuration !== null) {
//       prevResponseTime += record.responseDuration;
//       prevResponseCount++;
//     }

//     if (record.level === 'danger' && record.duration !== null) {
//       prevDangerDuration += record.duration;
//     }
//   });

//   const prevAvgResponse =
//     prevResponseCount > 0
//       ? Math.floor(prevResponseTime / prevResponseCount)
//       : 0;

//   function calcChange(current, previous) {
//     if (!previous) return 100;
//     return Math.round(((current - previous) / previous) * 100);
//   }

//   const changes = {
//     totalCountChange: calcChange(totalCount, prevTotalCount),
//     dangerDurationChange: calcChange(dangerDuration, prevDangerDuration),
//     avgResponseChange: calcChange(avgResponseTime, prevAvgResponse)
//   };

//   return {
//     totalCount,
//     openCount,
//     acknowledgedCount,
//     closedCount,

//     dangerDuration,
//     warningDuration,

//     avgResponseTime,
//     maxDuration,
//     longestDanger,

//     highRiskCountRatio,
//     warningCountRatio,
//     normalCountRatio,

//     dangerDurationRatio,
//     warningDurationRatio,
//     normalDurationRatio,

//     changes
//   };
// }




/* =============================
   🔥 稳定版趋势对比（只统计 closed）
============================== */

// const period = now - startLimit;
// const prevStart = startLimit - period;

// // 当前周期只取 closed
// const closedRecords = records.filter(r => r.status === 'closed');

// // 上一周期 closed
// const prevClosedRecords = alertRecords.filter(r =>
//   r.startTimeRaw >= prevStart &&
//   r.startTimeRaw < startLimit &&
//   r.status === 'closed'
// );

// const closedCountCurrent = closedRecords.length;
// const closedCountPrev = prevClosedRecords.length;

// // 当前周期危险时长（只算 closed）
// let closedDangerDurationCurrent = 0;
// let closedDangerDurationPrev = 0;

// let closedResponseTimeCurrent = 0;
// let closedResponseCountCurrent = 0;

// let closedResponseTimePrev = 0;
// let closedResponseCountPrev = 0;

// closedRecords.forEach(r => {

//   if (r.level === 'danger' && r.duration !== null) {
//     closedDangerDurationCurrent += r.duration;
//   }

//   if (r.responseDuration !== null) {
//     closedResponseTimeCurrent += r.responseDuration;
//     closedResponseCountCurrent++;
//   }
// });

// prevClosedRecords.forEach(r => {

//   if (r.level === 'danger' && r.duration !== null) {
//     closedDangerDurationPrev += r.duration;
//   }

//   if (r.responseDuration !== null) {
//     closedResponseTimePrev += r.responseDuration;
//     closedResponseCountPrev++;
//   }
// });

// const closedAvgResponseCurrent =
//   closedResponseCountCurrent > 0
//     ? Math.floor(closedResponseTimeCurrent / closedResponseCountCurrent)
//     : 0;

// const closedAvgResponsePrev =
//   closedResponseCountPrev > 0
//     ? Math.floor(closedResponseTimePrev / closedResponseCountPrev)
//     : 0;

// function calcChange(current, previous) {

//   if (!previous && current > 0) return null;
//   if (!previous) return 0;

//   return Math.round(((current - previous) / previous) * 100);
// }

// const changes = {
//   totalCountChange: calcChange(closedCountCurrent, closedCountPrev),
//   dangerDurationChange: calcChange(
//     closedDangerDurationCurrent,
//     closedDangerDurationPrev
//   ),
//   avgResponseChange: calcChange(
//     closedAvgResponseCurrent,
//     closedAvgResponsePrev
//   )
// };




import { alertRecords } from './alertStore.js';

export function analyzeAlerts(range = 'all') {

  const now = Date.now();
  let startLimit = 0;

  if (range === '24h') {
    startLimit = now - 24 * 60 * 60 * 1000;
  }

  if (range === '7d') {
    startLimit = now - 7 * 24 * 60 * 60 * 1000;
  }

  if (range === '30d') {
    startLimit = now - 30 * 24 * 60 * 60 * 1000;
  }

  const records = range === 'all'
    ? alertRecords
    : alertRecords.filter(r => r.startTimeRaw >= startLimit);

  /* =============================
     原始统计
  ============================== */

  let totalCount = records.length;
  let openCount = 0;
  let acknowledgedCount = 0;
  let closedCount = 0;

  let totalResponseTime = 0;
  let responseCount = 0;

  let dangerDuration = 0;
  let warningDuration = 0;

  let maxDuration = 0;
  let longestDanger = 0;

  let dangerCount = 0;
  let warningCount = 0;

  







  records.forEach(record => {

    if (record.status === 'open') openCount++;
    if (record.status === 'acknowledged') acknowledgedCount++;
    if (record.status === 'closed') closedCount++;

    if (record.responseDuration !== null) {
      totalResponseTime += record.responseDuration;
      responseCount++;
    }

    // if (record.duration !== null) {

    //   if (record.level === 'danger') {
    //     dangerDuration += record.duration;
    //     dangerCount++;
    //     if (record.duration > longestDanger) {
    //       longestDanger = record.duration;
    //     }
    //   }

    //   if (record.level === 'warning') {
    //     warningDuration += record.duration;
    //     warningCount++;
    //   }

    //   if (record.duration > maxDuration) {
    //     maxDuration = record.duration;
    //   }
    // }

    // ==============================
// 🔥 实时统计持续时间（包含未关闭报警）
// ==============================

let durationValue = 0;

// 已关闭的用记录值
if (record.duration !== null) {
  durationValue = record.duration;
} 
// 未关闭的实时计算
else {
  durationValue = Math.floor((now - record.startTimeRaw) / 1000);
}

if (record.level === 'danger') {
  dangerDuration += durationValue;
  dangerCount++;
  if (durationValue > longestDanger) {
    longestDanger = durationValue;
  }
}

if (record.level === 'warning') {
  warningDuration += durationValue;
  warningCount++;
}

if (durationValue > maxDuration) {
  maxDuration = durationValue;
}
  });


// 平均处理时长（仅 closed）
let totalClosedDuration = 0;
let closedCountForAvg = 0;

records.forEach(r => {
  if (r.status === 'closed' && r.duration !== null) {
    totalClosedDuration += r.duration;
    closedCountForAvg++;
  }
});

const avgHandleDuration =
  closedCountForAvg > 0
    ? Math.floor(totalClosedDuration / closedCountForAvg)
    : 0;

// 关闭率
const closeRate =
  totalCount > 0
    ? Math.round((closedCount / totalCount) * 100)
    : 0;

// 未处理率
const openRate =
  totalCount > 0
    ? Math.round((openCount / totalCount) * 100)
    : 0;





















  const avgResponseTime =
    responseCount > 0
      ? Math.floor(totalResponseTime / responseCount)
      : 0;

  const totalDuration = dangerDuration + warningDuration;

  const highRiskCountRatio =
    totalCount > 0
      ? Math.round((dangerCount / totalCount) * 100)
      : 0;

  const warningCountRatio =
    totalCount > 0
      ? Math.round((warningCount / totalCount) * 100)
      : 0;

  const normalCountRatio =
    totalCount > 0
      ? Math.max(0, 100 - highRiskCountRatio - warningCountRatio)
      : 0;

  // const dangerDurationRatio =
  //   totalDuration > 0
  //     ? Math.round((dangerDuration / totalDuration) * 100)
  //     : 0;

  // ==============================
// 🔥 三色比例稳定显示版
// ==============================

let dangerDurationRatio = 0;
let warningDurationRatio = 0;
let normalDurationRatio = 0;

if (totalDuration > 0) {

  // 原始比例（浮点）
  const rawDanger = (dangerDuration / totalDuration) * 100;
  const rawWarning = (warningDuration / totalDuration) * 100;
  const rawNormal = 100 - rawDanger - rawWarning;

  // 至少 1%（如果确实有值）
  dangerDurationRatio =
    dangerDuration > 0
      ? Math.max(1, Math.round(rawDanger))
      : 0;

  warningDurationRatio =
    warningDuration > 0
      ? Math.max(1, Math.round(rawWarning))
      : 0;

  normalDurationRatio =
    rawNormal > 0
      ? Math.max(1, Math.round(rawNormal))
      : 0;

  // 🔥 纠正总和误差（确保 = 100）
  const sum =
    dangerDurationRatio +
    warningDurationRatio +
    normalDurationRatio;

  if (sum !== 100) {
    normalDurationRatio += 100 - sum;
  }
}

  /* =============================
     🔥 稳定版趋势对比（只统计 closed）
  ============================== */

  const period = now - startLimit;
  const prevStart = startLimit - period;

  const closedRecords = records.filter(r => r.status === 'closed');

  const prevClosedRecords = alertRecords.filter(r =>
    r.startTimeRaw >= prevStart &&
    r.startTimeRaw < startLimit &&
    r.status === 'closed'
  );

  // 上一周期平均处理时长
let prevClosedDuration = 0;
let prevClosedCount = 0;

prevClosedRecords.forEach(r => {
  if (r.duration !== null) {
    prevClosedDuration += r.duration;
    prevClosedCount++;
  }
});

const prevAvgHandleDuration =
  prevClosedCount > 0
    ? Math.floor(prevClosedDuration / prevClosedCount)
    : 0;

// 上一周期关闭率
const prevCloseRate =
  prevClosedRecords.length > 0
    ? Math.round((prevClosedRecords.length / 
        alertRecords.filter(r =>
          r.startTimeRaw >= prevStart &&
          r.startTimeRaw < startLimit
        ).length
      ) * 100)
    : 0;


    const handleDurationChange =
  calcChange(avgHandleDuration, prevAvgHandleDuration);

const closeRateChange =
  calcChange(closeRate, prevCloseRate);

  const closedCountCurrent = closedRecords.length;
  const closedCountPrev = prevClosedRecords.length;

  let closedDangerDurationCurrent = 0;
  let closedDangerDurationPrev = 0;

  let closedResponseTimeCurrent = 0;
  let closedResponseCountCurrent = 0;

  let closedResponseTimePrev = 0;
  let closedResponseCountPrev = 0;

  closedRecords.forEach(r => {

    if (r.level === 'danger' && r.duration !== null) {
      closedDangerDurationCurrent += r.duration;
    }

    if (r.responseDuration !== null) {
      closedResponseTimeCurrent += r.responseDuration;
      closedResponseCountCurrent++;
    }
  });

  prevClosedRecords.forEach(r => {

    if (r.level === 'danger' && r.duration !== null) {
      closedDangerDurationPrev += r.duration;
    }

    if (r.responseDuration !== null) {
      closedResponseTimePrev += r.responseDuration;
      closedResponseCountPrev++;
    }
  });

  const closedAvgResponseCurrent =
    closedResponseCountCurrent > 0
      ? Math.floor(closedResponseTimeCurrent / closedResponseCountCurrent)
      : 0;

  const closedAvgResponsePrev =
    closedResponseCountPrev > 0
      ? Math.floor(closedResponseTimePrev / closedResponseCountPrev)
      : 0;

  function calcChange(current, previous) {

  if (previous === 0 && current === 0) return 0;

  if (previous === 0 && current > 0) {
    return Math.min(current * 8, 60); 
  }

  const raw = ((current - previous) / previous) * 100;

  // 限制波动区间
  return Math.max(Math.min(Math.round(raw), 100), -50);
}

  const changes = {
  totalCountChange: calcChange(
    closedCountCurrent,
    closedCountPrev
  ),

  dangerDurationChange: calcChange(
    closedDangerDurationCurrent,
    closedDangerDurationPrev
  ),

  avgResponseChange: calcChange(
    closedAvgResponseCurrent,
    closedAvgResponsePrev
  ),

  handleDurationChange,
  closeRateChange
};

  return {
    totalCount,
    openCount,
    acknowledgedCount,
    closedCount,

    dangerDuration,
    warningDuration,

    avgResponseTime,
    maxDuration,
    longestDanger,

    highRiskCountRatio,
    warningCountRatio,
    normalCountRatio,

    dangerDurationRatio,
    warningDurationRatio,
    normalDurationRatio,

    avgHandleDuration,
    closeRate,
     openRate,

    changes
  };
}


export function getWarehouseRiskRanking(range = 'all') {

  const now = Date.now();
  let startLimit = 0;

  if (range === '24h') startLimit = now - 24 * 60 * 60 * 1000;
  if (range === '7d') startLimit = now - 7 * 24 * 60 * 60 * 1000;
  if (range === '30d') startLimit = now - 30 * 24 * 60 * 60 * 1000;

  const records = range === 'all'
    ? alertRecords
    : alertRecords.filter(r => r.startTimeRaw >= startLimit);

  const map = {};

  records.forEach(r => {

    const id = r.warehouseId;
    if (!id) return;

    if (!map[id]) {
      map[id] = {
        warehouseId: id,
        dangerCount: 0,
        warningCount: 0,
        openCount: 0,
        dangerDuration: 0
      };
    }

    if (r.level === 'danger') {
      map[id].dangerCount++;
      if (r.duration) map[id].dangerDuration += r.duration;
    }

    if (r.level === 'warning') {
      map[id].warningCount++;
    }

    if (r.status === 'open') {
      map[id].openCount++;
    }
  });

  const result = Object.values(map).map(item => {

    const score =
      item.dangerCount * 5 +
      item.warningCount * 2 +
      item.openCount * 3 +
      item.dangerDuration / 30;

    return {
      ...item,
      score: Math.round(score)
    };
  });

  return result
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

