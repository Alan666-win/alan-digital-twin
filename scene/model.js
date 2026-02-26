
// scene/model.js
// ==============================
// 模型加载 + 仓体绑定（最终稳定版）
// ==============================

import * as THREE from '../../../../three.js-r123/build/three.module.js';
import { GLTFLoader } from '../../../../three.js-r123/examples/jsm/loaders/GLTFLoader.js';
import messageData from '../messageData.js';

const model = new THREE.Group();
const granaryArr = [];

const loader = new GLTFLoader();

loader.load('./scene/model.glb', (gltf) => {


  gltf.scene.traverse((object) => {

   

    const warehouseId = object.name;
    const data = messageData[warehouseId];
    if (!data) return;

    // 只识别主仓体（防止窗户、门被当仓）
    if (!object.geometry || object.geometry.attributes.position.count < 200) {
      return;
    }

    object.material = new THREE.MeshLambertMaterial({
      map: object.material.map,
      color: object.material.color,
    });

    object.userData.warehouseId = warehouseId;
    object.userData.zoneId = data.zoneId;
    // object.userData.baseColor = object.material.color.clone();
    object.userData.originalColor = object.material.color.clone();


    granaryArr.push(object);

  });

  model.add(gltf.scene);

});



export { model, granaryArr };




