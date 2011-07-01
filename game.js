
function Point()
{
    this.x = 0;
    this.y = 0;
}

function System()
{
    this.position = new Point();
    this.name = "";
}

function CreateSystems(system_data)
{
    var systems = {};
    
    for(system_name in system_data)
    {
        systems[system_name] = new System();
        
        systems[system_name].position.x = system_data[system_name].x;
        systems[system_name].position.y = system_data[system_name].y;
    }
    
    return systems;
}


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

	var system_data = 
        {
            "alpha" : { "x": 4, "y": 3 },
            "beta" : { "x": 6, "y": 6 },
            "gamma" : { "x": 3, "y": 2 },
            "delta" : { "x": 4, "y": 4 }
        };
    

    systems = CreateSystems(system_data);

	for (k in systems)
	{
		var tile = Crafty.e("2D, DOM, system, Mouse");
		
		iso.place(systems[k].position.x,systems[k].position.y,0,tile);
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
        }

        Crafty.addEvent(this, Crafty.stage.elem, "mousemove", scroll);
        Crafty.addEvent(this, Crafty.stage.elem, "mouseup", function() {
            Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", scroll);
        });
    });
});