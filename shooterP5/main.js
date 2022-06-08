var $8zHUo$p5 = require("p5");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}




class $3d24867cd0334f1e$export$1d8b9ae22d404866 {
    constructor(speed, size, position, health){
        this.speed = speed;
        this.size = size;
        this.position = position;
        this.color = $60162365d857b88b$export$feb62dfdf81bc282.color(80);
        this.health = health;
        this.maxHealth = health;
    }
    move(v) {
        this.position.add(v.mult(this.speed));
    }
    draw() {
        //body
        $60162365d857b88b$export$feb62dfdf81bc282.strokeWeight(2);
        $60162365d857b88b$export$feb62dfdf81bc282.fill(this.color);
        $60162365d857b88b$export$feb62dfdf81bc282.circle(this.position.x, this.position.y, this.size);
        //health
        $60162365d857b88b$export$feb62dfdf81bc282.textSize(16);
        $60162365d857b88b$export$feb62dfdf81bc282.fill(0);
        const healthText = Math.round(this.health / this.maxHealth * 100) + '%';
        $60162365d857b88b$export$feb62dfdf81bc282.text(healthText, this.position.x - $60162365d857b88b$export$feb62dfdf81bc282.textWidth(healthText) / 2, this.position.y + 7);
    }
}




let $b9c911ac3eddea20$export$2deb71ebd3734d23;
(function($b9c911ac3eddea20$export$2deb71ebd3734d23) {
    $b9c911ac3eddea20$export$2deb71ebd3734d23[$b9c911ac3eddea20$export$2deb71ebd3734d23["static"] = 1] = "static";
    $b9c911ac3eddea20$export$2deb71ebd3734d23[$b9c911ac3eddea20$export$2deb71ebd3734d23["dynamic"] = 2] = "dynamic";
})($b9c911ac3eddea20$export$2deb71ebd3734d23 || ($b9c911ac3eddea20$export$2deb71ebd3734d23 = {}));


class $aee8ad62020403ac$export$fb443454c5d70172 {
    constructor(position, direction){
        this.duration = 180;
        this.step = 0;
        this.position = position.copy();
        this.direction = direction.copy().mult(0.6);
        this.type = $b9c911ac3eddea20$export$2deb71ebd3734d23.dynamic;
    }
    draw() {
        if (this.step >= this.duration) {
            $60162365d857b88b$export$3349782072608611(this);
            return;
        }
        $60162365d857b88b$export$feb62dfdf81bc282.strokeWeight(0);
        if (this.step < 20) {
            $60162365d857b88b$export$feb62dfdf81bc282.fill($60162365d857b88b$export$feb62dfdf81bc282.color(230, 0, 0, 255));
            $60162365d857b88b$export$feb62dfdf81bc282.circle(this.position.x, this.position.y, 5 + this.step / 2);
            this.position.add(this.direction);
        } else if (this.step === 20) this.type = $b9c911ac3eddea20$export$2deb71ebd3734d23.static;
        else if (this.step < 100) {
            $60162365d857b88b$export$feb62dfdf81bc282.fill($60162365d857b88b$export$feb62dfdf81bc282.color(250 - this.step, 0, 0, 255));
            $60162365d857b88b$export$feb62dfdf81bc282.circle(this.position.x, this.position.y, 15);
        } else {
            $60162365d857b88b$export$feb62dfdf81bc282.fill($60162365d857b88b$export$feb62dfdf81bc282.color(150, 0, 0, 255 - (this.step - 100) * 2.55));
            $60162365d857b88b$export$feb62dfdf81bc282.circle(this.position.x, this.position.y, 15);
        }
        this.step++;
    }
}



