//platform list is a list of coordinates, width and heights of rectangles to be drawn
export const platformList = [
    {
        "x": 0.8,
        "y": 200,
        "height": 200,
        "width": 100,
        "color": "yellow"
    },
    {
        "x": 0.2,
        "y": 200,
        "height": 200,
        "width": 100,
        "color": "yellow"
    },

    {
        "x": 0.55,
        "y": 200,
        "height": 200,
        "width": 40,
        "color": "orange"
    }

]


export const resizeCanvas = (canvas, window) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

export const drawPlatform = (ctx, x,y,width,height, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height); // Draw a rectangle across the bottom of the canvas
}

export const drawPlatforms = (ctx, listOfPlatform, canvas, boundaries) => {
    listOfPlatform.forEach(platform => {
        drawPlatform(ctx, platform.x*canvas.width, canvas.height - platform.y, platform.width, platform.height, platform.color);
    });
};


export const clearCanvas = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export const showStats = (ctx, avatar, keys, framerate) => {
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Position: (${Math.round(avatar.x)}, ${Math.round(avatar.y)})`, 10, 30);
    ctx.fillText(`Velocity: (${Math.round(avatar.dx)}, ${Math.round(avatar.dy)})`, 10, 60);
    ctx.fillText(`Acceleration: (${avatar.ax}, ${avatar.ay})`, 10, 90);
    ctx.fillText(`isFalling: ${avatar.isFalling}`, 10, 120);
    ctx.fillText(`Jumping: ${avatar.isJumping}`, 10, 150);
    ctx.fillText(`DoubleJumped: ${avatar.doubleJumped}`, 10, 180);
    ctx.fillText(`JumpDelay: ${avatar.jumpDelay}`, 10, 210);
    ctx.fillText(`Leftkey: ${keys.ArrowLeft}`, 10, 240);
    ctx.fillText(`Rightkey: ${keys.ArrowRight}`, 10, 270);
    ctx.fillText(`Upkey: ${keys.ArrowUp}`, 10, 300);
    ctx.fillText(`framerate: ${framerate}`, 10, 330);
    ctx.fillText(`BL: ${avatar.BLy}`, 10, 360);
    ctx.fillText(`BR: ${avatar.BRy}`, 10, 390);
    ctx.fillText(`TL: ${avatar.TLy}`, 10, 420);
    ctx.fillText(`TR: ${avatar.TRy}`, 10, 450);
    ctx.fillText(`BM: ${avatar.BM}`, 10, 480);
}

export const drawAvatar = (ctx, avatar) => {

    var x = avatar.x
    var y = avatar.y
    var dx = avatar.dx
    var dy = avatar.dy
    ctx.beginPath();

    // Draw the main rectangle
    ctx.fillStyle = avatar.color;
    ctx.fillRect(avatar.x, avatar.y, avatar.width, avatar.height);

    // Draw the four green circles
    ctx.fillStyle = "green";
    ctx.moveTo(x+dx , y+dy-5); // Move to the first circle's position
    ctx.arc(x+dx , y+dy-5, 2, 0, 2 * Math.PI);

    ctx.moveTo(x+dx + avatar.width, y+dy-5); // Move to the second circle's position
    ctx.arc(x+dx + avatar.width, y+dy-5, 2, 0, 2 * Math.PI);

    ctx.moveTo(x+dx, y + avatar.height+dy+5); // Move to the third circle's position
    ctx.arc(x+dx, y + avatar.height+dy+5, 2, 0, 2 * Math.PI);

    ctx.moveTo(x+dx + avatar.width, y + avatar.height+dy+5); // Move to the fourth circle's position
    ctx.arc(x+dx + avatar.width, y + avatar.height+dy+5, 2, 0, 2 * Math.PI);

    ctx.moveTo(avatar.x + (avatar.width/2), avatar.y + avatar.height); // Move to the fourth circle's position
    ctx.arc(avatar.x + (avatar.width/2), avatar.y + avatar.height, 2, 0, 2 * Math.PI);

    // Fill the shapes
    ctx.fill();

    ctx.fillStyle = "purple";
    ctx.moveTo(x+dx , y+dy); // Move to the first circle's position
    ctx.arc(x+dx , y+dy, 2, 0, 2 * Math.PI);

    ctx.moveTo(x+dx + avatar.width, y+dy); // Move to the second circle's position
    ctx.arc(x+dx + avatar.width, y+dy, 2, 0, 2 * Math.PI);

    ctx.moveTo(x+dx, y + avatar.height+dy); // Move to the third circle's position
    ctx.arc(x+dx, y + avatar.height+dy, 2, 0, 2 * Math.PI);

    ctx.moveTo(x+dx + avatar.width, y + avatar.height+dy); // Move to the fourth circle's position
    ctx.arc(x+dx + avatar.width, y + avatar.height+dy, 2, 0, 2 * Math.PI);
    // Fill the shapes
    ctx.fill();
    ctx.closePath();
};