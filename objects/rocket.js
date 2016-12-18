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
		push();
		translate(this.position.x, this.position.y);
		rotate(this.velocity.heading());

		if (vertexRockets) {
			var drawXScale = 2.5;
			var drawYScale = -4;
			
			// use (y, x) to draw 
			// i know it's weird
			fill(3, 169, 244);
			beginShape();
			vertex( 0*drawYScale, 0);
			vertex( 0*drawYScale, 1*drawXScale);
			vertex( 1*drawYScale, 1*drawXScale);
			vertex( 1*drawYScale, 2*drawXScale);
			vertex( 1*drawYScale, 2*drawXScale);
			vertex( 3*drawYScale, 3*drawXScale);
			vertex( 7*drawYScale, 3*drawXScale);
			vertex( 7*drawYScale, 4*drawXScale);
			vertex( 8*drawYScale, 4*drawXScale);
			vertex( 8*drawYScale, 5*drawXScale);
			vertex( 9*drawYScale, 5*drawXScale);
			vertex( 9*drawYScale, 4*drawXScale);
			vertex(10*drawYScale, 4*drawXScale);
			vertex(10*drawYScale, 3*drawXScale);
			vertex( 9*drawYScale, 3*drawXScale);
			// second part
			vertex( 9*drawYScale, -3*drawXScale);
			vertex(10*drawYScale, -3*drawXScale);
			vertex(10*drawYScale, -4*drawXScale);
			vertex( 9*drawYScale, -4*drawXScale);
			vertex( 9*drawYScale, -5*drawXScale);
			vertex( 8*drawYScale, -5*drawXScale);
			vertex( 8*drawYScale, -4*drawXScale);
			vertex( 7*drawYScale, -4*drawXScale);
			vertex( 7*drawYScale, -3*drawXScale);
			vertex( 3*drawYScale, -3*drawXScale);
			vertex( 1*drawYScale, -2*drawXScale);
			vertex( 1*drawYScale, -2*drawXScale);
			vertex( 1*drawYScale, -1*drawXScale);
			vertex( 0*drawYScale, -1*drawXScale);

			endShape(CLOSE);

			fill(244);
			beginShape();
			// let's add a window
			vertex( 5*drawYScale,  1*drawXScale);
			vertex( 8*drawYScale,  1*drawXScale);
			vertex( 8*drawYScale, -1*drawXScale);
			vertex( 5*drawYScale, -1*drawXScale);

			endShape(CLOSE);
		} else {
			fill(3, 169, 244);
			rectMode(CENTER);
			rect(0, 0, 25, 5);
		}
		
		
		pop();
    }
	
	this.update = function()
	{
		var distanceTarget = dist(this.position.x, this.position.y,target.position.x, target.position.y);
		if(distanceTarget < 20) {
			points ++;
			this.success = true;
			this.position = target.position;
		} else if(this.position.x < 0 || this.position.x > width || this.position.y > height || this.position.y < 0) {
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