function Population(rocketPool){
	this.rockets = [];
	this.matingPool =  [];
	this.fitnessWeight = 100;
	
	if(rocketPool)
	{
		this.rockets = rocketPool;
	}
	else
	{
		for(var i = 0; i < popSize; i++)
		{
			this.rockets[i] = new Rocket();
		}
	}
	
	
	this.run = function()
	{
		for(var i = 0; i < popSize; i++)
		{
			if(!this.rockets[i].success && !this.rockets[i].crash) {
				this.rockets[i].update();
			}
			this.rockets[i].show();
		}
	}
	
	this.evaluate = function()
	{
		this.matingPool = [];
		var maxFit = 0;
		for(var i = 0; i < popSize; i++)
		{
			this.rockets[i].calcFitness();
			if(this.rockets[i].fitness > maxFit)
			{
				maxFit = this.rockets[i].fitness;
			}
		}
		
		for(var i = 0; i < popSize; i++)
		{
			this.rockets[i].fitness = this.rockets[i].fitness/maxFit;
			
			var n = this.rockets[i].fitness*this.fitnessWeight;
			for(var j = 0; j < n; j++)
			{
				this.matingPool.push(this.rockets[i].dna);
			}
		}	
	}
	
	this.select = function()
	{
		var newRockets = [];
		for(var i = 0; i < popSize; i++)
		{
			var parentA = random(this.matingPool);
			var parentB = random(this.matingPool);
			
			var childrenDNA = parentA.crossover(parentB);
			if(mutation) {
				childrenDNA.mutation();
			}
			newRockets[i] = new Rocket(childrenDNA);
		}
		return new Population(newRockets);
	}
}