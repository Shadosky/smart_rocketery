function Rocket(dna)
{
	this.position = createVector(width/2,height);
	this.velocity = createVector(0, -1);
	this.trust = createVector();
	this.fitness = 0;
	this.success = false;
	this.crash = false;
	
	if(dna) 
	{
		this.dna = dna;
	}
	else
	{
		this.dna = new DNA();
	}
	
	
	this.show = function()
    {
		fill(250, 200, 0);
		push();
		translate(this.position.x, this.position.y);
		rotate(this.velocity.heading());
		rectMode(CENTER);
		rect(0, 0, 25, 5);
		pop();
    }
	
	this.update = function()
	{
		var distanceTarget = dist(this.position.x, this.position.y,target.position.x, target.position.y);
		if(distanceTarget < 20) {
			points ++;
			this.success = true;
			this.position = target.position;
		} else if(this.position.x < 0 || this.position.x > width || this.position.y < 0 || this.position.y > height) {
			this.crash = true;
		} else if (obstacle.active) {
			if((this.position.x > obstacle.position.x && this.position.x < obstacle.position.x + obstacle.size) &&
			(this.position.y > obstacle.position.y && this.position.y < obstacle.position.y + obstacle.sick)) {
				this.crash = true;
			}
		}
		
		if(!this.success && !this.crash) {
			this.applyForce(this.dna.genes[count]);
			this.velocity.add(this.trust);
			this.position.add(this.velocity);
			this.trust.mult(0);
		}
	}
	
	this.applyForce = function(force)
	{
		this.trust.add(force);
	}
	
	this.calcFitness = function()
	{
		var distance = dist(this.position.x, this.position.y,target.position.x, target.position.y);
		//this.fitness = 1/distance;
		this.fitness = map(distance, 0, width, width, 0);
		if(this.success) 
		{
			this.fitness = this.fitness*10;
		} else if(this.crash) 
		{
			this.fitness = this.fitness*.5;
		}
		
		if (obstacle.active) {
			if(this.position.y < obstacle.position.y) {
				// bonus if we pass the obstacle
				// this help a lot in learning !
				this.fitness = this.fitness*2;
			}
		}

	}
}