







import * as echarts from '../../echarts.esm.min.js';
import { activeTarget } from '../raycastInfo/choose.js';
import { hasPermission } from '../../data/permission.js';

import { statusDetailMap } from '../../data/statusStore.js';
import messageData from '../../messageData.js';
import { getLevelByValue, THRESHOLDS } from '../../data/warehouseJudge.js';

import { openDrawer } from '../../ui/drawerSystem.js';
import { setInteractionLock } from '../raycastInfo/choose.js';

let panel;
let chart = null;

let currentMetric = 'temperature';
let currentRange = '24h';



export function initTrendPanel() {
  createPanel();
  bindEvents();
}


// ==============================
// 打开抽屉
// ==============================
function openTrendDrawer() {
  const id = activeTarget.userData.warehouseId;
  const staticInfo = messageData[id];
  const warehouseName = staticInfo?.name || staticInfo?.warehouseName || id;

  openDrawer({
    title: `历史趋势分析（${warehouseName}）`,
    content: panel
  });

  setInteractionLock(true);

  setTimeout(() => {
    initOrResizeChart();
  }, 350);
}


// ==============================
// 创建面板
// ==============================
function createPanel() {
  panel = document.createElement('div');
  panel.className = 'drawer-content';

  panel.innerHTML = `
    <div class="trend-tabs">
      <span class="tab active" data-type="temperature">温度</span>
      <span class="tab" data-type="humidity">湿度</span>
      <span class="tab" data-type="grainHeight">装仓率</span>
    </div>

    <div class="trend-body">
      <div class="trend-chart"></div>
    </div>

    <div class="trend-footer">
      <div class="trend-legend"></div>
      <div class="trend-stats"></div>
    </div>

    <div class="trend-range">
      <span class="range active" data-range="24h">24小时</span>
      <span class="range" data-range="7d">7天</span>
      <span class="range" data-range="30d">30天</span>
    </div>
  `;
}


// ==============================
// 绑定事件
// ==============================
function bindEvents() {

  window.addEventListener('warehouse-change', () => {
    if (!activeTarget) return;

    setTimeout(() => {
      initOrResizeChart();
    }, 100);
  });

  panel.querySelectorAll('.tab').forEach(tab => {
    tab.onclick = () => {
      panel.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentMetric = tab.dataset.type;
      updateChart();
    };
  });

  panel.querySelectorAll('.range').forEach(r => {
    r.onclick = () => {
      panel.querySelectorAll('.range').forEach(x => x.classList.remove('active'));
      r.classList.add('active');
      currentRange = r.dataset.range;
      updateChart();
    };
  });
}


// ==============================
// 初始化图表
// ==============================
function initOrResizeChart() {
  const chartDom = panel.querySelector('.trend-chart');
  if (!chartDom) return;

  if (chart && chart.getDom() !== chartDom) {
    chart.dispose();
    chart = null;
  }

  if (!chart) {
    chart = echarts.init(chartDom);
  }

  chart.resize();
  updateChart();
}


// ==============================
// 更新图表
// ==============================
function updateChart() {
  if (!chart || !activeTarget) return;

  const id = activeTarget.userData.warehouseId;
  const detail = statusDetailMap[id];
  const staticInfo = messageData[id];
  if (!detail || !staticInfo) return;

  let value, min, max;
  let legendHtml = '';

  if (currentMetric === 'temperature') {
    value = detail.temperature;
    min = 20;
    max = 40;

    legendHtml = `
      <div class="trend-legend-title">区间说明</div>

      <div>正常区：0 ~ ${THRESHOLDS.temperature.warning}℃</div>
      <div>预警区：${THRESHOLDS.temperature.warning} ~ ${THRESHOLDS.temperature.danger}℃</div>
      <div>危险区：≥ ${THRESHOLDS.temperature.danger}℃</div>
    `;
  }

  if (currentMetric === 'humidity') {
    value = detail.humidity;
    min = 30;
    max = 90;

    legendHtml = `
      <div class="trend-legend-title">区间说明</div>

      <div>正常区：≤ ${THRESHOLDS.humidity.warning}%</div>
      <div>预警区：${THRESHOLDS.humidity.warning} ~ ${THRESHOLDS.humidity.danger}%</div>
      <div>危险区：≥ ${THRESHOLDS.humidity.danger}%</div>
    `;
  }

  if (currentMetric === 'grainHeight') {
    value = (detail.grainHeight / staticInfo.warehouseHeight) * 100;
    min = 0;
    max = 100;

    legendHtml = `
      <div class="trend-legend-title">区间说明</div>
      
      <div>正常区：≤ ${THRESHOLDS.fillRatio.warning * 100}%</div>
      <div>预警区：${THRESHOLDS.fillRatio.warning * 100} ~ ${THRESHOLDS.fillRatio.danger * 100}%</div>
      <div>危险区：≥ ${THRESHOLDS.fillRatio.danger * 100}%</div>
    `;
  }

  const legendEl = panel.querySelector('.trend-legend');
  if (legendEl) legendEl.innerHTML = legendHtml;

  const data = generateMockHistory(value);
  updateStats(data.values);

  chart.setOption({
    grid: { top: 40, bottom: 20, left: 40, right: 10 },
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: data.time,
      boundaryGap: false,
      axisLabel: { color: '#ffffff' }
    },
    yAxis: {
      type: 'value',
      min,
      max,
      axisLabel: { color: '#ffffff' }
    },
    series: [{
      type: 'line',
      data: data.values,
      smooth: true,
      symbol: 'circle',
      lineStyle: { color: '#6A00FF', width: 2 }
    }]
  });
}


