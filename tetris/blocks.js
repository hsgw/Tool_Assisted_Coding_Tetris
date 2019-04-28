var color = ['gray','#33FFFF','green','red','blue','#FF9900','#6600FF','#FFFF00'];

var shape = 
[
	[2,[-1, 0],[ 1, 0],[ 2, 0]],
	[4,[ 0,-1],[ 1,-1],[-1, 0]],
	[4,[-1,-1],[ 0,-1],[ 1, 0]],
	[4,[-1,-1],[-1, 0],[ 1, 0]],
	[4,[ 1,-1],[-1, 0],[ 1, 0]],
	[4,[ 0,-1],[-1, 0],[ 1, 0]],
	[1,[ 0,-1],[ 1,-1],[ 1, 0]]
];

var mino = {
	x : 3,
	y : 0,
	id : 0,
	r : 0,
	next:0,
	next2:0
};

var fTime = 0;
var cl = new Array(4);
var l = 0;
var clAC=0;
var clAID;
var tID;

function nextMino(){
	mino.x = 3;
	mino.y = 0;
	mino.id = mino.next;
	mino.next = mino.next2; 
	mino.next2 = xors.rand(); 
	mino.r = 0;
	
	var mx = calcMx(0,0,0);
	
	for(var i=0;i<4;i++){
		if(board[mx[i][0]][mx[i][1]] != null){
			clearInterval(tID);
			mode = 3;
			gameOver();
			modeTID = setInterval(gameOver,10);
			return false;
		}
	}
	return true;
}

function rotate(r){
	var mx = [
		shape[mino.id][1].concat(),
		shape[mino.id][2].concat(),
		shape[mino.id][3].concat()
	];
	
	if(r == 0){
		return mx;
	}else{
		for(var i=0;i<r;i++){
			var newMx = [[],[],[]];
			for(j=0;j<3;j++){
				newMx[j][0] = mx[j][1]*-1;
				newMx[j][1] = mx[j][0];
			}
			mx = newMx.concat();
		}
		return mx;
	}
}

function calcMx(offsetX,offsetY,r){
	var mx = [[],[],[],[]];
	var rx = rotate(r);	
	for(var i=0;i<3;i++){
		mx[i][0] = rx[i][0] + 1 + mino.x + offsetX;
		mx[i][1] = rx[i][1] + 1 + mino.y + offsetY;
	}
	mx[3][0] = 1 + mino.x + offsetX;
	mx[3][1] = 1 + mino.y + offsetY;
	return mx;
}

function valid(offsetX,offsetY,r){
	var mx = calcMx(offsetX,offsetY,r);	
	for(var i=0;i<4;i++){
		if((mx[i][0] < 0 || mx[i][0] > 9)
		 || (mx[i][1] < 0 || mx[i][1] > 19)
		 || (board[mx[i][0]][mx[i][1]] != null)){
			return false;
		}
	}
	return true;
}

function freeze(){
	if(!valid(0,1,mino.r)){
		if(fTime<=0){
			var mx = calcMx(0,0,mino.r);	
			for(i=0;i<4;i++){
				board[mx[i][0]][mx[i][1]] = mino.id+1;
			}
			if(!searchCL()){
				nextMino();
			}
		}else{
			fTime--;
		}
	}else{
		fTime = 3;
	}
}

function searchCL(){
	cl = new Array(4);
	l = 0;
	
	for(var i = 1;i<21;i++){
		for(var j=0;j<10;j++){
			if(board[j][i] == null) break;
			if(j==9) {
				cl[l] = i;
				l++;
			}
		}
	}
	if(l>0){
		clAC = 1;
		keyF = false;
		clearInterval(tID);
		clAID = setInterval(animateCL,250);
		return true;
	}else{
		return false;
	}
}

function animateCL(){
	if(clAC != 0){
		setFS('black',1);
		for(var i=0;i<l;i++){
				c.fillRect(40,40+cl[i]*20,200,20);
		}
		clAC--;
	}else{
		clearInterval(clAID);
		deleteCL();
		keyF = true;
		clNum = clNum - l;
		if(clNum<=0){
			clNum = 0;
			clearInterval(tID);
			mode = 3;
			gameClear();
			modeTID = setInterval(gameClear,10);
		}
		drawPoint();
	}
}

function deleteCL(){	
	for(var i=0;i<l;i++){
		for(var j=cl[i]; j>1;j--){
			for(var k=0;k<10;k++){
				board[k][j] = board[k][j-1];
			}
		}
		for(var k=0;k<10;k++){
				board[k][1] = undefined;
		}
	}
	tID = setInterval(tick,1000-350*dif);
	nextMino();
	draw();
}

function hardDrop(){
	var dy=0;
	while(valid(0,dy,mino.r)){
		dy++;
	}
	mino.y += dy - 1;
	fTime = 0;
}

function tick(){
	if(valid(0,1,mino.r)){
		mino.y++;
	}else{
		freeze();
	}
	draw();
}

function move(key){
	switch(key){
		case 'u': 
			if(mino.r + 1 >= shape[mino.id][0]){
				if(valid(0,0,0)) mino.r=0;
			}else{
				if(valid(0,0,mino.r+1)) mino.r++;
			}
			mino.next2 = xors.rand();
			break;
		case 'l': 
			if(valid(-1,0,mino.r)) mino.x--;
			mino.next2 = xors.rand();
			break;
		case 'r': 
			if(valid(1,0,mino.r)) mino.x++;
			mino.next2 = xors.rand();
			break;
		case 's': 
			hardDrop();
			break;
		case 'd': 
			if(valid(0,1,mino.r)) mino.y++;
			mino.next2 = xors.rand();
			break;
		default:
			mino.next2 = xors.rand();
			break;
	}
}
