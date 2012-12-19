var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

var board = new Array(10);
var mode = 0;
var keyF = true;

function init() {
	//init board
	for(var i=0;i<10;i++){
		board[i] = new Array(21);
		if(i<3||i>6){
			board[i][0] = 0;
		}
	}
	
	c.save();
	for(var i=0;i<20;i++){
		for(var j=0;j<24;j++){				
			block(0);
			c.translate(0,20);
		}
	c.translate(20,-480);
	}
	c.restore();
}

//main
init();
draw();
tID = setInterval(tick,400);

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
		move(keys[e.keyCode]);
		freeze();
		draw();
	}
}