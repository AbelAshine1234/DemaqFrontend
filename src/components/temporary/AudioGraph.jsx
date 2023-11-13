import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const AudioGraph = () => {
  const graphRef = useRef(null);

  const initalize = async () => {
    console.log("Started");
    // // Load the audio file using the Web Audio API
    const audioContext = new AudioContext();
    const audioFile = await fetch('vibranium.mp3');
    const audioBuffer = await audioContext.decodeAudioData(await audioFile.arrayBuffer());
    const width = 200;
    const height = 200;
    
    // Extract the audio data and pre-process it using the Fast Fourier Transform
    const audioData = audioBuffer.getChannelData(0);
    const fftSize = 2048;
    const frequencyBins = new Float32Array(fftSize / 2);
    const timeSegments = Math.ceil(audioData.length / fftSize);
    const audioData2D = new Array(timeSegments).fill().map((_, i) => {
        const segment = audioData.slice(i * fftSize, (i + 1) * fftSize);
        const fft = new AnalyserNode(audioContext, { fftSize });
        fft.getFloatFrequencyData(frequencyBins);
        return Array.from(frequencyBins);
    });
    

    

    // Create scales for the x and y axes
    const xScale = d3.scaleLinear()
    .domain([0, timeSegments])
    .range([0, width]);

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(frequencyBins)])
    .range([height, 0]);

    // Generate the path for the audio graph
    const lineGenerator = d3.line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d));

    const pathData = audioData2D.reduce((acc, curr) => [...acc, ...curr], []);
    console.log(pathData);

    // Render the audio graph
    const svg = d3.select('svg');

    svg.append('path')
    .datum(pathData)
    .attr('d', lineGenerator)
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
    console.log(svg);

  }

//   useEffect(() => {
//     const graph = d3.select(graphRef.current);

//     // Load audio file and extract audio data
//     const audioContext = new AudioContext();
//     const audioElement = new Audio('./vibranium.mp3');
//     const audioSource = audioContext.createMediaElementSource(audioElement);
//     const analyserNode = audioContext.createAnalyser();
//     audioSource.connect(analyserNode);
//     analyserNode.connect(audioContext.destination);
//     const bufferLength = analyserNode.frequencyBinCount;
//     const audioDataArray = new Uint8Array(bufferLength);
//     const timeArray = new Array(bufferLength).fill().map((_, i) => i / bufferLength * audioElement.duration);

//     // Create scales to map time and amplitude values to x and y axes of graph
//     const xScale = d3.scaleLinear()
//       .domain([0, audioElement.duration])
//       .range([0, graph.node().clientWidth]);
//     const yScale = d3.scaleLinear()
//       .domain([0, 255])
//       .range([graph.node().clientHeight, 0]);

//     // Create line generator to plot graph
//     const lineGenerator = d3.line()
//       .x((d, i) => xScale(timeArray[i]))
//       .y((d) => yScale(d));

//     // Render graph
//     graph.append('path')
//       .datum(audioDataArray)
//       .attr('d', lineGenerator)
//       .attr('stroke', 'black')
//       .attr('stroke-width', 2)
//       .attr('fill', 'none');

//     return () => {
//       audioElement.pause();
//       audioElement.src = '';
//     };
//   }, [audioFileUrl]);

  return (
    <div>
        <svg ref={graphRef} width="400" height="200"></svg>
        <div onClick={initalize}>BUTTON</div>
    </div>
  );
};

export default AudioGraph;
