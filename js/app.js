

//creates a parent class for the player and enemy that includes their shared properties
class Creature { 
    constructor() {
        this.sprite = 'images/';
        this.x = 2;
        this.y = 5;
    }

    update(dt) {
        this.leftBoardX =  this.x > 5;
        this.leftBoardY =  this.y < 1;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 100, this.y * 74);
    }


}

class Player extends Creature {
    constructor() {
        super();
        this.sprite += 'char-boy.png';
    }

    handleInput(){
        
    }

}

class Enemy extends Creature {
    constructor(x, y) {
        super();
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = 1 + Math.random() * 3.; //sets speeds
    }

    update(dt) {
        super.update();
        if (this.leftBoardX) {
            this.x = -1;
        } else {
            this.x += this.speed * dt; //change this to make it go at dif speeds?
        }
    }
}

const player = new Player();
//NEED TO FIGURE THIS OUT and make it my own 
const allEnemies = [...Array(3)].map((_,i) => new Enemy(0, i+1));


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
