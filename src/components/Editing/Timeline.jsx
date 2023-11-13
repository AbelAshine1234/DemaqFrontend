import { useEffect } from "react";
import { formatTime } from "../Utils/Helpers";

const Timeline = ({duration, canvasWidth, pixelsPerSecond}) => {
    useEffect(() => {
    
        // Get the canvas context
        const canvas = document.getElementById('timeline');
        const ctx = canvas.getContext('2d');
    
        const timelineHeight = 20;
        const secondsPerTick = 1;

        // const pixelsPerSecond = canvasWidth / duration;

        // Set the canvas dimensions
        canvas.width = duration*pixelsPerSecond;
        canvas.height = timelineHeight;
    
        // Draw the timeline on the canvas
        ctx.strokeStyle = '#6B6E70';
        ctx.lineWidth = 1;
        ctx.font = '12px Arial';
        ctx.fillStyle = '#61892F';
        ctx.textAlign = 'center';
    
        for (let i = 0; i < duration; i += secondsPerTick) {
            const x = i * pixelsPerSecond;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, timelineHeight-10);
            ctx.stroke();
            if(i !== 0){
                ctx.fillText(formatTime(i.toFixed(0)), x, timelineHeight);
            }
            
        }

    })

    return(
        <canvas style={{"marginLeft": "5px"}} id="timeline"/>
    )

}

export default Timeline;