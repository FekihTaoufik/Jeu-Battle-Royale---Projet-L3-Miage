export default class HealthBar extends Phaser.GameObjects.Graphics{
    constructor (scene, x, y,show)
    {
        super(scene)
        this.value = 100;
        this.p = 76 / 100;
        this.x = -20;
        this.y = 0;
        this.distant = !show
        if(show){
            this.lifeText = scene.add.text(-80, 0, 'Vie', { fontFamily: 'Arial', fontSize: 15, color: '#000000' });
            this.lifeText.depth=15
            this.lifeText.setScrollFactor(0);
            console.log("Showing healthbar")
            this.draw();
            this.depth = 15
            this.setScrollFactor(0);
            scene.add.existing(this);
        }
    }

    decrease (amount)
    {
        this.value -= amount;
        if (this.value < 0)
        {
            this.value = 0;
        }
        if(!this.distant)
            this.draw();
        return (this.value === 0);
    }

    draw ()
    {
        this.clear();
        //BG
        this.fillStyle(0x000000);
        this.fillRect(this.x, this.y, 80, 16);
        //Health
        this.fillStyle(0xffffff);
        this.fillRect(this.x + 2, this.y + 2, 76, 12);
        if (this.value < 30)
        {
            this.fillStyle(0xff0000);
        }
        else
        {
            this.fillStyle(0x00ff00);
        }
        var d = Math.floor(this.p * this.value);
        this.fillRect(this.x + 2, this.y + 2, d, 12);
    }

}