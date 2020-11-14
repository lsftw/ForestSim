// Dependencies: entity.js

var Shrub = {
    makeEntity: function(scene, x, y, width, height) {
        var shrub = Entity.makeEntity(scene);
        shrub.name = 'shrub';
        shrub.color = '#59FF7D';
        shrub.x = x;
        shrub.y = y;
        shrub.width = width;
        shrub.height = height;

        shrub.draw = function(graphicsContext) {
            graphicsContext.strokeStyle = shrub.color;
            graphicsContext.beginPath();
            graphicsContext.moveTo(shrub.x, shrub.y);
            graphicsContext.quadraticCurveTo(shrub.x, shrub.y - height, shrub.x + shrub.width / 2, shrub.y - shrub.height);
            graphicsContext.quadraticCurveTo(shrub.x + shrub.width, shrub.y - height, shrub.x + shrub.width, shrub.y);
            graphicsContext.closePath();
            graphicsContext.stroke();
        };

        return shrub;
    }
};
