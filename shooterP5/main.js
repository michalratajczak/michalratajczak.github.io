var $8zHUo$p5 = require("p5");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

class $3d24867cd0334f1e$export$1d8b9ae22d404866 {
    constructor(p5, speed, size, position, health){
        this._p5 = p5;
        this.speed = speed;
        this.size = size;
        this.position = position;
        this.color = p5.color(80);
        this.health = health;
        this.maxHealth = health;
    }
    move(v) {
        this.position.add(v.mult(this.speed));
    }
    draw() {
        //body
        this._p5.strokeWeight(2);
        this._p5.fill(this.color);
        this._p5.circle(this.position.x, this.position.y, this.size);
        //health
        this._p5.textSize(16);
        this._p5.fill(0);
        const healthText = Math.round(this.health / this.maxHealth * 100) + '%';
        this._p5.text(healthText, this.position.x - this._p5.textWidth(healthText) / 2, this.position.y + 7);
    }
}


class $48556299f068fa56$export$6d56a3d7dae357c {
    constructor(p5, maxAmmo, reloadingTime, weaponSpeed, damage){
        this._p5 = p5;
        this.maxAmmo = maxAmmo;
        this.ammo = maxAmmo;
        this.reloadingTime = reloadingTime;
        this.weaponSpeed = weaponSpeed;
        this._shots = [];
        this.damage = damage;
    }
    shot(target, position) {}
    draw(position, unitSize) {}
    attack(position) {
        if (!this._isReloading && this.ammo > 0) {
            const target = this._p5.createVector(this._p5.mouseX, this._p5.mouseY);
            this.shot(target, position);
            this.ammo--;
        }
        if (this.ammo <= 0) this.reload();
    }
    reload() {
        if (!this._isReloading) {
            this._isReloading = true;
            const timeout = setTimeout(()=>{
                this.ammo = this.maxAmmo;
                this._isReloading = false;
                clearTimeout(timeout);
            }, this.reloadingTime / this._p5.frameRate() * 100);
        }
    }
    isReloading() {
        return this._isReloading;
    }
    getMaxAmmo() {
        return this.maxAmmo;
    }
    getAttacks() {
        return this._shots;
    }
    dealDamage(enemy, attack) {
        enemy.health -= this.damage;
        this._shots.splice(this._shots.indexOf(attack), 1);
    }
}


class $55f8de01b6c61982$export$df1739ff5943c5c5 extends $48556299f068fa56$export$6d56a3d7dae357c {
    constructor(p5){
        super(p5, 9, 600, 8, 5);
    }
    shot(target, position) {
        const gun = target.sub(position).normalize();
        const shot = position.copy().add(gun);
        this._shots.push({
            position: position,
            vector: gun.copy().normalize().mult(this.weaponSpeed),
            attack: shot.copy()
        });
    }
    _drawBullets() {
        const shotsToDelete = [];
        for (let s of this._shots){
            s.attack.add(s.vector);
            if (Math.abs(s.attack.x) > this._p5.width || Math.abs(s.attack.y) > this._p5.height) shotsToDelete.push(s);
            else this._p5.circle(s.attack.x, s.attack.y, 3);
        }
        for (let s1 of shotsToDelete){
            const idx = this._shots.indexOf(s1);
            this._shots.splice(idx, 1);
        }
    }
    draw(position, unitSize) {
        this._drawBullets();
        const target = this._p5.createVector(this._p5.mouseX, this._p5.mouseY);
        const gun = target.sub(position).normalize().mult(unitSize + 10).add(position);
        this._p5.stroke(0);
        this._p5.strokeWeight(5);
        this._p5.line(position.x, position.y, gun.x, gun.y);
    }
}


class $aeaac147d31ada5b$export$887967f05dc521ae extends $3d24867cd0334f1e$export$1d8b9ae22d404866 {
    constructor(p5, speed, size, position, health){
        super(p5, speed, size, position, health);
        this.color = p5.color(130, 40, 0);
        this.weapon = new $55f8de01b6c61982$export$df1739ff5943c5c5(p5);
    }
    getMoveDirection() {
        const v = this._p5.createVector(0, 0);
        if (this._p5.keyIsDown(87)) v.y -= 1;
        if (this._p5.keyIsDown(83)) v.y += 1;
        if (this._p5.keyIsDown(65)) v.x -= 1;
        if (this._p5.keyIsDown(68)) v.x += 1;
        return v;
    }
    draw() {
        this.weapon.draw(this.position, this.size / 2);
        this._p5.strokeWeight(2);
        this._p5.fill(this.color);
        this._p5.circle(this.position.x, this.position.y, this.size);
    }
    attack() {
        this.weapon.attack(this.position);
    }
    reload() {
        this.weapon.reload();
    }
}


