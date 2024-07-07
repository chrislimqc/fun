//platform list is a list of coordinates, width and heights of rectangles to be drawn
export const platformList = 
// [
//     {
//         "x": 0.2,
//         "y": 0.1,
//         "height": 0.1,
//         "width": 0.5,
//         "color": "yellow"
//     }
// ]
[
    {
        "x": 0.8,
        "y": 0,
        "height": 0.4,
        "width": 0.05,
        "color": "yellow"
    },
    {
        "x": 0.2,
        "y": 0,
        "height": 0.4,
        "width": 0.05,
        "color": "yellow"
    },
    {
        "x": 0,
        "y": 0,
        "height": 0.1,
        "width": 0.5,
        "color": "darkblue"
    },
    {
        "x": 0.3,
        "y": 0.5,
        "height": 0.06,
        "width": 0.2,
        "color": "pink"
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

export const drawPlatforms = (ctx, listOfPlatform, canvas) => {
    listOfPlatform.forEach(platform => {
        drawPlatform(ctx, platform.x*canvas.width, (1-platform.y-platform.height)*(canvas.height), platform.width*canvas.width, platform.height*canvas.height, platform.color);
    });
};


export const clearAvatar = (ctx, avatar) => {
    ctx.clearRect(avatar.x, avatar.y, avatar.width, avatar.height);
}

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
    ctx.fillText(`TLx: ${avatar.TLx}`, 10, 360);
    ctx.fillText(`TRx: ${avatar.TRx}`, 10, 390);
    ctx.fillText(`BLx: ${avatar.BLx}`, 10, 420);
    ctx.fillText(`BRx: ${avatar.BRx}`, 10, 450);
    ctx.fillText(`TLy: ${avatar.TLy}`, 10, 480);
    ctx.fillText(`TRy: ${avatar.TRy}`, 10, 510);
    ctx.fillText(`BLy: ${avatar.BLy}`, 10, 540);
    ctx.fillText(`BRy: ${avatar.BRy}`, 10, 570);
    ctx.fillText(`BMy: ${avatar.BMy}`, 10, 600);

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

    ctx.fillStyle = "purple";
    //TLx
    ctx.moveTo(x-4 , y+5); // Move to the first circle's position
    ctx.arc(x-4 , y+5, 2, 0, 2 * Math.PI);
    //TRx
    ctx.moveTo(x+4 + avatar.width, y+5); // Move to the second circle's position
    ctx.arc(x+4 + avatar.width, y+5, 2, 0, 2 * Math.PI);
    //BLx
    ctx.moveTo(x-4, y + avatar.height-5); // Move to the third circle's position
    ctx.arc(x-4, y + avatar.height-5, 2, 0, 2 * Math.PI);
    //BRx
    ctx.moveTo(x+4 + avatar.width, y + avatar.height-5); // Move to the fourth circle's position
    ctx.arc(x+4 + avatar.width, y + avatar.height-5, 2, 0, 2 * Math.PI);
    // Fill the shapes
    ctx.fill();

    // Draw the four green circles
    ctx.fillStyle = "green";
    //TLy
    ctx.moveTo(x , y-5); // Move to the first circle's position
    ctx.arc(x , y-5, 2, 0, 2 * Math.PI);
    //TRy
    ctx.moveTo(x + avatar.width, y-5); // Move to the second circle's position
    ctx.arc(x + avatar.width, y-5, 2, 0, 2 * Math.PI);
    //BLy
    ctx.moveTo(x, y + avatar.height+5); // Move to the third circle's position
    ctx.arc(x, y + avatar.height+5, 2, 0, 2 * Math.PI);
    //BRy
    ctx.moveTo(x + avatar.width, y + avatar.height+5); // Move to the fourth circle's position
    ctx.arc(x + avatar.width, y + avatar.height+5, 2, 0, 2 * Math.PI);
    //BMy
    ctx.moveTo(avatar.x + (avatar.width/2), avatar.y + avatar.height); // Move to the fourth circle's position
    ctx.arc(avatar.x + (avatar.width/2), avatar.y + avatar.height, 2, 0, 2 * Math.PI);

    ctx.fill();

    ctx.closePath();
};