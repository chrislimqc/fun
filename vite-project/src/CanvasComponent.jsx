import React, { useRef, useEffect } from 'react';

const CanvasComponent = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawPlatform(); // Redraw the platform after resizing
        }

        //draw floor 

        function drawPlatform() {
            ctx.fillStyle = 'darkblue';
            ctx.fillRect(0, canvas.height - 50, canvas.width, 50); // Draw a rectangle across the bottom of the canvas
        }


        // create avatar

        let avatar = {
            x: 100,
            y: canvas.height - 100,
            width: 50,
            height: 50,
            color: 'red',
            dx: 0,
            dy: 0,
            ax: 0,
            ay: 1,
            maxSpeed: 10000,
            friction: 0.92,
            jumpStrength: -15,
            isJumping: false,
            doubleJumped: false,
            jumpDelay: false
        };


        let keys = {
            'ArrowRight' : "Up",
            'ArrowLeft' : "Up",
            'ArrowUp' : "Up",
            'Space' : "Up"

        }

        function checkKeys() {
            if (keys.ArrowLeft == "Down" && keys.ArrowRight == "Down") {
                avatar.ax = 0
            } else if (keys.ArrowLeft == "Down") {
                avatar.ax = -1
            } else if (keys.ArrowRight == "Down") {
                avatar.ax = 1
            } else if (keys.ArrowLeft == "Up" && keys.ArrowRight == "Up") {
                avatar.ax = 0
            }

            if (keys.ArrowUp == "Down") {
                if (!avatar.isJumping) {
                    avatar.isJumping = true;
                    avatar.dy = avatar.jumpStrength;
                    avatar.jumpDelay = true; // Start delay for double jump
                    setTimeout(() => avatar.jumpDelay = false, 100); // 300ms delay
                } else if (avatar.isJumping && !avatar.doubleJumped && !avatar.jumpDelay) {
                    avatar.isJumping = true;
                    avatar.doubleJumped = true;
                    avatar.dy = avatar.jumpStrength;
                    avatar.jumpDelay = true; // Start delay for double jump
                    setTimeout(() => avatar.jumpDelay = false, 100); // 300ms delay
                }
            } 
        }

        function drawAvatar() {
            ctx.fillStyle = avatar.color;
            ctx.fillRect(avatar.x, avatar.y, avatar.width, avatar.height);
        }

        function updateAvatar() {
            // Update horizontal movement
            avatar.dx += avatar.ax;
            avatar.dx *= avatar.friction; // Apply friction

            // // Cap the speed to maxSpeed
            // if (avatar.dx > avatar.maxSpeed) avatar.dx = avatar.maxSpeed;
            // if (avatar.dx < -avatar.maxSpeed) avatar.dx = -avatar.maxSpeed;

            avatar.x += avatar.dx;

            // Update vertical movement
            if (avatar.isJumping) {
                avatar.dy += avatar.ay;
                avatar.y += avatar.dy;
                if (avatar.y + avatar.height >= canvas.height - 50) {
                    avatar.y = canvas.height - 50 - avatar.height;
                    avatar.dy = 0;
                    avatar.isJumping = false;
                    avatar.doubleJumped = false;
                    avatar.jumpDelay = false;
                }
            }

            // Prevent avatar from going out of bounds
            if (avatar.x < 0) avatar.x = 0;
            if (avatar.x + avatar.width > canvas.width) avatar.x = canvas.width - avatar.width;
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function showStats() {
            ctx.font = "20px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(`Position: (${Math.round(avatar.x)}, ${Math.round(avatar.y)})`, 10, 30);
            ctx.fillText(`Velocity: (${Math.round(avatar.dx)}, ${Math.round(avatar.dy)})`, 10, 60);
            ctx.fillText(`Acceleration: (${avatar.ax}, ${avatar.ay})`, 10, 90);
            ctx.fillText(`Jumping: ${avatar.isJumping}`, 10, 120);
            ctx.fillText(`DoubleJumped: ${avatar.doubleJumped}`, 10, 150);
            ctx.fillText(`JumpDelay: ${avatar.jumpDelay}`, 10, 180);
            ctx.fillText(`Leftkey: ${keys.ArrowLeft}`, 10, 210);
            ctx.fillText(`Rightkey: ${keys.ArrowRight}`, 10, 240);
            ctx.fillText(`Upkey: ${keys.ArrowUp}`, 10, 270);
            
        }

        function animate() {
            clearCanvas();
            drawPlatform();
            checkKeys();
            updateAvatar();
            drawAvatar();
            showStats();
            requestAnimationFrame(animate);
            ctx.fillText(`CHRIS's WORLD (work in progress scroller)`, 400, 400);
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




        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        resizeCanvas()
        animate()

        // Cleanup event listener on component unmount
        return () => {
            canvas.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <canvas ref={canvasRef} style={{ border: '1px solid black' }}></canvas>
    );
};

export default CanvasComponent;
