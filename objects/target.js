function Target(){
	this.position = createVector(width/2, 50);
	
	this.show = function()
    {
		fill(20, 200, 0);
		push();
		translate(this.position.x, this.position.y);
		ellipseMode(CENTER);
		ellipse(0, 0, 25);
		pop();
    }
}