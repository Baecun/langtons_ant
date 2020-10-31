function setup() {
  frameRate(60);
  createCanvas(1000, 1000);
  verifyGridSize();
  generateGrid();

  console.log(tiles.length);
  ant = new Ant(tiles[round(tiles.length * 0.55)]); //.position.x + sqSize/2, tiles[54].position.y + sqSize/3.5);
}

function draw() {
  processWorld();
  renderVisuals();
}

function processWorld(){
  ant.update();
}

function renderVisuals() {
  background(53, 23, 2);
  drawGrid();
  ant.show();
}

var orientations = new Orientations();
var tiles = []

var x = 225;
var y = 225;

var gridSize = 50;
var sqSize = 0;


var ant = null;

function verifyGridSize(){
  while (width % gridSize != 0){
    gridSize--;
  }
}

function drawGrid(){
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].show();
    fill(0, 0, 280);
    // text(i, tiles[i].position.x, tiles[i].position.y, tiles[i].position.x + sqSize/2, tiles[i].position.y + sqSize /2)
  }
}

function generateGrid(){
  // Adjust canvas size for uniform square distribution
  if (width != height){
    resizeCanvas(width, width);
  }

  sqSize = width/gridSize - 2;

  // Iterate through grid and crate a tile in the proper place
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let t = new Tile(i * width/gridSize, j * height/gridSize, sqSize);
      tiles.push(t);
    }
  }
}