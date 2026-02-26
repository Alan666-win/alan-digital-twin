

/**
 * 渲染粮仓信息面板（结构骨架）
 * 只负责：结构映射 + class 挂载
 * 不参与任何判断逻辑
 */
export function renderWarehousePanel(result) {
  const {
    warehouseName,
    time,
    status,
    summary,
    indicators,
    suggestions,
    raw
  } = result;

  return `
    <div class="warehouse-panel status-${status}">
      
      <!-- ① 标题区 -->
      <div class="panel-header">
        <span class="warehouse-name">${warehouseName}</span>
        <span class="warehouse-time">${time}</span>
      </div>

      <!-- ② 风险判断区 -->
      <div class="panel-risk">
        <div class="risk-summary">${summary}</div>
        <ul class="risk-suggestions">
          ${suggestions.map(item => `<li>${item.text}</li>`).join('')}
        </ul>
      </div>

      <!-- ③ 参数详情区 -->
      <div class="panel-params">

        <!-- 判断指标 -->
        <div class="params-indicators">
          <div class="indicator temperature level-${indicators.temperature.level}">
            温度：${indicators.temperature.value} ℃
          </div>

          <div class="indicator humidity level-${indicators.humidity.level}">
            湿度：${indicators.humidity.value} %
          </div>

          <div class="indicator grain-height level-${indicators.grainHeightRatio.level}">
            粮高比例：${indicators.grainHeightRatio.value}
          </div>
        </div>

        <!-- 非判断指标（中性展示） -->
        <div class="params-raw">
          <div class="raw-item inventory">
            库存：${raw.inventory} 吨
          </div>
          <div class="raw-item warehouse-height">
            仓高：${raw.warehouseHeight} m
          </div>
        </div>

      </div>
    </div>
  `;
}
