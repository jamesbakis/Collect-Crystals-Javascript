let enemy1 = document.getElementById("enemy1")
let enemy2 = document.getElementById("enemy2")
let enemy3 = document.getElementById("enemy3")
let enemies = [enemy1, enemy2, enemy3]
let player = document.getElementById("player")
let crystal = document.getElementById("crystal")
let score = document.getElementById("score")
let scoreVal = 0;
let dead = false;
let timer = document.getElementById("timer")
let time = 60;
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
        
        if (time <= 0) {
            dead = true;
            timer.textContent = "TIMES UP!!!" + time.toString()
        }
    }
})

setInterval(() => {time--
    if (time < 0) {
        return;
    }
    timer.textContent = "TIME " + time.toString()
    
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
        score.textContent = "SCORE " + scoreVal.toString() + "\nREFRESH PAGE"
    }
}

function spawn() {
    if (crystal.style.top == player.style.top && crystal.style.left == player.style.left) {
        let x = Math.floor(Math.random() * 7);
        let y = Math.floor(Math.random() * 7);

        crystal.style.top = (x * 100).toString() + "px";
        crystal.style.left = (y * 100).toString() + "px";
        scoreVal += 1;
        score.textContent = "SCORE " + scoreVal.toString();
    }
}

