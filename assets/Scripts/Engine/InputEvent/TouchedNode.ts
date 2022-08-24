import { _decorator, Component, Node, EventTouch, Vec2, Input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TouchedNode')
export class TouchedNode extends Component {

    private _onTouchStart: { (e: EventTouch, touchBeganPos:Vec2): void; } = null;
    private _onTouchMove: { (e: EventTouch, touchBeganPos:Vec2): void; } = null;
    private _onTouchEnd: { (e: EventTouch, touchBeganPos:Vec2): void; } = null;

    TouchStart(e: EventTouch, touchBeganPos:Vec2) {
        if(this._onTouchStart){
            this._onTouchStart(e, touchBeganPos);
        }
    }

    TouchMove(e: EventTouch, touchBeganPos:Vec2) {
        if(this._onTouchMove){
            this._onTouchMove(e, touchBeganPos);
        }
    }    

    TouchEnd(e: EventTouch, touchBeganPos:Vec2){
        if(this._onTouchEnd){
            this._onTouchEnd(e, touchBeganPos);
        }
    }

    bindEvent(eventName: Input.EventType, func: { (e: EventTouch, touchBeganPos:Vec2): void; }, context:Object){
        if(eventName == Input.EventType.TOUCH_START){
            this._onTouchStart = func.bind(context);
        }
        else if(eventName == Input.EventType.TOUCH_MOVE){
            this._onTouchMove = func.bind(context);
        }
        else if(eventName == Input.EventType.TOUCH_END){
            this._onTouchEnd = func.bind(context);
        }

    }

}