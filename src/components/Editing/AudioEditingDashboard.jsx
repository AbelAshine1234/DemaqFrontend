import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import MediaButton from "./MediaButton"
import {BsFillPlayFill, BsFillPauseFill, BsFillStopFill} from "react-icons/bs"
import {AiOutlinePlus, AiOutlineZoomOut, AiOutlineZoomIn, AiFillCloseCircle} from "react-icons/ai"
import {BiCut, BiCopy, BiPaste, BiSelection, BiSave} from "react-icons/bi"
import {FaMarker} from "react-icons/fa"
import {AiOutlineSplitCells} from "react-icons/ai"
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions'
import WaveSurferMinimap from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';
import '../../css/editor.css'
import { formatTime } from '../Utils/Helpers'
import Timeline from './Timeline'
import MarkersPlugin from 'wavesurfer.js/src/plugin/markers'
import AudioControls from './AudioControls'
import Constants from '../Utils/Constants'
import TempDisplay from './TempDisplay'


function AudioEditingDashboard(){

    const [isPlaying, setIsPlaying] = useState(false);

    const[sections, setSections] = useState([]);

    const [waveObject, setWaveObject] = useState([]);

    const [index, setIndex] = useState(0);

    const [pixel, setPixel] = useState(50);

    const [time, setTime] = useState(0);

        
    const [duration, setDuration] = useState(0);
    const [trackOptions, setTrackOptions] = useState([]);


    const initalize = () => {

        console.log("initalized");
        var newWaveObject = WaveSurfer.create({
                hideScrollbar: true,
                container: "#tracks",
                waveColor: 'white',
                progressColor: 'white',
                cursorColor: 'red',
                height: Constants.TRACKHEIGHT,
                minPxPerSec: pixel,
                maxCanvasWidth: 2000,
                cursorWidth: 4,
                // responsive: true,
                // normalize: true,
                barWidth: 1,
                barGap: 1,
                loopSelection: true,
                // scrollParent: true,
                fillParent: false,
                autoCenter: true,
                // backend: 'MediaElement',
                plugins: [
                    RegionsPlugin.create({}),
                    WaveSurferMinimap.create({
                        container: '#minimap',
                        waveColor: 'gray',
                        progressColor: 'black',
                        height: 30
                    }),
                    MarkersPlugin.create({})
                  ]
            
        });
        
        setWaveObject((oldObjects)=>[...oldObjects, newWaveObject])
        
        newWaveObject.load(getTrack());
        setIndex(waveObject.length); 
        
        
        let trackState = {
            fileName: "Track",
            playing: false,
            muted: false 
        }

        setTrackOptions((items)=>[...items, trackState]);

        newWaveObject.on('ready', function () {
            let max = Math.max(newWaveObject.getDuration(), duration);
            setDuration(max);
        
        });

        newWaveObject.on('audioprocess', function (e) {
            setTime(e);
        });


                
        resetTrackSelection();

    }

    const getTrack = () =>{
        var track ='./vibranium.mp3';
        return track;
    }

    const setCurrentTime = (index) =>{
        waveObject.forEach(wave => {
            wave.setCurrentTime(waveObject[index].getCurrentTime())
        });

    }

    const playPause = () => {
        setCurrentTime(index);
        waveObject.forEach(wave => {
            wave.playPause()
        });
        setIsPlaying(!isPlaying);
        
    };

    const stop = () => {
        waveObject.forEach(wave => {
            wave.stop()
        });
        setIsPlaying(false);
    };
    

    

    const resetTrackSelection = () => {
        var element = document.getElementById("tracks");
        
        var elementChildren = element.children;

        for (var i = 1; i < elementChildren.length; i++) {
            
            (function(index) {
                elementChildren[index].onclick = function() {
                  setIndex(index-1);
                };
              })(i);
        }
    }

    const playPauseTrack = (i) =>{
        waveObject[i].playPause()
        trackOptions[i].playing = !trackOptions[i].playing;
        setTrackOptions([...trackOptions])
    }

    const muteTrack = (i) =>{

        waveObject[i].toggleMute()
        trackOptions[i].muted = !trackOptions[i].muted;
        setTrackOptions([...trackOptions])
    }
    

    const deleteTrack = (i) => {
        waveObject[i].destroy();
                    
        setWaveObject(items=>{
            return [
                ...items.slice(0, i),
                ...items.slice(i + 1),
                ]
        });

        setTrackOptions(items=>{
            return [
                ...items.slice(0, i),
                ...items.slice(i + 1),
                ]
        })

        resetTrackSelection();
    }

    

    
    const sectionControls = () => {

        return sections.map((section, i) => {
            return (
                <div key={i} className="flex flex-row py-1 gap-1 bg-grey rounded-md mx-2 my-3 px-2">
                    <AiFillCloseCircle className='mt-1 mr-2' fill="#86C232" size={20} onClick={()=>AudioControls.deleteSection(i, sections, setSections)}/>
                     <BsFillPlayFill size={30}  fill="#86C232" onClick={()=>{section.playPause()}}/>
                    <BiPaste size={30} fill="#86C232" onClick={()=>{AudioControls.pasteSection(waveObject[index], section)}} />
                    <p className='text-white mt-1'>{formatTime(section.getDuration())} </p>
                </div>
            )
        })


    }

    const trackControls = () =>{

        return waveObject.map((wave, i)=>{
            return <div key={i} style={{height: Constants.TRACKHEIGHT}} className='bg-grey my-2 rounded-md p-1 items-center'>
                <div>
                    <AiFillCloseCircle fill="#86C232" size={20} onClick={()=>{deleteTrack(i)}}/>
                </div>
                <div className={index==i?'bg-green1 rounded-lg text-center my-1':'bg-grey2 rounded-lg text-center my-1'}>
                    <p className='text-white font-bold'>{trackOptions[i].fileName}</p>
                        
                </div>
                
                <div className="flex flex-row gap-1">
                    <p className='text-white'>-</p>
                    <input id="typeinp" type="range" min="0" max="1" defaultValue="1" step="0.1" onChange={(e)=>{wave.setVolume(e.target.value)}}/>
                    <p className='text-white'>+</p>
                </div>
                <div className="flex flex-row gap-1 text-sm">
                    <p className='text-white'>.5</p>
                    <input id="typeinp" type="range" min="0.5" max="2" defaultValue="1" step="0.1" onChange={(e)=>{wave.setPlaybackRate(e.target.value)}}/>
                    <p className='text-white'>2</p>
                </div>
                <div className='flex items-center gap-1 ml-5 mt-1 text-sm'>
                    <div onClick={()=>{muteTrack(i)}} className='cursor-pointer bg-green2 hover:bg-green text-white font-bold py-1 px-2 rounded-full'> {trackOptions[i].muted? "UnMute": "Mute" }  </div>
                    <div onClick={()=>{playPauseTrack(i)}} className='cursor-pointer bg-green2 hover:bg-green text-white font-bold py-1 px-2 rounded-full'>{trackOptions[i].playing? "Pause": "Play" }</div>
                </div>
                
            </div>
        })
    }

    


    

    return (
        <div className='m-1 p-1 w-screen'>
            <div id="minimap" style={{height: "50px", overflow:"scroll"}}></div>
            <div className='my-1 pb-2 grid place-items-center'>
                
            </div>
            <div className="grid grid-cols-12 gap-1 mt-6 mx-2 my-3 place-items-baseline">
                <div className='grid grid-cols-11 gap-8 col-span-10'>
                    <MediaButton title={"Add Audio"}  onClick={initalize} Icon={<AiOutlinePlus size={30} fill="#86C232"/>}/>
                    <MediaButton title={"Save"} onClick={()=>{AudioControls.saveAudio(waveObject)}} Icon={<BiSave size={30} fill="#86C232"/>}/>
                    <MediaButton title={!isPlaying? "Pause": "Play"} onClick={playPause} Icon={
                        !isPlaying?
                        <BsFillPlayFill size={30}  fill="#86C232"/>:
                        <BsFillPauseFill size={30}  fill="#86C232"/>
                    }/>
                    
                    <MediaButton title={"Stop"} onClick={stop} Icon={<BsFillStopFill size={30} fill="#86C232"/>}/>

                    <MediaButton title={"Add Region"} onClick={()=>AudioControls.addRegion(waveObject[index])} Icon={<BiSelection size={30} fill="#86C232"/>}/>
                    
                    <MediaButton title={"Cut"} onClick={()=>AudioControls.cutSection(waveObject[index], sections, setSections)} Icon={<BiCut size={30} fill="#86C232"/>}/>
                    <MediaButton title={"Copy"} onClick={()=>AudioControls.copySection(waveObject[index], sections, setSections)} Icon={<BiCopy size={30} fill="#86C232"/>}/>

                    <MediaButton title={"Zoom In"} onClick={()=>AudioControls.zoomIn(waveObject, pixel, setPixel)} Icon={<AiOutlineZoomIn size={30} fill="#86C232"/>}/>
                    <MediaButton title={"Zoom Out"} onClick={()=>AudioControls.zoomOut(waveObject, pixel, setPixel)} Icon={<AiOutlineZoomOut size={30} fill="#86C232"/>}/>
                    <MediaButton title={"Add Marker"} onClick={()=>AudioControls.addMarker(waveObject[index])} Icon={<FaMarker size={30} fill="#86C232"/>}/>
                    <MediaButton title={"Split"} onClick={()=>AudioControls.insertBlank(waveObject[index], 5)} Icon={<AiOutlineSplitCells size={30} fill="#86C232"/>}/>

                </div>
                <div className='p-2 bg-grey2 max-w-fit rounded drop-shadow-md col-span-2'>
                    <p className='text-3xl font-bold text-green1'>{formatTime(time)} / {formatTime(duration)} </p>
                </div>
                
            </div>
            
                
                     
            <div id="board" className='grid grid-cols-8  p-2 rounded-md'>
                <div id='trackControls' className='mt-5'>
                    {trackControls()}
                </div>
                { waveObject.length == 0? <TempDisplay text={"Add audio files"}/>: null}
                <div id='tracks' className='col-span-7 ml-1'>
                    <Timeline duration={waveObject.length == 0? 0: duration} pixelsPerSecond={pixel}/>
                    
                    
                </div>
            </div>

            <div id='audiosections' className='grid grid-cols-8 mt-5 p-1'>
                <div>
                    {sectionControls()}
                </div>
                { sections.length == 0? <TempDisplay text={"Section display"}/>: null}
                <div id="sections" className='col-span-7 grid gap-1'>
                </div>
            </div>
            
        </div>
    );


}

export default AudioEditingDashboard

