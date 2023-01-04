window.onload = function(){
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");

    //let obstacle = new Obstacle();
    let clavier = new Clavier();

    let fx_pas = new Audio();
    fx_pas.src = "audio/fx_pas.wav";
    let fx_saut = new Audio();
    fx_saut.src = "audio/fx_saut.wav";

    let musique_ville = new Audio();
    musique_ville.src = "audio/ambiant_music_ville.mp3";

    let musique_foret = new Audio();
    musique_foret.src = "audio/ambiant_music_foret.mp3";

    let musique_menu = new Audio();
    musique_menu.src = "audio/ambiant_music_menu.mp3";
    

    let img_nuage = new Image();
    img_nuage.src = 'images/nuage.png';

    let img_note_musique = new Image();
    img_note_musique.src = 'images/note_musique.png';

    let img_trophee = new Image();
    img_trophee.src = 'images/trophé.png';

    let hero = new Image();
    hero.src = 'sprite/dog.png';

    let ghost = new Image();
    ghost.src = 'sprite/enemy_ghost.png';

    let zombie = new Image();
    zombie.src = 'sprite/enemy_zombie.png';

    let digger = new Image();
    digger.src = 'sprite/enemy_digger.png';

    let hand = new Image();
    hand.src = 'sprite/enemy_hand.png';

    let fly = new Image();
    fly.src = 'sprite/enemy_fly.png';

    let raven = new Image();
    raven.src = 'sprite/enemy_raven.png';

    let bat = new Image();
    bat.src = 'sprite/enemy_bat_2.png';

    let ghost2 = new Image();
    ghost2.src = 'sprite/enemy_ghost_3.png';

    let ghost3 = new Image();
    ghost3.src = 'sprite/enemy_ghost_4.png';
    


    let backgroundLayer1 = new Image();
    backgroundLayer1.src = 'fond/layer-1.png';
    let backgroundLayer2 = new Image();
    backgroundLayer2.src = 'fond/layer-2.png';
    let backgroundLayer3 = new Image();
    backgroundLayer3.src = 'fond/layer-3.png';
    let backgroundLayer4 = new Image();
    backgroundLayer4.src = 'fond/layer-4.png';
    let backgroundLayer5 = new Image();
    backgroundLayer5.src = 'fond/layer-5.png';

    let citybackgroundLayer1 = new Image();
    citybackgroundLayer1.src = 'fond/city-layer-1.png';
    let citybackgroundLayer2 = new Image();
    citybackgroundLayer2.src = 'fond/city-layer-2.png';
    let citybackgroundLayer3 = new Image();
    citybackgroundLayer3.src = 'fond/city-layer-3.png';
    let citybackgroundLayer4 = new Image();
    citybackgroundLayer4.src = 'fond/city-layer-4.png';
    let citybackgroundLayer5 = new Image();
    citybackgroundLayer5.src = 'fond/city-layer-5.png';

    let gameSpeed = 15;
    let frameX = 0;
    let frameY = 3;
    let spriteWidth = 573;
    let spriteHeight = 523;
    let pas = 0;
    let compteur = 0;
    let yF = 220;
    let yC = 255;
    let note_musique = false;
    let ghost_compteur_foret = -180;
    let fly_compteur_foret = 600;
    let ghost_compteur_city = -180;
    let raven_compteur_city = 600;
    let dead = false;
    let win = false;

    
    let ghostFrameX = 0;
    let zombieFrameX = 0;
    let diggerFrameX = 0;
    let handFrameX = 0;
    let flyFrameX = 0;
    let ravenFrameX = 0;
    let batFrameX = 0;
    let ghost2FrameX = 0;
    let ghost3FrameX = 0;


    
    let ennemyGhostWidth = 87;
    let ennemyGhostHeight = 70;
    let ennemyZombieWidth = 120;
    let ennemyZombieHeight = 90;
    let ennemyDiggerWidth = 260;
    let ennemyDiggerHeight = 178;
    let ennemyHandWidth = 56;
    let ennemyHandHeight = 80;
    let ennemyflyWidth = 60;
    let ennemyflyHeight = 44;
    let ennemyRavenWidth = 271;
    let ennemyRavenHeight = 194;
    let ennemyBatWidth = 266;
    let ennemyBatHeight = 200;
    let ennemyGhost2Width = 218;
    let ennemyGhost2Height = 240;
    let ennemyGhost3Width = 60;
    let ennemyGhost3Height = 70;

    var collision_zombie = new Obstacle(165, 295, 35, 40);
    var collision_hand = new Obstacle(285, 295, 35, 40);
    var collision_digger = new Obstacle(405, 290, 37, 45);

    var collision_bat = new Obstacle(137, 280, 50, 40);
    var collision_ghost2 = new Obstacle(285, 285, 35, 40);
    var collision_ghost3 = new Obstacle(420, 285, 37, 45);
    
    //Création de la class Layer pour que chaque fond puisse êtres modifiés séparemment
    class Layer {
        constructor(image, speedModifier){
            this.x = 0;
            this.y = 0;
            this.width = 1667;
            this.height = 400;
            this.x2 = this.width;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update(){
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= -this.width){
                this.x = this.width + this.x2 - this.speed;
            }
            if (this.x2 <= -this.width){
                this.x2 = this.width + this.x - this.speed;
            }
            this.x = Math.floor(this.x - this.speed);
            this.x2 = Math.floor(this.x2 - this.speed);
        }
        draw(){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
        }
    }
    let layer1 = new Layer(backgroundLayer1, 0.1);
    let layer2 = new Layer(backgroundLayer2, 0.3);
    let layer3 = new Layer(backgroundLayer3, 0.5);
    let layer4 = new Layer(backgroundLayer4, 0.7);
    let layer5 = new Layer(backgroundLayer5, 0.8);

    let city_layer1 = new Layer(citybackgroundLayer1, 0.2);
    let city_layer2 = new Layer(citybackgroundLayer2, 0.4);
    let city_layer3 = new Layer(citybackgroundLayer3, 0.6);
    let city_layer4 = new Layer(citybackgroundLayer4, 0.8);
    let city_layer5 = new Layer(citybackgroundLayer5, 1);

    let canvas_width = 600;
    let canvas_height = 400;
    
    // mus var obj = document.getElementById('audio');
    // mus obj.volume = 0.4;

	setInterval(f, 30);

	function f() {
        if (note_musique == true) {
            musique_ville.play();
            musique_ville.volume = 0.5;
            musique_foret.volume = 0;
            ctx.save();
            ctx.clearRect(0, 0, canvas_width, canvas_height);
            // mise en place de tous les fonds avec leur différents speedModifier
            city_layer1.update();
            city_layer1.draw();

            city_layer2.update();
            city_layer2.draw();

            city_layer3.update();
            city_layer3.draw();

            city_layer4.update();
            city_layer4.draw();

            ctx.drawImage(bat, batFrameX * ennemyBatWidth, 0, ennemyBatWidth, ennemyBatHeight, 130, 275, 70, 55);
            if (batFrameX < 5) batFrameX++;
            else batFrameX = 0;

            ctx.drawImage(ghost2, ghost2FrameX * ennemyGhost2Width, 0, ennemyGhost2Width, ennemyGhost2Height, 280, 273, 60, 70);
            if (ghost2FrameX < 5) ghost2FrameX++;
            else ghost2FrameX = 0;

            ctx.drawImage(ghost3, ghost3FrameX * ennemyGhost3Width, 0, ennemyGhost3Width, ennemyGhost3Height, 420, 280, 40, 50);
            if (ghost3FrameX < 5) ghost3FrameX++;
            else ghost3FrameX = 0;

            city_layer5.update();
            city_layer5.draw();
            
            ctx.drawImage(ghost, ghostFrameX * ennemyGhostWidth, 0, ennemyGhostWidth, ennemyGhostHeight, ghost_compteur_city, 150, ennemyGhostWidth + 90, ennemyGhostHeight + 90);
            ghost_compteur_city += 0.6;
            if (ghostFrameX < 5) ghostFrameX++;
            else ghostFrameX = 0;

            ctx.drawImage(raven, ravenFrameX * ennemyRavenWidth, 0, ennemyRavenWidth, ennemyRavenHeight, raven_compteur_city, 180, 80, 60);
            raven_compteur_city -= 1;
            if (ravenFrameX < 5) ravenFrameX++;
            else ravenFrameX = 0;

            
            let collision_ghost = new Obstacle(ghost_compteur_city+100, 0, 20, 400);
            let collision_raven = new Obstacle(raven_compteur_city, 180, 80, 60);
            
            ctx.restore();

            if (dead) {
                alert("Vous avez perdu ! Pour recommencer il suffit d'appuyer sur 'f5' puis 'OK' ou la touche entrée de votre clavier !");
            }
            if (win) {
                alert("Bravo vous avez gagné !!! Si vous voulez recommencer il suffit d'appuyer sur 'F5' puis 'OK' !")
            }

            //ctx.strokeRect(137, 285, 50, 40);
            //ctx.strokeRect(285, 285, 50, 60);
            //ctx.strokeRect(420, 285, 37, 45);
            //ctx.strokeRect(pas+20, yF+10, 50, 50);
            //ctx.strokeRect(ghost_compteur_city+140, 0, 20, canvas_height);
            //ctx.strokeRect(raven_compteur_city, 180, 80, 60);

            if (collision_ghost.collision(pas, yF, 50, 50)) {
                dead = true;
            }         

            if (frameX < 6) frameX++;
            else frameX = 0;
            if (clavier.droite){
                if (collision_bat.collision(pas+20, yF+10, 50, 50) || collision_ghost2.collision(pas+20, yF+10, 50, 50) || collision_ghost3.collision(pas+20, yF+10, 50, 50) || collision_raven.collision(pas+20, yF+10, 50, 50)) {
                    dead = true;
                }
                else {
                    pas += 3;
                }
            }
            if (clavier.gauche){
                if (collision_bat.collision(pas+20, yF, 50, 50) || collision_ghost2.collision(pas+20, yF, 50, 50) || collision_ghost3.collision(pas+20, yF, 50, 50) || collision_raven.collision(pas+20, yF+10, 50, 50)) {
                    dead = true;
                }
                else {
                    pas -= 2;
                }
            }
            if (clavier.haut && compteur <= 0){
                compteur = 40;
            }
            if (compteur >=0){
                yF = 250-100+(compteur - 20)*(compteur - 20)/4;
                compteur--;
                frameY = 6;
                ctx.drawImage(hero, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, pas, yF, 80, 80);
                if (collision_bat.collision(pas+20, yF+10, 50, 50) || collision_ghost2.collision(pas+20, yF+10, 50, 50) || collision_ghost3.collision(pas+20, yF+10, 50, 50) || collision_raven.collision(pas+20, yF+10, 50, 50)) {
                    dead = true;
                }
                fx_saut.play();
            }
            else {
                frameY = 3;
                ctx.drawImage(hero, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, pas, yF, 80, 80);
                fx_pas.play();
                fx_pas.volume = 0.4;
            }
            ctx.drawImage(img_trophee, 530, 250, 60, 60);
            ctx.drawImage(img_nuage, 510, 270, 90, 80);
            if (pas>=490 && pas <=550) {
                win = true;
            }
        }
        else {
            musique_foret.play();
            ctx.save();
            ctx.clearRect(0, 0, canvas_width, canvas_height)
            // mise en place de tous les fonds avec leur différents speedModifier
            layer1.update();
            layer1.draw();

            layer2.update();
            layer2.draw();

            layer3.update();
            layer3.draw();

            layer4.update();
            layer4.draw();

            ctx.drawImage(zombie, zombieFrameX * ennemyZombieWidth, 0, ennemyZombieWidth, ennemyZombieHeight, 150, 288, 50, 40);
            if (zombieFrameX < 7) zombieFrameX++;
            else zombieFrameX = 0;

            ctx.drawImage(hand, handFrameX * ennemyHandWidth, 0, ennemyHandWidth, ennemyHandHeight, 280, 288, 40, 50);
            if (handFrameX < 7) handFrameX++;
            else handFrameX = 0;

            ctx.drawImage(digger, diggerFrameX * ennemyDiggerWidth, 0, ennemyDiggerWidth, ennemyDiggerHeight, 400, 288, 50, 40);
            if (diggerFrameX < 7) diggerFrameX++;
            else diggerFrameX = 0;

            layer5.update();
            layer5.draw();
            
            ctx.drawImage(ghost, ghostFrameX * ennemyGhostWidth, 0, ennemyGhostWidth, ennemyGhostHeight, ghost_compteur_foret, 150, ennemyGhostWidth + 90, ennemyGhostHeight + 90);
            ghost_compteur_foret += 0.6;
            if (ghostFrameX < 5) ghostFrameX++;
            else ghostFrameX = 0;

            ctx.drawImage(fly, flyFrameX * ennemyflyWidth, 0, ennemyflyWidth, ennemyflyHeight, fly_compteur_foret, 200, ennemyflyWidth, ennemyflyHeight);
            fly_compteur_foret -= 1;
            if (flyFrameX < 5) flyFrameX++;
            else flyFrameX = 0;

            
            let collision_ghost = new Obstacle(ghost_compteur_foret+100, 0, 20, 400);
            let collision_raven = new Obstacle(fly_compteur_foret, 200, ennemyflyWidth, ennemyflyHeight);
            
            ctx.restore();

            if (dead) {
                alert("Vous avez perdu ! Pour recommencer il suffit d'appuyer sur 'f5' puis 'OK' ou la touche entrée de votre clavier !");
            }
            if (win) {
                alert("Bravo vous avez gagné !!! Si vous voulez recommencer il suffit d'appuyer sur 'F5' puis 'OK' !")
            }

            //ctx.strokeRect(285, 290, 35, 40);
            //ctx.strokeRect(405, 290, 37, 45);
            //ctx.strokeRect(pas+20, yF+10, 50, 50);
            //ctx.strokeRect(ghost_compteur_foret+140, 0, 20, canvas_height);
            //ctx.strokeRect(fly_compteur_foret, 200, ennemyflyWidth, ennemyflyHeight);

            if (collision_ghost.collision(pas, yF, 50, 50)) {
                dead = true;
            }         

            if (frameX < 6) frameX++;
            else frameX = 0;
            if (clavier.droite){
                if (collision_zombie.collision(pas+20, yF+10, 50, 50) || collision_digger.collision(pas+20, yF+10, 50, 50) || collision_hand.collision(pas+20, yF+10, 50, 50) || collision_raven.collision(pas+20, yF+10, 50, 50)) {
                    dead = true;
                }
                else {
                    pas += 3;
                }
            }
            if (clavier.gauche){
                if (collision_zombie.collision(pas+20, yF, 50, 50) || collision_digger.collision(pas+20, yF, 50, 50) || collision_hand.collision(pas+20, yF, 50, 50)) {
                    dead = true;
                }
                else {
                    pas -= 2;
                }
            }
            if (clavier.haut && compteur <= 0){
                compteur = 40;
            }
            if (compteur >=0){
                yF = 250-100+(compteur - 20)*(compteur - 20)/4;
                compteur--;
                frameY = 6;
                ctx.drawImage(hero, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, pas, yF, 80, 80);
                if (collision_zombie.collision(pas+20, yF+10, 50, 50) || collision_digger.collision(pas+20, yF+10, 50, 50) || collision_hand.collision(pas+20, yF+10, 50, 50) || collision_raven.collision(pas+20, yF+10, 50, 50)) {
                    dead = true;
                }
                fx_saut.play();
            }
            else {
                frameY = 3;
                ctx.drawImage(hero, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, pas, yF, 80, 80);
                fx_pas.play();
                fx_pas.volume = 0.4;
            }
            ctx.drawImage(img_note_musique, 530, 250, 60, 60);
            if (pas>=490 && pas <=550) {
                note_musique = true;
                pas = 0;
                yC = 255;
            }
        }
    }
}