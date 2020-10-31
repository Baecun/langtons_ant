function Orientations(){
    this.possible = ['U', 'R', 'D', 'L'];
    this.current = 0;
}

Orientations.prototype.advance = function (){
    this.current++;
    if (this.current > 3){
        this.current = 0;
    }
}

Orientations.prototype.getRight = function (){
    let rightElement = this.current + 1 <= 3 ? 
        this.possible[this.current + 1] 
        : this.possible[0];

    return rightElement;
}

Orientations.prototype.getLeft = function (){
    let leftElement = this.current - 1 >= 0 ? this.possible[this.current-1] : this.possible[3]

    return leftElement;
}