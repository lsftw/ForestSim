// Dependencies: entities/*.js, utility/utility.js

// NOTE: Generators do not support seeds.

var ForestGenerator = {
    makeScene: function(width, height) {
        var scene = Scene.makeScene();

        var grassPatchCount = Math.floor(Utility.randomInt(5, 7) * width / 200.0);
        for (var i = 0; i < grassPatchCount; i++) {
            var grassWidth = 55 + Utility.randomInt(10, 100);
            var grassHeight = grassWidth / 2 + Utility.randomInt(1, 8);
            var x = Utility.randomInt(0, width);
            var y = height; // grass y = bottom of the grass
            var color = Utility.randomColor('#59FF7D', '#486900');
            var grassPatch = GrassPatch.makeEntity(scene, x, y, grassWidth, grassHeight, color);
            scene.entities.push(grassPatch);
        }

        var shrubCount = Math.floor(Utility.randomInt(2, 3) * width / 300.0);
        for (var i = 0; i < shrubCount; i++) {
            var shrubWidth = 150 + Utility.randomInt(30, 80);
            var shrubHeight = shrubWidth / 2 + Utility.randomInt(1, 8);
            var x = Utility.randomInt(0, width);
            var y = height - shrubHeight;
            var shrub = Shrub.makeEntity(scene, x, y, shrubWidth, shrubHeight);
            scene.entities.push(shrub);
        }

        return scene;
    }
};
