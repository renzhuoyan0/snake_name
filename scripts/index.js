window.onload = function(){
	var snake = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	var LEFT =37, RIGHT = 39, UP = 38, DOWN = 40;
	var dd = RIGHT;
	var dict = {};
	var isInSnake = function(x,y){
		for(var i =0;i<snake.length;i++){
			if(snake[i].x == x && snake[i].y ==y){return true;}
		}
		return false;
	};
	var dropFood = function(){
		var x = Math.floor(Math.random()*10),
	    y = Math.floor(Math.random()*10);
	    if(snake.length ==100){
	    	game_over.style.display = 'block';
	    	box.style.display = 'none';
			game_over.innerHTML='你赢了';
	    }
	    while(isInSnake(x,y)){
		   	x = Math.floor(Math.random()*10),
	    	y = Math.floor(Math.random()*10);	
		   }
		   document.getElementById( x+'_'+y).style.backgroundImage = 'url(./2.png)';
		   document.getElementById( x+'_'+y).style.backgroundSize = 'cover';
		   // document.getElementById(snake[i].x+'_'+snake[i].y).style.backgroundImage = 'url(./1.png)';
		   return {foodx:x,foody:y};
	};
	var food = dropFood();
	var drawSnake = function(){
		for(i=0;i<snake.length;i++){
			
			document.getElementById(snake[i].x+'_'+snake[i].y).style.backgroundImage = 'url(./4.png)';
			document.getElementById(snake[i].x+'_'+snake[i].y).style.backgroundSize = 'cover';
		};
		document.getElementById(snake[snake.length-1].x+'_'+snake[snake.length-1].y).style.backgroundImage = 'url(./3.png)';
		document.getElementById(snake[snake.length-1].x+'_'+snake[snake.length-1].y).style.backgroundSize = 'cover';
		// document.getElementById(snake[snake.length-1].x+'_'+snake[snake.length-1].y).style.marginLeft = '-4px';
		document.getElementById(snake[0].x+'_'+snake[0].y).style.backgroundImage = 'url(./6.png)';
		document.getElementById(snake[0].x+'_'+snake[0].y).style.backgroundSize = 'cover';
	}
	drawSnake();

	zou = function(){
		var newHead;
		var last = snake.length-1;
		
		if(dd ==RIGHT)
		{
			newHead = {x:snake[last].x,y:snake[last].y+1};
			if(newHead.x>9 ||newHead.x<0 ||newHead.y>9 ||newHead.y<0){
				game_over.style.display = 'block';
				box.style.display = 'none';
				game_over.innerHTML='你输了';
				return null;
			}
			document.getElementById(newHead.x+'_'+newHead.y).style.transform="rotateZ(0deg)";

		}
		if(dd ==LEFT)
		{
			newHead = {x:snake[last].x,y:snake[last].y-1};
			if(newHead.x>9 ||newHead.x<0 ||newHead.y>9 ||newHead.y<0){
				game_over.style.display = 'block';
				box.style.display = 'none';
				game_over.innerHTML='你输了';
				return null;
			}
			document.getElementById(newHead.x+'_'+newHead.y).style.transform="rotateZ(180deg)";
		}
		if(dd ==UP)
		{
			newHead = {x:snake[last].x-1,y:snake[last].y};
			if(newHead.x>9 ||newHead.x<0 ||newHead.y>9 ||newHead.y<0){
				game_over.style.display = 'block';
				box.style.display = 'none';
				game_over.innerHTML='你输了';
				return null;
			}
			document.getElementById(newHead.x+'_'+newHead.y).style.transform="rotateZ(-90deg)";
		}
		if(dd ==DOWN)
		{
			newHead = {x:snake[last].x+1,y:snake[last].y};
			if(newHead.x>9 ||newHead.x<0 ||newHead.y>9 ||newHead.y<0){
				game_over.style.display = 'block';
				box.style.display = 'none';
				game_over.innerHTML='你输了';
				return null;
			}
			document.getElementById(newHead.x+'_'+newHead.y).style.transform="rotateZ(90deg)";
			
		}
		if(newHead.x>9 ||newHead.x<0 ||newHead.y>9 ||newHead.y<0){
			game_over.style.display = 'block';
			box.style.display = 'none';
			game_over.innerHTML='你输了';
		}
		if(isInSnake(newHead.x,newHead.y)){
			game_over.style.display = 'block';
			box.style.display = 'none';
			game_over.innerHTML='你输了';
		}
		if(newHead.x == food.foodx && newHead.y == food.foody){
			snake.push(newHead);
			var tmp = document.getElementById(food.foodx+'_'+food.foody);
			tmp.style.backgroundImage = 'url(./3.png)';
			document.getElementById(snake[snake.length-2].x+'_'+snake[snake.length-2].y).style.backgroundImage = 'url(./4.png)';
			food = dropFood();
			return null;
		}
		var weiba = snake.shift();
		snake.push(newHead);
		for(i=0;i<snake.length;i++){
			
			document.getElementById(snake[i].x+'_'+snake[i].y).style.backgroundImage = 'url(./4.png)';
		};
		document.getElementById(snake[0].x+'_'+snake[0].y).style.backgroundImage = 'url(./6.png)';
		document.getElementById(weiba.x+'_'+weiba.y).style.background='none';
		document.getElementById(newHead.x+'_'+newHead.y).style.backgroundImage = 'url(./3.png)';

		return null;
	}
	var t;
	var sudu = 1000;
	document.onkeydown = function(e){
		if(!kaiguan1){
			clearInterval(t);	
			var d = e.keyCode;
			if(d ==LEFT || d==UP||d==RIGHT||d==DOWN){
				if(Math.abs(d-dd) !== 2){
					dd = d;
				}else{
					dd = dd;
				}
				zou();
				t = setInterval(zou,sudu);
				console.log(sudu)	
			}
		}else{
			clearInterval(t);
		}
		
	
	}
	
	
	

	button1.onclick = function(){
		main.style.display='none';
		changjing.style.display='block';		
	}
	var kaiguan1 = true;
	button_stop.onclick = function(){
		if(kaiguan1){
			button_stop.innerHTML = '暂停';
			t = setInterval(zou,sudu);
			kaiguan1 = false;
		}else{
			button_stop.innerHTML = '开始';
			clearInterval(t);
			kaiguan1 = true;
		}
		
	}
	button_back.onclick = function(){
		location.reload();
	}
	button_choose.onclick = function(){
		clearInterval(t);
		kaiguan1 = true;
		button_stop.innerHTML = '开始';
		box.style.display ='none';
		box1.style.display ='block';
		for(i=0;i<snake.length;i++){

			document.getElementById(snake[i].x+'_'+snake[i].y).style.backgroundImage = 'none';
		}
		snake = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
		newHead={};
		drawSnake();
		dd=RIGHT;
	}
	button_c1.onclick = function(){
		box.style.display ='block';
		box1.style.display ='none';
		sudu = 800;
		
	}
	button_c2.onclick = function(){
		box.style.display ='block';
		box1.style.display ='none';
		sudu = 500;
	}
	button_c3.onclick = function(){
		box.style.display ='block';
		box1.style.display ='none';
		sudu = 300;
		
	}
	game_over.onclick = function(){
		game_over.style.display = 'none';
		box.style.display = 'block';
		clearInterval(t);
		kaiguan1 = true;
		button_stop.innerHTML = '开始';
		for(i=0;i<snake.length;i++){

			document.getElementById(snake[i].x+'_'+snake[i].y).style.backgroundImage = 'none';
		}
		snake = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
		newHead={};
		drawSnake();
		dd=RIGHT;
		
	}

	

	button2.onclick = function(){
		shuoming.style.display='block';
		title.style.display='block';
		sure.style.display='block';
		jieshao.style.display='block';
		title.innerHTML = '游戏说明';
		sure.onclick = function(){
			shuoming.style.display='none';
			title.style.display='none';
			sure.style.display='none';
			jieshao.style.display='none';
		}
	}
	button3.onclick = function(){
		shuoming.style.display='block';
		title.style.display='block';
		sure.style.display='block';
		jilu.style.display='block';
		title.innerHTML = '最高分';
		sure.onclick = function(){
			shuoming.style.display='none';
			title.style.display='none';
			sure.style.display='none';
			jilu.style.display='none';
		}
	}



	// var weizhi = {x:'',y:''};
	// var dianming  =function(){
	
	// var x = Math.floor(Math.random()*5);
	// var y = Math.floor(Math.random()*10);
	// if(x!=2||y!=0){
	// 	weizhi.x=x;
	// 	weizhi.y=y;
	// 	return weizhi;
	// }
	// else{
	// 	return dianming();
	// }
	// }
	// console.log(dianming(weizhi));



	// var arr  = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	// var fn = function(){
	// 	arr.shift();
	// 	var c = {};
	// 	c.x= arr[arr.length-1].x;
	// 	c.y = arr[arr.length-1].y+1;
	// 	arr.push(c);	
	// };
	// fn();
	// console.log(arr);


	//清除setInterval;
	// var t = setInterval(aa,1000);
	// clearInterval(t);



	// var kaiguan = true;
	// document.onclick =function(){
	// 	if(kaiguan){
	// 		alert(1);kaiguan = false;
	// 	}else{
	// 		alert(2);kaiguan = true;
	// 	}
	// }

	// var o = {
	// 	d:7,
	// 	fn:function(){
	// 		var fn = function(){
	// 			console.log(this.d,arguments);
	// 		}
	// 		fn.apply(this,[this])
	// 	}
	// }
	// o.fn.apply({a:1,b:2,d:3});
	// var fn = (function(){
	// 	var li = 0;
	// 	return function(){
	// 		li +=1;
	// 		if(li>3) return false;
	// 		return '-';
	// 	}
		
	// })()
	// for(var i=0;i<10;i++){
	// 	console.log(fn());
	// }

	// Object.prototype.create = function(o){
	// 	var f = function(){};
	// 	f.prototype = o;
	// 	return new f();
	// }
	// var a = {
	// 	b:1,
	// 	c:function(){}
	// }
	// var no = Object.create(a);
	// no.c = 3;





}