class $48556299f068fa56$export$6d56a3d7dae357c {
    constructor(maxAmmo, reloadingTime, weaponSpeed, damage){
        this.maxAmmo = maxAmmo;
        this.ammo = maxAmmo;
        this.reloadingTime = reloadingTime;
        this.reloadingStep = 0;
        this.weaponSpeed = weaponSpeed;
        this.damage = damage;
        this._isReloading = false;
    }
    shot(unit, target) {}
    draw(position, unitSize) {
        if (this._isReloading) {
            if (this.reloadingStep === this.reloadingTime) {
                this._isReloading = false;
                this.ammo = this.maxAmmo;
            }
            this.reloadingStep++;
        }
    }
    attack(attacker) {
        if (!this._isReloading && this.ammo > 0) {
            const target = $60162365d857b88b$export$feb62dfdf81bc282.createVector($60162365d857b88b$export$feb62dfdf81bc282.mouseX, $60162365d857b88b$export$feb62dfdf81bc282.mouseY);
            this.shot(attacker, target);
            this.ammo--;
        }
        if (this.ammo <= 0) this.reload();
    }
    reload() {
        if (!this._isReloading) {
            this._isReloading = true;
            this.reloadingStep = 0;
        }
    }
    isReloading() {
        return this._isReloading;
    }
    getMaxAmmo() {
        return this.maxAmmo;
    }
    dealDamage(enemy) {
        enemy.health -= this.damage;
    }
}



class $c98b999bfcf79bd3$export$f90411c24f6aebf8 {
    constructor(start, speed, size, owner, color, onCollision, onDestroy){
        this.start = start;
        this.speed = speed;
        this.projectile = start.copy();
        this.size = size;
        this.owner = owner;
        this.color = color;
        this.onCollision = onCollision;
        this.onDestroy = onDestroy;
        this.range = $60162365d857b88b$export$feb62dfdf81bc282.windowWidth > $60162365d857b88b$export$feb62dfdf81bc282.windowHeight ? $60162365d857b88b$export$feb62dfdf81bc282.windowWidth : $60162365d857b88b$export$feb62dfdf81bc282.windowHeight;
    }
    move() {
        if (this.projectile.dist(this.start) <= this.range) this.projectile.add(this.speed);
        else this.onDestroy(this);
    }
    draw() {
        $60162365d857b88b$export$feb62dfdf81bc282.fill(this.color);
        $60162365d857b88b$export$feb62dfdf81bc282.circle(this.projectile.x, this.projectile.y, this.size);
    }
}


class $55f8de01b6c61982$export$df1739ff5943c5c5 extends $48556299f068fa56$export$6d56a3d7dae357c {
    constructor(){
        super(9, 60, 8, 5);
    }
    shot(unit1, target) {
        const gun = target.sub(unit1.position).normalize();
        const bullet1 = new $c98b999bfcf79bd3$export$f90411c24f6aebf8(unit1.position.copy(), gun.copy().normalize().mult(this.weaponSpeed), 3, unit1, $60162365d857b88b$export$feb62dfdf81bc282.color(10), (unit, bullet)=>this.onBulletCollision(unit, bullet)
        , (bullet)=>this.onBulletDestroy(bullet)
        );
        $60162365d857b88b$export$f475ffedbe39457e(bullet1);
    }
    draw(position, unitSize) {
        super.draw(position, unitSize);
        const target = $60162365d857b88b$export$feb62dfdf81bc282.createVector($60162365d857b88b$export$feb62dfdf81bc282.mouseX, $60162365d857b88b$export$feb62dfdf81bc282.mouseY);
        const gun = target.sub(position).normalize().mult(unitSize + 10).add(position);
        $60162365d857b88b$export$feb62dfdf81bc282.stroke(0);
        $60162365d857b88b$export$feb62dfdf81bc282.strokeWeight(5);
        $60162365d857b88b$export$feb62dfdf81bc282.line(position.x, position.y, gun.x, gun.y);
    }
    onBulletCollision(unit, bullet) {
        this.dealDamage(unit);
        $60162365d857b88b$export$c35d920d919da1df(new $aee8ad62020403ac$export$fb443454c5d70172(bullet.projectile, bullet.speed));
        this.onBulletDestroy(bullet);
    }
    onBulletDestroy(bullet) {
        $60162365d857b88b$export$94eee6cecd4c0c39(bullet);
    }
}


