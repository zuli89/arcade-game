

//creates a parent class for the player and enemy that includes their shared properties
class Creature { 
    constructor() {
        this.sprite = 'images/';

    }

    update(dt) {  //determines if image has left game window
        this.leftGameX =  this.x > 5; 
        this.leftGameY =  this.y < 1;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 100, this.y * 70);
    }


}

class Player extends Creature {
    constructor() {
        super();
        this.x = 2;
        this.y = 4.5; //set to 4.5 instead of 5 to solve a spacing issue when moving player
        this.sprite += 'char-boy.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 100, this.y * 90);
    }

    handleInput(input) {
        switch (input) {
            // Set boundaries for player movement
            case 'left':
                this.x = this.x > 0 ? this.x - 1 : this.x;
                break;
            case 'up':
                this.y = this.y > 0 ? this.y - 1 : this.y;
                break;
            case 'right':
                this.x = this.x < 4 ? this.x + 1 : this.x;
                break;
            case 'down':
                this.y = this.y < 4.5 ? this.y + 1 : this.y;
                break;
            default:
                break;
        }
        this.moving = true; //player is moving

        
        if (this.y <= 0){
            level += 1;
            setTimeout(() => { 
                this.x = 2;
                this.y = 4.5;}, 400);
        }
    }

}
//sets game level, it's incremented after each game is completed
let level = 1;

class Enemy extends Creature {
    constructor(x, y, speed) {
        super();
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = 1 + Math.random() * level; //sets speeds
    }

    update(dt) {
        super.update();
        if (this.leftGameX) {
            this.x = -1;
        } else {
            this.x += this.speed * dt; //change this to make it go at dif speeds?
        }
            }
}

 

//creates player
const player = new Player();
//NEED TO FIGURE THIS OUT and make it my own 

// place enemies in an array 
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
