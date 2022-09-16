import {_decorator, Component, EventTouch, Input, Node, Vec2} from 'cc';
import {TouchedNode} from "db://assets/Scripts/Engine/InputEvent/TouchedNode";
const { ccclass, property } = _decorator;

@ccclass('TouchTemplateScript')
export class TouchTemplateScript extends Component {

    start () {
        //bind events to Node
        let touchedEvents = this.node.getComponent(TouchedNode);
        touchedEvents.bindEvent(Input.EventType.TOUCH_START, this.TouchStart, this);
        touchedEvents.bindEvent(Input.EventType.TOUCH_MOVE, this.TouchMove, this);
        touchedEvents.bindEvent(Input.EventType.TOUCH_END, this.TouchEnd, this);
    }

    //-----------------------------------
    //--------TOUCH events----------------
    TouchStart(e: EventTouch, touchBeganPos:Vec2){
        return;
    }

    TouchMove(e: EventTouch, touchBeganPos:Vec2){
        return;
    }

    TouchEnd(e: EventTouch, touchBeganPos:Vec2){
        return;
    }
    //-------------------------------

}

