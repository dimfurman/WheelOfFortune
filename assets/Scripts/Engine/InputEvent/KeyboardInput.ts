import {_decorator, AudioSource, Component, EventKeyboard, Input, input, KeyCode, Node} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('KeyboardInput')
export class KeyboardInput extends Component {

    /*@property(MoveLeftLap)
    public LeftLap: MoveLeftLap = null!;

    @property(MoveRightLap)
    public RightLap: MoveRightLap = null!;*/


    onLoad () {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.ARROW_LEFT:
                console.log("ARROW_LEFT Down");
                break;
            case KeyCode.ARROW_RIGHT:
                console.log("ARROW_RIGHT Down");
                break;
        }
    }

    onKeyUp (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.ARROW_LEFT:
                console.log("ARROW_LEFT Up");
                break;
            case KeyCode.ARROW_RIGHT:
                console.log("ARROW_RIGHT Up");
                break;
        }
    }
}