class $3a4ae273b2d4d792$export$3df3c878e47daeb9 {
    draw(p5, hero, score) {
        p5.fill(0);
        p5.textSize(24);
        p5.text('AMMO:', 20, p5.windowHeight - 20);
        p5.text(`SCORE: ${score}`, 20, 40);
        const maxAmmo = hero.weapon.getMaxAmmo();
        const ammo = hero.weapon.ammo;
        for(let i = 1; i <= maxAmmo; i++){
            if (i > ammo) p5.noFill();
            p5.rect(90 + 20 * i, p5.windowHeight - 45, 13, 30);
        }
    }
}



class $ee5aec8d9d17bd1f$export$6e8a1450080785fb extends $3d24867cd0334f1e$export$1d8b9ae22d404866 {
    constructor(p5, speed, size, position, health){
        super(p5, speed, size, position, health);
        this.color = p5.color(50, 150, 0);
    }
}


const $85664b529b2d7b1e$var$enemyService = ()=>{
    const spawnEnemy = (p5, enemies, hero)=>{
        if (p5.frameCount % 120 === 0) {
            const outerSide = p5.random([
                'x',
                'y'
            ]);
            let x, y;
            if (outerSide === 'x') {
                x = p5.random(0, 1) > 0.5 ? p5.windowWidth + 100 : -100;
                y = p5.random(0, p5.windowHeight);
            } else {
                x = p5.random(0, p5.windowWidth);
                y = p5.random(0, 1) > 0.5 ? p5.windowHeight + 100 : -100;
            }
            enemies.push(new $ee5aec8d9d17bd1f$export$6e8a1450080785fb(p5, 1, 50, p5.createVector(x, y), 30));
        }
    };
    const moveEnemies = (enemies, hero)=>{
        const enemiesToAbsorb = [];
        for (const enemy of enemies){
            const v = hero.position.copy().sub(enemy.position).normalize().mult(enemy.speed);
            enemy.position.add(v);
            for (const other of enemies){
                if (enemy === other) continue;
                if (enemiesToAbsorb.some((e)=>e.absorbed === enemy
                )) continue;
                if (other.size > enemy.size) continue;
                if (enemy.position.dist(other.position) < enemy.size / 2 - other.size / 4) {
                    enemy.health += other.health;
                    enemy.maxHealth += other.maxHealth;
                    enemiesToAbsorb.push({
                        grow: enemy,
                        absorbed: other
                    });
                }
            }
        }
        for (const x of enemiesToAbsorb){
            x.grow.size += 5;
            x.speed *= 0.90;
            enemies.splice(enemies.indexOf(x.absorbed), 1);
        }
    };
    const drawEnemies = (enemies)=>{
        for (const enemy of enemies)enemy.draw();
    };
    const calculateDamage = (enemies, hero)=>{
        if (enemies.some((e)=>hero.position.dist(e.position) < e.size / 2 + hero.size / 2
        )) throw new Error("GAME OVER");
        const deadEnemies = [];
        for (const enemy of enemies){
            for (const attack of hero.weapon.getAttacks())if (enemy.position.dist(attack.attack) < enemy.size / 2) {
                hero.weapon.dealDamage(enemy, attack);
                if (enemy.health <= 0) deadEnemies.push(enemy);
            }
        }
        for (let enemy1 of deadEnemies)enemies.splice(enemies.indexOf(enemy1), 1);
        return deadEnemies.length;
    };
    return {
        spawnEnemy: spawnEnemy,
        moveEnemies: moveEnemies,
        drawEnemies: drawEnemies,
        calculateDamage: calculateDamage
    };
};
var $85664b529b2d7b1e$export$2e2bcd8739ae039 = $85664b529b2d7b1e$var$enemyService;


class $d1f5a944c3cce055$export$b19c5de2fd1b675d {
    constructor(p5){
        this.p5 = p5;
        this.isInitialized = false;
    }
    init = ()=>{
        if (!this.isInitialized) {
            this.hero = new $aeaac147d31ada5b$export$887967f05dc521ae(this.p5, 2.5, 30, this.p5.createVector(this.p5.windowWidth / 2, this.p5.windowHeight / 2), 1);
            this.enemies = [];
            this.hud = new $3a4ae273b2d4d792$export$3df3c878e47daeb9();
            this.score = 0;
            this.isInitialized = true;
        }
    };
    draw = ()=>{
        try {
            const es = $85664b529b2d7b1e$export$2e2bcd8739ae039();
            const heroDirection = this.hero.getMoveDirection();
            this.hero.move(heroDirection);
            es.spawnEnemy(this.p5, this.enemies, this.hero);
            es.moveEnemies(this.enemies, this.hero);
            this.score += es.calculateDamage(this.enemies, this.hero);
            es.drawEnemies(this.enemies);
            this.hero.draw();
            this.hud.draw(this.p5, this.hero, this.score);
        } catch (e) {
            if (e.message === 'GAME OVER') {
                const error = new Error(this.score.toString());
                error.name = 'GAME OVER';
                throw error;
            }
        }
    };
    keyPressed = ()=>{
        if (this.p5.keyCode === 82) this.hero.reload();
    };
    mouseClicked = ()=>{
        this.hero.attack();
    };
}


