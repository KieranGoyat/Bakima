function ball(x, y, d) {
	this.pos = createVector(x, y);
	this.vel = createVector(0, 0);
	this.d = d
	this.r = d/2;
	this.speed = 5;
	// this.vel.setMag(this.speed);
	console.log(this.vel);
	
	this.update = function() {
		this.pos.add(this.vel);
		
		//rebond sur les bords haut et bas
		if(this.pos.y - this.r < 0 || this.pos.y + this.r > height) {
			this.vel.y = - this.vel.y;
		}
		
		//rebond sur les bars
		for(i=0; i < bars.length; i++) {
			bar = bars[i];
			//pour chaque bar
			
			//gestion des collisions
			var left = bar.pos.x;
			var right = bar.pos.x + bar.width;
			var up = bar.pos.y;
			var bottom = bar.pos.y + bar.height;
			var center_height = bar.pos.y + bar.height/2;
			var x = this.pos.x;
			var y = this.pos.y;
		
			var dLeft = abs(x - left);
			var dRight =  abs(x - right);
			var dUp = abs(y - up);
			var dBottom = abs(y - bottom);
		
			if ((dRight < this.r || dLeft < this.r) && y > up && y < bottom) {
				if(dRight < this.r) {
					this.pos.x = right + this.r;
					console.log("right")
				} else {
					console.log("left");
					this.pos.x = left - this.r;
				}
				
				this.vel.x = - this.vel.x;
				var angle = center_height - y;
				this.vel.y = -angle/10;
				this.vel.setMag(this.speed);
				// console.log(this.vel.y);
			}
			if ((dBottom < this.r || dUp < this.r) && (x > left - this.r && x < right + this.r)) {
				if(dBottom < this.r) {
					this.pos.y = bottom + this.r;
					console.log("bottom")
				} else {
					this.pos.y = up - this.r;
					console.log("up");
				}
				this.vel.y = - this.vel.y;
			}
		}
		
		//gagner perdu
			if(this.pos.x - this.r < 0 ){
				//joueur 2 gagne
				scorePlayer2++;
				this.resetBall();
			} else if(this.pos.x + this.r > width) {
				//joueur 1 gagne
				scorePlayer1++;
				this.resetBall();
			}
			
		this.speed *= 1.0005;
	}	
	
	//affichage de la balle
	this.show = function() {
		rectMode(CENTER);
		rect(this.pos.x, this.pos.y, d, d);
		rectMode(CORNER);
	}
	
	//remise en place de la balle
	this.resetBall = function() {
		ball.pos.x = width/2;
		ball.pos.y = height/2;
		ball.speed = 5;
		ball.vel = createVector(0, 0);
		time = getTime(); //recuperation du temps a la victoire
	
		wait = true;
	}
}