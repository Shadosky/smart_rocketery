function Obstacle (position, len, hei) {
	if(position)
	{
		this.position  = position;
		this.size = len;
		this.sick = hei;
		this.active = true;
	} else
	{
		this.position  = createVector(-15,0);
		this.size = 0;
		this.sick = 0;
		this.active = false;
	}
	
	this.show = function()
    {
		if(this.active) {
			fill(250, 0, 0);
			stroke(0);
			push();
			translate(this.position.x, this.position.y);
			rect(0, 0, this.size, this.sick);
			pop();
		}
    }
}