//all code to do with avatar

import { act } from "react";

export const createAvatar = (canvas) => ({
    spawnX: canvas.width / 2 - 50,
    spawnY: canvas.height - 150,
    x: canvas.width / 2 - 50,
    y: canvas.height - 450,
    width: canvas.width*0.05,
    height: canvas.height*0.05,
    color: 'red',
    dx: 0,
    dy: 0,
    ax: 0,
    ay: canvas.height*0.1,
    acc: canvas.width*0.002,
    gravity: canvas.height*0.001,
    friction: 0.92,
    jumpStrength: -canvas.height*0.1  ,
    jumpSpeed: -canvas.height*0.01,
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

export const resizeAvatar = (avatar, canvas) => {
    console.log(canvas.width)
    avatar.width = canvas.width*0.05
    avatar.height = canvas.height*0.05
    avatar.x = canvas.width / 2 - 50
    avatar.y = canvas.height - 450

}

export const updateAvatarValues = (avatar,ctx, canvas) => {
    
    avatar.dx *= avatar.friction// Apply friction
    // Update horizontal movement
    avatar.dx += avatar.ax

    //if bottom nothing fall
    if (!(avatar.BLy || avatar.BRy || avatar.BMy)){
        avatar.isFalling = true
    }

    //if jump pressed try jump
    if (avatar.isJumping) {
        avatar.y += avatar.jumpStrength
        checkAvatarCollision(avatar,ctx)
        //if ceiling dont jump
        if (avatar.TLy || avatar.TRy || avatar.BLy || avatar.BRy) {
            avatar.y -= avatar.jumpStrength
        } else {
            avatar.dy = avatar.jumpSpeed
            avatar.isFalling = true
        }
        avatar.isJumping = false

    }

    //if falling fall
    if (avatar.isFalling) {
            avatar.dy += avatar.gravity
    }

    avatar.y += avatar.dy
    checkAvatarCollision(avatar, ctx)
    //if bottom collision, land and reset jumps
    if (avatar.BLy || avatar.BRy || avatar.BMy || avatar.y + avatar.height > canvas.height) {
        avatar.y -= avatar.dy
        avatar.dy = 0
        avatar.isFalling = false
        avatar.isJumping = false
        avatar.doubleJumped = false
    } else if (avatar.TLy || avatar.TRy) {
        avatar.y -= avatar.dy

    } else {
        avatar.isFalling
    }
    

    // if collid with side stop x
    avatar.x += avatar.dx
    checkAvatarCollision(avatar, ctx)
    if (avatar.TLx || avatar.TRx || avatar.BLx || avatar.BRx){
        avatar.x -= avatar.dx 
        avatar.dx += avatar.dx*-0.5

        //find nearest non collision point
    }

    //canvas boundaries
    if (avatar.x < 0) {
        avatar.x = 0
    }

    if (avatar.x + avatar.width > canvas.width) {
        avatar.x = canvas.width - avatar.width
    }

    if (avatar.y < 0) {
        avatar.y = 0
    }

    if (avatar.y + avatar.height > canvas.height) {
        avatar.y = canvas.height - avatar.height
    }


}

export const checkAvatarCollision = (avatar, ctx) => {
    var x = avatar.x
    var y = avatar.y
    var TLxpixel = ctx.getImageData(x-4 , y+5, 1, 1);
    var TRxpixel = ctx.getImageData(x+4 + avatar.width, y+5, 1, 1);
    var BLxpixel = ctx.getImageData(x-4, y + avatar.height-5, 1, 1);
    var BRxpixel = ctx.getImageData(x+4 + avatar.width, y + avatar.height-5, 1, 1);
    var BMxpixel = ctx.getImageData(x+(avatar.width/2), y + avatar.height-5, 1, 1);

    var TLypixel = ctx.getImageData(x , y-5, 1, 1);
    var TRypixel = ctx.getImageData(x + avatar.width, y-5, 1, 1);
    var BLypixel = ctx.getImageData(x, y + avatar.height+5, 1, 1);
    var BRypixel = ctx.getImageData(x + avatar.width, y + avatar.height+5, 1, 1);
    var BMypixel = ctx.getImageData(x+(avatar.width/2), y + avatar.height+5, 1, 1);

    avatar.BLx = !(BLxpixel.data[0] == 0 && BLxpixel.data[1] == 0 && BLxpixel.data[2] == 0)
    avatar.BRx = !(BRxpixel.data[0] == 0 && BRxpixel.data[1] == 0 && BRxpixel.data[2] == 0)
    avatar.TLx = !(TLxpixel.data[0] == 0 && TLxpixel.data[1] == 0 && TLxpixel.data[2] == 0)
    avatar.TRx = !(TRxpixel.data[0] == 0 && TRxpixel.data[1] == 0 && TRxpixel.data[2] == 0)
    avatar.BMx = !(BMxpixel.data[0] == 0 && BMxpixel.data[1] == 0 && BMxpixel.data[2] == 0)

    avatar.BLy = !(BLypixel.data[0] == 0 && BLypixel.data[1] == 0 && BLypixel.data[2] == 0)
    avatar.BRy = !(BRypixel.data[0] == 0 && BRypixel.data[1] == 0 && BRypixel.data[2] == 0)
    avatar.TLy = !(TLypixel.data[0] == 0 && TLypixel.data[1] == 0 && TLypixel.data[2] == 0)
    avatar.TRy = !(TRypixel.data[0] == 0 && TRypixel.data[1] == 0 && TRypixel.data[2] == 0)
    avatar.BMy = !(BMypixel.data[0] == 0 && BMypixel.data[1] == 0 && BMypixel.data[2] == 0)

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

