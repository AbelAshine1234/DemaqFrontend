import {Howl, Howler} from 'howler';
function HowlDisplay(){

    const initalize = () => {
        var sound = new Howl({
            src: ['./vibranium.mp3', "./time.mp3"],
            html5: true
        });

        var sound1 = new Howl({
            src: ["./time.mp3"],
            html5: true
          });
          
          sound.play();
          sound1.play();
    }

    return (
        <div>
            <div onClick={initalize}>
                play
            </div>
        </div>
    )
}

export default HowlDisplay