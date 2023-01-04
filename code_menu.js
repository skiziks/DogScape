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

    let gameSpeed = 15;
    let frameX = 0;
    let frameY = 3;
    let spriteWidth = 573;
    let spriteHeight = 523;
    let pas = 230;
    let compteur = 0;
    let yF = 220;
    

    let hero = new Image();
    hero.src = 'sprite/dog.png';
  
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


    let canvas_width = 600;
    let canvas_height = 400;
    
    // mus var obj = document.getElementById('audio');
    // mus obj.volume = 0.4;

    


	setInterval(f, 30);

	function f() {
            musique_menu.play();
            musique_ville.volume = 0.5;
            musique_foret.volume = 0;
            ctx.save();
            ctx.clearRect(0, 0, canvas_width, canvas_height);
            // mise en place de tous les fonds avec leur différents speedModifier
            layer1.update();
            layer1.draw();

            layer2.update();
            layer2.draw();

            layer3.update();
            layer3.draw();

            layer4.update();
            layer4.draw();

            layer5.update();
            layer5.draw();

            ctx.drawImage(hero, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 230, 230, 150, 150);
            if (frameX < 8) frameX++;
            else frameX = 0;

            ctx.fillText('DogScape', 115, 100);
            ctx.font = 'bold 70px Verdana, Arial, serif';
        }
        
}