class $aeaac147d31ada5b$export$887967f05dc521ae extends $3d24867cd0334f1e$export$1d8b9ae22d404866 {
    constructor(speed, size, position, health){
        super(speed, size, position, health);
        this.color = $60162365d857b88b$export$feb62dfdf81bc282.color(130, 40, 0);
        this.weapon = new $55f8de01b6c61982$export$df1739ff5943c5c5();
    }
    getMoveDirection() {
        const v = $60162365d857b88b$export$feb62dfdf81bc282.createVector(0, 0);
        if ($60162365d857b88b$export$feb62dfdf81bc282.keyIsDown(87)) v.y -= 1;
        if ($60162365d857b88b$export$feb62dfdf81bc282.keyIsDown(83)) v.y += 1;
        if ($60162365d857b88b$export$feb62dfdf81bc282.keyIsDown(65)) v.x -= 1;
        if ($60162365d857b88b$export$feb62dfdf81bc282.keyIsDown(68)) v.x += 1;
        return v;
    }
    move(v) {
        this.position.add(v.mult(this.speed));
        const x = $60162365d857b88b$export$feb62dfdf81bc282.constrain(this.position.x, 30, $60162365d857b88b$export$feb62dfdf81bc282.windowWidth - 30);
        const y = $60162365d857b88b$export$feb62dfdf81bc282.constrain(this.position.y, 30, $60162365d857b88b$export$feb62dfdf81bc282.windowHeight - 30);
        this.position = $60162365d857b88b$export$feb62dfdf81bc282.createVector(x, y);
    }
    draw() {
        this.weapon.draw(this.position, this.size / 2);
        $60162365d857b88b$export$feb62dfdf81bc282.strokeWeight(2);
        $60162365d857b88b$export$feb62dfdf81bc282.fill(this.color);
        $60162365d857b88b$export$feb62dfdf81bc282.circle(this.position.x, this.position.y, this.size);
    }
    attack() {
        this.weapon.attack(this);
    }
    reload() {
        this.weapon.reload();
    }
}


let $60162365d857b88b$export$feb62dfdf81bc282;
let $60162365d857b88b$var$_currentScene;
let $60162365d857b88b$var$_hero;
let $60162365d857b88b$var$_enemies;
let $60162365d857b88b$var$_score;
let $60162365d857b88b$var$_projectiles;
let $60162365d857b88b$var$_animations;
const $60162365d857b88b$export$2cd8252107eb640b = (P5)=>{
    $60162365d857b88b$export$feb62dfdf81bc282 = P5;
    $60162365d857b88b$export$13063a66817085c1();
};
const $60162365d857b88b$export$13063a66817085c1 = ()=>{
    $60162365d857b88b$var$_hero = new $aeaac147d31ada5b$export$887967f05dc521ae(2.5, 30, $60162365d857b88b$export$feb62dfdf81bc282.createVector($60162365d857b88b$export$feb62dfdf81bc282.windowWidth / 2, $60162365d857b88b$export$feb62dfdf81bc282.windowHeight / 2), 1);
    $60162365d857b88b$var$_enemies = [];
    $60162365d857b88b$var$_score = 0;
    $60162365d857b88b$var$_projectiles = [];
    $60162365d857b88b$var$_animations = [];
};
const $60162365d857b88b$export$48842b4e092430a8 = ()=>$60162365d857b88b$var$_currentScene
;
const $60162365d857b88b$export$ee667012ddf53c93 = (scene)=>{
    $60162365d857b88b$var$_currentScene = scene;
};
const $60162365d857b88b$export$ba6e2f1cddd013f7 = ()=>$60162365d857b88b$var$_hero
;
const $60162365d857b88b$export$eb0560d6cc1e36f3 = ()=>$60162365d857b88b$var$_enemies
;
const $60162365d857b88b$export$d972eb9f916f6889 = (e)=>{
    $60162365d857b88b$var$_enemies.push(e);
};
const $60162365d857b88b$export$729cfd79908ed368 = (e)=>{
    const idx = $60162365d857b88b$var$_enemies.indexOf(e);
    if (idx >= 0) $60162365d857b88b$var$_enemies.splice(idx, 1);
};
const $60162365d857b88b$export$bed6ab87e2e89fc = ()=>$60162365d857b88b$var$_score
;
const $60162365d857b88b$export$a42ea732396691bd = (scores)=>{
    return $60162365d857b88b$var$_score += scores;
};
const $60162365d857b88b$export$dcd01ad4f9f81282 = ()=>$60162365d857b88b$var$_projectiles
;
const $60162365d857b88b$export$f475ffedbe39457e = (p)=>{
    $60162365d857b88b$var$_projectiles.push(p);
};
const $60162365d857b88b$export$94eee6cecd4c0c39 = (p)=>{
    const idx = $60162365d857b88b$var$_projectiles.indexOf(p);
    if (idx >= 0) $60162365d857b88b$var$_projectiles.splice(idx, 1);
};
const $60162365d857b88b$export$c42cfa0f59561ea0 = ()=>$60162365d857b88b$var$_animations
;
const $60162365d857b88b$export$c35d920d919da1df = (a)=>{
    $60162365d857b88b$var$_animations.push(a);
};
const $60162365d857b88b$export$3349782072608611 = (a)=>{
    const idx = $60162365d857b88b$var$_animations.indexOf(a);
    if (idx >= 0) $60162365d857b88b$var$_animations.splice(idx, 1);
};



