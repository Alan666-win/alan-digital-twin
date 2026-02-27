


// 勉强对的版本，但不完美
import {
  CSS2DRenderer,
  CSS2DObject
} from '../../three.js-r123/examples/jsm/renderers/CSS2DRenderer.js';
import { statusMap } from '../../data/statusStore.js';
import { granaryArr } from '../../scene/model.js';

const labelMap = new Map();

// ==============================
// 创建风险标签 DOM
// ==============================
function createRiskPlate(status) {

  const anchor = document.createElement('div');
  anchor.style.position = 'relative';
  anchor.style.width = '0px';
  anchor.style.height = '0px';
  anchor.style.pointerEvents = 'none';

  const wrapper = document.createElement('div');
  wrapper.className = `risk-plate ${status}`;
  wrapper.style.position = 'absolute';
  wrapper.style.left = '0';
  wrapper.style.top = '0';
  // wrapper.style.transform = 'translate(-50%, -100%)';
  wrapper.style.transform = 'translate(-50%, -87%) scale(0.75)';


  const inner = document.createElement('div');
  inner.className = 'risk-plate-inner';

  const dot = document.createElement('div');
  dot.className = 'risk-dot';

  const title = document.createElement('div');
  title.className = 'risk-title';
  title.innerText = status === 'danger' ? '高风险' : '中风险';

  inner.appendChild(dot);
  inner.appendChild(title);
  wrapper.appendChild(inner);

  if (status === 'danger') {
    const sub = document.createElement('div');
    sub.className = 'risk-sub';
    sub.innerText = '立即处理';
    wrapper.appendChild(sub);
  }

  anchor.appendChild(wrapper);

  return new CSS2DObject(anchor);
}

// ==============================
// 主更新函数
// ==============================
export function updateAlertLabels(scene) {

  granaryArr.forEach(mesh => {

    const { warehouseId } = mesh.userData;
    const status = statusMap?.[warehouseId] ?? 'normal';

    const existing = labelMap.get(mesh);

    if (status === 'normal') {
      if (existing) {
        mesh.remove(existing);
        labelMap.delete(mesh);
      }
      return;
    }

    if (existing) {
      if (!existing.element.querySelector('.risk-plate')
            .classList.contains(status)) {
        mesh.remove(existing);
        labelMap.delete(mesh);
      } else {
        return;
      }
    }

    const label = createRiskPlate(status);
    label.renderOrder = 1;
    


    // 🔥 关键修正：真实顶部高度计算
    mesh.geometry.computeBoundingBox();

    const box = mesh.geometry.boundingBox;
    const topY = box.max.y;

    const offset = 2; // 浮空高度

    label.position.set(0, topY + offset, 0);

    mesh.add(label);
    labelMap.set(mesh, label);

  });

}



























