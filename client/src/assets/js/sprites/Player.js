class Player 
{
    //constructeur
    constructor()
    {
        //sa position dans la map
        this.x = Math.random()*1600; //tmp
        this.y = Math.random()*1200; //tmp
        //barre de vie
        this.health = 100;
        //temps en jeu 
        this.time = 0;
        //son id en jeu
        this.player = 'player'; //tmp
        //position du viseur 
        this.reticle.x = 0;
        this.retiche.y = 0;
        //action tirer
        this.playerBullets = false;
        //action bouger
        this.move = false; //par défaut, le joueur ne bouge pas

        //les commandes pour controler le personnage
        moveKeys = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.UP,
            'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT
        });

        //commandes pour ramasser une arme
        takeWeapon = Phaser.Input.Keyboard.KeyCodes.Enter;
    }

    seDeplacer()
    {
        //si on actionne 
        this.input.keyboard.on('keydown_UP', function (event) {
            player.setAccelerationY(-800);
        });
        this.input.keyboard.on('keydown_DOWN', function (event) {
            player.setAccelerationY(800);
        });
        this.input.keyboard.on('keydown_LEFT', function (event) {
            player.setAccelerationX(-800);
        });
        this.input.keyboard.on('keydown_RIGHT', function (event) {
            player.setAccelerationX(800);
        });
        //on modifie l'etat 'move'
        this.move = true;
    }

    immobile()
    {
        this.input.keyboard.on('keyup_DOWN', function (event) {
            player.setAccelerationY(0);
        });
        this.input.keyboard.on('keyup_UP', function (event) {
            player.setAccelerationY(0);
        });
        this.input.keyboard.on('keyup_RIGHT', function (event) {
            player.setAccelerationX(0);
        });
        this.input.keyboard.on('keyup_LEFT', function (event) {
            player.setAccelerationX(0);
        });
        //on modifie son etat
        this.move = true;
    }

    
}