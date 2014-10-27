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

var timerFnc = function(object, eventType, callback){
  var timer;

  object.addEventListener(eventType, function() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function(){
      callback();
      timer = undefined;
    }, 500);
  }, false );
};

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

lightDirect = new THREE.DirectionalLight(0xffffff, 0.2);
lightDirect.position.set(0.333, 0.333, 0.666);
scene.add(lightDirect);

lightAmbient = new THREE.AmbientLight(0xffffff);
lightAmbient.color.multiplyScalar(0.8); 
lightAmbient.position.set(-0.666, -0.666, -0.333);
scene.add(lightAmbient);

for (var i = 0; i < meshLength; i++) {
  var geometry,
      material,
      geometryTypeJudgeNum = Math.random() * 3,
      size = Math.random() * 1.33 + 0.5;

  if (geometryTypeJudgeNum > 2) {
    geometry = new THREE.SphereGeometry(size * 0.7, 24, 24);
  } else if (geometryTypeJudgeNum > 1) {
    geometry = new THREE.CylinderGeometry(0, size * 0.85, size * 1.2, 3);
  } else {
    geometry = new THREE.BoxGeometry(size, size, size);
  }

  material = new THREE.MeshPhongMaterial({
    color  : colorArr[i],
    ambient: colorArr[i]
  });

  meshArr[i] = new THREE.Mesh(geometry, material);
  scene.add(meshArr[i]);
};

var render = function() {
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

timerFnc(window, 'resize', function(){
  width  = window.innerWidth;
  height = window.innerHeight;
  
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
