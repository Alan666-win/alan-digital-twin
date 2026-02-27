


// 2-16

import { CSS2DRenderer } from '../../three.js-r123/examples/jsm/renderers/CSS2DRenderer.js';
import { statusDetailMap } from '../../data/statusStore.js';

function animateNumber(el, to, duration = 800) {
  const from = 0;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = from + (to - from) * progress;

    el.textContent = Number.isInteger(to)
      ? Math.floor(value)
      : value.toFixed(1);

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ==============================
   实时两行时间
============================== */

function formatDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}-${minutes}-${seconds}`
  };
}

export function createInfoPanel(data) {

  if (!data) return null;

  const result = statusDetailMap[data.warehouseId];
  if (!result) return null;

  const {
    warehouseName,
    status,
    temperature,
    humidity,
    grainHeight,
    warehouseHeight,
    inventory,
    indicators,
    suggestion
  } = result;

  const root = document.createElement('div');
  root.className = `info-panel status-${status}`;

  root.style.zIndex = '99999';
  root.style.position = 'relative';
  root.style.pointerEvents = 'auto';

  const grainIcon = `./assets/grains/${data.grainType || 'soybean'}.png`;

  const timeObj = formatDateTime();

  root.innerHTML = `
    <div class="panel">

      <div class="panel-header">
        <span class="warehouse-name">${warehouseName}</span>

        <!-- 只改时间结构 -->
        <span class="warehouse-time">
          <div class="time-date">${timeObj.date}</div>
          <div class="time-clock">${timeObj.time}</div>
        </span>
      </div>

      <div class="panel-suggestions">
        <div class="risk-tip ${status}">
          <span class="dot"></span>
          <span class="text">
            ${
              status === 'normal'
                ? '当前状态正常'
                : suggestion
            }
          </span>
        </div>
      </div>

      <div class="panel-details">

        <div class="row indicator ${indicators.temperature.level}">
          <div class="left">
            <img class="icon" src="./assets/icons/temperature.png"/>
            <span class="label">温度</span>
          </div>
          <div class="right">
            <span class="value temp"></span>
            <span class="unit">℃</span>
          </div>
        </div>

        <div class="row indicator ${indicators.humidity.level}">
          <div class="left">
            <img class="icon" src="./assets/icons/humidity.png"/>
            <span class="label">湿度</span>
          </div>
          <div class="right">
            <span class="value humidity"></span>
            <span class="unit">%</span>
          </div>
        </div>

        <div class="row indicator ${indicators.fillRatio.level}">
          <div class="left">
            <img class="icon" src="./assets/icons/grain-height.png"/>
            <span class="label">粮高</span>
          </div>
          <div class="right">
            <span class="value grainHeight"></span>
            <span class="unit">m</span>
          </div>
        </div>

        <div class="row">
          <div class="left">
            <img class="icon" src="${grainIcon}"/>
            <span class="label">粮种</span>
          </div>
          <div class="right">
            <span class="value">${data.grainName || '—'}</span>
          </div>
        </div>

        <div class="row">
          <div class="left">
            <img class="icon" src="./assets/icons/weight.png"/>
            <span class="label">库存</span>
          </div>
          <div class="right">
            <span class="value inventory"></span>
            <span class="unit">吨</span>
          </div>
        </div>

        <div class="row">
          <div class="left">
            <img class="icon" src="./assets/icons/warehouse-height.png"/>
            <span class="label">仓高</span>
          </div>
          <div class="right">
            <span class="value warehouseHeight"></span>
            <span class="unit">m</span>
          </div>
        </div>

      </div>
    </div>
  `;

  // 数字动画
  animateNumber(root.querySelector('.temp'), temperature);
  animateNumber(root.querySelector('.humidity'), humidity);
  animateNumber(root.querySelector('.grainHeight'), grainHeight);
  animateNumber(root.querySelector('.inventory'), inventory);
  animateNumber(root.querySelector('.warehouseHeight'), warehouseHeight);

  // ==============================
  // 实时跳秒更新
  // ==============================

  const dateEl = root.querySelector('.time-date');
  const timeEl = root.querySelector('.time-clock');

  const timer = setInterval(() => {
    const t = formatDateTime();
    dateEl.textContent = t.date;
    timeEl.textContent = t.time;
  }, 1000);

  // 面板销毁时清理定时器
  root._timer = timer;

  const panelObj = new CSS2DObject(root);
  panelObj.renderOrder = 9999;

  requestAnimationFrame(() => {
    const container = document.querySelector('.css2d-renderer');
    if (container) {
      container.appendChild(root);
    }
  });

  return panelObj;
}












