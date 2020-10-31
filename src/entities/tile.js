function Tile(x, y, size) {
    this.position = createVector(x, y)
    this.size = size;
    this.on = false;
}

Tile.prototype.show = function () {
    noStroke();
    
    if (this.on){
        fill(226, 196, 129);
    }

    else {
        fill(82, 165, 72);
    }
    
    rect(this.position.x,
        this.position.y,
        this.size,
        this.size); 
};