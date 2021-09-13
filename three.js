/* * * * * * * * * * * * * * * * * * * * * *  * 
 * Program na zaliczenie Grafiki Komputerowej *
 * * * * * * * * * * * * * * * * * * * * * *  */

var width = 100

/**
 * Dostostuj rekurencje
 * last = 0   // pierwszy poziom - podstawowy
 * last = 1   // drugi poziom
 * last = 2   // trzeci poziom
 */
var last = 2;

// Renderowanie
var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
renderer.setClearColor('blue', 0.4);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Ustawienia
var camera = new THREE.PerspectiveCamera(24, window.innerWidth / window.innerHeight, 0.2, 3000);
var scene = new THREE.Scene();
var light1 = new THREE.AmbientLight('black', 0.5);
scene.add(light1);
var light2 = new THREE.PointLight('gray', 0.5);
scene.add(light2);

// Stworzenie kostki i wycentrowanie
var parent = new THREE.Object3D();
parent.position.set(0, 0, -3000);
scene.add(parent);

// Renderowanie
mengerSponge(-2 * width, -2 * width, 0, width, 0, last);
requestAnimationFrame(render);

function render() {
  parent.rotation.x = 0.3;
  parent.rotation.y = 0.3;
  parent.rotation.z += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function mengerSponge(a, b, c, width, current, last) {
  // Sprawdzanie bledow
  if (last < 0) {
    alert("Invalid negative last parameter");
    return;
  } else if (last > 5) {
    alert("Last parameter will cause too much lag");
    return;
  } else if (last == 0) {
    cube(0, 0, 0, a, b, c, width * 3);
    return;
  }

  // iteracja po osi X
  for (var i = 1; i <= 3; i++) {
    // Iteracja po osi Y
    for (var j = 1; j <= 3; j++) {
      // Iteracja po osi Z
      for (var k = 1; k <= 3; k++) {
        var num2 = 0;
        if (i == 2) num2++;
        if (j == 2) num2++;
        if (k == 2) num2++;

        if (num2 < 2) {
          // Powtarzaj dalej, jeżeli jest więcej poziomów(last)
          if (current < last - 1) {
            mengerSponge(
              (a + i * width),
              (b + j * width),
              (c + k * width),
              (width / 3),
              (current + 1),
              last
            );
          } else if (current == last - 1) {
            // W przeciwnym razie, narysuj kostkę w określonym obszarze.
            cube(i, j, k, a, b, c, width);
          }
        }
      }
    }
  }
}

function cube(i, j, k, a, b, c, width) {
  // stworz szescian
  var geometry = new THREE.BoxGeometry(width, width, width);
  var material = new THREE.MeshPhongMaterial({color: 0xAAAAAA});
  var cube = new THREE.Mesh(geometry, material);

  // ustal pozycje kostki
  cube.position.set(
    a + ((i + 1) * width),
    b + ((j + 1) * width),
    c + ((k + 1) * width)
  );

  // Add the cube to the screen
  parent.add(cube);

}