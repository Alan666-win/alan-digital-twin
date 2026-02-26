



import { renderer } from '../../RendererCamera.js'; // ⭐ 改回正确来源
import { choose } from './choose.js';

// 只监听 three.js canvas
if (renderer && renderer.domElement) {

  renderer.domElement.addEventListener('click', (event) => {

    // 防止 UI 层遮挡
    event.stopPropagation();

    choose(event);
  });

} else {
  console.warn('[RaycastEntry] renderer.domElement not ready');
}






