let enemy1 = document.getElementById("enemy1")
let enemy2 = document.getElementById("enemy2")
let enemy3 = document.getElementById("enemy3")
let enemies = [enemy1, enemy2, enemy3]
let enemy_animation = ["./images/enemy_square_smaller.png", "./images/enemy_square_smaller_smaller.png", ""]
let player = document.getElementById("player")
let crystal = document.getElementById("crystal")
let score = document.getElementById("score")
let scoreVal = 0;
let dead = false;
let timer = document.getElementById("timer")
let time = 60;
let yell = new Audio("./audio/yell.mp3")
let game_over = new Audio("./audio/game_over.mp3")
let yoda_death = new Audio("./audio/yoda_death.mp3")
let interval_time = 400;
let colour = 0; 
let instruction_heading = document.getElementById("instruction_heading");   
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

let button = document.getElementById("difficulty_button");

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

function checkDirection() {
    let top = parseInt(player.style.top); 
    let left = parseInt(player.style.left);
    if (touchendX < touchstartX - 50) console.log('Swiped Left');
    if (touchendX > touchstartX + 50) console.log('Swiped Right');
}

document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  checkDirection();
});

document.addEventListener('keydown', event=> {
    console.log(event)
    if (dead) {
        return;
    }
    if(event.key.startsWith("Arrow")) {
        
        
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
        yoda_death.play();
        let animation_count = [0,0,0]
        for (let i = 0; i < enemies.length; i++) {
            let animation_interval = setInterval(() => {
                if (animation_count[2] == 2) {
                    clearInterval(animation_interval)
                }
                enemies[i].src = enemy_animation[animation_count[i]]
                animation_count[i] += 1;
            }, 750);
        }
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
        yell.play()
    }
}

