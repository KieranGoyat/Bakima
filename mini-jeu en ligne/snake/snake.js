function Snake() {
	this.body = [];
	
	var head = new Body(Math.floor(cols/2), Math.floor(lines/2));
	this.body.push(head);
	var parent = head;
	
	
	for(i=0; i < snakeLenght-1; i++) {
		var body = new Body(parent.x, parent.y);
		this.body.push(body);
		
		parent = body;
	}
	
	//afficher le serpent
	this.show = function() {
		for(i=1; i < snakeLenght; i++) {
			this.body[i].show();
		}
	}
	
	//afficher la tete
	this.showHead = function() {
		var x = this.body[0].x*cellSize+0.5*cellSize;
		var y = this.body[0].y*cellSize+0.5*cellSize;	
		fill(50,200,50);
		noStroke();
		ellipse(x, y, cellSize, cellSize);
	}
	
	//deplacer le serpent
	this.move = function(sens) {
		if(sens != -1) {//si le sens est defini
			
		//on deplace la tete
		var head = this.body[0];
		if(sens == 0) {
			//up
			head.y--;
		} else if (sens == 1) {
			//right
			head.x++;
		} else if (sens == 2) {
			//bottom
			head.y++;
		} else if (sens == 3) {
			//left
			head.x--;
		}
		
		//le corps suit la tete
		var parent = head;
		for(i=1; i < snakeLenght; i++) {
			var body = this.body[i]
			body.follow(parent);
			parent = body;
		}
		
		//on verifie que le serpent ne se touche pas lui meme
		for(i=1; i < snakeLenght; i++) {
			var body = this.body[i];
			if(head.x == body.x && head.y == body.y ) {
				gameOver();
			}
		}
		
		//on verifie qu'il ne touche pas les bords
		if(head.x < 0 || head.x > cols-1 || head.y < 0 || head.y > lines-1) {
			gameOver();
		}
		
		//on verifie s'il mange la pomme
		if(head.x == apple.x && head.y == apple.y ) {
			parent = this.body[this.body.length-1];
			var body = new Body(parent.x, parent.y);
			this.body.push(body);
			snakeLenght++;
			score++;
			if(score > highScore) {
				highScore = score;
				// document.cookie = "highscore=" + highScore;
				setCookie("highscore", highScore, 10);
			}
			
			//si la pomme est mangé on en crée une autre
			apple = new Apple();
		}
		
	//fin deplacement	
	}}
	
}

//fonction pour creer la pomme
function Apple() {
	
	do{
	var appleOnBody = false;	
	this.x = Math.floor((Math.random() * cols));
	this.y = Math.floor((Math.random() * lines));
	
	//on verifie que la pomme n'est pas sur le serpent
	for(i=0; i < snakeLenght; i++) {
		var body = snake.body[i];
		if(this.x == body.x && this.y == body.y){
			appleOnBody = true;
		}
	}} while(appleOnBody);

	//afficher la pomme
	this.show = function() {
		var x = this.x*cellSize+0.5*cellSize;
		var y = this.y*cellSize+0.5*cellSize
		
		noStroke();
		fill(200, 50, 50);
		ellipse(x, y, cellSize, cellSize);
	}
}



