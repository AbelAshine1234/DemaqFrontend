import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import MediaButton from "../Editing/MediaButton"
import {BsFillRecordFill, BsFillStopFill, BsFillPauseFill, BsFillPlayFill} from "react-icons/bs"
import {AiFillSave} from "react-icons/ai"
import '../../css/editor.css'
import { formatDuration, formatTime } from '../Utils/Helpers'
import Constants from '../Utils/Constants'
import MicrophonePlugin from 'wavesurfer.js/src/plugin/microphone'
import Editor from '../Script/Editor'



function Record(){

    const [time, setTime] = useState(0);
    const [isRecording, setIsRecording] = useState(true);
    const [recordingWave, setRecordingWave] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioWave, setAudioWave] = useState(null);


    const [startTime, setStartTime] = useState(0);
    const [pausedTime, setPausedTime] = useState(0);
    const [timerInterval, setTimerInterval] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);


    const[isPlaying, setIsPlaying] = useState(false);
        
    const startRecording = () => {

        if(recordingWave){
            let confirmation = confirm("Do you want to restart recording?");

            if(confirmation){
                recordingWave.destroy();
                setRecordingWave(null)
                setIsPlaying(false);
                if(audioWave){
                    audioWave.destroy()
                    setAudioWave(null);
                }
                
            }else{
                return
            }

        }


        var rWave = WaveSurfer.create({
            container: "#record",
            waveColor: 'white',
            backgroundColor: "#6B6E70", 
            height: Constants.RECORDINGHEIGHT,
            plugins: [MicrophonePlugin.create({})]
        
        });
        

        if(audioWave){   
            audioWave.destroy();
        }

        
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {

            var audioContext = new AudioContext();

            // Create a MediaStreamAudioSourceNode from the microphone stream
            const sourceNode = audioContext.createMediaStreamSource(stream);
          
            // Create a MediaRecorder instance
            var recorder = new MediaRecorder(stream);

            rWave.microphone.start(); 
          
            // Start recording
            recorder.start();
            setMediaRecorder(recorder);
          
            // Register 'dataavailable' event to collect recorded audio data
            recorder.addEventListener('dataavailable', function(event) {

                var chunks = [event.data]
                
                // Create a new Blob from the recorded audio chunks
                const audioBlob = new Blob(chunks, { type: 'audio/webm' });

                // Do something with the audioBlob, such as saving it or playing it back
                // For example, you can create a download link to save the recorded audio
                
                var audio = WaveSurfer.create({
                    container: "#audio",
                    waveColor: 'white',
                    height: Constants.RECORDINGHEIGHT,
                    backgroundColor: "#6B6E70", 
                    plugins: []
                
                });

                audio.loadBlob(audioBlob);

                audio.on('audioprocess',(e)=>{
                    setTime(e)
                })
                
                setAudioWave(audio);

            });
            
            // Connect the source node to the AudioContext destination to hear the audio while recording
            // sourceNode.connect(audioContext.destination);
          }).catch(function(error) {
            console.error('Error accessing microphone:', error);
          });

          setRecordingWave(rWave);
          setIsRecording(true);
          startTimer();
 
    }

    const pauseRecording = () => {
        recordingWave.microphone.pause();
        
        mediaRecorder.pause();
        setIsRecording(false);
        pauseTimer()

    }

    const resumeRecording = () => {
        recordingWave.microphone.play()
        mediaRecorder.resume();
        setIsRecording(true);
        startTimer()

    }

    const stopRecording = () => {
        recordingWave.microphone.stop();
        recordingWave.destroy();

        mediaRecorder.stop();
        setIsRecording(false);
        setRecordingWave(null)
        resetTimer();

    }

    const startTimer = () => {
        let t = Date.now() - pausedTime;
        setStartTime(t);

        setTimerInterval(
            setInterval(function() {
                setElapsedTime(Date.now() - t)
              }, 1000)
        );
      }
      
    const pauseTimer = () => {
        clearInterval(timerInterval);
        setPausedTime(Date.now() - startTime);
      }
      
    const resetTimer = () => {
        clearInterval(timerInterval);
        setElapsedTime(0);
        setPausedTime(0);
      }



    const playPause = () => {
        audioWave.playPause();
        setIsPlaying(!isPlaying)
    }

    const stop = () => {
        audioWave.stop();
        setIsPlaying(false)
    }


    const mediaButton = () => {
        return(
            <div className="grid grid-cols-3 gap-1 mt-6 mx-2 my-3 place-items-center">
                <MediaButton onClick Icon={<AiFillSave size={30} fill="#86C232"/>}/>

                <MediaButton onClick={playPause} Icon={
                    isPlaying?
                        <BsFillPauseFill size={30} fill="#86C232"/>:
                        <BsFillPlayFill size={30} fill="#86C232"/>
                }/>
                                    
                <MediaButton onClick={stop} Icon={<BsFillStopFill size={30} fill="#86C232"/>}/>
            </div>
        )
    }


    
    return (
        <div className='mt-10 p-5'>
            <div className='grid grid-cols-2 gap-2 place-items-center'>
            
                <div className='w-full'>
                    <div className='grid place-items-center my-2'>
                        <div className='p-2 bg-grey2 max-w-fit rounded drop-shadow-md col-span-2'>
                            <p className='text-4xl font-bold text-green1'>{formatDuration(elapsedTime)} </p>
                        </div>
                    </div>

                    {!recordingWave? <div className='rounded-md bg-grey' style={{"minHeight": Constants.RECORDINGHEIGHT}}/>: null}

                    <div id='record'></div>
                    
                    <div className="grid place-items-center grid-cols-3 gap-1 mt-4 mx-2 mb-4">
                        <MediaButton onClick={startRecording} Icon={<BsFillRecordFill size={30} fill="#86C232"/>}/>
                        {isRecording?
                            <MediaButton onClick={pauseRecording} Icon={<BsFillPauseFill size={30} fill="#86C232"/>}/>
                            :
                            <MediaButton onClick={resumeRecording} Icon={<BsFillPlayFill size={30} fill="#86C232"/>}/>
                        }                                
                        
                        <MediaButton onClick={stopRecording} Icon={<BsFillStopFill size={30} fill="#86C232"/>}/>
                    </div>

                    <div className='grid place-items-center mt-5 mb-2'>
                        <div className='p-2 bg-grey2 max-w-fit rounded drop-shadow-md col-span-2'>
                            <p className='text-3xl font-bold text-green1'>{formatTime(time, true)} </p>
                        </div>
                    </div>
                    
                    
                    {!audioWave? <div className='rounded-md bg-grey' style={{"minHeight": Constants.RECORDINGHEIGHT}}/>: null}

                    <div id='audio' className='rounded-md'></div>   

                    {mediaButton()}
                </div>
                
                <Editor/>
            
            
            </div>
        </div>
    );


}

export default Record

