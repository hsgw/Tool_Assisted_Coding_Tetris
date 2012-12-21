var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

var board = new Array(10);
var mode = 0;
var keyF = true;

var clNum = 4;

var modeTID;

var dif = 1;

function init() {
	//init board
	for(var i=0;i<10;i++){
		board[i] = new Array(21);
		if(i<3||i>6){
			board[i][0] = 0;
		}
	}
	
	clNum = 40;
	nextMino();
	nextMino();
	c.save();
	for(var i=0;i<20;i++){
		for(var j=0;j<24;j++){				
			block(0);
			c.translate(0,20);
		}
	c.translate(20,-480);
	}
	c.restore();
	drawBoard();
	c.fillRect(280,100,80,80);//next
	drawPoint();
	
}

//main
init();
modeTID = setInterval(op,100);

//key
document.body.onkeydown = function( e ) {
    var keys = {
        37: 'l',
		38: 'u',
        39: 'r',
        40: 'd',
        32: 's',
		84: 't'
    };
	if(typeof keys[e.keyCode] != null && keyF){
		switch(mode){
			case 0: //op
				if(keys[e.keyCode] == 's') {
					mode++;
					clearInterval(modeTID);
					dSelect();
				}
				break;
			case 1: //difficulity select
				switch(keys[e.keyCode]){
					case 'u':
						dif++;
						if(dif>2){dif=2;}
						dSelect();
						break;
					case 'd':
						dif--;
						if(dif<0){dif=0;}
						dSelect();
						break;
					case 's':
						mode++;
						nextMino();
						draw();
						tID = setInterval(tick,1000-350*dif);
						break;
					default:
						break;
				}
				break;
			case 2: //game
				move(keys[e.keyCode]);
				freeze();
				draw();
				break;
			case 3:
				if(keys[e.keyCode] == 's') {
					clearInterval(modeTID);
					mode=0;
					init();
					modeTID = setInterval(op,100);
				}
				break;
			default:break;
		}
	}
}