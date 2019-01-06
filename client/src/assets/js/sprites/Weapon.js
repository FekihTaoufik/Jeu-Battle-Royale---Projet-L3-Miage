export default class Weapon extends Phaser.GameObjects.Sprite
{
    /* TYPE ARMES (leur puissance)
        1 : FAIBLES
        2 : MOYENNES
        3 : FORTES 
    */
    constructor()
    {
        //sa position
        this.x = 0;    //tmp
        this.y = 0;    //tmp
        //son type
        this.name = 'knife';
        this.type = Math.random()*3; //on gere la frequence d'apparition des armes en fct du type dans la version 1
        //portée de l'arme
        this.portee = 0;
        //vitesse du/des projectiles
        this.xSpeed = 0;
        this.ySpeed = 0;
        //puissance de l'armes 
        this.puissance = 0;
        //direction 
        this.direction = 0;
    }

    genererArmes()
    {
        //en fonction de sa puissance :
        if(this.type == 0)
        {
            this.name = 'faible';
            this.portee = 10;
            this.xSpeed = 20;
            this.ySpeed = 20;
            this.puissance = 5;
        }
        if(this.type == 1)
        {
            this.name = 'moyenne';
            this.portee = 20;
            this.xSpeed = 40;
            this.ySpeed = 40;
            this.puissance = 15;
        }
        else
        {
            this.name = 'forte';
            this.portee = 30;
            this.xSpeed = 60;
            this.ySpeed = 60;
            this.puissance = 25;
        }
    }

    tirer(shooter, target)
    {
        this.setPosition(shooter.x, shooter.y); // Initial position
        this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));
        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.y >= this.y)
        {
            this.xSpeed = this.speed*Math.sin(this.direction);
            this.ySpeed = this.speed*Math.cos(this.direction);
        }
        else
        {
            this.xSpeed = -this.speed*Math.sin(this.direction);
            this.ySpeed = -this.speed*Math.cos(this.direction);
        }
        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
    }

}