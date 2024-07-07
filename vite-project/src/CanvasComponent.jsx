import React, { useRef, useEffect } from 'react';
import { createAvatar, checkKeys, updateAvatarValues, checkAvatarCollision, resizeAvatar } from './avatar';
import { resizeCanvas, drawPlatform, clearCanvas, showStats, drawAvatar, drawPlatforms, platformList } from './canvasUtils';
import { handleKeyDown, handleKeyUp, keys } from './handleInput';


const CanvasComponent = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // create avatar
        var avatar = createAvatar(canvas)

        let lastTime = performance.now();
        let fps = 0;
        let frameCount = 0;


        function animate() {

            frameCount += 1;
            const currentTime = performance.now();
            const elapsedTime = currentTime - lastTime;
            if (elapsedTime >= 1000) {
                fps = frameCount / (elapsedTime / 1000);
                frameCount = 0;
                lastTime = currentTime;
            }
            clearCanvas(ctx, canvas);
            resizeCanvas(canvas, window)
            drawPlatforms(ctx, platformList, canvas);
      
            checkKeys(avatar, keys);
            updateAvatarValues(avatar,ctx, canvas);
            showStats(ctx, avatar, keys, fps)
            drawAvatar(ctx, avatar);
            requestAnimationFrame(animate);

        }

        const resizeCanvasEvent = () => {
            resizeCanvas(canvas,window)
            drawPlatforms(ctx,platformList, canvas)
            resizeAvatar(avatar, canvas)
        }
        const handleKeyDownEvent = (event) => handleKeyDown(event, keys);
        const handleKeyUpEvent = (event) => handleKeyUp(event, keys);

        window.addEventListener('resize', resizeCanvasEvent);
        window.addEventListener('keydown', handleKeyDownEvent);
        window.addEventListener('keyup', handleKeyUpEvent);

        animate()
    


        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', resizeCanvasEvent);
            window.removeEventListener('keydown', handleKeyDownEvent);
            window.removeEventListener('keyup', handleKeyUpEvent);
        };
    }, []);

    return (
        <canvas ref={canvasRef} style={{ border: '1px solid black' }}></canvas>
    );
};

export default CanvasComponent;
