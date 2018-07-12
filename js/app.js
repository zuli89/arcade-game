
//variables used to compute game level// 
let level = 1; //sets game level, used below to increment speed by 0.5 after each game is completed
let levelcount = 1; //counts number of levels

//variables used for computing lives//
let lives = $('i').length; 
let hearts = []; 

//game play variables
let collision = false; //if a collision has not happened, set to false
let allEnemies = []; //enemies array

//Creating player and its properties
class Player {
    constructor() {
        this.x = 2;
        this.y = 4.51; //set to 4.51 to solve a spacing issue when moving player
        this.sprite = 'images/char-cat-girl.png';
        this.moving = true; // used later to prevent player from moving when modal appears
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 100, this.y * 90);
    }

    //Player movement 
    handleInput(input) {
        if (this.moving) { 
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
    }

    update() {
        this.win(); //win game when arriving at end point
        checkCollisions();
    }

    win() {
        if (this.y <= 0) { //if player reaches top
            this.x = 2; //immediately returns the player to original posistion
            this.y = 4.51;
            allEnemies = []; //resets enemy array so new speeds can be created when leveling up
            //shows modal
            $('.modal#play-next').css("visibility", "visible"); 
            $('#next-level').focus();
            $('.overlay').css("visibility", "visible");
            $('#level-done').html(levelcount-1); //shows which level was completed
            player.moving = false; //disables user to move player while modal is open
        }
    }

    lose() {
        this.x = 2; //sets player to original position when it collides
        this.y = 4.51;
        lives -= 1; //removes one life
        collision = false // used to stop checking for collisions after one collision is done
        //removes one life up to 5
        if ($('i.fa-heart').length > 1){
            $('i.fa-heart:eq(0)').remove();
        } else { //game over
            allEnemies = [];
            $('.modal#game-over').css("visibility", "visible");
            $('.overlay').css("visibility", "visible");
            $('#play-again').focus();
            player.moving = false;
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


//check for collisions between player and enemy
function checkCollisions() {
    if (!collision) {
        for (let i = 0; i < allEnemies.length;i++) {
            if  ((Math.abs(player.y - allEnemies[i].y) > 0 &&
                Math.abs(player.y - allEnemies[i].y) < 0.5 &&
                Math.abs(player.x - allEnemies[i].x) < 0.6)) {
                collision = true; //
                setTimeout(() => { 
                    player.lose();}, 400);
                }
        }
    }
};

//Restarting Game after game over//

for (i = 0; i < 4; i++) { //creates string with lives icon to replace removed hearts when restarting game
    hearts.push('<i class="fas fa-heart"></i> ');
}

function resetGame(){
    level = 1; //resets level speed
    levelcount = 1; //resets level number
    $('#level').html(levelcount); //updates level in header
    $("span.lives").append(hearts.join('')); //appends lives icon
    createEnemies();
    player.moving = true;
}

//handles modal button actions on click
$(document).ready(function(){
    $("#next-level").click(function(){
        createEnemies(); //creates new enemies array
        $('#level').html(levelcount); //updates level on header
        $('.modal#play-next').css("visibility", "hidden"); //hides modal
        $('.overlay').css("visibility", "hidden"); //hides overlay
        player.moving = true;
    });

    $("#play-again").click(function(){
        $('.modal#game-over').css("visibility", "hidden"); //hides modal
        $('.overlay').css("visibility", "hidden"); //hides overlay
        resetGame();
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