class $515150850bd53007$export$5fe8222595b01ed2 {
    constructor(p5){
        this.p5 = p5;
    }
    init = ()=>{};
    draw = ()=>{
        this.p5.strokeWeight(0);
        this.p5.textSize(80);
        this.p5.textStyle(this.p5.BOLD);
        this.p5.fill(this.p5.color(130, 40, 0));
        const title = 'ShooterP5';
        this.p5.text(title, this.p5.windowWidth / 2 - this.p5.textWidth(title) / 2, this.p5.windowHeight / 4);
        this.p5.textStyle(this.p5.NORMAL);
        this.p5.textSize(30);
        this.p5.fill(20);
        const controlsMoving = 'Moving:   [W] [A] [S] [D]';
        this.p5.text(controlsMoving, this.p5.windowWidth / 2 - this.p5.textWidth(controlsMoving) / 2, this.p5.windowHeight / 2);
        const controlsMouse = 'Shooting:   Left Mouse Button';
        this.p5.text(controlsMouse, this.p5.windowWidth / 2 - this.p5.textWidth(controlsMouse) / 2, this.p5.windowHeight / 2 + 40);
        const controlsReloading = 'Reloading:   [R]';
        this.p5.text(controlsReloading, this.p5.windowWidth / 2 - this.p5.textWidth(controlsReloading) / 2, this.p5.windowHeight / 2 + 80);
        this.p5.textStyle(this.p5.NORMAL);
        this.p5.textSize(40);
        const menuText = `Press [ SPACE ] to start game`;
        this.p5.text(menuText, this.p5.windowWidth / 2 - this.p5.textWidth(menuText) / 2, this.p5.windowHeight * 3 / 4);
    };
    keyPressed = ()=>{
        if (this.p5.keyCode === 32) {
            const error = new Error();
            error.name = 'GAME';
            throw error;
        }
    };
    mouseClicked = ()=>{};
}


class $8a50726fe39a4ae0$export$7e5333f99680078 {
    constructor(p5, result){
        this.p5 = p5;
        this.result = parseInt(result);
    }
    init = ()=>{};
    draw = ()=>{
        this.p5.strokeWeight(5);
        this.p5.textSize(60);
        this.p5.fill(60);
        const resultText = `Your result: ${this.result}!`;
        this.p5.text(resultText, this.p5.windowWidth / 2 - this.p5.textWidth(resultText) / 2, this.p5.windowHeight / 3);
        this.p5.strokeWeight(0);
        this.p5.textSize(40);
        const menuText = `Press [ SPACE ] to go to main menu`;
        this.p5.text(menuText, this.p5.windowWidth / 2 - this.p5.textWidth(menuText) / 2, this.p5.windowHeight * 2 / 3);
    };
    keyPressed = ()=>{
        if (this.p5.keyCode === 32) {
            const error = new Error();
            error.name = 'MENU';
            throw error;
        }
    };
    mouseClicked = ()=>{};
}


const $882b6d93070905b3$var$sketch = (p5)=>{
    let currentView;
    p5.setup = ()=>{
        const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        canvas.parent("app");
        currentView = new $515150850bd53007$export$5fe8222595b01ed2(p5);
    };
    p5.windowResized = ()=>{
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };
    p5.draw = ()=>{
        p5.background(120);
        try {
            currentView.init();
            currentView.draw();
        } catch (e) {
            if (e.name === 'GAME OVER') currentView = new $8a50726fe39a4ae0$export$7e5333f99680078(p5, e.message);
        }
    };
    p5.keyPressed = ()=>{
        try {
            currentView.keyPressed();
        } catch (e) {
            if (e.name === 'MENU') currentView = new $515150850bd53007$export$5fe8222595b01ed2(p5);
            else if (e.name === 'GAME') currentView = new $d1f5a944c3cce055$export$b19c5de2fd1b675d(p5);
        }
    };
    p5.mouseClicked = ()=>{
        currentView.mouseClicked();
    };
};
new ($parcel$interopDefault($8zHUo$p5))($882b6d93070905b3$var$sketch);


//# sourceMappingURL=main.js.map
