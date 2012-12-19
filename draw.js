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
	c.translate(280,80);
	setFS('black',1);
	c.fillRect(0,0,80,80);//next
	c.translate(00,20);
	c.font = "13px 'Press Start 2P'";
	setFS('white',1);
	c.fillText("Next",3,-4);
	drawBlocks(4,4,mb);
	c.restore();
}

function draw(){
	drawBoard();
	drawNext();
	drawMino();
}