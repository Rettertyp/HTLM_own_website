export default class ActualLevel {
    constructor() {
        // actual level
        this.current = 0;

        // coordinates where we want to draw items
        this.textPosX = 40;
        this.textPosY = 20;
    }

    nextLevel() {
        this.current++;
    }

    // draws the amount of lifes left on the top right corner
    draw(ctx) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText("Level: " + (this.current + 1), this.textPosX, this.textPosY);
    }


    // does nothing since it doesnt need to update, but has to exist since its a gameObject
    update(deltaTime) {
        return;
    }
}