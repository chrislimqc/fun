//all code to do with avatar

export const createAvatar = (canvas) => ({
    x: canvas.width / 2 - 50,
    y: canvas.height - 150,
    width: 50,
    height: 50,
    color: 'red',
    dx: 0,
    dy: 0,
    ax: 0,
    ay: 0.3,
    acc: 0.5,
    friction: 0.92,
    jumpStrength: -20  ,
    maxFall: 5,
    isFalling: false,
    isJumping: false,
    doubleJumped: false,
    jumpDelay: false,
    BLy: false,
    BRy: false,
    TLy: false,
    TRy: false,
    BMy: false,
    BLx: false,
    BRx: false,
    TLx: false,
    TRx: false,
    BMx: false,

});

export const updateAvatarValues = (avatar,ctx) => {
    
    avatar.dx *= avatar.friction// Apply friction
    // Update horizontal movement
    avatar.dx += avatar.ax

    if (!(avatar.BLy || avatar.BRy || avatar.BMy)){
        avatar.isFalling = true
    }

    if (avatar.isJumping) {
        avatar.y += avatar.jumpStrength
        checkAvatarCollision(avatar,ctx)
        avatar.dy = -5
        avatar.isFalling = true
        avatar.isJumping = false
    }

    if (avatar.isFalling) {
        if (avatar.dy < avatar.maxFall) {
            avatar.dy += avatar.ay
        }
        avatar.y += avatar.dy

    }

    
    if (avatar.BLy || avatar.BRy || avatar.BMy) {
        avatar.dy = 0
        avatar.isFalling = false
        avatar.isJumping = false
        avatar.doubleJumped = false
    } else {
        avatar.isFalling
    }


    if (avatar.TLx || avatar.TRx || avatar.BLx || avatar.BRx){
        avatar.dx = 0
        avatar.ax = 0
    }
    else {
        avatar.x += avatar.dx;
    }




}

export const checkAvatarCollision = (avatar, ctx) => {
    var x = avatar.x
    var y = avatar.y
    var dy = avatar.dy
    var dx = avatar.dx
    var TLypixel = ctx.getImageData(x+dx , y+dy-5, 1, 1);
    var TRypixel = ctx.getImageData(x+dx + avatar.width, y+dy-5, 1, 1);
    var BLypixel = ctx.getImageData(x+dx, y + avatar.height+dy+5, 1, 1);
    var BRypixel = ctx.getImageData(x+dx + avatar.width, y + avatar.height+dy+5, 1, 1);
    var BMypixel = ctx.getImageData(x+dx+(avatar.width/2), y + avatar.height+dy+5, 1, 1);

    var TLxpixel = ctx.getImageData(x+dx , y+dy, 1, 1);
    var TRxpixel = ctx.getImageData(x+dx + avatar.width, y+dy, 1, 1);
    var BLxpixel = ctx.getImageData(x+dx, y + avatar.height+dy, 1, 1);
    var BRxpixel = ctx.getImageData(x+dx + avatar.width, y + avatar.height+dy, 1, 1);
    var BMxpixel = ctx.getImageData(x+dx+(avatar.width/2), y + avatar.height+dy, 1, 1);

    avatar.BLy = !(BLypixel.data[0] == 0 && BLypixel.data[1] == 0 && BLypixel.data[2] == 0)
    avatar.BRy = !(BRypixel.data[0] == 0 && BRypixel.data[1] == 0 && BRypixel.data[2] == 0)
    avatar.TLy = !(TLypixel.data[0] == 0 && TLypixel.data[1] == 0 && TLypixel.data[2] == 0)
    avatar.TRy = !(TRypixel.data[0] == 0 && TRypixel.data[1] == 0 && TRypixel.data[2] == 0)
    avatar.BMy = !(BMypixel.data[0] == 0 && BMypixel.data[1] == 0 && BMypixel.data[2] == 0)
    avatar.BLx = !(BLxpixel.data[0] == 0 && BLxpixel.data[1] == 0 && BLxpixel.data[2] == 0)
    avatar.BRx = !(BRxpixel.data[0] == 0 && BRxpixel.data[1] == 0 && BRxpixel.data[2] == 0)
    avatar.TLx = !(TLxpixel.data[0] == 0 && TLxpixel.data[1] == 0 && TLxpixel.data[2] == 0)
    avatar.TRx = !(TRxpixel.data[0] == 0 && TRxpixel.data[1] == 0 && TRxpixel.data[2] == 0)
    avatar.BMx = !(BMxpixel.data[0] == 0 && BMxpixel.data[1] == 0 && BMxpixel.data[2] == 0)

}


export const checkKeys = (avatar, keys) => {
    if (keys.ArrowLeft == "Down" && keys.ArrowRight == "Down") {
        avatar.ax = 0
    } else if (keys.ArrowLeft == "Down") {
        avatar.dx -= avatar.acc
    } else if (keys.ArrowRight == "Down") {
        avatar.dx += avatar.acc
    } else if (keys.ArrowLeft == "Up" && keys.ArrowRight == "Up") {
        avatar.ax = 0
    }

    if (keys.ArrowUp == "Down") {
        if (!avatar.isJumping && !avatar.jumpDelay) {
            avatar.isJumping = true;
            avatar.jumpDelay = true; // Start delay for double jump
        }
    } else if (keys.ArrowUp == "Up") {
        avatar.jumpDelay = false; // End delay for double jump
    }
}
