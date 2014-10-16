var width  = window.innerWidth,
    height = window.innerHeight,
    renderer,
    scene,
    camera,
    light,
    meshArr = [],
    colorArr = [
      0x23c2bd, 0x64CCC7, 0x80D1C5,
      0xff4c4f, 0xff695e, 0xf76d6d,
      0xff9c19, 0xffb617, 0xffc30f,
      0x23c2bd, 0x64CCC7, 0x80D1C5,
      0xff4c4f, 0xff695e, 0xf76d6d,
      0xff9c19, 0xffb617, 0xffc30f,
    ],
    meshLength = colorArr.length,
    unit = 360 / meshLength,
    baseTime = +new Date;

renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(width, height);
renderer.setClearColor(0xffffff, 1);
document.body.appendChild(renderer.domElement);

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(60, width / height);
camera.position.set(0, 0, 12);
camera.lookAt({x: 0, y: 0, z: 0 });
scene.add(camera);

light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0.333, 0.333, 0.666);
scene.add(light);

for (var i = 0; i < meshLength; i++) {
  var geometry,
      material,
      geometryTypeJudgeNum = Math.random() * 3;

  if (geometryTypeJudgeNum > 2) {
    geometry = new THREE.SphereGeometry(0.7, 24, 24);
  } else if (geometryTypeJudgeNum > 1) {
    geometry = new THREE.CylinderGeometry(0, 0.85, 1.2, 3);
  } else {
    geometry = new THREE.BoxGeometry(1, 1, 1);
  }

  material = new THREE.MeshPhongMaterial({
    color    : colorArr[i],
    ambient  : colorArr[i]
  });

  meshArr[i] = new THREE.Mesh(geometry, material);
  scene.add(meshArr[i]);
};

function render() {
    var time = (new Date() - baseTime) / 10;

    for (var i = 0; i < meshLength; i++) {
      var radian = (i * unit + time) * (Math.PI / 180),
          radian2 = ((i + 2) * unit + time) * (Math.PI / 180);

      meshArr[i].position.set(Math.cos(radian) * 5, Math.cos(radian2) * 4 + 1.33, Math.sin(radian) * 5);
      meshArr[i].rotation.y = radian * -1;
      meshArr[i].rotation.z = radian * -1;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();