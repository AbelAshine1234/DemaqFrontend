import WaveSurfer from 'wavesurfer.js'
import Constants from '../Utils/Constants';
import { convertAudioBufferToData, downloadAudioFile } from '../Utils/Helpers';


class AudioControls{

    static zoomIn = (waveObject, pixel, setPixel) => {
        
        let newPixel = pixel+Constants.ZOOMJUMP;

        if(newPixel > 300){
            return
        }
       
        waveObject.forEach(wave => {
            
            setPixel(newPixel)
            wave.zoom(newPixel)
        });
    };
    
    static zoomOut = (waveObject, pixel, setPixel) => {
        let newPixel = pixel-Constants.ZOOMJUMP;

        if(newPixel <= 0){
            return
        }

        waveObject.forEach(wave => {
            setPixel(newPixel)
            wave.zoom(newPixel)
        });
    };

    static cutSection = (waveObject, sections, setSections) => {

        // obtain the original array of the audio
        const buffer = waveObject.backend.buffer;

        const regions = waveObject.regions.list;
        const firstRegion = regions[Object.keys(regions)[0]]
        
        this.copySection(waveObject, sections, setSections);
        
        const sampleRate = buffer.sampleRate;
        const start = firstRegion.start; // Start time in seconds
        const end = firstRegion.end; // End time in seconds
        
        // Remove a section from the audio buffer
        const startOffset = Math.floor(start * sampleRate); 
        const endOffset = Math.floor(end * sampleRate); 

        const duration = buffer.duration - (end - start);
        
        const newBuffer = waveObject.backend.ac.createBuffer(
            buffer.numberOfChannels, 
            duration * buffer.sampleRate, 
            sampleRate
        );

        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            const channelData = buffer.getChannelData(channel);
            const newData = newBuffer.getChannelData(channel);

            for (let j = 0; j < startOffset; j++) {
                newData[j] = channelData[j];
            }
            for (let j = endOffset; j < buffer.length; j++) {
                newData[j - (endOffset - startOffset)] = channelData[j];
            }
        }
        
