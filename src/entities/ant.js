function Ant(tile) {
    this.tile = tile;
    this.position = createVector(tile.position.x, tile.position.y)
    this.size = 10;
    this.orientation = 'U';
    this.hasAdjustedTranslate = true;
}

Ant.prototype.turnLeft = function(){
    this.turnRight();
    this.turnRight();
    this.turnRight();
}

Ant.prototype.turnRight = function (){
    // translate(11 * sqSize, -1.1 * sqSize);
    // rotate(PI/2);
    orientations.advance();
}

Ant.prototype.show = function(){
    push();
    stroke(0, 0, 0);
    fill(0, 0, 0);
    

    // this.rotateRight();
    // this.rotateRight();
    strokeWeight(1);
    ellipse(this.position.x - 3, this.position.y-6, this.size/3);
    ellipse(this.position.x + 3, this.position.y-6, this.size/3);
    ellipse(this.position.x, this.position.y, this.size);
    
    strokeWeight(3);
    // Right Legs
    line(this.position.x + 4, this.position.y + 4, this.position.x + 10, this.position.y + 7);
    line(this.position.x + 4, this.position.y + 12 , this.position.x + 10, this.position.y + 15);
    line(this.position.x + 4, this.position.y + 21, this.position.x + 10, this.position.y + 24);
    
    // Left Legs
    line(this.position.x - 4, this.position.y + 4, this.position.x - 10, this.position.y + 7);
    line(this.position.x - 4, this.position.y + 12 , this.position.x - 10, this.position.y + 15);
    line(this.position.x - 4, this.position.y + 21, this.position.x - 10, this.position.y + 24);
    
    strokeWeight(1);
    
    ellipse(this.position.x, this.position.y + 10, 2 * this.size/3);
    ellipse(this.position.x, this.position.y + 22, this.size * .8, 1.5 * this.size);
    // ellipse(this.position.x, this.position.y, this.size/2, this.size/2);
    pop();
}

Ant.prototype.moveForward = function(){
    let ind = round(tiles.indexOf(this.tile))

    let newInd = -1;

    switch (orientations.current) {
        case 0:
            newInd = ind - 1;
            break;
        case 1:
            newInd = ind + gridSize;    
            break;
        case 2:
            newInd = ind + 1;
            break;
        case 3:
            newInd = ind - gridSize;
            break;
    
        default:
            break;
    }

    newInd = this.wrapAround(ind, newInd);

    this.tile = tiles[newInd];
}

Ant.prototype.printWrapInfo = function(currentInd, newInd){
    let wrapped = [currentInd, newInd, orientations.possible[orientations.current]];
    console.log(wrapped);
}

Ant.prototype.wrapAround = function (currentInd, newInd){
    
    
    if (currentInd % gridSize == 0 && orientations.current == 0){
        newInd =  currentInd + gridSize - 1;
        this.printWrapInfo(currentInd, newInd);
    }

    else if (orientations.current == 2) {
        for (let index = 1; index < gridSize; index++) {
            if (currentInd == index * gridSize - 1){
                newInd = currentInd - gridSize + 1;
                this.printWrapInfo(currentInd, newInd);
                break;
            }
        }
    }
    
    else if (currentInd < gridSize && orientations.current == 3){
        newInd = currentInd + (gridSize*gridSize) - gridSize
        this.printWrapInfo(currentInd, newInd);
    }

    else if (currentInd  > gridSize*gridSize - gridSize && orientations.current ==  1){
        newInd = currentInd - ((gridSize*gridSize) - gridSize);
        this.printWrapInfo(currentInd, newInd);
    }
    

    return newInd;
}

Ant.prototype.update = function (){
    this.position = createVector(this.tile.position.x + sqSize / 2, this.tile.position.y + sqSize / 3.5)
    if (!this.tile.on){
        this.turnRight();
    } else {
        this.turnLeft();
    }
    
    this.tile.on = !this.tile.on;    
    
    this.moveForward();
    
    /*
        Ant rules:
        1 - At a white square, turn 90° clockwise, flip the color of the square, move forward one unit 


        2 - At a black square, turn 90° counter-clockwise, flip the color of the square, move forward one unit

    */
}