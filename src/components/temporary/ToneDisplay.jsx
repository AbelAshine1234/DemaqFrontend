import * as Tone from 'tone'

function ToneDisplay(){

    const initalize = () => {
        const buffer = new Tone.ToneAudioBuffer("vibranium.mp3", () => {
            console.log("loaded");
        });
        const player = new Tone.Player(buffer).toDestination();
        const player2 = new Tone.Player("time.mp3").toDestination();
        Tone.loaded().then(() => {
            player.start();
            // player2.start();
        });
    }

    const slice = () => {
        const player = new Tone.Player("vibranium.mp3").toDestination();
        const slice1 = player.slice(0, 2);
        slice1.start()
        console.log("Done");
    }

    return(
        <div>
            <div onClick={initalize}>
            Play
        </div>
        <div onClick={slice}>
            Slice
        </div>
        </div>
    )

}

export default ToneDisplay