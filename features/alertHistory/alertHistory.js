




import { alertRecords, acknowledgeAlertRecord } from '../../data/alertStore.js';
import { hasPermission, getCurrentRole } from '../../data/permission.js';
import { openDrawer } from '../../ui/drawerSystem.js';

let contentRoot = null;




// ==============================
// 创建内容容器
// ==============================
function createContentRoot() {
  contentRoot = document.createElement('div');
  contentRoot.className = 'statistics-content';
  renderHistory();
}


// ==============================
// 渲染历史内容
// ==============================
function renderHistory() {

  if (!contentRoot) return;

  contentRoot.innerHTML = '';

  if (!alertRecords.length) {
    const empty = document.createElement('div');
    empty.className = 'history-empty';
    empty.innerText = '暂无报警记录';
    contentRoot.appendChild(empty);
    return;
  }

  const listWrapper = document.createElement('div');
  listWrapper.className = 'history-list';

  alertRecords
    .slice()
    .reverse()
    .forEach(record => {

      const item = document.createElement('div');
      item.className = `history-item ${record.level}`;

      item.innerHTML = `
        <div class="history-row">
          <div class="history-title">
            ${record.warehouseId} - ${record.level.toUpperCase()}
          </div>
          <div class="history-status ${record.status}">
            ${record.status.toUpperCase()}
          </div>
        </div>

        <div class="history-time">
          开始时间：${record.startTime}
        </div>

        ${record.acknowledgedTime ? `
          <div class="history-time">
            确认时间：${record.acknowledgedTime}
          </div>
          <div class="history-time">
            响应耗时：${record.responseDuration}s
          </div>
        ` : ''}

        ${record.endTime ? `
          <div class="history-time">
            结束时间：${record.endTime}
          </div>
          <div class="history-time">
            持续时间：${record.duration}s
          </div>
        ` : ''}
      `;

      // ===== 人工确认按钮 =====
      if (record.status === 'open' && hasPermission('acknowledgeAlert')) {

        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'history-confirm';
        confirmBtn.innerText = '确认';

        confirmBtn.onclick = () => {
          const role = getCurrentRole();
          acknowledgeAlertRecord(record.warehouseId, role);
          renderHistory();
        };

        item.appendChild(confirmBtn);
      }

      listWrapper.appendChild(item);
    });

  contentRoot.appendChild(listWrapper);
}


// ==============================
// 对外接口：打开抽屉
// ==============================
export function showAlertHistory() {

  if (!contentRoot) {
    createContentRoot();
  }

  renderHistory();

  openDrawer({
    title: '报警历史记录',
    content: contentRoot
  });
}