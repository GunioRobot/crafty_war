$(document).ready(function() {
    Crafty.init();
	Crafty.background("black");
    Crafty.sprite(128, "images/sprite.png", {
        system: [0,0,1,1]
    });

    iso = Crafty.isometric.init(128);
    var z = 0;
    var map_height = 10;
    var map_width = 6;

	systems = { 
		alpha: [4,3],
		beta: [6,6],
		delta: [3,2],
		gamma: [4,4]
	};
	
	for (system in systems)
	{
		var tile = Crafty.e("2D, DOM, system, Mouse");
		console.log("test " + systems[system][0] + "," + systems[system][0]);
		
		iso.place(systems[system][0],systems[system][1],0,tile);
	}

    Crafty.addEvent(this, Crafty.stage.elem, "mousedown", function(e) {
        if(e.button > 1) return;
        var base = {x: e.clientX, y: e.clientY};

        function scroll(e) {
            var dx = base.x - e.clientX,
                dy = base.y - e.clientY;
                base = {x: e.clientX, y: e.clientY};
            Crafty.viewport.x -= dx;
            Crafty.viewport.y -= dy;
        };

        Crafty.addEvent(this, Crafty.stage.elem, "mousemove", scroll);
        Crafty.addEvent(this, Crafty.stage.elem, "mouseup", function() {
            Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", scroll);
        });
    });
});