// Dependencies: entities/*.js, utility.js

// NOTE: Generators do not support seeds.

var ForestGenerator = {
    makeScene: function(width, height) {
        var scene = Scene.makeScene();

        var grassPatchCount = Math.floor(Utility.randomInt(5, 7) * width / 200.0);
        for (var i = 0; i < grassPatchCount; i++) {
            var grassWidth = 55 + Utility.randomInt(10, 30);
            var grassHeight = grassWidth / 2 + Utility.randomInt(1, 8);
            var x = Utility.randomInt(0, width);
            var y = height - 1;
            var color = Utility.randomColor('#59FF7D', '#486900');
            var grassPatch = GrassPatch.makeEntity(scene, x, y, grassWidth, grassHeight, color);
            scene.entities.push(grassPatch);
        }

        var makeRectangularGrassScene = function(scene) {
            var grassCount = Math.floor(Utility.randomInt(20, 50) * width / 200.0);
            for (var i = 0; i < grassCount; i++) {
                var grass = Grass.makeEntity();
                grass.width = 3 + Utility.randomInt(1, 15);
                grass.height = 7 + Utility.randomInt(1, 30);
                grass.x = Utility.randomInt(0, width);
                grass.y = height - grass.height;
                grass.color = Utility.randomColor('#59FF7D', '#486900');
                scene.entities.push(grass);
            }
        }

        return scene;
    }
};
