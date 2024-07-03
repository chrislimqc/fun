export var keys = {
    'ArrowRight' : "Up",
    'ArrowLeft' : "Up",
    'ArrowUp' : "Up",
    'Space' : "Up"
}

export const handleKeyDown = (event, keys) => {
    if (event.code === 'ArrowRight') {
        keys.ArrowRight = "Down"
    } else if (event.code === 'ArrowLeft') {
        keys.ArrowLeft = "Down"
    } else if (event.code === 'ArrowUp') {
        keys.ArrowUp = "Down"
    }
}

export const handleKeyUp = (event, keys) => {
    if (event.code === 'ArrowRight') {
        keys.ArrowRight = "Up"
    } else if (event.code === 'ArrowLeft') {
        keys.ArrowLeft = "Up"
    } else if (event.code === 'ArrowUp') {
        keys.ArrowUp = "Up"
    }
}

