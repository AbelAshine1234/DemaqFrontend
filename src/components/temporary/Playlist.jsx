import { useEffect } from "react";
import WaveformPlaylist from "waveform-playlist";
import EventEmitter from "event-emitter";

function Playlist(){

    var ee;

    const initalize = () =>{
        var playlist = WaveformPlaylist({
            samplesPerPixel: 3000,
            // mono: true,
            waveHeight: 70,
            container: document.getElementById("playlist"),
            state: "shift",
            colors: {
              waveOutlineColor: "#E0EFF1",
              timeColor: "green",
              fadeColor: "black",
            },
            controls: {
              show: true,
              width: 150,
            },
            zoomLevels: [500, 1000, 3000, 5000],
            timescale:true
            

          });
          
          playlist
            .load([
              {
                src: "./vibranium.mp3",
                name: "Vocals",
                gain: 0.5,
              },
              {
                src: "./vibranium.mp3",
                name: "Drums",
                start: 8.5,
                fadeIn: {
                  duration: 0.5,
                },
                fadeOut: {
                  shape: "logarithmic",
                  duration: 0.5,
                },
              },
              {
                src: "./vibranium.mp3",
                name: "Guitar",
                start: 23.5,
                fadeOut: {
                  shape: "linear",
                  duration: 0.5,
                },
                cuein: 15,
              },
            ]);
            ee = playlist.getEventEmitter();
            console.log(ee);

            
    }

    const play = () => {
        ee.emit("play")
    }
    const stop = () => {
        ee.emit("stop")
    }
    const addTrack = () => {
        ee.emit("newtrack", "./time.mp3")
    }

    return(
        <div>
            <div onClick={initalize}>init</div>
            <div onClick={play}>play</div>
            <div onClick={stop}>stop</div>
            <div onClick={addTrack}>addTrack</div>
            <div id="playlist" style={{width:"1300px"}}></div>


        </div>
    )

}

export default Playlist