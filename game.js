let enemy1 = document.getElementById("enemy1");
let enemy2 = document.getElementById("enemy2");
let enemy3 = document.getElementById("enemy3");
let enemies = [enemy1, enemy2, enemy3]
let enemy_animation = ["./images/enemy_square_smaller.png", "./images/enemy_square_smaller_smaller.png", ""]
let player = document.getElementById("player");
let crystal = document.getElementById("crystal");
//Enemies, player and crystal

let score = document.getElementById("score");
let scoreVal = 0;
//Score object

let timer = document.getElementById("timer");
let time = 60;
//Timer object

let instruction_heading = document.getElementById("instruction_heading");
//Instruction heading

let crystal_collection = new Audio("./audio/boing.mp3");
let game_over = new Audio("./audio/8_bit_game_over.mp3");
let death = new Audio("./audio/epic_cinematic_explosion.mp3");
let background_music = new Audio("./audio/sneaky_rascal.mp3");

// AUDIO NOT WORKINGS
let enable_audio = document.getElementById("enable_audio");
enable_audio.addEventListener("click", () => {
    background_music.play();
})

let interval_time = 400;
let colour = 0; 
//Alternating colour of instruction heading and crystal   
let colour_interval = setInterval(() => {colour += 1
    if (colour % 3 == 0) {
        instruction_heading.style.color = "red";
        crystal.src = "./images/crystal_square_yellow.png"
    } else if (colour % 3 == 2) {
        instruction_heading.style.color = "green";
        crystal.src = "./images/crystal_square_purple.png"
    } else {
        instruction_heading.style.color = "blue";
        crystal.src = "./images/crystal_square.png"
    }
    
    }, 400)

let dead = false;
let button = document.getElementById("difficulty_button");
//Change how quickly colours alternate

button.addEventListener("click", ()=> {
    if (interval_time == 400) {
        interval_time = 200;
    } else if (interval_time == 200) {
        interval_time = 50;

    } else if (interval_time == 50) {
        interval_time = 25;
    } else {
        interval_time = 400;
    }

    clearInterval(colour_interval)
    colour_interval = setInterval(() => {colour += 1
    if (colour % 3 == 0) {
        instruction_heading.style.color = "red";
        crystal.src = "./images/crystal_square_yellow.png"
    } else if (colour % 3 == 2) {
        instruction_heading.style.color = "green";
        crystal.src = "./images/crystal_square_purple.png"
    } else {
        instruction_heading.style.color = "blue";
        crystal.src = "./images/crystal_square.png"
    }
    
    }, interval_time)
    
})

let touchstartX = 0;
let touchendX = 0;
let touchstartY = 0;
let touchendY = 0;
let diff = 50;

function checkDirection() {
    let top = parseInt(player.style.top); 
    let left = parseInt(player.style.left);
    if (dead) {
        return;
    }
    if (Math.abs(touchendX - touchstartX) > Math.abs(touchendY - touchstartY)) {
        if (touchendX < touchstartX - diff) {
            console.log('Swiped Left');
            if (left == 0) {
                left += 600;    
            } else {
                left -= 100;
            }
            player.style.left = left.toString() + "px";

        } 
        
        if (touchendX > touchstartX + diff)  {
            console.log('Swiped Right');
            if (left == 600) {
                left -= 600;    
            } else {
                left += 100;
            }
            player.style.left = left.toString() + "px";
        }
    } else {
        if (touchendY < touchstartY - diff) {
            console.log('Swiped Up');
            if (top == 0) {
                top += 600;    
            } else {
                top -= 100;
            }
            player.style.top = top.toString() + "px";

        } 
        
        if (touchendY > touchstartY + diff)  {
            console.log('Swiped Down');
            if (top == 600) {
                top -= 600;    
            } else {
                top += 100;
            }
            player.style.top = top.toString() + "px";
        }
    }
    spawn()
    enemyMove();
    for (let i = 0; i < enemies.length; i++) {
        collision(enemies[i]);
    }

    
}

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
    touchstartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    touchendY = e.changedTouches[0].screenY;
    checkDirection();
    
  
});

