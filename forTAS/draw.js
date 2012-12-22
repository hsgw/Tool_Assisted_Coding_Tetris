function setFS(cN,alpha){
	c.fillStyle = cN;
	c.globalAlpha = alpha;
}

function p3(x1,y1,x2,y2){
	c.beginPath();
	c.moveTo(x1,y1);
	c.lineTo(x2,y2);
	c.lineTo(10,10);
	c.closePath();
	c.fill();
}

function block(colorId){
	setFS(color[colorId],1);
	c.fillRect(0,0,20,20);
	setFS('white',0.6);
	p3(0,0,20,0);
	setFS('white',0.3);
	p3(0,0,0,20);
	setFS('black',0.3);
	p3(20,20,20,0);
	setFS('black',0.5);
	p3(20,20,0,20);
	setFS(color[colorId],1);
	c.fillRect(3,3,14,14);
}

function drawBlocks(x,y,mx){
	for(var i=0;i<x;i++){
		for(var j=0;j<y;j++){				
			if(typeof mx[i][j] != "undefined" ){
				block(mx[i][j]);
			}
			c.translate(0,20);
		}
		c.translate(20,-20*y);
	}
}

function drawBoard(){
	c.save();
	c.translate(40,40);
	setFS('black',1);
	c.fillRect(0,0,200,400); //board
	drawBlocks(10,20,board);
	c.restore();
}

function drawMino(){
	var mb = [[],[],[],[]];
	var mx = rotate(mino.r);
	
	mb[1][1] = mino.id+1;
	for(var i=0;i<3;i++){
		mb[mx[i][0]+1][mx[i][1]+1] = mino.id+1;
	}
	
	c.save();
	c.translate(40+20*mino.x,40+20*mino.y);
	drawBlocks(4,4,mb);
	c.restore();
}

function drawNext(){
	var mb = [[],[],[],[]];
	var mx = shape[mino.next].concat();
	
	mb[1][1] = mino.next+1;
	for(var i=1;i<4;i++){
		mb[mx[i][0]+1][mx[i][1]+1] = mino.next+1;
	}
	
	c.save();
	c.translate(280,100);
	setFS('black',1);
	c.fillRect(0,0,80,80);//next
	c.translate(00,20);
	c.font = "13px 'Press Start 2P'";
	setFS('white',1);
	c.fillText("Next",3,-4);
	drawBlocks(4,4,mb);
	c.restore();
}

function drawNext2(){
	var mb = [[],[],[],[]];
	var mx = shape[mino.next2].concat();
	
	mb[1][1] = mino.next2+1;
	for(var i=1;i<4;i++){
		mb[mx[i][0]+1][mx[i][1]+1] = mino.next+1;
	}
	
	c.save();
	c.translate(280,200);
	setFS('black',1);
	c.fillRect(0,0,80,80);//next
	c.translate(00,20);
	c.font = "13px 'Press Start 2P'";
	setFS('white',1);
	c.fillText("Next",3,-4);
	drawBlocks(4,4,mb);
	c.restore();
}

function drawPoint(){
	c.save();
	c.translate(280,300);
	setFS('black',1);
	c.fillRect(0,0,80,80);
	setFS('white',1);
	c.font = "13px 'Press Start 2P'";
	c.fillText("Line",3,16);
	c.translate(0,55);
	c.font = "40px 'Press Start 2P'";
	c.fillText(clNum,3,16);
	c.restore();
}

function draw(){
	drawBoard();
	drawNext();
	drawNext2();
	drawPoint();
	drawMino();
}

function op(){
	drawBoard();
	c.save();
	c.translate(45,150);
	setFS('white',1);
	c.font = "30px 'Press Start 2P'";
	c.fillText("TETRIS",3,16);
	c.translate(10,50);
	c.font = "11px 'Press Start 2P'";
	c.fillText("press space key",3,16);
	c.restore();
}

function dSelect(){
	drawBoard();
	c.save();
	c.translate(45,150);
	setFS('white',1);
	c.font = "30px 'Press Start 2P'";
	c.fillText("TETRIS",3,16);
	c.translate(10,50);
	c.font = "11px 'Press Start 2P'";
	c.fillText("difficulity",3,16);
	c.translate(70,40);
	c.fillText("HARD",3,16);
	c.translate(0,40);
	c.fillText("NORMAL",3,16);
	c.translate(0,40);
	c.fillText("EASY",3,16);
	c.translate(-50,-40*dif);
	c.fillText(">>>",3,16);
	c.restore();
}

function gameOver(){
	c.save();
	c.translate(80,150);
	setFS('white',1);
	c.font = "30px 'Press Start 2P'";
	c.fillText("GAME",0,0);
	c.fillText("OVER",0,40);
	c.translate(-25,50);
	c.font = "11px 'Press Start 2P'";
	c.fillText("press space key",3,16);
	c.restore();
}

function gameClear(){
	c.save();
	c.translate(80,150);
	setFS('white',1);
	c.font = "30px 'Press Start 2P'";
	c.fillText("GAME",0,0);
	c.fillText("CLEAR",-15,40);
	c.translate(-25,50);
	c.font = "11px 'Press Start 2P'";
	c.fillText("press space key",3,16);
	c.restore();
}