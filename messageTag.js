


import {
  CSS2DRenderer,
  CSS2DObject
} from '../../../three.js-r123/examples/jsm/renderers/CSS2DRenderer.js';

// ==============================
// 创建一个 HTML 标签（用于仓库标注）
// ==============================
function tag(text) {
  const div = document.createElement('div');
  div.innerHTML = text;
  div.classList.add('tag');

  // 避免遮挡 three.js 鼠标事件
  div.style.pointerEvents = 'none';

  const label = new CSS2DObject(div);
  return label;
}

// ==============================
// 创建 CSS2DRenderer（⚠️ 不在这里 setSize）
// ==============================
const labelRenderer = new CSS2DRenderer();

labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0';
labelRenderer.domElement.style.left = '0';
labelRenderer.domElement.style.pointerEvents = 'none';
labelRenderer.domElement.style.zIndex = '1';



// ⚠️ 非常关键：挂到 #app，而不是 body
const app = document.getElementById('app');
if (app) {
  app.appendChild(labelRenderer.domElement);
} else {
  console.warn('[messageTag] 未找到 #app 容器');
}

// ==============================
// 导出
// ==============================

function createLabel(dom) {
  return new CSS2DObject(dom);
}
export { tag, labelRenderer,createLabel };