class $3a4ae273b2d4d792$export$3df3c878e47daeb9 {
    draw() {
        $60162365d857b88b$export$feb62dfdf81bc282.strokeWeight(2);
        $60162365d857b88b$export$feb62dfdf81bc282.fill(0);
        $60162365d857b88b$export$feb62dfdf81bc282.textSize(24);
        $60162365d857b88b$export$feb62dfdf81bc282.text('AMMO:', 20, $60162365d857b88b$export$feb62dfdf81bc282.windowHeight - 20);
        $60162365d857b88b$export$feb62dfdf81bc282.text(`SCORE: ${$60162365d857b88b$export$bed6ab87e2e89fc()}`, 20, 40);
        const weapon = $60162365d857b88b$export$ba6e2f1cddd013f7().weapon;
        for(let i = 1; i <= weapon.getMaxAmmo(); i++){
            if (i > weapon.ammo) $60162365d857b88b$export$feb62dfdf81bc282.noFill();
            $60162365d857b88b$export$feb62dfdf81bc282.rect(90 + 20 * i, $60162365d857b88b$export$feb62dfdf81bc282.windowHeight - 45, 13, 30);
        }
        if (weapon.isReloading()) {
            $60162365d857b88b$export$feb62dfdf81bc282.fill(0);
            $60162365d857b88b$export$feb62dfdf81bc282.strokeWeight(0);
            $60162365d857b88b$export$feb62dfdf81bc282.rect(110, $60162365d857b88b$export$feb62dfdf81bc282.windowHeight - 65, weapon.reloadingStep / weapon.reloadingTime * weapon.getMaxAmmo() * 20 - 7, 10);
        }
    }
}





class $ee5aec8d9d17bd1f$export$6e8a1450080785fb extends $3d24867cd0334f1e$export$1d8b9ae22d404866 {
    constructor(speed, size, position, health){
        super(speed, size, position, health);
        this.color = $60162365d857b88b$export$feb62dfdf81bc282.color(50, 150, 0);
    }
}