        waveObject.loadDecodedBuffer(newBuffer);
        

    }

    static copySection = (waveObject, sections, setSections) => {

        // obtain the original array of the audio
        const buffer = waveObject.backend.buffer;

        const regions = waveObject.regions.list;
        
        if(!regions){
            console.log("No region");
            return
        }
        const firstRegion = regions[Object.keys(regions)[0]]
        waveObject.clearRegions()
        
        const sampleRate = buffer.sampleRate;
        const start = firstRegion.start; // Start time in seconds
        const end = firstRegion.end; // End time in seconds

        // Convert start and end times to sample indices
        const startIndex = Math.floor(start * sampleRate);
        const endIndex = Math.floor(end * sampleRate);

        // Calculate the length of the new buffer
        const length = endIndex - startIndex;

        // Create a new buffer object with the cut section
        const newBuffer = waveObject.backend.ac.createBuffer(
            buffer.numberOfChannels, 
            length, 
            sampleRate
        );

        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            const channelData = buffer.getChannelData(channel);
            const newChannelData = newBuffer.getChannelData(channel);
            for (let i = 0; i < length; i++) {
                newChannelData[i] = channelData[startIndex + i];
            }
        }

        var wavesurfer = WaveSurfer.create({
            container: '#sections',
            waveColor: 'white',
            height: 50
        });

        setSections([...sections, wavesurfer])
        
        wavesurfer.loadDecodedBuffer(newBuffer);
        
    }


    static pasteSection = (waveObject, section) => {

        // obtain the original array of the audio
        const buffer = waveObject.backend.buffer;

        const sectionBuffer = section.backend.buffer;
        
        const sampleRate = buffer.sampleRate;
        
        const start = waveObject.getCurrentTime();

        const startOffset = Math.floor(start * sampleRate);

        const duration = buffer.duration + sectionBuffer.duration;

        const newBuffer = waveObject.backend.ac.createBuffer(
            buffer.numberOfChannels, 
            duration * buffer.sampleRate, 
            sampleRate
        );

        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            const channelData = buffer.getChannelData(channel);
            const sectionChannelData = sectionBuffer.getChannelData(channel);
            const newData = newBuffer.getChannelData(channel);

            for (let i = 0; i < startOffset; i++) {
                newData[i] = channelData[i];
            }

            for (let j = 0; j < sectionBuffer.length; j++) {
                newData[startOffset+j] = sectionChannelData[j];
            }

            for (let k = startOffset; k < buffer.length; k++) {
                newData[startOffset+sectionBuffer.length+(k-startOffset)] = channelData[k];
            }

        }
       
        waveObject.loadDecodedBuffer(newBuffer);

    }

    static insertBlank = (waveObject, blankduraion) => {

        // obtain the original array of the audio
        const buffer = waveObject.backend.buffer;
        
        const sampleRate = buffer.sampleRate;
        
        const start = waveObject.getCurrentTime();

        const startOffset = Math.floor(start * sampleRate);

        const duration = buffer.duration + blankduraion;

        const blankLength = blankduraion * buffer.sampleRate

        const newBuffer = waveObject.backend.ac.createBuffer(
            buffer.numberOfChannels, 
            duration * buffer.sampleRate, 
            sampleRate
        );


        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            const channelData = buffer.getChannelData(channel);
            const newData = newBuffer.getChannelData(channel);

            for (let i = 0; i < startOffset; i++) {
                newData[i] = channelData[i];
            }

            for (let j = 0; j < blankLength; j++) {
                newData[startOffset+j] = 0;
            }

            for (let k = startOffset; k < buffer.length; k++) {
                newData[startOffset+blankLength+(k-startOffset)] = channelData[k];
            }

        }
       
        waveObject.loadDecodedBuffer(newBuffer);

    }

    static deleteSection = (i, sections, setSections) => {
        sections[i].destroy();
                    
        setSections(items=>{
            return [
                ...items.slice(0, i),
                ...items.slice(i + 1),
                ]
        });
        
    }

    // For selecting a region
    static addRegion = (waveObject) => {
        waveObject.clearRegions()
        waveObject.addRegion({
            start: waveObject.getCurrentTime(),
            end: waveObject.getCurrentTime() + 3
        })
    }

    static addMarker = (waveObject) => {
        waveObject.addMarker({
            time: waveObject.getCurrentTime(),
            label: "Marker",
            color: "red"
        })
    }

    static saveAudio = (waveObject) => {
        console.log("Saving audio");

        let maxDuration = 0;
        let numberOfChannels = 0;
        let sampleRate = 0;

        
        // Obtain the maximum duration of the audio files
        waveObject.forEach(wave => {
            maxDuration = Math.max(maxDuration, wave.getDuration() / wave.getPlaybackRate());
            sampleRate = Math.max(sampleRate, wave.backend.buffer.sampleRate);
            numberOfChannels = Math.max(numberOfChannels, wave.backend.buffer.numberOfChannels)
        });

        // Create an AudioContext
        const audioContext = new AudioContext();

        // Create a new AudioBuffer with the combined duration
        const newBuffer = audioContext.createBuffer(
            numberOfChannels, 
            maxDuration * sampleRate, 
            sampleRate
        );

        // Combine the audio data from each WaveSurfer instance
        waveObject.forEach(wave => {
            const speed = wave.getPlaybackRate();
            const volume = wave.getVolume();

            for (let channel = 0; channel < numberOfChannels; channel++) {
                const channelData = wave.backend.buffer.getChannelData(channel);
                const newData = newBuffer.getChannelData(channel);
    
                for (let i = 0; i < wave.backend.buffer.length; i++) {
                    const originalIndex = Math.floor(i * speed);
                    newData[i] += channelData[originalIndex] * volume;
                }
    
            }
        });


        // Create an AudioBufferSourceNode
        const audioSource = audioContext.createBufferSource();
        audioSource.buffer = newBuffer; // Set the AudioBuffer

        // Connect the AudioBufferSourceNode to the destination (e.g., speakers)
        audioSource.connect(audioContext.destination);

        // Start playing the AudioBufferSourceNode
        audioSource.start();

        // Stop playing after a certain duration (optional)
        const durationInSeconds = 20; // Stop playing after 5 seconds
        audioSource.stop(audioContext.currentTime + durationInSeconds);


        // const convertedData = convertAudioBufferToData(newBuffer);
        // const url = downloadAudioFile(convertedData, "audio.wav")

        // console.log(url);

        

    }

}

export default AudioControls;