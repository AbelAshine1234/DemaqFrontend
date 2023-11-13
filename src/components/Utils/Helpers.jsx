function formatTime(seconds, includeHour = false) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    var seconds = Math.floor(seconds - (hours * 3600) - (minutes * 60));
  
    var hoursString = hours.toString().padStart(2, '0');
    var minutesString = minutes.toString().padStart(2, '0');
    var secondsString = seconds.toString().padStart(2, '0');
    if(includeHour){
        return hoursString+ ':' + minutesString + ':' + secondsString;
    }
    return minutesString + ':' + secondsString;
}

function formatDuration(duration) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor(duration / (1000 * 60 * 60));
  
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedHours = String(hours).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

// Function to convert AudioBuffer to audio data
function convertAudioBufferToData(audioBuffer) {
    const numberOfChannels = audioBuffer.numberOfChannels;
    const length = audioBuffer.length;
    const sampleRate = audioBuffer.sampleRate;
  
    // Create an array to hold the interleaved audio data
    const interleavedData = new Float32Array(numberOfChannels * length);
  
    // Interleave the channel data
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const channelData = audioBuffer.getChannelData(channel);
  
      for (let i = 0; i < length; i++) {
        interleavedData[i * numberOfChannels + channel] = channelData[i];
      }
    }
  
    // Create a new AudioBuffer with the interleaved data
    const interleavedBuffer = new AudioBuffer({
      length,
      numberOfChannels,
      sampleRate
    });
  
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const channelData = interleavedBuffer.getChannelData(channel);
  
      for (let i = 0; i < length; i++) {
        channelData[i] = interleavedData[i * numberOfChannels + channel];
      }
    }
  
    // Return the interleaved audio data as an ArrayBuffer
    return interleavedBuffer;
  }
  
  // Function to download the audio file
  function downloadAudioFile(data, filename) {
    const blob = new Blob([data], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
  
    fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
  


export {formatTime, formatDuration, convertAudioBufferToData, downloadAudioFile};