document.addEventListener('keydown', event=> {
    console.log(event)
    if (dead) {
        return;
    }
    if(event.key.startsWith("Arrow")) {
        
        let top = parseInt(player.style.top); 
        let left = parseInt(player.style.left);
        switch(event.key) {
            case "ArrowUp":
                if (top == 0) {
                    top += 600
                } else {
                    top = top - 100;
                }
                player.style.top = top.toString() + "px";
                break;
            case "ArrowDown":
                if (top == 600) {
                    top = top - 600;
                } else {
                    top = top + 100;
                }
                player.style.top = top.toString() + "px";
                break;
            case "ArrowLeft":
                if (left == 0) {
                    left = left + 600;  
                } else {
                    left = left - 100;        
                }
            
                player.style.left = left.toString() + "px";
                break;
            case "ArrowRight":
                if (left == 600) {
                    left = left - 600;
                } else {
                    left = left + 100;
                }
                player.style.left = left.toString() + "px";
                break;
            default:

        }
        spawn()
        enemyMove();
        for (let i = 0; i < enemies.length; i++) {
            collision(enemies[i]);
        }
        
        
    }
})

setInterval(() => {time--
    if (time < 0) {
        time = 0;
        return;
    }
    timer.textContent = "TIME " + time.toString()
    
    if (time <= 0) {
            dead = true;
            timer.textContent = "TIMES UP!!!";
            game_over.play()
        }

    }, 1000)





function enemyMove() {
    for (let i = 0; i < enemies.length; i++) {
        let pos = Math.floor(Math.random() * 4);
        let top = parseInt(enemies[i].style.top)
        let left = parseInt(enemies[i].style.left)
        if (pos == 0) {
            if (top == 0) {
                top += 600
            } else {
                top = top - 100;
            }
            
            enemies[i].style.top = top.toString() + "px";
        }
        if (pos == 1) {
            if (top == 600) {
                top = top - 600;
            } else {
                top = top + 100;
            }
            
            enemies[i].style.top = top.toString() + "px";
        }
        if (pos == 2) {
            if (left == 0) {
                left = left + 600;    
            } else {
                left = left - 100;
            }

            enemies[i].style.left = left.toString() + "px";
        }
        if (pos == 3) {
            if (left == 600) {
                left = left - 600;
            } else {
                left = left + 100;
            }
            
            enemies[i].style.left = left.toString() + "px";
        }
    }
}

function collision(enemy) {
    if (enemy.style.top == player.style.top && enemy.style.left == player.style.left) {
        player.remove();
        dead = true;
        score.textContent = "SCORE: " + scoreVal.toString() + "\nREFRESH PAGE";
        game_over.play();
        death.play();
        let animation_count = [0,0,0]
        let enemy1animation = setInterval(() => {
                if (animation_count[0] == 2) {
                    clearInterval(enemy1animation)
                }
                enemies[0].src = enemy_animation[animation_count[0]]
                animation_count[0] += 1;
            }, 750);
        let enemy2animation = setInterval(() => {
                if (animation_count[1] == 2) {
                    clearInterval(enemy2animation)
                }
                enemies[1].src = enemy_animation[animation_count[1]]
                animation_count[1] += 1;
            }, 750);
        let enemy3animation = setInterval(() => {
                if (animation_count[2] == 2) {
                    clearInterval(enemy3animation)
                }
                enemies[2].src = enemy_animation[animation_count[2]]
                animation_count[2] += 1;
            }, 750);
    }
}

function spawn() {
    if (crystal.style.top == player.style.top && crystal.style.left == player.style.left) {
        let x = Math.floor(Math.random() * 7);
        let y = Math.floor(Math.random() * 7);

        crystal.style.top = (x * 100).toString() + "px";
        crystal.style.left = (y * 100).toString() + "px";
        scoreVal += 1;
        score.textContent = "SCORE: " + scoreVal.toString();
        crystal_collection.play()
    }
}

