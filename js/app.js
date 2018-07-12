//Creating player and its properties

class Player {
    constructor() {
        this.x = 2;
        this.y = 4.51; //set to 4.51 to solve a spacing issue when moving player
        this.sprite = 'images/char-cat-girl.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 100, this.y * 90);
    }
    //used to move player
    handleInput(input) {
        switch (input) {
            // Sets boundaries for player movement
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
        //counts when player gets to top row, used for increasing levels
        if (this.y <= 0) {
                level += 0.5;
                levelcount += 1;
        }
    }

    //win game when arriving at end point and clear enemies to change enemy speed
    update() {
        this.win();
        checkCollisions();
    }

    //sets position of player when it collides
    lose() {
        this.x = 2;
        this.y = 4.51;
        lives -= 1;
        setTimeout(() => { 
            collision = false}, 400); //chan
        if ($('i').length > 1){
            $('i:eq(0)').remove();
        } else {
            console.log('game over');
        }
    }

    //sets position of player when winning
    win() {
        if (this.y <= 0){
            setTimeout(() => { 
                this.x = 2;
                this.y = 4.51;}, 400);
            allEnemies = []; //resets enemy so new speeds can be used when leveling up
            $('#modal').css("visibility", "visible");
            $('.overlay').css("visibility", "visible");
            $('#level-done').html(levelcount-1);
        }
    }
    
}

//creates player
const player = new Player();
 
//setting up enemy 
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
            this.x += this.speed * dt; 
        }
    }
    
        render() {
            ctx.drawImage(Resources.get(this.sprite), this.x * 100, this.y * 70);
        }
}

//sets game level, it's incremented after each game is completed
let level = 1;
let levelcount = 1;
let lives = $('i').length;
let collision = false; //if a collision has not happened, function set to false

//enemies array
let allEnemies = [];

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


//Game play
//check for collisions between player and enemy
function checkCollisions() {
    if (!collision) {
        for (let i = 0; i < allEnemies.length;i++) {
            if  ((Math.abs(player.y - allEnemies[i].y) > 0 &&
                Math.abs(player.y - allEnemies[i].y) < 0.5 &&
                Math.abs(player.x - allEnemies[i].x) < 0.5)) {
                collision = true;
                console.log('squish');
                setTimeout(() => { 
                    player.lose();}, 400);
                }
        }
    }
};

//this function handles button actions on click
$(document).ready(function(){
    $("button").click(function(){
        createEnemies(); //creates new enemies array
        $('#level').html(levelcount); //updates level on header
        $('#modal').css("visibility", "hidden"); //hides modal
        $('.overlay').css("visibility", "hidden"); //hides overlay
    });
});



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

