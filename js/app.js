

//Creating player and its properties

class Player {
    constructor() {
        this.x = 2;
        this.y = 4.51; //set to 4.5 to solve a spacing issue when moving player
        this.sprite = 'images/char-boy.png';
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

        if (this.y <= 0) {
                level += 1;
                console.log(level);

        }
        //this.moving = true; //player is moving
    }
    //win game when arriving at end point and clear enemies to change enemy speed
    update() {
        checkCollisions();
        this.win();
    }

    lose() {
        this.x = 2;
        this.y = 4.51;
    }

    win() {
        if (this.y <= 0){
            setTimeout(() => { 
                this.x = 2;
                this.y = 4.51;}, 400);
            allEnemies = [];
            createEnemies();
        }
    }
    
}


function checkCollisions() {
        for (let i = 0; i < allEnemies.length;i++) {
            if  ((Math.abs(player.y - allEnemies[i].y) > 0 &&
                Math.abs(player.y - allEnemies[i].y) < 0.5 &&
                Math.abs(player.x - allEnemies[i].x) < 0.2)) {
                console.log('squish');
                player.lose();
                } 
        }
};

class Enemy {
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update(dt) {
        this.leftGameX =  this.x > 5; 
        this.leftGameY =  this.y < 1;
        if (this.leftGameX) {
            this.x = -1;
        } else {
            this.x += this.speed * dt; //change this to make it go at dif speeds?
        }
    }
    
        render() {
            ctx.drawImage(Resources.get(this.sprite), this.x * 100, this.y * 70);
        }
}


//sets game level, it's incremented after each game is completed
let level = 1;

//creates player
const player = new Player();
 
//enemies array
let allEnemies = [];

//let allEnemies = [...Array(3)].map((_,i) => new Enemy(0, i+1,  1 + Math.random() * 2));

createEnemies();

function createEnemies() {
    // creates an array of three bugs, one on each y axis cell
    for (let i=1; i < 4; i++) {
        let x = -1;
        let y =  i;
        let speed = 1 + Math.random() * level;
        allEnemies.push(new Enemy(x, y, speed));
    }
    // adds two more bugs, randomnly placed along y axis
    for (let i=0; i < 2; i++) {
        let x = -2;
        let y =  Math.floor((Math.random() * 3) + 1);
        let speed = 1 + Math.random() * level;
        allEnemies.push(new Enemy(x, y, speed));
    } 
};

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
