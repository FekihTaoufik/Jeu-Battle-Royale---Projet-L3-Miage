import Phaser from "phaser";

var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var controls;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('map', 'assets/img/bg_logo.png');
    //this.load.tilemapCSV('map', 'assets/tilemaps/csv/catastrophi_level2.csv');
}

function create ()
{
    // When loading a CSV map, make sure to specify the tileWidth and tileHeight
    var map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
    //var tileset = map.addTilesetImage('tiles');
    //var layer = map.createStaticLayer(0, tileset, 0, 0); //layer index, tileset, x, y

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    var cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5
    };

    controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

    var help = this.add.text(16, 16, 'Arrow keys to scroll', {
        fontSize: '18px',
        fill: '#ffffff'
    });

    help.setScrollFactor(0);

    //var gui = new dat.GUI();

    var cam = this.cameras.main;

    cam.setBounds(0, 0, 4096, 4096);

    // gui.addFolder('Camera');
    // gui.add(cam, 'dirty').listen();
    // gui.add(cam.midPoint, 'x').listen();
    // gui.add(cam.midPoint, 'y').listen();
    // gui.add(cam, 'scrollX').listen();
    // gui.add(cam, 'scrollY').listen();
}

function update (time, delta)
{
    controls.update(delta);
}
