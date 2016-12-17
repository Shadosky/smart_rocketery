function DNA(genes){
	this.genes = [];
	if(genes){
		this.genes = genes;
	} else {
		for(var i = 0; i <= lifespan; i++)
		{
			this.genes[i] = p5.Vector.random2D();
			this.genes[i].setMag(magnitude);
		}
	}
	
	
	this.crossover = function(otherDna)
	{
		var cut = floor(random(this.genes.length));
			
		var newgenes = [];
		for(var j=0; j < this.genes.length; j++)
		{
			if(j < cut)
			{
				newgenes[j] = this.genes[j];
			}else
			{
				newgenes[j] = otherDna.genes[j];
			}
		}
		return new DNA(newgenes);
	}
	
	this.mutation = function ()
	{
		for(var i = 0; i <= lifespan; i++)
		{
			if(random(1) < 0.01) {
				this.genes[i] = p5.Vector.random2D();
				this.genes[i].setMag(magnitude);
			}
		}
	}
}