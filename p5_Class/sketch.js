//Idea taken from https://openprocessing.org/sketch/1761508

let multiPos = new Array(12);
let system;
let locNamesArr = [];
let checkSpillCount = 1;
let jsonArr;
let spills;
let fr = 30;
let particle;
let riverPath = [];

function preload() {
  //load the json
  jsonArr = loadJSON("spills.json");
}

function setup() {
  ps = new ParticleSystem(jsonArr);
  frameRate(fr);
  createCanvas(800, 800);
 
}

function draw() {
  background(255);
  let count = ps.run();
  ps.addParticle();
  let dataCounter = ` Number of rivers: ${count}/11000`;
  ps.drawFlow();
  text("'CLICK AROUND THE SCREEN'", 10, 10);
  text(" Create a river", 10, 25);

  text(dataCounter, 10, 40);
  frameRate(fr);
}

function mouseClicked() {
  let x = mouseX;
  let y = mouseY;
  let p = createVector(x, y);
  ps.addPostion(p);
}

function keyPressed(){
    if (keyCode === LEFT_ARROW) {
      ps.riverNames.saveNames()
    }
}

//--------------------------------------------------------
