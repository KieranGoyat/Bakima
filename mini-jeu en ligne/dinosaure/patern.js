function spawn(type) {
	//ensemble des formes de blocks pouvant apparaitrent
	switch(type) {
		case 0: 
			block = new Block(700, 20, 15, 15);
			blocks.push(block);
			break;
			
		case 1: 
			block = new Block(680, 20, 9, 9);
			block.addedToScore = true;
			blocks.push(block);
			block = new Block(700, 20, 9, 9);
			block.addedToScore = true;
			blocks.push(block);
			block = new Block(720, 20, 9, 9);
			blocks.push(block);
			break;
			
		case 2: 
			block = new Block(680, 20, 7, 7);
			block.addedToScore = true;
			blocks.push(block);
			block = new Block(700, 20, 15, 15);
			block.addedToScore = true;
			blocks.push(block);
			block = new Block(720, 20, 7, 7);
			blocks.push(block);
			break;
			
		case 3: 
			block = new Block(700, 20, 21, 21);
			blocks.push(block);
			break;
			
		case 4:
			block = new Block(700, 20, 40, 10);
			blocks.push(block);
			break;
			
		default:
			block = new Block(700, 20, 10, 10);
			blocks.push(block);
	}
}