



import { analyzeAlerts } from '../../data/alertAnalytics.js';
import { subscribeAlertChange } from '../../data/alertStore.js';
import { openDrawer } from '../../ui/drawerSystem.js';
import { getWarehouseRiskRanking } from '../../data/alertAnalytics.js';

let panel = null;
let currentRange = '24h';

function animateNumber(el, to, duration = 600) {
  if (!el) return;

  const from = parseInt(el.textContent) || 0;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(from + (to - from) * progress);
    el.textContent = value;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

export function initStatisticsPanel() {

  panel = document.createElement('div');

  // ⭐ 只增加这个 class，不动其它
  panel.className = 'drawer-content statistics-panel';

  panel.innerHTML = `
    <div class="trend-body">
      <div class="statistics-content"></div>
    </div>

    <div class="statistics-range">
      <span class="range active" data-range="24h">24小时</span>
      <span class="range" data-range="7d">7天</span>
      <span class="range" data-range="30d">30天</span>
    </div>
  `;

  buildContent();
  bindRangeEvents();
  refreshStats();
  subscribeAlertChange(refreshStats);
}

function buildContent() {

  const content = panel.querySelector('.statistics-content');

  content.innerHTML = `

     <!-- 第一排：数量类 -->
    <div class="stats-cards">

      <div class="stat-card">
        <div class="card-value">
  <span id="stat-total">0</span>
  <span id="change-total" class="trend-change"></span>
</div>
        <div class="card-label">总报警</div>
      </div>

      <div class="stat-card">
        <div class="card-value"><span id="stat-open">0</span></div>
        <div class="card-label">未处理</div>
      </div>

      <div class="stat-card">
        <div class="card-value"><span id="stat-ack">0</span></div>
        <div class="card-label">已确认</div>
      </div>

      <div class="stat-card">
        <div class="card-value"><span id="stat-closed">0</span></div>
        <div class="card-label">已关闭</div>
      </div>

    </div>

    <!-- 第二排：时长效率类 -->
    <div class="stats-cards secondary-cards">

      <div class="stat-card">
        <div class="card-value">
          <span id="stat-danger">0</span>
<span class="unit">s</span>
<span id="change-danger" class="trend-change"></span>
        </div>
        <div class="card-label">危险时长</div>
      </div>

      <div class="stat-card">
        <div class="card-value">
          <span id="stat-warning">0</span>
          <span class="unit">s</span>
        </div>
        <div class="card-label">警告时长</div>
      </div>

      <div class="stat-card">
        <div class="card-value">
          <span id="stat-response">0</span>
<span class="unit">s</span>
<span id="change-response" class="trend-change"></span>
        </div>
        <div class="card-label">平均响应</div>
      </div>

      <div class="stat-card">
        <div class="card-value">
          <span id="stat-max">0</span>
          <span class="unit">s</span>
        </div>
        <div class="card-label">最长持续</div>
      </div>

    </div>

    <div class="ratio-item">

  <div class="ratio-header multi-header">
    <span>当前风险结构</span>
    <div class="multi-labels">
      <span class="label-item normal">
        <i></i> 正常 <span id="label-normal">0%</span>
      </span>
      <span class="label-item warning">
        <i></i> 预警 <span id="label-warning">0%</span>
      </span>
      <span class="label-item danger">
        <i></i> 危险 <span id="label-danger">0%</span>
      </span>
    </div>
  </div>

  <div class="multi-bar">
    <div id="risk-normal" class="multi-seg normal"></div>
    <div id="risk-warning" class="multi-seg warning"></div>
    <div id="risk-danger" class="multi-seg danger"></div>
  </div>

</div>

<div class="ratio-item">

  <div class="ratio-header multi-header">
    <span>风险时长结构</span>
    <div class="multi-labels">
      <span class="label-item normal">
        <i></i> 正常 <span id="label-normal-duration">0%</span>
      </span>
      <span class="label-item warning">
        <i></i> 预警 <span id="label-warning-duration">0%</span>
      </span>
      <span class="label-item danger">
        <i></i> 危险 <span id="label-danger-duration">0%</span>
      </span>
    </div>
  </div>

  <div class="multi-bar">
    <div id="risk-normal-duration" class="multi-seg normal"></div>
    <div id="risk-warning-duration" class="multi-seg warning"></div>
    <div id="risk-danger-duration" class="multi-seg danger"></div>
  </div>

</div>

</div>




<div class="stats-cards efficiency-cards">

  <div class="stat-card">
    <div class="card-value">
      <span id="stat-handle">0</span>
      <span class="unit">s</span>
      <span id="change-handle" class="trend-change"></span>
    </div>
    <div class="card-label">平均处理时长</div>
  </div>

  <div class="stat-card">
    <div class="card-value">
      <span id="stat-close-rate">0</span>
      <span class="unit">%</span>
      <span id="change-close-rate" class="trend-change"></span>
    </div>
    <div class="card-label">关闭率</div>
  </div>

  <div class="stat-card">
    <div class="card-value">
      <span id="stat-open-rate">0</span>
      <span class="unit">%</span>
    </div>
    <div class="card-label">未处理率</div>
  </div>

</div>



<div class="ranking-section">
  <div class="ranking-title">高风险仓 TOP 3</div>
  <div class="ranking-list"></div>
</div>
   

    </div>
  `;
}

function bindRangeEvents() {
  panel.querySelectorAll('.range').forEach(btn => {
    btn.onclick = () => {
      panel.querySelectorAll('.range').forEach(r => r.classList.remove('active'));
      btn.classList.add('active');
      currentRange = btn.dataset.range;
      refreshStats();
    };
  });
}

export function openStatisticsPanel() {
  if (!panel) return;

  openDrawer({
    title: '报警运营统计',
    content: panel
  });

  refreshStats();
}

// function refreshStats() {

//   updateMultiBar(stats);

  

//   const stats = analyzeAlerts(currentRange);

//   animateNumber(panel.querySelector('#stat-total'), stats.totalCount);
//   animateNumber(panel.querySelector('#stat-open'), stats.openCount);
//   animateNumber(panel.querySelector('#stat-ack'), stats.acknowledgedCount);
//   animateNumber(panel.querySelector('#stat-closed'), stats.closedCount);

//   animateNumber(panel.querySelector('#stat-danger'), stats.dangerDuration);
//   animateNumber(panel.querySelector('#stat-warning'), stats.warningDuration);
//   animateNumber(panel.querySelector('#stat-response'), stats.avgResponseTime);
//   animateNumber(panel.querySelector('#stat-max'), stats.maxDuration);

//   updateRatioBar('#stat-ratio-fill','#stat-ratio-text',stats.highRiskDurationRatio);
//   updateRatioBar('#stat-count-fill','#stat-count-text',stats.highRiskCountRatio);
// }



function refreshStats() {

  

  const stats = analyzeAlerts(currentRange);   // ✅ 先声明

  

  animateNumber(panel.querySelector('#stat-total'), stats.totalCount);
  animateNumber(panel.querySelector('#stat-open'), stats.openCount);
  animateNumber(panel.querySelector('#stat-ack'), stats.acknowledgedCount);
  animateNumber(panel.querySelector('#stat-closed'), stats.closedCount);

  animateNumber(panel.querySelector('#stat-danger'), stats.dangerDuration);
  animateNumber(panel.querySelector('#stat-warning'), stats.warningDuration);
  animateNumber(panel.querySelector('#stat-response'), stats.avgResponseTime);
  animateNumber(panel.querySelector('#stat-max'), stats.maxDuration);


  animateNumber(panel.querySelector('#stat-handle'), stats.avgHandleDuration);
animateNumber(panel.querySelector('#stat-close-rate'), stats.closeRate);
animateNumber(panel.querySelector('#stat-open-rate'), stats.openRate);
 

  // ✅ 最后再更新三色结构条
  updateMultiBar(stats);

  updateChanges(stats.changes);

  updateRanking();
}




function updateMultiBar(stats) {

  panel.querySelector('#label-normal').textContent =
  `${stats.normalCountRatio}%`;

panel.querySelector('#label-warning').textContent =
  `${stats.warningCountRatio}%`;

panel.querySelector('#label-danger').textContent =
  `${stats.highRiskCountRatio}%`;

  const total = stats.totalCount || 1;

  const normalRatio = Math.max(
    0,
    100 - stats.highRiskCountRatio - stats.warningCountRatio
  );

  const warningRatio = stats.warningCountRatio || 0;
  const dangerRatio = stats.highRiskCountRatio || 0;

  panel.querySelector('#risk-normal').style.width = normalRatio + '%';
  panel.querySelector('#risk-warning').style.width = warningRatio + '%';
  panel.querySelector('#risk-danger').style.width = dangerRatio + '%';


  // ===== 时长结构 =====

panel.querySelector('#label-normal-duration').textContent =
  `${stats.normalDurationRatio}%`;

panel.querySelector('#label-warning-duration').textContent =
  `${stats.warningDurationRatio}%`;

panel.querySelector('#label-danger-duration').textContent =
  `${stats.dangerDurationRatio}%`;

panel.querySelector('#risk-normal-duration').style.width =
  stats.normalDurationRatio + '%';

panel.querySelector('#risk-warning-duration').style.width =
  stats.warningDurationRatio + '%';

panel.querySelector('#risk-danger-duration').style.width =
  stats.dangerDurationRatio + '%';
}



function updateChanges(changes) {

  setTrend(panel.querySelector('#change-total'), changes.totalCountChange);
  setTrend(panel.querySelector('#change-danger'), changes.dangerDurationChange);
  setTrend(panel.querySelector('#change-response'), changes.avgResponseChange);

  setTrend(panel.querySelector('#change-handle'), changes.handleDurationChange);
setTrend(panel.querySelector('#change-close-rate'), changes.closeRateChange);
}

function setTrend(el, value) {
  if (!el) return;

  if (value > 0) {
    el.textContent = ` ↑${value}%`;
    el.style.color = '#ff4d4f'; // 红色
  } else if (value < 0) {
    el.textContent = ` ↓${Math.abs(value)}%`;
    el.style.color = '#00c853'; // 绿色
  } else {
    el.textContent = '';
  }
}


// function updateRanking() {

//   const list = panel.querySelector('.ranking-list');
//   const data = getWarehouseRiskRanking(currentRange);

//   list.innerHTML = '';

//   data.forEach((item, index) => {

//     const row = document.createElement('div');
//     row.className = 'ranking-item';

//     row.innerHTML = `
//       <span class="rank-index">${index + 1}</span>
//       <span class="rank-id">${item.warehouseId}</span>
//       <span class="rank-score">${item.score} 分</span>
//     `;

//     list.appendChild(row);
//   });
// }

function updateRanking() {

  const list = panel.querySelector('.ranking-list');
  const data = getWarehouseRiskRanking(currentRange);

  list.innerHTML = '';

  data.forEach((item, index) => {

    const row = document.createElement('div');
    row.className = 'ranking-item';
    row.dataset.id = item.warehouseId;

    row.innerHTML = `
      <span class="rank-index">${index + 1}</span>
      <span class="rank-id">${item.warehouseId}</span>
      <span class="rank-score">${item.score} 分</span>
    `;

    row.addEventListener('click', () => {

      list.querySelectorAll('.ranking-item')
        .forEach(r => r.classList.remove('active'));

      row.classList.add('active');

      window.dispatchEvent(new CustomEvent('focus-warehouse', {
        detail: item.warehouseId
      }));

    });

    list.appendChild(row);
  });
}



