// ==============================
// 工具函数
// ==============================
function getPointLevel(value) {
  if (currentMetric === 'temperature') {
    return getLevelByValue(value, THRESHOLDS.temperature.warning, THRESHOLDS.temperature.danger);
  }

  if (currentMetric === 'humidity') {
    return getLevelByValue(value, THRESHOLDS.humidity.warning, THRESHOLDS.humidity.danger);
  }

  if (currentMetric === 'grainHeight') {
    const ratio = value / 100;
    return getLevelByValue(ratio, THRESHOLDS.fillRatio.warning, THRESHOLDS.fillRatio.danger);
  }

  return 'normal';
}


function generateMockHistory(currentValue) {
  let count = 24;
  if (currentRange === '7d') count = 7;
  if (currentRange === '30d') count = 30;

  const values = [];
  const time = [];
  let base = currentValue - 3;

  for (let i = 0; i < count - 1; i++) {
    base += (Math.random() - 0.5) * 0.6;
    values.push(Number(base.toFixed(2)));
    time.push(currentRange === '24h' ? `${i}:00` : `Day ${i + 1}`);
  }

  values.push(Number(currentValue.toFixed(2)));
  time.push(currentRange === '24h' ? `${count - 1}:00` : `Day ${count}`);

  return { values, time };
}


// function updateStats(values) {
//   const statsEl = panel.querySelector('.trend-stats');
//   if (!statsEl) return;

//   let dangerDuration = 0;
//   let warningDuration = 0;

//   values.forEach(v => {
//     const level = getPointLevel(v);
//     if (level === 'danger') dangerDuration++;
//     if (level === 'warning') warningDuration++;
//   });

//   statsEl.innerHTML = `
//     <div class="trend-stats-title">异常统计</div>
//     <div class="stat-row danger">
//       <span>危险累计</span>
//       <span>${dangerDuration}</span>
//     </div>
//     <div class="stat-row warning">
//       <span>预警累计</span>
//       <span>${warningDuration}</span>
//     </div>
//   `;
// }


function updateStats(values) {

  const statsEl = panel.querySelector('.trend-stats');
  if (!statsEl) return;

  let dangerCount = 0;
  let warningCount = 0;

  let dangerDuration = 0;
  let warningDuration = 0;

  let lastLevel = null;

  values.forEach(v => {

    const level = getPointLevel(v);

    // 累计时长（每个点算一个单位）
    if (level === 'danger') dangerDuration++;
    if (level === 'warning') warningDuration++;

    // 累计次数（状态变化才算一次）
    if (level !== lastLevel) {
      if (level === 'danger') dangerCount++;
      if (level === 'warning') warningCount++;
    }

    lastLevel = level;

  });

  statsEl.innerHTML = `
    <div class="trend-stats-title">异常统计</div>

    <div class="stat-row danger">
      <span>危险累计次数</span>
      <span>${dangerCount}</span>
    </div>

    <div class="stat-row warning">
      <span>预警累计次数</span>
      <span>${warningCount}</span>
    </div>

    <div class="stat-row danger">
      <span>危险累计时长</span>
      <span>${dangerDuration}</span>
    </div>

    <div class="stat-row warning">
      <span>预警累计时长</span>
      <span>${warningDuration}</span>
    </div>
  `;
}


export function showTrendPanel() {
  if (!activeTarget) return;
  openTrendDrawer();
}











