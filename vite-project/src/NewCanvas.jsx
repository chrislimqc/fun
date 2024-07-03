import React, { useRef, useEffect } from 'react';

const CanvasComponent = () => {
    const canvasRef = useRef(null);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let keys = {
        'ArrowRight' : "Up",
        'ArrowLeft' : "Up",
        'ArrowUp' : "Up",
        'Space' : "Up"

    }

    function handleKeyDown(event) {
        if (event.code === 'ArrowRight') {
            keys.ArrowRight = "Down"
        } else if (event.code === 'ArrowLeft') {
            keys.ArrowLeft = "Down"
        } else if (event.code === 'ArrowUp') {
            keys.ArrowUp = "Down"
        }
    }

    function handleKeyUp(event) {
        if (event.code === 'ArrowRight') {
            keys.ArrowRight = "Up"
        } else if (event.code === 'ArrowLeft') {
            keys.ArrowLeft = "Up"
        } else if (event.code === 'ArrowUp') {
            keys.ArrowUp = "Up"
        }
    }

    function showStats() {
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        // ctx.fillText(`Position: (${Math.round(avatar.x)}, ${Math.round(avatar.y)})`, 10, 30);
        // ctx.fillText(`Velocity: (${Math.round(avatar.dx)}, ${Math.round(avatar.dy)})`, 10, 60);
        // ctx.fillText(`Acceleration: (${avatar.ax}, ${avatar.ay})`, 10, 90);
        // ctx.fillText(`Jumping: ${avatar.isJumping}`, 10, 120);
        // ctx.fillText(`DoubleJumped: ${avatar.doubleJumped}`, 10, 150);
        // ctx.fillText(`JumpDelay: ${avatar.jumpDelay}`, 10, 180);
        ctx.fillText(`Leftkey: ${keys.ArrowLeft}`, 10, 210);
        ctx.fillText(`Rightkey: ${keys.ArrowRight}`, 10, 240);
        ctx.fillText(`Upkey: ${keys.ArrowUp}`, 10, 270);
        
    }

    useEffect( () => {

        showStats()
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            canvas.removeEventListener('keydown', handleKeyDown);
            canvas.removeEventListener('keyup', handleKeyUp);
        };
    }, [])

    return (
        <canvas ref={canvasRef} style={{ border: '1px solid black' }}></canvas>
    );
};

export default CanvasComponent;