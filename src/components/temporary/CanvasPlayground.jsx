import { useEffect, useState } from "react";
import * as Tone from "tone";
import '../css/editor.css'
import { formatTime } from "./Editing/Helpers";

function CanvasPlayground(){

    var isPlaying = false;

    // Load the audio file
    var audioContext;
    var sound;
    var arrayBuffer;
    var audioBuffer;
    var audioDataArray;
    var maxAmplitude;
    var minAmplitude;

    // Set the canvas dimensions
    var canvasWidth = 3000;
    const canvasHeight = 100;
    // Set the timeline properties
    const secondsPerTick = 5; // display a tick every second
    var pixelsPerSecond;

    var audioSource;      
      
    var cursorTime = 0;
    var startTime = 0;

    var zoomLevel = 1;

    const initalize = async () => {

      // Load the audio file
      audioContext = new AudioContext();
      sound = await fetch('./vibranium.mp3');
      arrayBuffer = await sound.arrayBuffer();
      audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Extract the audio data as an array of floats
      audioDataArray = audioBuffer.getChannelData(0);

      // Calculate the maximum and minimum amplitude of the audio data
      maxAmplitude = -Infinity;
      minAmplitude = Infinity;
      for (let i = 0; i < audioDataArray.length; i++) {
        const amplitude = audioDataArray[i];
        if (amplitude > maxAmplitude) {
          maxAmplitude = amplitude;
        }
        if (amplitude < minAmplitude) {
          minAmplitude = amplitude;
        }
      }

      pixelsPerSecond = canvasWidth / audioBuffer.duration;
      
      drawWave();
      timeline();
      moveCursor();


    }
    
    const drawWave = async () => {
            
      // Get the canvas context
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      canvasWidth = canvasWidth / zoomLevel;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const xScale = canvasWidth / audioDataArray.length;

      // Draw the waveform on the canvas
      ctx.beginPath();
      ctx.moveTo(0, (1 - (audioDataArray[0] - minAmplitude) / (maxAmplitude - minAmplitude)) * canvasHeight);
      for (let i = 1; i < audioDataArray.length; i++) {
        const x = i / audioDataArray.length * canvasWidth * zoomLevel;
        const y = (1 - (audioDataArray[i] - minAmplitude) / (maxAmplitude - minAmplitude)) * canvasHeight;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      

    }

    const timeline = () => {
      
      // Get the canvas context
      const canvas = document.getElementById('timeline');
      const ctx = canvas.getContext('2d');

      const timelineHeight = 20;
      // Set the canvas dimensions
      canvas.width = canvasWidth;
      canvas.height = timelineHeight;

      // Draw the timeline on the canvas
      ctx.strokeStyle = 'gray';
      ctx.lineWidth = 1;
      ctx.font = '12px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';

      for (let i = 0; i < audioBuffer.duration; i += secondsPerTick) {
        const x = i * pixelsPerSecond;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, timelineHeight-10);
        ctx.stroke();
        ctx.fillText(formatTime(i.toFixed(0)), x, timelineHeight);
      }


    }


    // Request animation frame loop
    const updateCursor = () => {
      if (isPlaying) {
        const canvas = document.getElementById('canvas');
        const cursorDiv = document.getElementById('cursor');
        const currentTime = audioContext.currentTime - startTime;
        const canvasWidth = canvas.offsetWidth;
        const cursorPos = canvasWidth * (currentTime / audioBuffer.duration);
        cursorDiv.style.left = cursorPos + 'px';
      }
      requestAnimationFrame(updateCursor);
    }

    const moveCursor = () => {
      var target = document.getElementById('cursor');
      var targetBox = document.getElementById('canvas');

      targetBox.addEventListener('click', (event)=>{
        // Calculate the cursor position based on the mouse position
        const cursorX = event.offsetX;

        // Update the cursor div position
        target.style.left = `${cursorX}px`;

        // Calculate the time of the cursor position
        cursorTime = cursorX / pixelsPerSecond;
        console.log(`Cursor time: ${cursorTime.toFixed(2)} seconds`);
      });
        
    }

    const playAudio = () => {
      if (!isPlaying) {
        audioSource = audioContext.createBufferSource();
        audioSource.buffer = audioBuffer;
        audioSource.connect(audioContext.destination);
        audioSource.start(0, cursorTime);
        startTime = audioContext.currentTime - cursorTime;
        isPlaying = true;
        updateCursor();
      }
    }
    
    const pauseAudio = () =>{
      if (isPlaying) {
        audioSource.stop();
        cursorTime = audioContext.currentTime - startTime;
        isPlaying = false;
      }
    }
    
    const stopAudio = () => {
      if (isPlaying) {
        audioSource.stop();
        isPlaying = false;
      }
      cursorTime = 0;
      startTime = 0; 
      const cursorDiv = document.getElementById('cursor');
      cursorDiv.style.left = '0px';
    }

    // set up zoom buttons
    const zoomIn = () => {
      zoomLevel *= 2;
      drawWave();
    };

    const zoomOut = () => {
      zoomLevel /= 2;
      drawWave();
    };
     

    return(
      <>
        <button onClick={initalize}>Initialize</button>
        <div className="p-1" style={{"overflow-x": "scroll", width:"1300px"}}>
              <canvas id="timeline"/>
              <div id="tracks">
                <div id='cursor' className='absolute'/>    
                <canvas id="canvas"/>
              </div>
              <button id="playBtn" onClick={playAudio}>Play</button>
              <button id="pauseBtn" onClick={pauseAudio}>Pause</button>
              <button id="stopBtn" onClick={stopAudio}>Stop</button>
              <button id="stopBtn" onClick={zoomIn}>ZoomIn</button>
              <button id="stopBtn" onClick={zoomOut}>ZoomOut</button>

        </div>
      </>
        
    )
}

export default CanvasPlayground