const $85664b529b2d7b1e$var$enemyService = ()=>{
    const createEnemy = ()=>{
        if ($60162365d857b88b$export$feb62dfdf81bc282.frameCount % 120 == 0) return new $ee5aec8d9d17bd1f$export$6e8a1450080785fb(1.2, 50, $60162365d857b88b$export$feb62dfdf81bc282.createVector(0, 0), 30);
        else return null;
    };
    const spawnEnemy = (enemy)=>{
        const outerSide = $60162365d857b88b$export$feb62dfdf81bc282.random([
            'x',
            'y'
        ]);
        let x, y;
        if (outerSide === 'x') {
            x = $60162365d857b88b$export$feb62dfdf81bc282.random(0, 1) > 0.5 ? $60162365d857b88b$export$feb62dfdf81bc282.windowWidth + 100 : -100;
            y = $60162365d857b88b$export$feb62dfdf81bc282.random(0, $60162365d857b88b$export$feb62dfdf81bc282.windowHeight);
        } else {
            x = $60162365d857b88b$export$feb62dfdf81bc282.random(0, $60162365d857b88b$export$feb62dfdf81bc282.windowWidth);
            y = $60162365d857b88b$export$feb62dfdf81bc282.random(0, 1) > 0.5 ? $60162365d857b88b$export$feb62dfdf81bc282.windowHeight + 100 : -100;
        }
        enemy.position = $60162365d857b88b$export$feb62dfdf81bc282.createVector(x, y);
        $60162365d857b88b$export$d972eb9f916f6889(enemy);
    };
    const moveEnemies = ()=>{
        const enemiesToAbsorb = [];
        for (const enemy of $60162365d857b88b$export$eb0560d6cc1e36f3()){
            const v = $60162365d857b88b$export$ba6e2f1cddd013f7().position.copy().sub(enemy.position).normalize().mult(enemy.speed);
            enemy.position.add(v);
            for (const other of $60162365d857b88b$export$eb0560d6cc1e36f3()){
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
            $60162365d857b88b$export$729cfd79908ed368(x.absorbed);
        }
    };
    const drawEnemies = ()=>{
        for (const enemy of $60162365d857b88b$export$eb0560d6cc1e36f3())enemy.draw();
    };
    const calculateDamage = ()=>{
        if ($60162365d857b88b$export$eb0560d6cc1e36f3().some((e)=>$60162365d857b88b$export$ba6e2f1cddd013f7().position.dist(e.position) < e.size / 2 + $60162365d857b88b$export$ba6e2f1cddd013f7().size / 2
        )) throw new Error("GAME OVER");
        const deadEnemies = [];
        for (const enemy of $60162365d857b88b$export$eb0560d6cc1e36f3()){
            for (const projectile of $60162365d857b88b$export$dcd01ad4f9f81282())if (enemy.position.dist(projectile.projectile) < enemy.size / 2) {
                projectile.onCollision(enemy, projectile);
                if (enemy.health <= 0) deadEnemies.push(enemy);
            }
        }
        for (let enemy1 of deadEnemies)$60162365d857b88b$export$729cfd79908ed368(enemy1);
        return deadEnemies.length;
    };
    return {
        spawnEnemy: spawnEnemy,
        moveEnemies: moveEnemies,
        drawEnemies: drawEnemies,
        calculateDamage: calculateDamage,
        createEnemy: createEnemy
    };
};
var $85664b529b2d7b1e$export$2e2bcd8739ae039 = $85664b529b2d7b1e$var$enemyService;




const $de69823fd83adf7c$var$projectileService = ()=>{
    const moveProjectiles = ()=>{
        for (const projectile of $60162365d857b88b$export$dcd01ad4f9f81282())projectile.move();
    };
    const drawProjectiles = ()=>{
        for (const projectile of $60162365d857b88b$export$dcd01ad4f9f81282())projectile.draw();
    };
    return {
        moveProjectiles: moveProjectiles,
        drawProjectiles: drawProjectiles
    };
};
var $de69823fd83adf7c$export$2e2bcd8739ae039 = $de69823fd83adf7c$var$projectileService;




class $c559c0a6510fa641$export$37c32b74f2c813d {
    init = ()=>{};
    draw = ()=>{
        $60162365d857b88b$export$feb62dfdf81bc282.strokeWeight(5);
        $60162365d857b88b$export$feb62dfdf81bc282.textSize(60);
        $60162365d857b88b$export$feb62dfdf81bc282.fill(60);
        const resultText = `Your result: ${$60162365d857b88b$export$bed6ab87e2e89fc()}!`;
        $60162365d857b88b$export$feb62dfdf81bc282.text(resultText, $60162365d857b88b$export$feb62dfdf81bc282.windowWidth / 2 - $60162365d857b88b$export$feb62dfdf81bc282.textWidth(resultText) / 2, $60162365d857b88b$export$feb62dfdf81bc282.windowHeight / 3);
        $60162365d857b88b$export$feb62dfdf81bc282.strokeWeight(0);
        $60162365d857b88b$export$feb62dfdf81bc282.textSize(40);
        const menuText = `Press [ SPACE ] to go to main menu`;
        $60162365d857b88b$export$feb62dfdf81bc282.text(menuText, $60162365d857b88b$export$feb62dfdf81bc282.windowWidth / 2 - $60162365d857b88b$export$feb62dfdf81bc282.textWidth(menuText) / 2, $60162365d857b88b$export$feb62dfdf81bc282.windowHeight * 2 / 3);
    };
    keyPressed = ()=>{
        if ($60162365d857b88b$export$feb62dfdf81bc282.keyCode === 32) $60162365d857b88b$export$ee667012ddf53c93(new $4894756d62564b15$export$fe1abc4519a61930());
    };
    mouseClicked = ()=>{};
}




const $93ac3a408ae9f88c$var$animationService = ()=>{
    const drawDynamicAnimations = ()=>{
        for (const animation of $60162365d857b88b$export$c42cfa0f59561ea0().filter((a)=>a.type === $b9c911ac3eddea20$export$2deb71ebd3734d23.dynamic
        ))animation.draw();
    };
    const drawStaticAnimations = ()=>{
        for (const animation of $60162365d857b88b$export$c42cfa0f59561ea0().filter((a)=>a.type === $b9c911ac3eddea20$export$2deb71ebd3734d23.static
        ))animation.draw();
    };
    return {
        drawDynamicAnimations: drawDynamicAnimations,
        drawStaticAnimations: drawStaticAnimations
    };
};
var $93ac3a408ae9f88c$export$2e2bcd8739ae039 = $93ac3a408ae9f88c$var$animationService;


class $7f7f0f1da31ef130$export$2a0058e0f51db1c4 {
    constructor(){
        this.isInitialized = false;
    }
    init = ()=>{
        if (!this.isInitialized) {
            $60162365d857b88b$export$13063a66817085c1();
            this.hud = new $3a4ae273b2d4d792$export$3df3c878e47daeb9();
            this.isInitialized = true;
        }
    };
    draw = ()=>{
        try {
            const es = $85664b529b2d7b1e$export$2e2bcd8739ae039();
            const ps = $de69823fd83adf7c$export$2e2bcd8739ae039();
            const as = $93ac3a408ae9f88c$export$2e2bcd8739ae039();
            //calculations
            const heroDirection = $60162365d857b88b$export$ba6e2f1cddd013f7().getMoveDirection();
            $60162365d857b88b$export$ba6e2f1cddd013f7().move(heroDirection);
            const newEnemy = es.createEnemy();
            if (newEnemy) es.spawnEnemy(newEnemy);
            es.moveEnemies();
            ps.moveProjectiles();
            $60162365d857b88b$export$a42ea732396691bd(es.calculateDamage());
            //drawing
            as.drawStaticAnimations();
            es.drawEnemies();
            ps.drawProjectiles();
            $60162365d857b88b$export$ba6e2f1cddd013f7().draw();
            as.drawDynamicAnimations();
            this.hud.draw($60162365d857b88b$export$feb62dfdf81bc282, $60162365d857b88b$export$ba6e2f1cddd013f7(), $60162365d857b88b$export$bed6ab87e2e89fc());
        } catch (e) {
            if (e.message === 'GAME OVER') $60162365d857b88b$export$ee667012ddf53c93(new $c559c0a6510fa641$export$37c32b74f2c813d());
            else console.error(e);
        }
    };
    keyPressed = ()=>{
        if ($60162365d857b88b$export$feb62dfdf81bc282.keyCode === 82) $60162365d857b88b$export$ba6e2f1cddd013f7().reload();
    };
    mouseClicked = ()=>{
        $60162365d857b88b$export$ba6e2f1cddd013f7().attack();
    };
}


class $4894756d62564b15$export$fe1abc4519a61930 {
    init = ()=>{};
    draw = ()=>{
        $60162365d857b88b$export$feb62dfdf81bc282.strokeWeight(0);
        $60162365d857b88b$export$feb62dfdf81bc282.textSize(80);
        $60162365d857b88b$export$feb62dfdf81bc282.textStyle($60162365d857b88b$export$feb62dfdf81bc282.BOLD);
        $60162365d857b88b$export$feb62dfdf81bc282.fill($60162365d857b88b$export$feb62dfdf81bc282.color(130, 40, 0));
        const title = 'ShooterP5';
        $60162365d857b88b$export$feb62dfdf81bc282.text(title, $60162365d857b88b$export$feb62dfdf81bc282.windowWidth / 2 - $60162365d857b88b$export$feb62dfdf81bc282.textWidth(title) / 2, $60162365d857b88b$export$feb62dfdf81bc282.windowHeight / 4);
        $60162365d857b88b$export$feb62dfdf81bc282.textStyle($60162365d857b88b$export$feb62dfdf81bc282.NORMAL);
        $60162365d857b88b$export$feb62dfdf81bc282.textSize(30);
        $60162365d857b88b$export$feb62dfdf81bc282.fill(20);
        const controlsMoving = 'Moving:   [W] [A] [S] [D]';
        $60162365d857b88b$export$feb62dfdf81bc282.text(controlsMoving, $60162365d857b88b$export$feb62dfdf81bc282.windowWidth / 2 - $60162365d857b88b$export$feb62dfdf81bc282.textWidth(controlsMoving) / 2, $60162365d857b88b$export$feb62dfdf81bc282.windowHeight / 2);
        const controlsMouse = 'Shooting:   Left Mouse Button';
        $60162365d857b88b$export$feb62dfdf81bc282.text(controlsMouse, $60162365d857b88b$export$feb62dfdf81bc282.windowWidth / 2 - $60162365d857b88b$export$feb62dfdf81bc282.textWidth(controlsMouse) / 2, $60162365d857b88b$export$feb62dfdf81bc282.windowHeight / 2 + 40);
        const controlsReloading = 'Reloading:   [R]';
        $60162365d857b88b$export$feb62dfdf81bc282.text(controlsReloading, $60162365d857b88b$export$feb62dfdf81bc282.windowWidth / 2 - $60162365d857b88b$export$feb62dfdf81bc282.textWidth(controlsReloading) / 2, $60162365d857b88b$export$feb62dfdf81bc282.windowHeight / 2 + 80);
        $60162365d857b88b$export$feb62dfdf81bc282.textStyle($60162365d857b88b$export$feb62dfdf81bc282.NORMAL);
        $60162365d857b88b$export$feb62dfdf81bc282.textSize(40);
        const menuText = `Press [ SPACE ] to start game`;
        $60162365d857b88b$export$feb62dfdf81bc282.text(menuText, $60162365d857b88b$export$feb62dfdf81bc282.windowWidth / 2 - $60162365d857b88b$export$feb62dfdf81bc282.textWidth(menuText) / 2, $60162365d857b88b$export$feb62dfdf81bc282.windowHeight * 3 / 4);
    };
    keyPressed = ()=>{
        if ($60162365d857b88b$export$feb62dfdf81bc282.keyCode === 32) $60162365d857b88b$export$ee667012ddf53c93(new $7f7f0f1da31ef130$export$2a0058e0f51db1c4());
    };
    mouseClicked = ()=>{};
}



const $882b6d93070905b3$var$sketch = (p5)=>{
    p5.setup = ()=>{
        const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        canvas.parent("app");
        $60162365d857b88b$export$2cd8252107eb640b(p5);
        $60162365d857b88b$export$ee667012ddf53c93(new $4894756d62564b15$export$fe1abc4519a61930());
    };
    p5.windowResized = ()=>{
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };
    p5.draw = ()=>{
        p5.background(120);
        const scene = $60162365d857b88b$export$48842b4e092430a8();
        scene.init();
        scene.draw();
    };
    p5.keyPressed = ()=>{
        const scene = $60162365d857b88b$export$48842b4e092430a8();
        scene.keyPressed();
    };
    p5.mouseClicked = ()=>{
        const scene = $60162365d857b88b$export$48842b4e092430a8();
        scene.mouseClicked();
    };
};
new ($parcel$interopDefault($8zHUo$p5))($882b6d93070905b3$var$sketch);


//# sourceMappingURL=main.js.map
