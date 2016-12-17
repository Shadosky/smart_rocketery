var population;
var target;
var obstacle;


var count = 0;
var generation = 0;
var points = 0;

var magnitude = 0.2;

var lifeP;
var genP;
var lendP;

// play with those
var lifespan = 400;
var popSize = 50;
var mutation = true;
var useObstacle = true;


function setup() {
    createCanvas(600, 600);
	population = new Population();
	target = new Target();
	if(useObstacle) {
		obstacle = new Obstacle(createVector(150,300), 300, 10);
	} else {
		obstacle = new Obstacle();
	}
	
	lifeP = createP();
	genP = createP();
	lendP = createP();
	
}

function draw() {
    background(51);
	
	obstacle.show();
	target.show();
	population.run();
	
	lendP.html(points+'/'+popSize);
	lifeP.html(count);
	genP.html(generation);
	
	count ++;
	if(count == lifespan) 
	{		
		population.evaluate();
		console.log(population);
		population = population.select();
		generation ++;
		count = 0;
		points = 0;
	}
	
}
