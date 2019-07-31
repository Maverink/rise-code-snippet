//RULES:
//ALWAYS ADD CONTINUE BUTTON END OF THE PAGE

//TO FIX

//conflict with audio player

//RUN ELEMENT AFTER APPEARED ON USER SCREEN
//Substitute animated class with my animations
//allow audio bar to rewind
//just allow the user to go to next lesson when audio is finished

//Conditionally render course theme depending if myAko or Elfy

//synch audio with text

//test all different rise blocks
//AVERAGE READING SPEED = 15-/min
//2.5 words per second
// 1 word = 200ms

//www.healthguidance.org/entry/13263/1/What-Is-the-Average-Reading-Speed-and-the-Best-Rate-of-Reading.html

//LOAD CODE WHEN DOM IS LOADED

https: window.addEventListener(
  "DOMContentLoaded",

  function startPage() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    var animate = function() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    var loader = new THREE.GLTFLoader();
    loader.load("git initavocado.gltf", function(object) {
      scene.add(object);
    });

    var trigger = false;
    var observer = new MutationObserver(function(mutations) {
      trigger = true;
    });

    observer.observe(document.querySelector("title"), {
      subtree: true,
      characterData: true,
      childList: true
    });

    if (trigger == true) {
      startPage();
    }
    console.log("RUNING");
    //SET TIMES TO MAKE SURE ALL ELEMENTS ARE RENDERED ON THE DOM
    setTimeout(function() {
      if (document.querySelector(".blocks-lesson")) {
        var timeForNextElement = 0;

        function renderElements() {
          var riseElements = document.querySelector(".blocks-lesson").children;

          var loopCounter = 0;

          (function revealElements(i) {
            setTimeout(function() {
              var currentRiseNode = riseElements[loopCounter];

              var contentLength = riseElements[
                loopCounter
              ].firstChild.firstChild.innerText.split(" ").length;

              timeForNextElement = contentLength * 200;

              if (timeForNextElement < 1000) {
                timeForNextElement = 1000;
              }
              console.log(
                "number of words is " +
                  contentLength +
                  "and timer is " +
                  timeForNextElement
              );

              currentRiseNode.style.display = "block";

              // if (loopCounter === 3) {
              //   renderCanvas(currentRiseNode);
              // }

              loopCounter++;
              if (--i) {
                // If i > 0, keep going
                revealElements(i); //Call the loop again, and pass it the current value of i
              }
            }, 1000);
          })(riseElements.length);
        }

        //START DISPLAYING THE ELEMENTS
        renderElements();
      }
    }, 2000);
  },
  false
);
